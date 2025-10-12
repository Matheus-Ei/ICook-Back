import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export abstract class AbstractModel<
  T extends Model<InferAttributes<T>, InferCreationAttributes<T>>,
> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {
  // eslint-disable-next-line
  static setup = (sequelize: Sequelize): void => {
    throw new Error('initModel must be implemented in derived classes');
  };
}
