import { Request, Response, NextFunction } from 'express';
import { AbstractMiddleware } from './AbstractMiddleware';
import { logger } from '../helpers/logger';
import { injectable } from 'inversify';

@injectable()
export class LoggerMiddleware extends AbstractMiddleware {
  constructor() {
    super();
  }

  init = async (req: Request, res: Response, next: NextFunction) => {
    logger.trace({
      request: { body: req.body, params: req.params },
      response: { status: res.statusCode },
    });

    next();
  };
}
