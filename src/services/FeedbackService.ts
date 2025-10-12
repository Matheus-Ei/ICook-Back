import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';
import { FeedbackRepository } from '../repositories/FeedbackRepository';
import { Feedback } from '../entities/Feedback';

@injectable()
export class FeedbackService {
  constructor(
    @inject(TYPES.FeedbackRepository)
    private feedbackRespository: FeedbackRepository
  ) {}

  getAll = async (): AsyncMaybe<Feedback[]> => {
    return this.feedbackRespository.findAll();
  };

  create = async (data: Omit<Feedback, 'id'>): Promise<Feedback> => {
    const response = await this.feedbackRespository.create(data);

    if (!response)
      throw new Error(
        'The feedback was not created, some error ocurred in the repository'
      );

    return response;
  };
}
