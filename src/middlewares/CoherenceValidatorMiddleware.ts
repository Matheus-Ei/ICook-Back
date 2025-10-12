import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Res } from '../utils/response';
import { inject } from 'inversify';
import { TYPES } from '../providers/types';
import { PageService } from '../services/PageService';

@injectable()
export class CoherenceValidatorMiddleware {
  constructor(@inject(TYPES.PageService) private pageService: PageService) {}

  private getProjectId = (req: Request): number | null => {
    const { params, body, query } = req;

    let projectIdValue: number | undefined;

    if (params.projectId !== undefined)
      projectIdValue = Number(params.projectId);
    else if (body.projectId !== undefined)
      projectIdValue = Number(body.projectId);
    else if (query.projectId !== undefined)
      projectIdValue = Number(query.projectId);
    else return null;

    if (isNaN(projectIdValue)) return null;

    return projectIdValue;
  };

  private getPageId = (req: Request): number | null => {
    const { params, body, query } = req;

    let pageIdValue: number | undefined;

    if (params.pageId !== undefined) pageIdValue = Number(params.pageId);
    else if (body.pageId !== undefined) pageIdValue = Number(body.pageId);
    else if (query.pageId !== undefined) pageIdValue = Number(query.pageId);
    else return null;

    if (isNaN(pageIdValue)) return null;

    return pageIdValue;
  };

  verifyPageExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = this.getProjectId(req);
      const pageId = this.getPageId(req);

      if (projectId === null || pageId === null)
        return Res.send(
          res,
          'To verify the page and project coherence you need to send the projectId and pageId, that was not found',
          400
        );

      const page = await this.pageService.get(Number(pageId));

      // If the page exists in the project
      if (page?.projectId === projectId) return next();

      return Res.send(res, 'This page is not inside this project', 404);
    } catch {
      return Res.send(res, 'Error checking for project page coherence', 500);
    }
  };
}
