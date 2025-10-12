import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';
import { PageService } from '../services/PageService';
import { Page } from '../entities/Page';
import { PageWithModule } from '../types/page';

@injectable()
export class PageController {
  constructor(@inject(TYPES.PageService) private pageService: PageService) {}

  create = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { title, emoji, description, parentId, moduleId, nextSiblingId } =
      req.body;

    try {
      const page = await this.pageService.create({
        title,
        emoji,
        description: description ?? null,
        parentId: parentId ?? null,
        moduleId: moduleId ?? null,
        nextSiblingId: nextSiblingId ?? null,
        projectId: Number(projectId),
      });

      return Res.sendByType<Page>(res, 'created', undefined, page);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getByPeriod = async (req: Request, res: Response) => {
    const { projectId, type } = req.params;
    const { startDate, endDate } = req.query;

    try {
      const pages = await this.pageService.getByPeriod(
        Number(projectId),
        type as 'created' | 'updated',
        new Date(startDate as string),
        new Date(endDate as string)
      );

      if (!pages) return Res.sendByType(res, 'notFound');

      return Res.sendByType<Page[]>(res, 'found', undefined, pages);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  get = async (req: Request, res: Response) => {
    const { pageId } = req.params;

    try {
      const page = await this.pageService.get(Number(pageId));

      if (!page) return Res.sendByType(res, 'notFound');

      return Res.sendByType<PageWithModule>(res, 'found', undefined, page);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getChildrens = async (req: Request, res: Response) => {
    const { pageId } = req.params;

    try {
      const page = await this.pageService.getChildrens(Number(pageId));

      return Res.sendByType<Page[] | null>(res, 'found', undefined, page);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const pages = await this.pageService.getByProjectId(Number(projectId));

      return Res.sendByType<Page[] | null>(res, 'found', undefined, pages);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  delete = async (req: Request, res: Response) => {
    const { pageId } = req.params;

    try {
      const wasDeleted = await this.pageService.delete(Number(pageId));

      if (!wasDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  // TODO Fix this code to change order, this isn't right yet.
  // This takes the current page and some page that you want to place the current page in the same position
  // And changes the order to place the newPositionPage as the nextSibling of the current page
  changeOrder = async (req: Request, res: Response) => {
    const { pageId } = req.params;
    const { newNextPageId } = req.body;

    // if the id is equal to the newNextPageId
    if (pageId === newNextPageId) return Res.sendByType(res, 'badRequest');

    try {
      const wasUpdated = await this.pageService.changeOrder(
        Number(pageId),
        newNextPageId
      );

      if (!wasUpdated) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'updated');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  setModule = async (req: Request, res: Response) => {
    const { pageId } = req.params;
    const { moduleTitle } = req.body;

    try {
      await this.pageService.setModule(Number(pageId), moduleTitle);

      return Res.sendByType(res, 'updated');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  update = async (req: Request, res: Response) => {
    const { pageId } = req.params;
    const {
      title,
      emoji,
      description,
      parentId,
      moduleId,
      nextSiblingId,
      projectId,
    } = req.body;

    try {
      const wasUpdated = await this.pageService.update(Number(pageId), {
        title,
        description,
        emoji,
        parentId,
        moduleId,
        nextSiblingId,
        projectId,
      });

      const page = await this.pageService.get(Number(pageId));

      if (!wasUpdated || !page) return Res.sendByType(res, 'notFound');

      return Res.sendByType<Page>(res, 'updated', undefined, page);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
