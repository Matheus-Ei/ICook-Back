import { CREDENTIALS } from './credentials';
import { ENV } from '../constants/enviroment';
import { logger } from '../utils/logger';
import { injectable } from 'inversify';
import { Sequelize } from 'sequelize';
import { MODELS } from './models';

@injectable()
export class Database {
  private readonly sequelize: Sequelize;

  constructor() {
    const access = this.getCredentials();
    const databaseUseSsl = ENV.DATABASE_USE_SSL === 'true';

    this.sequelize = new Sequelize(
      access.database as string,
      access.username as string,
      access.password as string,
      {
        host: access.host,
        dialect: access.dialect as 'postgres',
        port: access.port,
        logging: false,
        dialectOptions: databaseUseSsl
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : {},
      }
    );

    this.startModels();
  }

  public get connection() {
    return this.sequelize;
  }

  private getCredentials = () => {
    switch (ENV.NODE_ENV) {
      case 'development':
        logger.info(
          `Using the development database (develop_${ENV.DATABASE_NAME})`
        );
        return CREDENTIALS.development;
      case 'test':
        logger.info(`Using the test database (test_${ENV.DATABASE_NAME})`);
        return CREDENTIALS.test;
      case 'production':
        logger.info(
          `Using the production database (production_${ENV.DATABASE_NAME})`
        );
        return CREDENTIALS.production;
      default:
        logger.fatal('Credentials not setted up');
        throw new Error('Credential not setted up');
    }
  };

  private startModels = () => {
    MODELS.forEach((model) => {
      model.setup(this.sequelize);
      logger.debug(`Model ( ${model.name} ) Started`);
    });
  };

  public async authenticate(): Promise<void> {
    await this.sequelize.authenticate();
    logger.info('Database authenticated');
  }

  public getDatabase(): Sequelize {
    return this.sequelize;
  }
}
