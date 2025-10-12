import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';
import { SubscriptionPlansModel } from '../models/SubscriptionPlansModel';
import { SubscriptionPlan } from '../entities/SubscriptionPlan';
import { CompleteSubscriptionPlan } from '../types/subscriptionPlan';
import { Database } from '../database';
import { TYPES } from '../providers/types';
import { inject } from 'inversify';
import { QueryTypes, Transaction } from 'sequelize';

@injectable()
export class SubscriptionPlanRepository {
  constructor(@inject(TYPES.Database) private database: Database) {}

  findOne = async (
    title: string,
    transaction?: Transaction
  ): AsyncMaybe<CompleteSubscriptionPlan> => {
    const sub = await this.database.connection.query<CompleteSubscriptionPlan>(
      `
        SELECT
            sp.id AS id,
            sp.title AS title,
            sp.duration AS duration,
            sp.price AS price,
            ARRAY_AGG(DISTINCT sb.title) AS benefits,
            ARRAY_AGG(DISTINCT p.title) AS permissions
        FROM subscription_plans sp
        JOIN subscription_benefits sb ON sp.id = sb.subscription_plan_id
        LEFT JOIN subscription_permissions spe ON sp.id = spe.subscription_plan_id
        LEFT JOIN permissions p ON p.id = spe.permission_id
        WHERE sp.title = :title
        GROUP BY sp.id, sp.title, sp.duration, sp.price;
      `,

      {
        replacements: { title },
        type: QueryTypes.SELECT,
        transaction,
      }
    );

    return sub[0];
  };

  findAll = async (): AsyncMaybe<SubscriptionPlan[]> => {
    return await SubscriptionPlansModel.findAll();
  };
}
