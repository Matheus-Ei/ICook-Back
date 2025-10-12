import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { FeedbackController } from '../controllers/FeedbackController';
import { FeedbackSchema } from '../schemas/FeedbackSchema';

@injectable()
export class FeedbackRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.FeedbackController)
    private feedbackController: FeedbackController
  ) {
    super();
    this.init();
  }

  protected init = () => {
    this.router.get('/', this.feedbackController.getAll);

    this.router.post(
      '/',
      this.validator.body(FeedbackSchema.create()),
      this.feedbackController.create
    );
  };
}
