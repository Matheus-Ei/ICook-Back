import { RolePermissionsModel } from '../models/RolePermissionsModel';
import { RolePermission } from '../entities/RolePermission';
import { RoleWithPermissions } from '../types/role';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { QueryTypes } from 'sequelize';
import { Database } from '../database';
import { AsyncMaybe } from '../types';

@injectable()
export class RolePermissionRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  private createObject = (
    rolePerm: RolePermissionsModel | null
  ): RolePermission | null => {
    return rolePerm
      ? new RolePermission(rolePerm.id, rolePerm.roleId, rolePerm.permissionId)
      : null;
  };

  getRoleWithPerms = async (title: string): AsyncMaybe<RoleWithPermissions> => {
    const roleWithPermissions =
      await this.database.connection.query<RoleWithPermissions>(
        `
      SELECT
        MAX(r.id) AS id,
        MAX(r.title) AS title,
        MAX(r.description) AS description,
        ARRAY_AGG(DISTINCT p.title) AS permissions
      FROM role_permissions rp
      JOIN roles r ON r.id = rp.role_id
      JOIN permissions p ON p.id = rp.permission_id
      WHERE r.title = :roleTitle
      GROUP BY r.title;
      `,
        {
          replacements: { roleTitle: title },
          type: QueryTypes.SELECT,
        }
      );

    return roleWithPermissions[0];
  };

  create = async (
    rolePermData: Omit<RolePermission, 'id'>
  ): AsyncMaybe<RolePermission> => {
    return this.createObject(await RolePermissionsModel.create(rolePermData));
  };

  count = async (): Promise<number> => {
    return await RolePermissionsModel.count();
  };
}
