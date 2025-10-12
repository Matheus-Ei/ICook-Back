import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';
import { TokenService } from '../services/TokenService';
import { PermissionService } from '../services/PermissionService';
import { SinglePermission } from '../constants/permissions';

@injectable()
export class PermissionMiddleware {
  constructor(
    @inject(TYPES.TokenService) private tokenService: TokenService,
    @inject(TYPES.PermissionService)
    private permissionService: PermissionService
  ) {}

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

  verifyByProject(permission: SinglePermission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = this.tokenService.getUserId(req);
        if (userId === null) return Res.sendByType(res, 'badRequest');

        const projectId = this.getProjectId(req);

        if (projectId === null)
          return Res.send(
            res,
            'To verify the permissions you need to send the projectId, that was not found',
            400
          );

        const hasPermission = await this.permissionService.verifyByProjectRole(
          Number(userId),
          projectId,
          permission
        );

        // If the project is shared with the user and he has the required permission return next
        if (hasPermission) return next();

        return Res.send(
          res,
          "You don't have permission to access this route",
          403
        );
      } catch {
        return Res.send(res, 'Error checking for permissions', 500);
      }
    };
  }

  verifyBySubscription(permission: SinglePermission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = this.tokenService.getUserId(req);

        if (userId === null) return Res.sendByType(res, 'badRequest');

        // Verify if the user has permission
        const subscriptionPermission =
          await this.permissionService.verifyBySubscription(
            Number(userId),
            permission
          );

        if (subscriptionPermission) return next();

        return Res.send(
          res,
          "You don't have subscription permission to access this route",
          403
        );
      } catch {
        return Res.send(res, 'Error checking for permissions', 500);
      }
    };
  }
}
