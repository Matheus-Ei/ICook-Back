import { RecipeController } from '../controllers/RecipeController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RecipeSchema } from '../schemas/RecipeSchema';

const Schema = RecipeSchema;

@injectable()
export class RecipeRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.RecipeController) private controller: RecipeController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post(
      '/',
      this.validator.body(Schema.default()),
      this.controller.create
    );

    this.router.patch(
      '/:id',
      this.validator.body(Schema.default()),
      this.controller.update
    );

    this.router.delete('/:id', this.controller.delete);

    this.router.get('/:id', this.controller.get);

    this.router.get('/', this.controller.getAll);
  };
}
