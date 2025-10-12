import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';
import { FeedbackService } from '../services/FeedbackService';
import { Feedback } from '../entities/Feedback';
import { TokenService } from '../services/TokenService';

@injectable()
export class FeedbackController {
  constructor(
    @inject(TYPES.FeedbackService) private feedbackService: FeedbackService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  getAll = async (_: Request, res: Response) => {
    try {
      const feedbacks = await this.feedbackService.getAll();

      return Res.sendByType<Feedback[] | null>(
        res,
        'found',
        undefined,
        feedbacks
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const userId = this.tokenService.getUserId(req);

      if (userId === null) return Res.sendByType(res, 'badRequest');

      const newFeedback = await this.feedbackService.create({
        userId,
        ...data,
      });

      return Res.sendByType<Feedback>(res, 'created', undefined, newFeedback);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
