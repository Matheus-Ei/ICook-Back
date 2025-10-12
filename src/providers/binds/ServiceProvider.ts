import { binder } from '../../utils/binder';

// Services
import { SharedProjectService } from '../../services/SharedProjectService';
import { ProjectService } from '../../services/ProjectService';
import { TokenService } from '../../services/TokenService';
import { UserService } from '../../services/UserService';
import { RoleService } from '../../services/RoleService';
import { PageService } from '../../services/PageService';
import { ModuleService } from '../../services/ModuleService';
import { SubscriptionPlanService } from '../../services/SubscriptionPlanService';
import { UserSubscriptionService } from '../../services/UserSubscriptionService';
import { FeedbackService } from '../../services/FeedbackService';
import { PermissionService } from '../../services/PermissionService';

binder(TokenService, 'TokenService');
binder(UserService, 'UserService');
binder(ProjectService, 'ProjectService');
binder(RoleService, 'RoleService');
binder(SharedProjectService, 'SharedProjectService');
binder(PageService, 'PageService');
binder(ModuleService, 'ModuleService');
binder(SubscriptionPlanService, 'SubscriptionPlanService');
binder(UserSubscriptionService, 'UserSubscriptionService');
binder(FeedbackService, 'FeedbackService');
binder(PermissionService, 'PermissionService');
