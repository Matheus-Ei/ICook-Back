import { binder } from '../../helpers/binder';

// Controllers
import { UserController } from '../../controllers/UserController';
import { TokenController } from '../../controllers/TokenController';

binder(TokenController, 'TokenController');
binder(UserController, 'UserController');
