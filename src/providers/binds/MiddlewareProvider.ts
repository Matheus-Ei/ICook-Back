import { binder } from '../../utils/binder';

// Middleware
import { LoggerMiddleware } from '../../middlewares/LoggerMiddleware';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';
import { SchemaValidatorMiddleware } from '../../middlewares/SchemaValidatorMiddleware';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import { ImplementationMiddleware } from '../../middlewares/ImplementationMiddleware';
import { CoherenceValidatorMiddleware } from '../../middlewares/CoherenceValidatorMiddleware';

binder(AuthMiddleware, 'AuthMiddleware');
binder(LoggerMiddleware, 'LoggerMiddleware');
binder(SchemaValidatorMiddleware, 'SchemaValidatorMiddleware');
binder(PermissionMiddleware, 'PermissionMiddleware');
binder(ImplementationMiddleware, 'ImplementationMiddleware');
binder(CoherenceValidatorMiddleware, 'CoherenceValidatorMiddleware');
