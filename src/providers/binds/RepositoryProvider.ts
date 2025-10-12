import { binder } from '../../utils/binder';

// Repositories
import { RolePermissionRepository } from '../../repositories/RolePermissionRepository';
import { SharedProjectRepository } from '../../repositories/SharedProjectRepository';
import { PermissionRepository } from '../../repositories/PermissionRepository';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { RoleRepository } from '../../repositories/RoleRepository';
import { ModuleRepository } from '../../repositories/ModuleRepository';
import { PageRepository } from '../../repositories/PageRepository';
import { SubscriptionPlanRepository } from '../../repositories/SubscriptionPlanRepository';
import { UserSubscriptionRepository } from '../../repositories/UserSubscriptionRepository';
import { FeedbackRepository } from '../../repositories/FeedbackRepository';

binder(UserRepository, 'UserRepository');
binder(ProjectRepository, 'ProjectRepository');
binder(RoleRepository, 'RoleRepository');
binder(RolePermissionRepository, 'RolePermissionRepository');
binder(PermissionRepository, 'PermissionRepository');
binder(SharedProjectRepository, 'SharedProjectRepository');
binder(ModuleRepository, 'ModuleRepository');
binder(PageRepository, 'PageRepository');
binder(SubscriptionPlanRepository, 'SubscriptionPlanRepository');
binder(UserSubscriptionRepository, 'UserSubscriptionRepository');
binder(FeedbackRepository, 'FeedbackRepository');
