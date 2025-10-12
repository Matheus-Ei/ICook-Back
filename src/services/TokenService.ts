import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Cookie } from '../utils/cookie';
import { ENV } from '../constants/enviroment';
import { injectable } from 'inversify';

@injectable()
export class TokenService {
  private accessSecret: string = ENV.ACCESS_TOKEN_KEY;
  private refreshSecret: string = ENV.REFRESH_TOKEN_KEY;
  private accessCookieName: string = 'access_token';
  private refreshCookieName: string = 'refresh_token';

  private generateToken = (
    payload: object,
    expiresIn: string,
    secret: string
  ): string => {
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  };

  private verifyToken = (
    token: string,
    secret: string
  ): JwtPayload | string | null => {
    try {
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  };

  generateAccessToken = (userId: string, res: Response): string => {
    const token = this.generateToken({ userId }, '1h', this.accessSecret);
    Cookie.generate(this.accessCookieName, token, res);
    return token;
  };

  verifyAccessToken = (req: Request): string | JwtPayload | null => {
    const token = Cookie.get(this.accessCookieName, req);
    return this.verifyToken(token, this.accessSecret);
  };

  generateRefreshToken = (userId: string, res: Response): string => {
    const token = this.generateToken({ userId }, '30d', this.refreshSecret);
    Cookie.generate(this.refreshCookieName, token, res);
    return token;
  };

  verifyRefreshToken = (req: Request): string | JwtPayload | null => {
    const token = Cookie.get(this.refreshCookieName, req);
    return this.verifyToken(token, this.refreshSecret);
  };

  getUserId = (req: Request): string | null => {
    try {
      try {
        const tokenDec = this.verifyAccessToken(req) as { userId: string };
        return tokenDec.userId;
      } catch {
        const tokenDec = this.verifyRefreshToken(req) as { userId: string };
        return tokenDec.userId;
      }
    } catch {
      return null;
    }
  };
}
