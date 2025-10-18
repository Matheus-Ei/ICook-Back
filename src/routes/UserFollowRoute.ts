import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserFollowController } from '../controllers/UserFollowController';

@injectable()
export class UserFollowRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.UserFollowController) private controller: UserFollowController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post('/:followedUserId', this.controller.follow);

    this.router.delete('/:followedUserId', this.controller.unfollow);
  };
}
