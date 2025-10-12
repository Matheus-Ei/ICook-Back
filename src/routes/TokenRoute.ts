import { TokenController } from '../controllers/TokenController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';

@injectable()
export class TokenRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.TokenController) private tokenController: TokenController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.get('/validity', this.tokenController.verify);
  };
}
