import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/Res';
import { RecipeComment } from '../entities/RecipeComment';
import { RecipeCommentService } from '../services/RecipeCommentService';
import { TokenService } from '../services/TokenService';

type EntityType = RecipeComment;

@injectable()
export class RecipeCommentController {
  constructor(
    @inject(TYPES.RecipeCommentService) private service: RecipeCommentService,
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

  remove = async (req: Request, res: Response) => {
    try {
      const currentUserId = this.tokenService.getUserId(req);

      // Verify the permission to delete
      const comment = await this.service.getById(Number(req.params.id));
      if (!comment) return Res.sendByType(res, 'notFound');
      if (Number(comment.userId) !== Number(currentUserId)) {
        return Res.sendByType(res, 'forbidden');
      }

      // Delete the comment
      const isDeleted = await this.service.remove(Number(req.params.id));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
