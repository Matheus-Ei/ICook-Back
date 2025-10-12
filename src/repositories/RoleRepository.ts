import { RolesModel } from '../models/RolesModel';
import { Role } from '../entities/Role';
import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';

@injectable()
export class RoleRepository {
  private createObject = (role: RolesModel | null): Role | null => {
    return role ? new Role(role.id, role.title, role.description) : null;
  };

  findById = async (id: number): AsyncMaybe<Role> => {
    return this.createObject(await RolesModel.findByPk(id));
  };

  findAll = async (): AsyncMaybe<Role[]> => {
    const roles = await RolesModel.findAll();
    return roles.length ? roles : null;
  };

  findByTitle = async (title: string): AsyncMaybe<Role> => {
    return this.createObject(await RolesModel.findOne({ where: { title } }));
  };
}
