import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { UsersModel } from './UsersModel';

export class FeedbacksModel extends AbstractModel<FeedbacksModel> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare description: string;
  declare rating: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'user_id',
          references: {
            model: UsersModel,
            key: 'id',
          },
        },

        description: { type: DataTypes.TEXT, allowNull: false },

        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },

      {
        sequelize,
        tableName: 'feedbacks',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
