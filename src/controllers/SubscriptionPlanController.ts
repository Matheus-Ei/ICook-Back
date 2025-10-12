import { SubscriptionPlanService } from '../services/SubscriptionPlanService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Request, Response } from 'express';
import { Res } from '../utils/response';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';
import { CompleteSubscriptionPlan } from '../types/subscriptionPlan';

@injectable()
export class SubscriptionPlanController {
  constructor(
    @inject(TYPES.SubscriptionPlanService)
    private subscriptionPlanService: SubscriptionPlanService
  ) {}

  getAll = async (req: Request, res: Response) => {
    const { title } = req.query as { title?: string };

    try {
      const subscriptionPlans = await this.subscriptionPlanService.find(title);

      return Res.sendByType<
        CompleteSubscriptionPlan | SubscriptionPlan[] | null
      >(res, 'found', undefined, subscriptionPlans);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
