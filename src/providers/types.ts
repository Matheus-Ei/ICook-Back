export const TYPES = {
  // Controllers
  TokenController: Symbol.for('TokenController'),
  UserController: Symbol.for('UserController'),

  // Services
  TokenService: Symbol.for('TokenService'),
  UserService: Symbol.for('UserService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  SchemaValidatorMiddleware: Symbol.for('SchemaValidatorMiddleware'),
  PermissionMiddleware: Symbol.for('PermissionMiddleware'),
  ImplementationMiddleware: Symbol.for('ImplementationMiddleware'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),

  // Routes
  NotFoundRoute: Symbol.for('NotFoundRoute'),
  TokenRoute: Symbol.for('TokenRoute'),
  UserRoute: Symbol.for('UserRoute'),

  // Database
  Database: Symbol.for('Database'),
};
