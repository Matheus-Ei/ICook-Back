import { UserSubscriptionRepository } from '../repositories/UserSubscriptionRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';
import { SubscriptionPlanRepository } from '../repositories/SubscriptionPlanRepository';
import { CompleteUserSubscription } from '../types/userSubscription';
import { Transaction } from 'sequelize';
import { TreatError } from '../utils/error';
import { Database } from '../database';

@injectable()
export class UserSubscriptionService {
  constructor(
    @inject(TYPES.UserSubscriptionRepository)
    private userSubscriptionRespository: UserSubscriptionRepository,
    @inject(TYPES.SubscriptionPlanRepository)
    private subscriptionPlanRepository: SubscriptionPlanRepository,
    @inject(TYPES.Database) private database: Database
  ) {}

  getActive = async (userId: number): AsyncMaybe<CompleteUserSubscription> => {
    return this.userSubscriptionRespository.getActive(userId);
  };

  persistFreePlan = async (
    userId: number,
    transaction?: Transaction
  ): AsyncMaybe<SubscriptionPlan> => {
    return this.changePlan(userId, 'free', transaction);
  };

  private changePlan = async (
    userId: number,
    planTitle: string,
    transaction?: Transaction
  ): Promise<SubscriptionPlan> => {
    // Gets all info of the new plan of the user
    const newPlan = await this.subscriptionPlanRepository.findOne(
      planTitle,
      transaction
    );

    if (!newPlan) throw new Error('New plan not created');

    // Verify if exists one plan active with this userId
    // If there is, update to status disabled
    const currentPlan = await this.userSubscriptionRespository.getActive(
      userId,
      transaction
    );

    if (currentPlan) {
      const wasUpdated = await this.userSubscriptionRespository.changeStatus(
        userId,
        currentPlan.plan_id,
        'disabled',
        transaction
      );

      if (!wasUpdated) throw new Error('The old plan was not updated');
    }

    // Create the new plan with the status active
    await this.userSubscriptionRespository.create(
      userId,
      newPlan.id,
      'active',
      transaction
    );

    return newPlan;
  };

  public updatePlan = async (
    userId: number,
    planTitle: string
  ): Promise<SubscriptionPlan> => {
    const transaction = await this.database.connection.transaction();

    try {
      const newPlan = await this.changePlan(userId, planTitle, transaction);
      transaction.commit();
      return newPlan;
    } catch (error) {
      transaction.rollback();
      throw new Error(TreatError.stringify(error));
    }
  };

  getAllExpired = (): Promise<CompleteUserSubscription[]> => {
    return this.userSubscriptionRespository.findAllExpired();
  };

  renewAllExpired = async () => {
    const expired = await this.getAllExpired();

    for (const e of expired) {
      await this.changePlan(e.user_id, e.plan_title);
    }
  };
}
