import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';
import { UserSubscriptionsModel } from '../models/UserSubscriptionsModel';
import { UserSubscription } from '../entities/UserSubscription';
import { Database } from '../database';
import { TYPES } from '../providers/types';
import { inject } from 'inversify';
import { CompleteUserSubscription } from '../types/userSubscription';
import { QueryTypes, Transaction } from 'sequelize';

@injectable()
export class UserSubscriptionRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  create = async (
    userId: number,
    subscriptionPlanId: number,
    status: string = 'active',
    transaction?: Transaction
  ): AsyncMaybe<UserSubscription> => {
    return UserSubscriptionsModel.create(
      {
        userId,
        status,
        subscriptionPlanId,
      },
      { transaction }
    );
  };

  changeStatus = async (
    userId: number,
    subscriptionPlanId: number,
    status: string,
    transaction?: Transaction
  ): AsyncMaybe<boolean> => {
    const [affectedRows] = await UserSubscriptionsModel.update(
      { status },
      { where: { userId, subscriptionPlanId }, transaction }
    );

    if (affectedRows === 0) return false;
    return true;
  };

  getActive = async (
    userId: number,
    transaction?: Transaction
  ): AsyncMaybe<CompleteUserSubscription> => {
    const active =
      await this.database.connection.query<CompleteUserSubscription>(
        `
        SELECT
            us.id AS id,
            us.user_id AS user_id,
            us.status AS status,
            us.created_at AS created_at,
            sp.title AS plan_title,
            sp.duration AS plan_duration,
            sp.id AS plan_id,
            sp.price AS plan_price
        FROM user_subscriptions us
        JOIN subscription_plans sp ON sp.id = us.subscription_plan_id
        WHERE us.user_id = :userId AND us.status = 'active';
      `,

        {
          replacements: { userId },
          type: QueryTypes.SELECT,
          transaction,
        }
      );

    return active[0];
  };

  findAllExpired = async (): Promise<CompleteUserSubscription[]> => {
    const expired =
      await this.database.connection.query<CompleteUserSubscription>(
        `
        SELECT
            us.id AS id,
            us.user_id AS user_id,
            us.status AS status,
            us.created_at AS created_at,
            us.created_at + sp.duration AS end_date,
            sp.title AS plan_title,
            sp.duration AS plan_duration,
            sp.id AS plan_id,
            sp.price AS plan_price
        FROM user_subscriptions us
        JOIN subscription_plans sp ON sp.id = us.subscription_plan_id
        WHERE us.created_at + sp.duration < now() AND us.status = 'active';
      `,

        {
          type: QueryTypes.SELECT,
        }
      );

    return expired;
  };
}
