// Models
import { RolePermissionsModel } from '../models/RolePermissionsModel';
import { SharedProjectsModel } from '../models/SharedProjectsModel';
import { PermissionsModel } from '../models/PermissionsModel';
import { ProjectsModel } from '../models/ProjectsModel';
import { RolesModel } from '../models/RolesModel';
import { UsersModel } from '../models/UsersModel';
import { ModulesModel } from '../models/ModulesModel';
import { PagesModel } from '../models/PagesModel';
import { SubscriptionPlansModel } from '../models/SubscriptionPlansModel';
import { UserSubscriptionsModel } from '../models/UserSubscriptionsModel';
import { SubscriptionBenefitsModel } from '../models/SubscriptionBenefitsModel';
import { SubscriptionPermissionsModel } from '../models/SubscriptionPermissionsModel';
import { FeedbacksModel } from '../models/FeedbacksModel';

// Here the order matters
export const MODELS = [
  UsersModel,
  ProjectsModel,
  PermissionsModel,
  RolesModel,
  RolePermissionsModel,
  SharedProjectsModel,
  ModulesModel,
  PagesModel,
  SubscriptionPlansModel,
  UserSubscriptionsModel,
  SubscriptionBenefitsModel,
  SubscriptionPermissionsModel,
  FeedbacksModel,
];
