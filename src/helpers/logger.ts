import { ENV } from '../constants/enviroment';
import pino from 'pino';

export const logger = pino({
  level: ENV.LOG_LEVEL, // Minimum level to show on the console
  transport: {
    targets: [
      // Logs in the console
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'HH:MM:ss',
        },

        level: ENV.LOG_LEVEL,
      },

      // Logs in the file
      {
        target: 'pino-pretty',
        options: {
          destination: './report/app.log',
          colorize: false,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          levelFirst: true,
          singleLine: true,
        },
        level: ENV.LOG_LEVEL,
      },
    ],
  },
});
