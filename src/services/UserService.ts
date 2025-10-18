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

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.TokenService) private tokenService: TokenService,
    @inject(TYPES.Database) private database: Database,
  ) {}

  login = async (
    email: string,
    password: string,
    res?: Response
  ): Promise<boolean> => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return false;

    const isMatch = await Hash.compare(password, user.password);

    if (isMatch && res) {
      this.tokenService.generateAccessToken(String(user.id), res);
      this.tokenService.generateRefreshToken(String(user.id), res);
    }

    return isMatch ? true : false;
  };

  signup = async (
    userData: Omit<User, 'id'>,
    res?: Response
  ): Promise<User> => {
    const transaction = await this.database.connection.transaction();

    try {
      const hashedPassword = await Hash.make(userData.password);
      if (!hashedPassword)
        throw new Error('The password does not hashed successfuly');

      const user = await this.userRepository.create(
        {
          ...userData,
          password: hashedPassword,
        },
        transaction
      );

      if (!user) {
        await transaction.rollback();
        throw new Error('The user was not created');
      }

      await transaction.commit();

      if (res) {
        this.tokenService.generateAccessToken(String(user.id), res);
        this.tokenService.generateRefreshToken(String(user.id), res);
      }

      return user;
    } catch (error) {
      transaction.rollback();
      throw new Error(TreatError.stringify(error));
    }
  };

  delete = async (id: number): Promise<boolean> => {
    return this.userRepository.deleteById(id);
  };

  get = async (id: number): AsyncMaybe<User> => {
    return this.userRepository.findById(id);
  };

  update = async (id: number, user: Editable<User>): Promise<boolean> => {
    if (user?.password) user.password = await Hash.make(user.password);

    return this.userRepository.updateById(id, user);
  };

  logout = (res: Response): void => {
    Cookie.delete(['access_token', 'refresh_token'], res);
  };
}
