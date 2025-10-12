import { Request, Response, NextFunction } from 'express';
import { AbstractMiddleware } from './AbstractMiddleware';
import { TokenService } from '../services/TokenService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';

@injectable()
export class AuthMiddleware extends AbstractMiddleware {
  private autorizedPaths = ['/tokens/verify', '/users/auth', '/users'];

  constructor(@inject(TYPES.TokenService) private tokenService: TokenService) {
    super();
  }

  init = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/docs')) return next();

    if (this.autorizedPaths.includes(req.path)) return next();

    try {
      const id = this.tokenService.getUserId(req);

      if (id === null) return Res.sendByType(res, 'badRequest');

      const accessDecoded = this.tokenService.verifyAccessToken(req);
      const refreshDecoded = this.tokenService.verifyRefreshToken(req);

      if (!accessDecoded) {
        if (refreshDecoded) {
          this.tokenService.generateAccessToken(id, res);
        } else return Res.send(res, 'Invalid access token', 401);
      }

      next();
    } catch {
      return Res.send(res, 'Error verifing the user autentication', 401);
    }
  };
}
