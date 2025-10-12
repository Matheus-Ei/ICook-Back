import { RoleRepository } from '../repositories/RoleRepository';
import { RoleWithPermissions } from '../types/role';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';
import { Role } from '../entities/Role';
import { RolePermissionRepository } from '../repositories/RolePermissionRepository';

@injectable()
export class RoleService {
  constructor(
    @inject(TYPES.RoleRepository) private roleRepository: RoleRepository,
    @inject(TYPES.RolePermissionRepository)
    private rolePermissionRepository: RolePermissionRepository
  ) {}

  getWithPermissions = async (
    title: string
  ): AsyncMaybe<RoleWithPermissions> => {
    return this.rolePermissionRepository.getRoleWithPerms(title);
  };

  getAll = async (): AsyncMaybe<Role[]> => {
    return this.roleRepository.findAll();
  };
}
