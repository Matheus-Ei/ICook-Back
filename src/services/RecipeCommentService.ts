import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RecipeCommentRepository } from '../repositories/RecipeCommentRepository';
import { RecipeComment } from '../entities/RecipeComment';

type EntityType = RecipeComment;

@injectable()
export class RecipeCommentService {
  constructor(
    @inject(TYPES.RecipeCommentRepository) private repository: RecipeCommentRepository,
  ) {}

  add = async (data: Omit<EntityType, 'id'>): Promise<EntityType> => {
    const created = await this.repository.create(data);

    if (!created) {
      throw new Error('The recipe was not created');
    }

    return created;
  };

  getById = async (id: number): Promise<EntityType | null> => {
    return this.repository.findById(id);
  }

  remove = async (id: number): Promise<boolean> => {
    return this.repository.deleteById(id);
  };
}
