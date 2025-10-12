import { UsersModel } from '../models/UsersModel';
import { AsyncMaybe, Editable } from '../types';
import { User } from '../entities/User';
import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

@injectable()
export class UserRepository {
  private createObject = (user: UsersModel | null): User | null => {
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  };

  findById = async (id: number): AsyncMaybe<User> => {
    return this.createObject(await UsersModel.findByPk(id));
  };

  findByEmail = async (email: string): AsyncMaybe<User> => {
    return this.createObject(await UsersModel.findOne({ where: { email } }));
  };

  create = async (
    userData: Omit<User, 'id'>,
    transaction?: Transaction
  ): AsyncMaybe<User> => {
    return this.createObject(
      await UsersModel.create(userData, { transaction })
    );
  };

  deleteById = async (id: number): Promise<boolean> => {
    const deletedId = await UsersModel.destroy({ where: { id } });
    return deletedId ? true : false;
  };

  updateById = async (
    id: number,
    userData: Editable<User>
  ): Promise<boolean> => {
    const [affectedCount] = await UsersModel.update(userData, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) return true;
    return false;
  };
}
