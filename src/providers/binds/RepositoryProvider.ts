import { binder } from '../../helpers/binder';
import { RecipeCommentRepository } from '../../repositories/RecipeCommentRepository';
import { RecipeImageRepository } from '../../repositories/RecipeImageRepository';
import { RecipeRateRepository } from '../../repositories/RecipeRateRepository';
import { RecipeRepository } from '../../repositories/RecipeRepository';
import { UserFollowRepository } from '../../repositories/UserFollowRepository';

// Repositories
import { UserRepository } from '../../repositories/UserRepository';
import { UserSavedRecipeRepository } from '../../repositories/UserSavedRecipeRepository';

binder(UserRepository, 'UserRepository');
binder(RecipeRepository, 'RecipeRepository');
binder(RecipeImageRepository, 'RecipeImageRepository');
binder(RecipeRateRepository, 'RecipeRateRepository');
binder(RecipeCommentRepository, 'RecipeCommentRepository');
binder(UserSavedRecipeRepository, 'UserSavedRecipeRepository');
binder(UserFollowRepository, 'UserFollowRepository');
