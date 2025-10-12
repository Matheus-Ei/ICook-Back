import { RESPONSES } from '../constants/responses';
import { TreatError } from './error';
import { Response } from 'express';

interface ResOptions {
  stringifyErrors?: boolean;
}

const defaultOptions: ResOptions = {
  stringifyErrors: true,
};

// eslint-disable-next-line
type Resource<T = any> = T;

export class Res {
  static send = <T>(
    res: Response,
    message: string,
    status: number,
    err?: unknown,
    resource?: Resource<T>,
    options: ResOptions = defaultOptions
  ) => {
    const error = options?.stringifyErrors ? TreatError.stringify(err) : err;

    res.status(status).send({ message, error, resource });
    return undefined;
  };

  static sendByType = <T>(
    res: Response,
    type: keyof typeof RESPONSES,
    error?: unknown,
    resource?: Resource<T>,
    options?: ResOptions
  ) => {
    return this.send(
      res,
      RESPONSES[type].message,
      RESPONSES[type].status,
      error,
      resource,
      options
    );
  };
}
