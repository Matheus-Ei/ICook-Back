import { SchemaValidatorMiddleware } from '../middlewares/SchemaValidatorMiddleware';
import { ImplementationMiddleware } from '../middlewares/ImplementationMiddleware';
import { PermissionMiddleware } from '../middlewares/PermissionMiddleware';
import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Router } from 'express';

export abstract class AbstractRoute {
  protected router: Router;
  protected validator: SchemaValidatorMiddleware;
  protected permission: PermissionMiddleware;
  protected implementation: ImplementationMiddleware;

  protected constructor() {
    this.router = Router();

    // Middlewares
    this.validator = container.get(TYPES.SchemaValidatorMiddleware);
    this.permission = container.get(TYPES.PermissionMiddleware);
    this.implementation = container.get(TYPES.ImplementationMiddleware);
  }

  protected abstract init(): void;

  public getRouter = () => {
    return this.router;
  };
}
