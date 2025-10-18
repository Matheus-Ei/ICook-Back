import { binder } from '../../helpers/binder';
import { RecipeRepository } from '../../repositories/RecipeRepository';

// Repositories
import { UserRepository } from '../../repositories/UserRepository';

binder(UserRepository, 'UserRepository');
binder(RecipeRepository, 'RecipeRepository');
