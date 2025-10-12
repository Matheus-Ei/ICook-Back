import { ProjectRepository } from '../repositories/ProjectRepository';
import { AsyncMaybe, Editable } from '../types';
import { inject, injectable } from 'inversify';
import { Project } from '../entities/Project';
import { TYPES } from '../providers/types';
import { PermissionService } from './PermissionService';

@injectable()
export class ProjectService {
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(TYPES.PermissionService)
    private permissionService: PermissionService
  ) {}

  create = async (projectData: Omit<Project, 'id'>): AsyncMaybe<Project> => {
    // Verify the permissions
    const hasPermission = await this.permissionService.verifyBySubscription(
      projectData.ownerUserId,
      'createUnlimitedProjects'
    );
    const numberProjects = await this.projectRepository.countByUserId(
      projectData.ownerUserId
    );

    if (!hasPermission && numberProjects > 10) {
      throw new Error(
        "Your subscription don't allow you to perform this action"
      );
    }

    return this.projectRepository.create(projectData);
  };

  get = async (id: number): AsyncMaybe<Project> => {
    return this.projectRepository.findById(id);
  };

  getModuleCount = async (
    id: number
  ): AsyncMaybe<{ module: string; number: number }[]> => {
    const moduleCount = await this.projectRepository.getEachModuleCount(id);

    return (
      moduleCount?.map((m) =>
        m.module === null
          ? { module: 'null', number: Number(m.number) }
          : { ...m, number: Number(m.number) }
      ) || null
    );
  };

  getAll = async (userId: number): AsyncMaybe<Project[]> => {
    return this.projectRepository.findByUserId(userId);
  };

  delete = async (id: number): Promise<boolean> => {
    return this.projectRepository.deleteById(id);
  };

  update = async (
    id: number,
    projectData: Editable<Project>
  ): Promise<boolean> => {
    return this.projectRepository.updateById(id, projectData);
  };
}
