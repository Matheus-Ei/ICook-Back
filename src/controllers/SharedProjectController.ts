import { SharedProjectService } from '../services/SharedProjectService';
import { SharedProject } from '../entities/SharedProject';
import { ProjectMember, UserSharedProject } from '../types/sharedProject';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';
import { TokenService } from '../services/TokenService';

@injectable()
export class SharedProjectController {
  constructor(
    @inject(TYPES.SharedProjectService)
    private sharedProjectService: SharedProjectService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  getAllSharedProjects = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);

      if (userId === null) return Res.sendByType(res, 'badRequest');

      const projects = await this.sharedProjectService.getUserSharedProjects(
        Number(userId)
      );

      return Res.sendByType<UserSharedProject[] | null>(
        res,
        'found',
        undefined,
        projects
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getByPeriod = async (req: Request, res: Response) => {
    const { projectId, type } = req.params;
    const { startDate, endDate } = req.query;

    try {
      const shares = await this.sharedProjectService.getByPeriod(
        Number(projectId),
        type as 'created' | 'updated',
        new Date(startDate as string),
        new Date(endDate as string)
      );

      if (!shares) return Res.sendByType(res, 'notFound');

      return Res.sendByType<SharedProject[]>(res, 'found', undefined, shares);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getMembers = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userEmail } = req.query as { userEmail?: string };

    try {
      const members = await this.sharedProjectService.getProjectMembers(
        Number(projectId),
        userEmail
      );

      if (!members) return Res.sendByType(res, 'notFound');

      return Res.sendByType<ProjectMember | ProjectMember[]>(
        res,
        'found',
        undefined,
        members
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  share = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userEmail, roleTitle } = req.body;

    try {
      const sharedProject = await this.sharedProjectService.create(
        userEmail,
        roleTitle,
        Number(projectId)
      );

      return Res.sendByType<SharedProject>(
        res,
        'created',
        undefined,
        sharedProject
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  changeRole = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userEmail } = req.query;
    const { roleTitle } = req.body;

    try {
      const wasUpdated = await this.sharedProjectService.updateRole(
        userEmail as string,
        roleTitle,
        Number(projectId)
      );

      if (!wasUpdated) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'updated');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  unshare = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userEmail } = req.query;

    try {
      const wasDeleted = await this.sharedProjectService.unshare(
        userEmail as string,
        Number(projectId)
      );

      if (!wasDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
