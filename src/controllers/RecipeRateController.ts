import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/Res';
import { RecipeRateService } from '../services/RecipeRateService';
import { TokenService } from '../services/TokenService';
import { RecipeRate } from '../entities/RecipeRate';

type EntityType = RecipeRate;

@injectable()
export class RecipeRateController {
  constructor(
    @inject(TYPES.RecipeRateService) private service: RecipeRateService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  add = async (req: Request, res: Response) => {
    try {
      req.body.userId = this.tokenService.getUserId(req);
      const data = await this.service.add(req.body);

      return Res.sendByType<EntityType>(res, 'created', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
