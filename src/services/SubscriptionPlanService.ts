import { SubscriptionPlanRepository } from '../repositories/SubscriptionPlanRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';
import { CompleteSubscriptionPlan } from '../types/subscriptionPlan';

@injectable()
export class SubscriptionPlanService {
  constructor(
    @inject(TYPES.SubscriptionPlanRepository)
    private subscriptionPlanRespository: SubscriptionPlanRepository
  ) {}

  find = async (
    title?: string
  ): AsyncMaybe<CompleteSubscriptionPlan | SubscriptionPlan[]> => {
    if (title) {
      return this.subscriptionPlanRespository.findOne(title);
    }

    return this.subscriptionPlanRespository.findAll();
  };
}
