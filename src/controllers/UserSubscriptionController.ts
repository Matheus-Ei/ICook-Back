import { UserSubscriptionService } from '../services/UserSubscriptionService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Request, Response } from 'express';
import { Res } from '../utils/response';
import { TokenService } from '../services/TokenService';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';
import { CompleteUserSubscription } from '../types/userSubscription';

@injectable()
export class UserSubscriptionController {
  constructor(
    @inject(TYPES.UserSubscriptionService)
    private userSubscriptionService: UserSubscriptionService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  getActive = async (req: Request, res: Response) => {
    const userId = this.tokenService.getUserId(req);

    if (userId === null) return Res.sendByType(res, 'badRequest');

    try {
      const activePlan = await this.userSubscriptionService.getActive(
        Number(userId)
      );

      if (!activePlan) return Res.sendByType(res, 'notFound');

      return Res.sendByType<CompleteUserSubscription>(
        res,
        'found',
        undefined,
        activePlan
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  changePlan = async (req: Request, res: Response) => {
    const userId = this.tokenService.getUserId(req);
    const { planTitle } = req.body;

    if (userId === null) return Res.sendByType(res, 'badRequest');

    try {
      const newPlan = await this.userSubscriptionService.updatePlan(
        Number(userId),
        planTitle
      );

      return Res.sendByType<SubscriptionPlan>(
        res,
        'updated',
        undefined,
        newPlan
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
