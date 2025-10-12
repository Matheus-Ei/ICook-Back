import { Project } from '../entities/Project';
import { User } from '../entities/User';

export interface UserSharedProject extends Omit<Project, 'ownerUserId'> {
  owner_user_id: number;
  shared_user_id: number;
  role: string;
}

export interface ProjectMember extends Omit<User, 'password'> {
  role: string;
}
