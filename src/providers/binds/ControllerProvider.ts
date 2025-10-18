import { binder } from '../../helpers/binder';

// Controllers
import { UserController } from '../../controllers/UserController';
import { TokenController } from '../../controllers/TokenController';
import { RecipeController } from '../../controllers/RecipeController';
import { RecipeCommentController } from '../../controllers/RecipeCommentController';
import { RecipeRateController } from '../../controllers/RecipeRateController';

binder(TokenController, 'TokenController');
binder(UserController, 'UserController');
binder(RecipeController, 'RecipeController');
binder(RecipeCommentController, 'RecipeCommentController');
binder(RecipeRateController, 'RecipeRateController');

