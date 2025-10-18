import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/Res';
import { TokenService } from '../services/TokenService';
import { UserSavedRecipe } from '../entities/UserSavedRecipe';
import { UserSavedRecipeService } from '../services/UserSavedRecipeService';

type EntityType = UserSavedRecipe;

@injectable()
export class UserSavedRecipeController {
  constructor(
    @inject(TYPES.UserSavedRecipeService) private service: UserSavedRecipeService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  getAllSavedByUser = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);
      const data = await this.service.getAllSavedByUser(Number(userId));

      return Res.sendByType<EntityType[]>(res, 'found', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  save = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);
      const recipeId = Number(req.params.recipeId);

      const data = await this.service.save(recipeId, Number(userId));

      return Res.sendByType<EntityType>(res, 'created', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  unsave = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);
      const recipeId = Number(req.params.recipeId);

      const isDeleted = await this.service.unsave(recipeId, Number(userId));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
