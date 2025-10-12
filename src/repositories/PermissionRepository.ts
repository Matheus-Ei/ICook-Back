import { PermissionsModel } from '../models/PermissionsModel';
import { Permission } from '../entities/Permission';
import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';
import { QueryTypes } from 'sequelize';
import { inject } from 'inversify';
import { TYPES } from '../providers/types';
import { Database } from '../database';

@injectable()
export class PermissionRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  private createObject = (
    permission: PermissionsModel | null
  ): Permission | null => {
    return permission ? new Permission(permission.id, permission.title) : null;
  };

  findById = async (id: number): AsyncMaybe<Permission> => {
    return this.createObject(await PermissionsModel.findByPk(id));
  };

  findByTitle = async (title: string): AsyncMaybe<Permission> => {
    return this.createObject(
      await PermissionsModel.findOne({ where: { title } })
    );
  };

  findSharedPermission = async (
    userId: number,
    projectId: number,
    permission: string
  ): AsyncMaybe<string> => {
    // Verify if the user has shared permission
    const [rolePermission] = await this.database.connection.query<{
      title: string;
    }>(
      `
          SELECT p.title
          FROM role_permissions rp
		      JOIN shared_projects sp ON rp.role_id = sp.role_id
		      JOIN permissions p ON rp.permission_id = p.id
          WHERE sp.user_id = :userId AND p.title = :permission AND sp.project_id = :projectId;
        `,
      {
        replacements: { userId, permission, projectId },
        type: QueryTypes.SELECT,
      }
    );

    return rolePermission ? rolePermission.title : null;
  };

  findBySubscription = async (
    userId: number,
    permission: string
  ): AsyncMaybe<string> => {
    // Verify if the user has shared permission
    const [subscriptionPermission] = await this.database.connection.query<{
      title: string;
    }>(
      `
            SELECT p.title
            FROM subscription_permissions spe
            JOIN subscription_plans spl ON spe.subscription_plan_id = spl.id
            JOIN permissions p ON spe.permission_id = p.id
            JOIN user_subscriptions us ON spl.id = us.subscription_plan_id
            WHERE us.user_id = :userId AND p.title = :permission AND us.status = 'active';
         `,
      {
        replacements: { userId, permission },
        type: QueryTypes.SELECT,
      }
    );

    return subscriptionPermission ? subscriptionPermission.title : null;
  };
}
