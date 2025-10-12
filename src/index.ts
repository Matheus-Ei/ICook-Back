// Dependencies
import './providers';

// Library
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import 'reflect-metadata';
import cors from 'cors';

// Local
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { container } from './providers/container';
import { TYPES } from './providers/types';
import { logger } from './utils/logger';
import { ENV } from './constants/enviroment';
import { ROUTES } from './constants/routes';
import { Database } from './database';

export class App {
  public server: Express;
  public instance?: ReturnType<Express['listen']>;
  private authMiddleware: AuthMiddleware;
  private LoggerMiddleware: LoggerMiddleware;

  constructor() {
    this.bootstrap();

    this.server = express();
    this.authMiddleware = container.get<AuthMiddleware>(TYPES.AuthMiddleware);
    this.LoggerMiddleware = container.get<LoggerMiddleware>(
      TYPES.LoggerMiddleware
    );

    this.middlewares();
    this.routes();
  }

  private bootstrap = async (): Promise<void> => {
    const database = container.get<Database>(TYPES.Database);
    await database.authenticate();
  };

  private routes = (): void => {
    ROUTES.forEach((r) => {
      this.server.use(r.endpoint, r.router);
      logger.debug(`Route ${r.endpoint} was created`);
    });
  };

  private middlewares = (): void => {
    this.server.use(cookieParser());
    this.server.use(express.json());
    this.server.use(compression());
    this.server.use(express.urlencoded({ extended: true }));

    this.server.use(
      cors({
        origin: ENV.CORS_ALLOWED_SOURCES,
        methods: ENV.CORS_ALLOWED_METHODS,
        allowedHeaders: ENV.CORS_ALLOWED_HEADERS,
        credentials: true,
      })
    );
    logger.info('Library middlewares applied');

    // Local
    this.server.use(this.authMiddleware.init);
    this.server.use(this.LoggerMiddleware.init);
    logger.info('Local middlewares applied');
  };

  public listen = (port: number) => {
    this.instance = this.server.listen(port, () => {
      if (ENV.NODE_ENV === 'development') console.clear();

      logger.info('Running the server in the port ' + port);
    });
  };

  public close = async () => {
    return new Promise<void>((resolve, reject) => {
      if (this.instance) {
        this.instance.close((err?: Error) => {
          if (err) {
            logger.error(`Error closing server ${err.message}`);
            reject(err);
          } else {
            logger.info('Server closed successfully.');
            resolve();
          }
        });
      } else {
        logger.warn('Server is not running.');
        resolve();
      }
    });
  };
}

if (require.main === module) {
  const app = new App();
  app.listen(ENV.SERVER_PORT);
}
