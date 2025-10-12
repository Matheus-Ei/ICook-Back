import { SubscriptionBenefit } from '../entities/SubscriptionBenefit';
import { SubscriptionPermission } from '../entities/SubscriptionPermission';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';

export interface CompleteSubscriptionPlan extends SubscriptionPlan {
  benefits: SubscriptionBenefit[];
  permissions: SubscriptionPermission[];
}
