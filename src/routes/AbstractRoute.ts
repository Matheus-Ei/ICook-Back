import { SchemaValidatorMiddleware } from '../middlewares/SchemaValidatorMiddleware';
import { ImplementationMiddleware } from '../middlewares/ImplementationMiddleware';
import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Router } from 'express';

export abstract class AbstractRoute {
  protected router: Router;
  protected validator: SchemaValidatorMiddleware;
  protected implementation: ImplementationMiddleware;

  protected constructor() {
    this.router = Router();

    // Middlewares
    this.validator = container.get(TYPES.SchemaValidatorMiddleware);
    this.implementation = container.get(TYPES.ImplementationMiddleware);
  }

  protected abstract init(): void;

  public getRouter = () => {
    return this.router;
  };
}
