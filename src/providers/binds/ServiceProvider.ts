import { binder } from '../../helpers/binder';
import { RecipeCommentService } from '../../services/RecipeCommentService';
import { RecipeRateService } from '../../services/RecipeRateService';
import { RecipeService } from '../../services/RecipeService';

// Services
import { TokenService } from '../../services/TokenService';
import { UserSavedRecipeService } from '../../services/UserSavedRecipeService';
import { UserService } from '../../services/UserService';

binder(TokenService, 'TokenService');
binder(UserService, 'UserService');
binder(RecipeService, 'RecipeService');
binder(RecipeCommentService, 'RecipeCommentService');
binder(RecipeRateService, 'RecipeRateService');
binder(UserSavedRecipeService, 'UserSavedRecipeService');
