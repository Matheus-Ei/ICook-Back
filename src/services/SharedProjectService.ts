import { SharedProjectRepository } from '../repositories/SharedProjectRepository';
import { ProjectMember, UserSharedProject } from '../types/sharedProject';
import { SharedProject } from '../entities/SharedProject';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';
import { UserRepository } from '../repositories/UserRepository';
import { RoleRepository } from '../repositories/RoleRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { PermissionService } from './PermissionService';

@injectable()
export class SharedProjectService {
  constructor(
    @inject(TYPES.SharedProjectRepository)
    private sharedProjectRepository: SharedProjectRepository,
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository,
    @inject(TYPES.RoleRepository)
    private roleRepository: RoleRepository,
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(TYPES.PermissionService)
    private permissionService: PermissionService
  ) {}

  create = async (
    userEmail: string,
    roleTitle: string,
    projectId: number
  ): Promise<SharedProject> => {
    const user = await this.userRepository.findByEmail(userEmail);
    const role = await this.roleRepository.findByTitle(roleTitle);
    const project = await this.projectRepository.findById(projectId);

    if (!user || !role || !project)
      throw new Error('User | Project | Role not found');

    // Dont allow the share to be created if the ownerUserId is the user to be shared
    if (project.ownerUserId === user.id)
      throw new Error('This user is the owner of the project');

    // Verify the permissions
    const hasPermission = await this.permissionService.verifyBySubscription(
      project.ownerUserId,
      'createUnlimitedProjectShares'
    );
    const numberShares =
      await this.sharedProjectRepository.countShares(projectId);

    if (!hasPermission && numberShares > 5) {
      throw new Error(
        "Your subscription don't allow you to perform this action"
      );
    }

    const newShare = await this.sharedProjectRepository.create({
      userId: user.id,
      roleId: role.id,
      projectId,
    });

    if (!newShare) throw new Error('The new share was not created');

    return newShare;
  };

  getByPeriod = async (
    projectId: number,
    type: 'updated' | 'created',
    startDate: Date,
    endDate: Date
  ): AsyncMaybe<SharedProject[]> => {
    return this.sharedProjectRepository.findByPeriod(
      projectId,
      type,
      startDate,
      endDate
    );
  };

  getProjectMembers = async (
    projectId: number,
    userEmail?: string
  ): AsyncMaybe<ProjectMember | ProjectMember[]> => {
    if (!userEmail || typeof userEmail !== 'string') {
      return this.sharedProjectRepository.findAllMembers(projectId);
    }

    return this.sharedProjectRepository.findOneMember(projectId, userEmail);
  };

  getUserSharedProjects = async (
    userId: number
  ): AsyncMaybe<UserSharedProject[]> => {
    return this.sharedProjectRepository.findAllSharedProjects(userId);
  };

  unshare = async (userEmail: string, projectId: number): Promise<boolean> => {
    return this.sharedProjectRepository.removeRelation(userEmail, projectId);
  };

  updateRole = async (
    userEmail: string,
    roleTitle: string,
    projectId: number
  ): Promise<boolean> => {
    return this.sharedProjectRepository.updateRole(
      projectId,
      userEmail,
      roleTitle
    );
  };
}
