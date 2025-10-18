import { UserService } from '../services/UserService';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { User } from '../entities/User';
import { Res } from '../utils/Res';
import { omit } from '../helpers/omit';
import { TokenService } from '../services/TokenService';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const isValid = await this.userService.login(email, password, res);
      if (!isValid) return Res.send(res, 'Email or password incorrect', 401);

      return Res.sendByType(res, 'success');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const cookieId = this.tokenService.getUserId(req);

      if (cookieId === null) return Res.sendByType(res, 'badRequest');

      const user = await this.userService.get(Number(cookieId));

      if (!user) return Res.sendByType(res, 'notFound');

      return Res.sendByType<Omit<User, 'password'>>(
        res,
        'found',
        undefined,
        omit(user, 'password')
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  signup = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const user = await this.userService.signup(data, res);

      return Res.sendByType<Omit<User, 'password'>>(
        res,
        'created',
        undefined,
        omit(user, 'password')
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const id = this.tokenService.getUserId(req);

      if (id === null) return Res.sendByType(res, 'badRequest');

      const wasUpdated = await this.userService.update(Number(id), data);

      const user = await this.userService.get(Number(id));

      if (!wasUpdated || !user) return Res.sendByType(res, 'notFound');

      return Res.sendByType<User>(res, 'updated', undefined, user);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = this.tokenService.getUserId(req);

      if (id === null) return Res.sendByType(res, 'badRequest');

      const isDeleted = await this.userService.delete(Number(id));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  logout = async (_: Request, res: Response) => {
    try {
      this.userService.logout(res);

      return Res.sendByType(res, 'success');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
