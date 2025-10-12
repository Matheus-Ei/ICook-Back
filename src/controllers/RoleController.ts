import { RoleService } from '../services/RoleService';
import { RoleWithPermissions } from '../types/role';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Request, Response } from 'express';
import { Res } from '../utils/response';
import { Role } from '../entities/Role';

@injectable()
export class RoleController {
  constructor(@inject(TYPES.RoleService) private roleService: RoleService) {}

  get = async (req: Request, res: Response) => {
    const { title } = req.params;

    try {
      const role = await this.roleService.getWithPermissions(title);

      if (!role) return Res.sendByType(res, 'notFound');

      return Res.sendByType<RoleWithPermissions>(res, 'found', undefined, role);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const roles = await this.roleService.getAll();
      return Res.sendByType<Role[] | null>(res, 'found', undefined, roles);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
