import { RecipeService } from '../services/RecipeService';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Recipe } from '../entities/Recipe';
import { Res } from '../utils/Res';
import { TokenService } from '../services/TokenService';

type EntityType = Recipe;

@injectable()
export class RecipeController {
  constructor(
    @inject(TYPES.RecipeService) private service: RecipeService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  get = async (req: Request, res: Response) => {
    try {
      const currentUserId = Number(this.tokenService.getUserId(req));
      const data = await this.service.get(Number(req.params.id), currentUserId);

      if (!data) return Res.sendByType(res, 'notFound');

      return Res.sendByType<EntityType>(res, 'found', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const data = await this.service.getAll();

      if (!data) return Res.sendByType(res, 'notFound');

      return Res.sendByType<EntityType[]>(res, 'found', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      req.body.ownerUserId = Number(this.tokenService.getUserId(req));
      req.body.images = req.files;

      const data = await this.service.create(req.body);

      return Res.sendByType<EntityType>(res, 'created', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const currentUserId = Number(this.tokenService.getUserId(req));
      const recipe = await this.service.get(Number(req.params.id), currentUserId);
      if (!recipe) return Res.sendByType(res, 'notFound');

      // Verify permissions
      if (recipe.ownerUserId !== currentUserId) {
        return Res.sendByType(res, 'forbidden');
      }

      const isDeleted = await this.service.delete(Number(req.params.id));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
