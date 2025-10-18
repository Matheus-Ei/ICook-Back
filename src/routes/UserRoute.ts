import { UserController } from '../controllers/UserController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserSchema } from '../schemas/UserSchema';

const Schema = UserSchema;

@injectable()
export class UserRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.UserController) private controller: UserController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post(
      '/auth',
      this.validator.body(Schema.login()),
      this.controller.login
    );

    this.router.delete('/auth', this.controller.logout);

    this.router.post(
      '/',
      this.validator.body(Schema.create()),
      this.controller.signup
    );

    this.router.delete('/', this.controller.delete);

    this.router.get('/', this.controller.getCurrent);

    this.router.get('/:userId', this.controller.get);
  };
}
