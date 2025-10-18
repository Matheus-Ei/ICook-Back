export const TYPES = {
  // Controllers
  TokenController: Symbol.for('TokenController'),
  UserController: Symbol.for('UserController'),
  RecipeController: Symbol.for('RecipeController'),
  RecipeCommentController: Symbol.for('RecipeCommentController'),
  RecipeRateController: Symbol.for('RecipeRateController'),
  UserSavedRecipeController: Symbol.for('UserSavedRecipeController'),

  // Services
  TokenService: Symbol.for('TokenService'),
  UserService: Symbol.for('UserService'),
  RecipeService: Symbol.for('RecipeService'),
  RecipeCommentService: Symbol.for('RecipeCommentService'),
  RecipeRateService: Symbol.for('RecipeRateService'),
  UserSavedRecipeService: Symbol.for('UserSavedRecipeService'),

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
  RecipeCommentRoute: Symbol.for('RecipeCommentRoute'),
  RecipeRateRoute: Symbol.for('RecipeRateRoute'),
  UserSavedRecipeRoute: Symbol.for('UserSavedRecipeRoute'),

  // Database
  Database: Symbol.for('Database'),
};
