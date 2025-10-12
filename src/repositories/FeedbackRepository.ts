import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';
import { FeedbacksModel } from '../models/FeedbacksModel';
import { Feedback } from '../entities/Feedback';

@injectable()
export class FeedbackRepository {
  private createObject = (feedback: FeedbacksModel | null): Feedback | null => {
    return feedback
      ? new Feedback(
          feedback.id,
          feedback.userId,
          feedback.rating,
          feedback.description
        )
      : null;
  };

  findAll = (): AsyncMaybe<Feedback[]> => {
    return FeedbacksModel.findAll();
  };

  create = async (data: Omit<Feedback, 'id'>): AsyncMaybe<Feedback> => {
    return this.createObject(await FeedbacksModel.create(data));
  };
}
