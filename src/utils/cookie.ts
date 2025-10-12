import { Request, Response } from 'express';
import { TreatError } from './error';
import { logger } from './logger';

export class Cookie {
  static generate = (
    name: string,
    value: string | object,
    res: Response,
    options: {
      path?: string;
      maxAge?: number;
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: 'strict' | 'lax' | 'none';
    } = {}
  ) => {
    const cookieValue =
      typeof value === 'object' ? JSON.stringify(value) : value;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict' as const, //"none" as "none"
      ...options,
    };

    res.cookie(name, cookieValue, cookieOptions);

    const setCookieHeader = res.getHeader('Set-Cookie');
    if (Array.isArray(setCookieHeader)) {
      res.setHeader(
        'Set-Cookie',
        setCookieHeader.map((cookie) =>
          cookie.includes('Partitioned') ? cookie : `${cookie}; Partitioned`
        )
      );
    } else if (typeof setCookieHeader === 'string') {
      if (!setCookieHeader.includes('Partitioned')) {
        res.setHeader('Set-Cookie', `${setCookieHeader}; Partitioned`);
      }
    }
  };

  static delete = (name: Array<string>, res: Response) => {
    try {
      const cookies = name.map((item) => {
        return `${item}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`;
      });

      res.setHeader('Set-Cookie', cookies);
      name.forEach((item) => res.clearCookie(item));
    } catch (error) {
      logger.error(TreatError.stringify(error));
    }
  };

  static get = (name: string, req: Request) => {
    try {
      return req.cookies[name];
    } catch (error) {
      logger.error(TreatError.stringify(error));
      return null;
    }
  };
}
