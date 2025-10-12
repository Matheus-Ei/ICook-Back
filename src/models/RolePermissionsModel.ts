import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { PermissionsModel } from './PermissionsModel';
import { AbstractModel } from './AbstractModel';
import { RolesModel } from './RolesModel';

export class RolePermissionsModel extends AbstractModel<RolePermissionsModel> {
  declare id: CreationOptional<number>;
  declare roleId: number;
  declare permissionId: number;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        roleId: {
          type: DataTypes.INTEGER,
          field: 'role_id',
          references: {
            key: 'id',
            model: RolesModel,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        permissionId: {
          type: DataTypes.INTEGER,
          field: 'permission_id',
          references: {
            key: 'id',
            model: PermissionsModel,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },

      {
        sequelize,
        indexes: [
          {
            unique: true,
            fields: ['role_id', 'permission_id'],
          },
        ],
        tableName: 'role_permissions',
        timestamps: false,
        underscored: true,
      }
    );
  };
}
