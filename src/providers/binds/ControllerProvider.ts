import { binder } from '../../helpers/binder';

// Controllers
import { UserController } from '../../controllers/UserController';
import { TokenController } from '../../controllers/TokenController';
import { RecipeController } from '../../controllers/RecipeController';

binder(TokenController, 'TokenController');
binder(UserController, 'UserController');
binder(RecipeController, 'RecipeController');
