import { ProjectMember, UserSharedProject } from '../types/sharedProject';
import { SharedProjectsModel } from '../models/SharedProjectsModel';
import { SharedProject } from '../entities/SharedProject';
import { RolesModel } from '../models/RolesModel';
import { TYPES } from '../providers/types';
import { injectable } from 'inversify';
import { Database } from '../database';
import { QueryTypes } from 'sequelize';
import { AsyncMaybe } from '../types';
import { inject } from 'inversify';
import { UsersModel } from '../models/UsersModel';
import { Op } from 'sequelize';

@injectable()
export class SharedProjectRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  private createObject = (
    share: SharedProjectsModel | null
  ): SharedProject | null => {
    return share
      ? new SharedProject(share.id, share.roleId, share.userId, share.projectId)
      : null;
  };

  findAllSharedProjects = async (
    userId: number
  ): AsyncMaybe<UserSharedProject[]> => {
    const projects = await this.database.connection.query<UserSharedProject>(
      `
      SELECT
	      p.id AS id,
	      p.title AS title,
	      p.description AS description,
	      p.owner_user_id AS owner_user_id,
	      sp.user_id AS shared_user_id,
	      r.title AS role
      FROM shared_projects sp
      JOIN projects p ON p.id = sp.project_id
      JOIN roles r ON r.id = sp.role_id
      WHERE user_id = :userId;
      `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    return projects;
  };

  findByPeriod = async (
    projectId: number,
    type: 'created' | 'updated',
    startDate: Date,
    endDate: Date
  ): AsyncMaybe<SharedProject[]> => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (type === 'created')
      return SharedProjectsModel.findAll({
        where: {
          projectId,
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      });

    return SharedProjectsModel.findAll({
      where: {
        projectId,
        updatedAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });
  };

  findAllMembers = async (projectId: number): AsyncMaybe<ProjectMember[]> => {
    const users = await this.database.connection.query<ProjectMember>(
      `
      SELECT
	      u.id AS id,
	      u.name AS name,
	      u.email AS email,
	      r.title AS role
      FROM shared_projects sp
      JOIN users u ON u.id = sp.user_id
      JOIN roles r ON r.id = sp.role_id
      WHERE sp.project_id = :projectId;
      `,
      {
        replacements: { projectId },
        type: QueryTypes.SELECT,
      }
    );

    return users;
  };

  findOneMember = async (
    projectId: number,
    userEmail: string
  ): AsyncMaybe<ProjectMember> => {
    const users = await this.database.connection.query<ProjectMember>(
      `
      SELECT
	      u.id AS id,
	      u.name AS name,
	      u.email AS email,
	      r.title AS role,
		  ARRAY_AGG(DISTINCT p.title ORDER BY p.title) AS permissions
      FROM shared_projects sp
      JOIN users u ON u.id = sp.user_id
      JOIN roles r ON r.id = sp.role_id
	    JOIN role_permissions rp ON r.id = rp.role_id
	    JOIN permissions p ON p.id = rp.permission_id
      WHERE sp.project_id = :projectId AND u.email = :userEmail
	    GROUP BY u.id, u.name, u.email, r.title;
      `,
      {
        replacements: { projectId, userEmail },
        type: QueryTypes.SELECT,
      }
    );

    return users[0] ?? null;
  };

  create = async (
    sharedProjectData: Omit<SharedProject, 'id'>
  ): AsyncMaybe<SharedProject> => {
    return this.createObject(
      await SharedProjectsModel.create(sharedProjectData)
    );
  };

  removeRelation = async (
    userEmail: string,
    projectId: number
  ): Promise<boolean> => {
    const user = await UsersModel.findOne({ where: { email: userEmail } });
    if (!user) return false;

    const deletedId = await SharedProjectsModel.destroy({
      where: { userId: user.id, projectId },
    });

    return deletedId ? true : false;
  };

  unshareAll = async (projectId: number): Promise<boolean> => {
    const deletedId = await SharedProjectsModel.destroy({
      where: { projectId },
    });
    return deletedId ? true : false;
  };

  countShares = async (projectId: number): Promise<number> => {
    const numberShares = await SharedProjectsModel.count({
      where: { projectId },
    });

    return numberShares;
  };

  updateRole = async (
    projectId: number,
    userEmail: string,
    roleTitle: string
  ): Promise<boolean> => {
    const role = await RolesModel.findOne({ where: { title: roleTitle } });
    const user = await UsersModel.findOne({ where: { email: userEmail } });

    if (!role || !user) return false;

    const [affectedCount] = await SharedProjectsModel.update(
      { roleId: role.id },
      {
        where: { projectId, userId: user.id },
        returning: true,
      }
    );

    if (affectedCount > 0) return true;
    return false;
  };
}
