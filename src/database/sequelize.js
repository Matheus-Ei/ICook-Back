require('dotenv').config();

const dialect = process.env.DATABASE_DIALECT;
const database = process.env.DATABASE_NAME;
const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const databaseUseSsl = process.env.DATABASE_USE_SSL === 'true';

module.exports = {
  development: {
    dialect,
    database: 'develop_' + database,
    host,
    port,
    username,
    password,

    dialectOptions: databaseUseSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },

  test: {
    dialect,
    database: 'test_' + database,
    host,
    port,
    username,
    password,

    dialectOptions: databaseUseSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },

  production: {
    dialect,
    database: 'production_' + database,
    host,
    port,
    username,
    password,

    dialectOptions: databaseUseSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },
};
