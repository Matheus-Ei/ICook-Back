import { inject } from 'inversify';
import { User } from '../entities/User';
import { UsersModel } from '../models/UsersModel';
import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { QueryTypes, Sequelize, Transaction } from 'sequelize';
import { TYPES } from '../providers/types';
import { Database } from '../database';
import { CompleteUserType } from '../types/Users';

type EntityType = User;
type ModelType = UsersModel;

const Entity = User;
const Model = UsersModel;

@injectable()
export class UserRepository {
  private database: Sequelize;

  constructor(
    @inject(TYPES.Database) database: Database
  ) {
    this.database = database.getDatabase();
  }

  private createObject = (data: ModelType | null): EntityType | null => {
    return data
      ? new Entity(data.id, data.name, data.email, data.password)
      : null;
  };

  findById = async (id: number): AsyncMaybe<CompleteUserType> => {
    const response = await this.database.query<CompleteUserType>(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        COUNT(uf.id) as "followersCount"
      FROM users u
      LEFT JOIN user_follows uf ON u.id = uf.followed_user_id
      WHERE u.id = :id
      GROUP BY u.id
    `,
      { type: QueryTypes.SELECT, replacements: { id } }
    )

    return response[0] || null;
  };

  findByEmail = async (email: string): AsyncMaybe<EntityType> => {
    return this.createObject(await Model.findOne({ where: { email } }));
  };

  create = async (
    data: Omit<EntityType, 'id'>,
    transaction?: Transaction
  ): AsyncMaybe<EntityType> => {
    return this.createObject(await Model.create(data, { transaction }));
  };

  deleteById = async (id: number): Promise<boolean> => {
    const deletedId = await Model.destroy({ where: { id } });
    return deletedId ? true : false;
  };

  updateById = async (
    id: number,
    data: Editable<EntityType>
  ): Promise<boolean> => {
    const [affectedCount] = await Model.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) return true;
    return false;
  };
}
