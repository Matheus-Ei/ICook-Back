export const TYPES = {
  // Controllers
  TokenController: Symbol.for('TokenController'),
  UserController: Symbol.for('UserController'),
  RecipeController: Symbol.for('RecipeController'),

  // Services
  TokenService: Symbol.for('TokenService'),
  UserService: Symbol.for('UserService'),
  RecipeService: Symbol.for('RecipeService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  SchemaValidatorMiddleware: Symbol.for('SchemaValidatorMiddleware'),
  PermissionMiddleware: Symbol.for('PermissionMiddleware'),
  ImplementationMiddleware: Symbol.for('ImplementationMiddleware'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  RecipeRepository: Symbol.for('RecipeRepository'),
  RecipeImageRepository: Symbol.for('RecipeImageRepository'),
  RecipeRateRepository: Symbol.for('RecipeRateRepository'),
  RecipeCommentRepository: Symbol.for('RecipeCommentRepository'),
  UserSavedRecipeRepository: Symbol.for('UserSavedRecipeRepository'),
  UserFollowRepository: Symbol.for('UserFollowRepository'),

  // Routes
  NotFoundRoute: Symbol.for('NotFoundRoute'),
  TokenRoute: Symbol.for('TokenRoute'),
  UserRoute: Symbol.for('UserRoute'),
  RecipeRoute: Symbol.for('RecipeRoute'),

  // Database
  Database: Symbol.for('Database'),
};
