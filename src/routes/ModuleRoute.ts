import { ModuleController } from '../controllers/ModuleController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';

@injectable()
export class ModuleRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.ModuleController) private moduleController: ModuleController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.get('/', this.moduleController.getAll);
  };
}
