import { PageRepository } from '../repositories/PageRepository';
import { AsyncMaybe, Editable } from '../types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Page } from '../entities/Page';
import { PagesModel } from '../models/PagesModel';
import { Transaction } from 'sequelize';
import { PageWithModule } from '../types/page';

@injectable()
export class PageService {
  constructor(
    @inject(TYPES.PageRepository) private pageRepository: PageRepository
  ) {}

  create = async (pageData: Omit<Page, 'id'>): Promise<Page> => {
    const newPage = await this.pageRepository.create(pageData);

    if (!newPage) throw new Error('The page was not created');

    return newPage;
  };

  get = async (id: number): AsyncMaybe<PageWithModule> => {
    return this.pageRepository.findById(id);
  };

  getByPeriod = async (
    projectId: number,
    type: 'updated' | 'created',
    startDate: Date,
    endDate: Date
  ): AsyncMaybe<Page[]> => {
    return this.pageRepository.findByPeriod(
      projectId,
      type,
      startDate,
      endDate
    );
  };

  getChildrens = async (parentId: number): AsyncMaybe<Page[]> => {
    return this.pageRepository.findByParentId(parentId);
  };

  getPrevSibling = async (id: number): AsyncMaybe<Page> => {
    return this.pageRepository.findPrevSibling(id);
  };

  updateNextSibling = async (
    id?: number,
    nextSiblingId?: number | null,
    transaction?: Transaction
  ): AsyncMaybe<boolean> => {
    if (!id) return false;
    return this.pageRepository.updateNextSibling(
      id,
      nextSiblingId,
      transaction
    );
  };

  changeOrder = async (id: number, newNextPageId: number): Promise<boolean> => {
    return await PagesModel.sequelize!.transaction(async (transaction) => {
      const prevSibling = await this.getPrevSibling(id);
      const page = await this.get(id);
      const newNextPage = await this.get(newNextPageId);

      // Changes the order only if the parent ids are equal
      // and are in the same project
      if (
        page?.parentId !== newNextPage?.parentId &&
        page?.projectId !== newNextPage?.projectId
      )
        return false;

      // Verify if the pages were found
      if (!page || !newNextPage) return false;
      let prevWasUpdated: boolean | null = true;

      // Removes from the original position
      if (prevSibling) {
        prevWasUpdated = await this.updateNextSibling(
          prevSibling.id,
          page.nextSiblingId,
          transaction
        );
      }

      // Inserts after the new position page
      const currentWasUpdated = await this.updateNextSibling(
        id,
        newNextPage.nextSiblingId,
        transaction
      );
      const nextWasUpdated = await this.updateNextSibling(
        newNextPageId,
        id,
        transaction
      );

      if (prevWasUpdated && currentWasUpdated && nextWasUpdated) return true;

      return false;
    });
  };

  getByProjectId = async (projectId: number): AsyncMaybe<Page[]> => {
    return this.pageRepository.findByProjectId(projectId);
  };

  delete = async (id: number): Promise<boolean> => {
    return this.pageRepository.deleteById(id);
  };

  update = async (id: number, pageData: Editable<Page>): Promise<boolean> => {
    return this.pageRepository.updateById(id, pageData);
  };

  setModule = async (id: number, moduleTitle: string): Promise<boolean> => {
    return this.pageRepository.setModule(id, moduleTitle);
  };
}
