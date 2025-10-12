import { ProjectsModel } from '../models/ProjectsModel';
import { AsyncMaybe, Editable } from '../types';
import { Project } from '../entities/Project';
import { injectable } from 'inversify';
import { QueryTypes } from 'sequelize';
import { inject } from 'inversify';
import { TYPES } from '../providers/types';
import { Database } from '../database';

@injectable()
export class ProjectRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  private createObject = (project: ProjectsModel | null): Project | null => {
    return project
      ? new Project(
          project.id,
          project.title,
          project.description,
          project.ownerUserId
        )
      : null;
  };

  findById = async (id: number): AsyncMaybe<Project> => {
    return this.createObject(await ProjectsModel.findByPk(id));
  };

  getEachModuleCount = async (
    id: number
  ): AsyncMaybe<{ module: string; number: number }[]> => {
    const moduleCount = await this.database.connection.query<{
      module: string;
      number: number;
    }>(
      `
        SELECT
            m.title AS module,
            COUNT(pa.id) AS number
        FROM projects p
            LEFT JOIN pages pa ON pa.project_id = p.id
            LEFT JOIN modules m ON pa.module_id = m.id
        WHERE p.id = :projectId
        GROUP BY m.title
        ORDER BY COUNT(pa.id)
        `,
      {
        replacements: { projectId: id },
        type: QueryTypes.SELECT,
      }
    );

    return moduleCount;
  };

  findByUserId = async (userId: number): AsyncMaybe<Project[]> => {
    const projects = await ProjectsModel.findAll({
      where: { ownerUserId: userId },
    });

    return projects.length ? projects : null;
  };

  countByUserId = async (userId: number): Promise<number> => {
    const numberProjects = await ProjectsModel.count({
      where: { ownerUserId: userId },
    });

    return numberProjects;
  };

  create = async (projectData: Omit<Project, 'id'>): AsyncMaybe<Project> => {
    return this.createObject(await ProjectsModel.create(projectData));
  };

  deleteById = async (id: number): Promise<boolean> => {
    const deletedId = await ProjectsModel.destroy({ where: { id } });
    return deletedId ? true : false;
  };

  updateById = async (
    id: number,
    projectData: Editable<Project>
  ): Promise<boolean> => {
    const [affectedCount] = await ProjectsModel.update(projectData, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) return true;
    return false;
  };
}
