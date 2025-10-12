import { binder } from '../../utils/binder';

// Services
import { TokenService } from '../../services/TokenService';
import { UserService } from '../../services/UserService';

binder(TokenService, 'TokenService');
binder(UserService, 'UserService');
