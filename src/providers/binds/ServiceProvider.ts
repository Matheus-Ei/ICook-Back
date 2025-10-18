import { binder } from '../../helpers/binder';
import { RecipeCommentService } from '../../services/RecipeCommentService';
import { RecipeService } from '../../services/RecipeService';

// Services
import { TokenService } from '../../services/TokenService';
import { UserService } from '../../services/UserService';

binder(TokenService, 'TokenService');
binder(UserService, 'UserService');
binder(RecipeService, 'RecipeService');
binder(RecipeCommentService, 'RecipeCommentService');
