import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RecipeCommentController } from '../controllers/RecipeCommentController';
import { RecipeCommentSchema } from '../schemas/RecipeCommentSchema';

const Schema = RecipeCommentSchema;

@injectable()
export class RecipeCommentRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.RecipeCommentController) private controller: RecipeCommentController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post(
      '/',
      this.validator.body(Schema.default()),
      this.controller.add
    );

    this.router.delete('/:id', this.controller.remove);
  };
}
