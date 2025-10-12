import { NextFunction, Request, Response } from 'express';

export abstract class AbstractMiddleware {
  abstract init(req: Request, res: Response, next: NextFunction): Promise<void>;
}
