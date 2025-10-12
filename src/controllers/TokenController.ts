import { TokenService } from '../services/TokenService';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';

@injectable()
export class TokenController {
  constructor(@inject(TYPES.TokenService) private tokenService: TokenService) {}

  verify = async (req: Request, res: Response): Promise<void> => {
    try {
      const decoded = this.tokenService.verifyAccessToken(req);

      if (!decoded) return Res.send(res, 'The access token is not valid', 401);

      return Res.send(res, 'The access token is valid', 200);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
