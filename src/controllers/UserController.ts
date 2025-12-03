import { UserService } from '../services/UserService';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../providers/types';
import { User } from '../entities/User';
import { Res } from '../utils/Res';
import { omit } from '../helpers/omit';
import { TokenService } from '../services/TokenService';
import { CompleteUserType } from '../types/Users';

type EntityType = User;

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private service: UserService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const isValid = await this.service.login(email, password, res);
      if (!isValid) return Res.send(res, 'Email or password incorrect', 401);

      return Res.sendByType(res, 'success');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  getCurrent = async (req: Request, res: Response) => {
    try {
      const cookieId = this.tokenService.getUserId(req);

      if (cookieId === null) return Res.sendByType(res, 'badRequest');

      const data = await this.service.get(Number(cookieId));

      if (!data) return Res.sendByType(res, 'notFound');

      return Res.sendByType<CompleteUserType>(
        res,
        'found',
        undefined,
        data
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.userId);
      if (isNaN(id)) return Res.sendByType(res, 'badRequest');

      const data = await this.service.get(id);
      if (!data) return Res.sendByType(res, 'notFound');

      return Res.sendByType<CompleteUserType>(
        res,
        'found',
        undefined,
        data
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const data = await this.service.signup(req.body, res);

      return Res.sendByType<Omit<EntityType, 'password'>>(
        res,
        'created',
        undefined,
        omit(data, 'password')
      );
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = this.tokenService.getUserId(req);

      if (id === null) return Res.sendByType(res, 'badRequest');

      const wasUpdated = await this.service.update(Number(id), req.body);

      const data = await this.service.get(Number(id));

      if (!wasUpdated || !data) return Res.sendByType(res, 'notFound');

      return Res.sendByType<EntityType>(res, 'updated', undefined, data);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = this.tokenService.getUserId(req);

      if (id === null) return Res.sendByType(res, 'badRequest');

      const isDeleted = await this.service.delete(Number(id));
      if (!isDeleted) return Res.sendByType(res, 'notFound');

      return Res.sendByType(res, 'deleted');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };

  logout = async (_: Request, res: Response) => {
    try {
      this.service.logout(res);

      return Res.sendByType(res, 'success');
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
