import { binder } from '../../utils/binder';

// Controllers
import { SharedProjectController } from '../../controllers/SharedProjectController';
import { ProjectController } from '../../controllers/ProjectController';
import { TokenController } from '../../controllers/TokenController';
import { UserController } from '../../controllers/UserController';
import { RoleController } from '../../controllers/RoleController';
import { PageController } from '../../controllers/PageController';
import { ModuleController } from '../../controllers/ModuleController';
import { SubscriptionPlanController } from '../../controllers/SubscriptionPlanController';
import { UserSubscriptionController } from '../../controllers/UserSubscriptionController';
import { FeedbackController } from '../../controllers/FeedbackController';
import { PermissionController } from '../../controllers/PermissionController';

binder(TokenController, 'TokenController');
binder(UserController, 'UserController');
binder(ProjectController, 'ProjectController');
binder(RoleController, 'RoleController');
binder(SharedProjectController, 'SharedProjectController');
binder(PageController, 'PageController');
binder(ModuleController, 'ModuleController');
binder(SubscriptionPlanController, 'SubscriptionPlanController');
binder(UserSubscriptionController, 'UserSubscriptionController');
binder(FeedbackController, 'FeedbackController');
binder(PermissionController, 'PermissionController');
