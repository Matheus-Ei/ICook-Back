import { ENV } from '../constants/enviroment';

const dialect = ENV.DATABASE_DIALECT;
const database = ENV.DATABASE_NAME;
const host = ENV.DATABASE_HOST;
const port = Number(ENV.DATABASE_PORT);
const username = ENV.DATABASE_USER;
const password = ENV.DATABASE_PASSWORD;

export const CREDENTIALS = {
  development: {
    dialect,
    database: 'develop_' + database,
    host,
    port,
    username,
    password,
  },

  test: {
    dialect,
    database: 'test_' + database,
    host,
    port,
    username,
    password,
  },

  production: {
    dialect,
    database: 'production_' + database,
    host,
    port,
    username,
    password,
  },
};
