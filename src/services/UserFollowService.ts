import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserFollowRepository } from '../repositories/UserFollowRepository';
import { UserFollow } from '../entities/UserFollow';

type EntityType = UserFollow;

@injectable()
export class UserFollowService {
  constructor(
    @inject(TYPES.UserFollowRepository) private repository: UserFollowRepository,
  ) {}

  follow = async (followedUserId: number, followerUserId: number): Promise<EntityType> => {
    const alreadyFollowed = await this.repository.isFollowed(followedUserId, followerUserId);
    if (alreadyFollowed) {
      throw new Error('This user is already followed.');
    }

    const created = await this.repository.follow(followedUserId, followerUserId);

    if (!created) {
      throw new Error('Failed to follow the user.');
    }

    return created;
  };

  unfollow = async (followedUserId: number, followerUserId: number): Promise<boolean> => {
    return this.repository.unfollow(followedUserId, followerUserId);
  };
}
