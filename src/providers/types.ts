export const TYPES = {
  // Controllers
  TokenController: Symbol.for('TokenController'),
  ProjectController: Symbol.for('ProjectController'),
  UserController: Symbol.for('UserController'),
  RoleController: Symbol.for('RoleController'),
  SharedProjectController: Symbol.for('SharedProjectController'),
  PageController: Symbol.for('PageController'),
  ModuleController: Symbol.for('ModuleController'),
  SubscriptionPlanController: Symbol.for('SubscriptionPlanController'),
  UserSubscriptionController: Symbol.for('UserSubscriptionController'),
  FeedbackController: Symbol.for('FeedbackController'),
  PermissionController: Symbol.for('PermissionController'),

  // Services
  TokenService: Symbol.for('TokenService'),
  ProjectService: Symbol.for('ProjectService'),
  UserService: Symbol.for('UserService'),
  RoleService: Symbol.for('RoleService'),
  SharedProjectService: Symbol.for('SharedProjectService'),
  PageService: Symbol.for('PageService'),
  ModuleService: Symbol.for('ModuleService'),
  SubscriptionPlanService: Symbol.for('SubscriptionPlanService'),
  UserSubscriptionService: Symbol.for('UserSubscriptionService'),
  FeedbackService: Symbol.for('FeedbackService'),
  PermissionService: Symbol.for('PermissionService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  SchemaValidatorMiddleware: Symbol.for('SchemaValidatorMiddleware'),
  PermissionMiddleware: Symbol.for('PermissionMiddleware'),
  ImplementationMiddleware: Symbol.for('ImplementationMiddleware'),
  CoherenceValidatorMiddleware: Symbol.for('CoherenceValidatorMiddleware'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  ProjectRepository: Symbol.for('ProjectRepository'),
  RoleRepository: Symbol.for('RoleRepository'),
  RolePermissionRepository: Symbol.for('RolePermissionRepository'),
  PermissionRepository: Symbol.for('PermissionRepository'),
  SharedProjectRepository: Symbol.for('SharedProjectRepository'),
  PageRepository: Symbol.for('PageRepository'),
  ModuleRepository: Symbol.for('ModuleRepository'),
  SubscriptionPlanRepository: Symbol.for('SubscriptionPlanRepository'),
  UserSubscriptionRepository: Symbol.for('UserSubscriptionRepository'),
  FeedbackRepository: Symbol.for('FeedbackRepository'),

  // Routes
  NotFoundRoute: Symbol.for('NotFoundRoute'),
  TokenRoute: Symbol.for('TokenRoute'),
  ProjectRoute: Symbol.for('ProjectRoute'),
  UserRoute: Symbol.for('UserRoute'),
  RoleRoute: Symbol.for('RoleRoute'),
  ModuleRoute: Symbol.for('ModuleRoute'),
  DocumentationRoute: Symbol.for('DocumentationRoute'),
  SubscriptionRoute: Symbol.for('SubscriptionRoute'),
  FeedbackRoute: Symbol.for('FeedbackRoute'),

  // Database
  Database: Symbol.for('Database'),

  // Jobs
  RenewSubscriptionJob: Symbol.for('RenewSubscriptionJob'),
};
