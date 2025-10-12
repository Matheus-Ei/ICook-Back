import { binder } from '../../utils/binder';

// Routes
import { UserRoute } from '../../routes/UserRoute';
import { NotFoundRoute } from '../../routes/NotFoundRoute';
import { TokenRoute } from '../../routes/TokenRoute';

binder(NotFoundRoute, 'NotFoundRoute');
binder(TokenRoute, 'TokenRoute');
binder(UserRoute, 'UserRoute');
