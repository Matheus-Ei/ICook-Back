import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class UserFollowsModel extends AbstractModel<UserFollowsModel> {
  declare id: CreationOptional<number>;
  declare followerUserId: number;
  declare followedUserId: number;
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

        followerUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          field: 'follower_user_id',
        },

        followedUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          field: 'followed_user_id',
        },

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
        tableName: 'user_follows',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
