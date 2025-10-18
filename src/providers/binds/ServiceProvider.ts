import { binder } from '../../helpers/binder';

// Services
import { TokenService } from '../../services/TokenService';
import { UserService } from '../../services/UserService';

binder(TokenService, 'TokenService');
binder(UserService, 'UserService');
