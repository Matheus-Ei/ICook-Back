import { RoleController } from '../controllers/RoleController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RoleSchema } from '../schemas/RoleSchema';

@injectable()
export class RoleRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.RoleController) private roleController: RoleController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.get('/', this.roleController.getAll);

    this.router.get(
      '/:title',
      this.validator.params(RoleSchema.titleParam()),
      this.roleController.get
    );
  };
}
