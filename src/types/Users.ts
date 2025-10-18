import { User } from "../entities/User";

export interface CompleteUserType extends User {
  followersCount: number;
}
