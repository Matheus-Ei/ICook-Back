import { Role } from '../entities/Role';

export interface RoleWithPermissions extends Role {
  permissions: string[];
}
