import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Request, Response } from 'express';
import { Res } from '../utils/response';
import { PermissionService } from '../services/PermissionService';
import { TokenService } from '../services/TokenService';
import { SinglePermission } from '../constants/permissions';

@injectable()
export class PermissionController {
  constructor(
    @inject(TYPES.PermissionService)
    private permissionService: PermissionService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  verifyByProjectRole = async (req: Request, res: Response) => {
    const userId = this.tokenService.getUserId(req);
    if (userId === null) return Res.sendByType(res, 'badRequest');

    try {
      const { projectId, permission } = req.params;
      if (!permission || !projectId) return Res.sendByType(res, 'badRequest');

      const hasPermission = await this.permissionService.verifyByProjectRole(
        Number(userId),
        Number(projectId),
        permission as SinglePermission
      );

      return Res.sendByType<boolean>(res, 'found', undefined, hasPermission);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  verifyBySubscription = async (req: Request, res: Response) => {
    const userId = this.tokenService.getUserId(req);
    if (userId === null) return Res.sendByType(res, 'badRequest');

    try {
      const { permission } = req.params;
      if (!permission) return Res.sendByType(res, 'badRequest');

      const hasPermission = await this.permissionService.verifyBySubscription(
        Number(userId),
        permission as SinglePermission
      );

      return Res.sendByType<boolean>(res, 'found', undefined, hasPermission);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
