import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserSubscriptionController } from '../controllers/UserSubscriptionController';
import { SubscriptionPlanController } from '../controllers/SubscriptionPlanController';
import { SubscriptionSchema } from '../schemas/SubscriptionSchema';
import { PermissionController } from '../controllers/PermissionController';

@injectable()
export class SubscriptionRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.UserSubscriptionController)
    private userSubscriptionController: UserSubscriptionController,
    @inject(TYPES.SubscriptionPlanController)
    private subscriptionPlanController: SubscriptionPlanController,
    @inject(TYPES.PermissionController)
    private permissionController: PermissionController
  ) {
    super();
    this.init();
  }

  userSubscription = () => {
    this.router.get('/active', this.userSubscriptionController.getActive);

    this.router.get(
      '/active/permissions/:permission',
      this.permissionController.verifyBySubscription
    );

    this.router.patch(
      '/',
      this.validator.body(SubscriptionSchema.changePlan()),
      this.userSubscriptionController.changePlan
    );
  };

  subscriptionPlan = () => {
    this.router.get(
      '/plans',
      this.validator.query(SubscriptionSchema.getQuery()),
      this.subscriptionPlanController.getAll
    );
  };

  protected init = () => {
    this.userSubscription();
    this.subscriptionPlan();
  };
}
