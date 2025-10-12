import dotenv from 'dotenv';
dotenv.config();

export const getEnv = <T>(key: keyof typeof process.env): T => {
  return process.env[key] as T;
};

export const ENV = {
  // Database
  DATABASE_NAME: getEnv<string>('DATABASE_NAME'),
  DATABASE_DIALECT: getEnv<string>('DATABASE_DIALECT'),
  DATABASE_HOST: getEnv<string>('DATABASE_HOST'),
  DATABASE_PORT: getEnv<number>('DATABASE_PORT'),
  DATABASE_USER: getEnv<string>('DATABASE_USER'),
  DATABASE_PASSWORD: getEnv<string>('DATABASE_PASSWORD'),
  DATABASE_USE_SSL: getEnv<'true' | 'false'>('DATABASE_USE_SSL'),

  // Token
  ACCESS_TOKEN_KEY: getEnv<string>('ACCESS_TOKEN_KEY'),
  REFRESH_TOKEN_KEY: getEnv<string>('REFRESH_TOKEN_KEY'),

  // Server
  SERVER_PORT: getEnv<number>('SERVER_PORT'),
  LOG_LEVEL: getEnv<'info' | 'debug' | 'trace' | 'warn' | 'error' | 'fatal'>(
    'LOG_LEVEL'
  ),
  NODE_ENV: getEnv<'development' | 'production' | 'test'>('NODE_ENV'),
  ALLOW_CORE_SETTINGS: getEnv<'true' | 'false'>('ALLOW_CORE_SETTINGS'),

  // Cors
  CORS_ALLOWED_SOURCES: getEnv<string>('CORS_ALLOWED_SOURCES').split(','),
  CORS_ALLOWED_METHODS: getEnv<string>('CORS_ALLOWED_METHODS'),
  CORS_ALLOWED_HEADERS: getEnv<string>('CORS_ALLOWED_HEADERS'),
};
