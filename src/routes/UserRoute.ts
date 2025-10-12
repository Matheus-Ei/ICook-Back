import { UserController } from '../controllers/UserController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserSchema } from '../schemas/UserSchema';

@injectable()
export class UserRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.UserController) private userController: UserController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post(
      '/auth',
      this.validator.body(UserSchema.login()),
      this.userController.login
    );

    this.router.delete('/auth', this.userController.logout);

    this.router.post(
      '/',
      this.validator.body(UserSchema.create()),
      this.userController.signup
    );

    this.router.patch(
      '/',
      this.validator.body(UserSchema.update()),
      this.userController.update
    );

    this.router.delete('/', this.userController.delete);

    this.router.get('/', this.userController.get);
  };
}
