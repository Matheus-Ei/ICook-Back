import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/Res';
import { TokenService } from '../services/TokenService';
import { UserFollowService } from '../services/UserFollowService';
import { UserFollow } from '../entities/UserFollow';

type EntityType = UserFollow;

@injectable()
export class UserFollowController {
  constructor(
    @inject(TYPES.UserFollowService) private service: UserFollowService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  follow = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);
      const followedUserId = Number(req.params.followedUserId);

      const data = await this.service.follow(followedUserId, Number(userId));

      return Res.sendByType<EntityType>(res, 'created', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  unfollow = async (req: Request, res: Response) => {
    try {
      const userId = this.tokenService.getUserId(req);
      const followedUserId = Number(req.params.followedUserId);

      const isDeleted = await this.service.unfollow(followedUserId, Number(userId));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
