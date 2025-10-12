import { ProjectService } from '../services/ProjectService';
import { inject, injectable } from 'inversify';
import { Project } from '../entities/Project';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';
import { TokenService } from '../services/TokenService';

@injectable()
export class ProjectController {
  constructor(
    @inject(TYPES.ProjectService) private projectService: ProjectService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  create = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
      const ownerUserId = this.tokenService.getUserId(req);

      if (ownerUserId === null) return Res.sendByType(res, 'badRequest');

      const newProject = await this.projectService.create({
        title,
        description,
        ownerUserId: Number(ownerUserId),
      });

      return Res.sendByType(res, 'created', undefined, newProject);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  get = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await this.projectService.get(Number(projectId));

      if (!project) return Res.sendByType(res, 'notFound');

      return Res.sendByType<Project>(res, 'found', undefined, project);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getModuleCount = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const moduleCount = await this.projectService.getModuleCount(
        Number(projectId)
      );

      return Res.sendByType<{ module: string; number: number }[] | null>(
        res,
        'found',
        undefined,
        moduleCount
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);

      if (userId === null) return Res.sendByType(res, 'badRequest');

      const projects = await this.projectService.getAll(Number(userId));

      return Res.sendByType<Project[] | null>(
        res,
        'found',
        undefined,
        projects
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  delete = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const wasDeleted = await this.projectService.delete(Number(projectId));

      if (!wasDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  update = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { title, description, ownerUserId } = req.body;

    try {
      const wasUpdated = await this.projectService.update(Number(projectId), {
        title,
        description,
        ownerUserId,
      });

      const project = await this.projectService.get(Number(projectId));

      if (!wasUpdated || !project) return Res.sendByType(res, 'notFound');

      return Res.sendByType<Project>(res, 'updated', undefined, project);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
