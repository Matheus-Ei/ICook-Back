import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserSavedRecipeController } from '../controllers/UserSavedRecipeController';

@injectable()
export class UserSavedRecipeRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.UserSavedRecipeController) private controller: UserSavedRecipeController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post('/:recipeId', this.controller.save);

    this.router.delete('/:recipeId', this.controller.unsave);

    this.router.get('/', this.controller.getAllSavedByUser);
  };
}
