import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class SubscriptionPlansModel extends AbstractModel<SubscriptionPlansModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare duration: string;
  declare price: number;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: DataTypes.STRING, unique: true, allowNull: false },

        duration: { type: DataTypes.STRING, allowNull: false },

        price: { type: DataTypes.DECIMAL, allowNull: false },
      },

      {
        sequelize,
        tableName: 'subscription_plans',
        timestamps: false,
        underscored: true,
      }
    );
  };
}
