import { UserRepository } from '../repositories/UserRepository';
import { AsyncMaybe, Editable } from '../types';
import { inject, injectable } from 'inversify';
import { TokenService } from './TokenService';
import { TYPES } from '../providers/types';
import { Cookie } from '../utils/Cookie';
import { User } from '../entities/User';
import { Hash } from '../utils/Hash';
import { Response } from 'express';
import { Database } from '../database';
import { TreatError } from '../utils/TreatError';

type EntityType = User;

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private repository: UserRepository,
    @inject(TYPES.TokenService) private tokenService: TokenService,
    @inject(TYPES.Database) private database: Database
  ) {}

  login = async (
    email: string,
    password: string,
    res?: Response
  ): Promise<boolean> => {
    const data = await this.repository.findByEmail(email);

    if (!data) return false;

    const isMatch = await Hash.compare(password, data.password);

    if (isMatch && res) {
      this.tokenService.generateAccessToken(String(data.id), res);
      this.tokenService.generateRefreshToken(String(data.id), res);
    }

    return isMatch ? true : false;
  };

  signup = async (
    data: Omit<EntityType, 'id'>,
    res?: Response
  ): Promise<EntityType> => {
    const transaction = await this.database.connection.transaction();

    try {
      const hashedPassword = await Hash.make(data.password);
      if (!hashedPassword)
        throw new Error('The password does not hashed successfuly');

      const created = await this.repository.create(
        { ...data, password: hashedPassword },
        transaction
      );

      if (!created) {
        await transaction.rollback();
        throw new Error('The user was not created');
      }

      await transaction.commit();

      if (res) {
        this.tokenService.generateAccessToken(String(created.id), res);
        this.tokenService.generateRefreshToken(String(created.id), res);
      }

      return created;
    } catch (error) {
      transaction.rollback();
      throw new Error(TreatError.stringify(error));
    }
  };

  delete = async (id: number): Promise<boolean> => {
    return this.repository.deleteById(id);
  };

  get = async (id: number): AsyncMaybe<EntityType> => {
    return this.repository.findById(id);
  };

  update = async (id: number, data: Editable<EntityType>): Promise<boolean> => {
    if (data?.password) data.password = await Hash.make(data.password);

    return this.repository.updateById(id, data);
  };

  logout = (res: Response): void => {
    Cookie.delete(['access_token', 'refresh_token'], res);
  };
}
