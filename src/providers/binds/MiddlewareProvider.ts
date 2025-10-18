import { binder } from '../../helpers/binder';

// Middleware
import { LoggerMiddleware } from '../../middlewares/LoggerMiddleware';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';
import { SchemaValidatorMiddleware } from '../../middlewares/SchemaValidatorMiddleware';
import { ImplementationMiddleware } from '../../middlewares/ImplementationMiddleware';

binder(AuthMiddleware, 'AuthMiddleware');
binder(LoggerMiddleware, 'LoggerMiddleware');
binder(SchemaValidatorMiddleware, 'SchemaValidatorMiddleware');
binder(ImplementationMiddleware, 'ImplementationMiddleware');
