import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { ZodError, ZodIssue, ZodSchema } from 'zod';
import { Res } from '../utils/Res';

type validateType = (req: Request, res: Response, next: NextFunction) => void;

@injectable()
export class SchemaValidatorMiddleware {
  formatZodIssue = (issue: ZodIssue): string => {
    const { message } = issue;

    return `${message}`;
  };

  formatZodError = (error: ZodError): string | null => {
    const { issues } = error;

    if (issues.length) {
      const currentIssue = issues[0];

      return this.formatZodIssue(currentIssue);
    }

    return null;
  };

  body = (schema: ZodSchema): validateType => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return Res.send(
          res,
          'Body validation error',
          400,
          this.formatZodError(result.error),
          undefined,
          {
            stringifyErrors: false,
          }
        );
      }

      req.body = result.data;

      return next();
    };
  };

  params = (schema: ZodSchema): validateType => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.params);

      if (!result.success) {
        return Res.send(
          res,
          'Params validation error',
          400,
          this.formatZodError(result.error),
          undefined,
          {
            stringifyErrors: false,
          }
        );
      }

      req.params = result.data;

      return next();
    };
  };

  query = (schema: ZodSchema): validateType => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.query);

      if (!result.success) {
        return Res.send(
          res,
          'Query params validation error',
          400,
          this.formatZodError(result.error),
          undefined,
          {
            stringifyErrors: false,
          }
        );
      }

      req.query = result.data;

      return next();
    };
  };
}
