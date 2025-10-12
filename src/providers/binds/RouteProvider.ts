import { binder } from '../../utils/binder';

// Routes
import { NotFoundRoute } from '../../routes/NotFoundRoute';
import { ProjectRoute } from '../../routes/ProjectRoute';
import { TokenRoute } from '../../routes/TokenRoute';
import { RoleRoute } from '../../routes/RoleRoute';
import { UserRoute } from '../../routes/UserRoute';
import { ModuleRoute } from '../../routes/ModuleRoute';
import { DocumentationRoute } from '../../routes/DocumentationRoute';
import { SubscriptionRoute } from '../../routes/SubscriptionRoute';
import { FeedbackRoute } from '../../routes/FeedbackRoute';

binder(NotFoundRoute, 'NotFoundRoute');
binder(UserRoute, 'UserRoute');
binder(TokenRoute, 'TokenRoute');
binder(ProjectRoute, 'ProjectRoute');
binder(RoleRoute, 'RoleRoute');
binder(ModuleRoute, 'ModuleRoute');
binder(DocumentationRoute, 'DocumentationRoute');
binder(SubscriptionRoute, 'SubscriptionRoute');
binder(FeedbackRoute, 'FeedbackRoute');
