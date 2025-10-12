import { PermissionRepository } from '../repositories/PermissionRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { SinglePermission } from '../constants/permissions';

@injectable()
export class PermissionService {
  constructor(
    @inject(TYPES.PermissionRepository)
    private permissionRepository: PermissionRepository,
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository
  ) {}

  verifyByProjectRole = async (
    userId: number,
    projectId: number,
    permission: SinglePermission
  ): Promise<boolean> => {
    // Check if it's the owner
    const project = await this.projectRepository.findById(projectId);
    if (project?.ownerUserId === userId) return true;

    // Verify the permission by role
    const response = await this.permissionRepository.findSharedPermission(
      userId,
      projectId,
      permission
    );

    return response ? true : false;
  };

  verifyBySubscription = async (
    userId: number,
    permission: SinglePermission
  ): Promise<boolean> => {
    const response = await this.permissionRepository.findBySubscription(
      userId,
      permission
    );

    return response ? true : false;
  };
}
