import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { PagesModel } from '../models/PagesModel';
import { Page } from '../entities/Page';
import { QueryTypes, Transaction } from 'sequelize';
import { ModulesModel } from '../models/ModulesModel';
import { Database } from '../database';
import { inject } from 'inversify';
import { TYPES } from '../providers/types';
import { PageWithModule } from '../types/page';
import { Op } from 'sequelize';

@injectable()
export class PageRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  private createObject = (page: PagesModel | null): Page | null => {
    return page
      ? new Page(
          page.id,
          page.title,
          page.description,
          page.emoji,
          page.nextSiblingId,
          page.parentId,
          page.projectId,
          page.moduleId
        )
      : null;
  };

  findById = async (id: number): AsyncMaybe<PageWithModule> => {
    const resource = await this.database.connection.query<PageWithModule>(
      `
        SELECT p.id,
               p.title,
               p.description,
               p.emoji,
               p.parent_id "parentId",
               p.next_sibling_id "nextSiblingId",
               p.project_id "projectId",
               p.module_id "moduleId",
               p.created_at "createdAt",
               p.updated_at "updatedAt",
               m.title "moduleTitle",
               m.description "moduleDescription"
        FROM pages p
        LEFT JOIN modules m ON p.module_id = m.id
        WHERE p.id = :pageId
        `,
      {
        replacements: { pageId: id },
        type: QueryTypes.SELECT,
      }
    );

    return resource[0];
  };

  findByPeriod = async (
    projectId: number,
    type: 'created' | 'updated',
    startDate: Date,
    endDate: Date
  ): AsyncMaybe<Page[]> => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (type === 'created')
      return PagesModel.findAll({
        where: {
          projectId,
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      });

    return PagesModel.findAll({
      where: {
        projectId,
        updatedAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });
  };

  findPrevSibling = async (id: number): AsyncMaybe<Page> => {
    return this.createObject(
      await PagesModel.findOne({ where: { nextSiblingId: id } })
    );
  };

  setModule = async (id: number, moduleTitle: string): Promise<boolean> => {
    const module = await ModulesModel.findOne({
      where: { title: moduleTitle },
    });

    if (!module)
      throw new Error('This module does not exist, or it was not found');

    const [affectedCount] = await PagesModel.update(
      { moduleId: module.id },
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount > 0) return true;
    return false;
  };

  updateNextSibling = async (
    id: number,
    nextSiblingId?: number | null,
    transaction?: Transaction
  ): AsyncMaybe<boolean> => {
    const [affectedCount] = await PagesModel.update(
      { nextSiblingId },
      {
        where: { id },
        returning: true,
        transaction,
      }
    );

    if (affectedCount > 0) return true;
    return false;
  };

  findByProjectId = (projectId: number): AsyncMaybe<Page[]> => {
    return PagesModel.findAll({ where: { projectId, parentId: null } });
  };

  countByProject = (projectId: number): AsyncMaybe<number> => {
    return PagesModel.count({ where: { projectId } });
  };

  findByParentId = (parentId: number): AsyncMaybe<Page[]> => {
    return PagesModel.findAll({ where: { parentId } });
  };

  create = async (pageData: Omit<Page, 'id'>): AsyncMaybe<Page> => {
    return this.createObject(await PagesModel.create(pageData));
  };

  deleteById = async (id: number): Promise<boolean> => {
    const deletedId = await PagesModel.destroy({ where: { id } });
    return deletedId ? true : false;
  };

  updateById = async (
    id: number,
    pageData: Editable<Page>
  ): Promise<boolean> => {
    const [affectedCount] = await PagesModel.update(pageData, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) return true;
    return false;
  };
}
