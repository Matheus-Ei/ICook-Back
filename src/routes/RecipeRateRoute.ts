import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RecipeRateController } from '../controllers/RecipeRateController';
import { RecipeRateSchema } from '../schemas/RecipeRateSchema';

const Schema = RecipeRateSchema;

@injectable()
export class RecipeRateRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.RecipeRateController) private controller: RecipeRateController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.post('/', this.validator.body(Schema.default()), this.controller.add);
  };
}
