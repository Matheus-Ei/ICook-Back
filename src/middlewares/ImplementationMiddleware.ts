import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Res } from '../utils/response';

@injectable()
export class ImplementationMiddleware {
  verify = (isImplemented: boolean) => {
    return (_: Request, res: Response, next: NextFunction) => {
      if (isImplemented) return next();
      else return Res.send(res, 'This endpoint is not implemented', 501);
    };
  };
}
