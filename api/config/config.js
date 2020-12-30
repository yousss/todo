require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_DEV_URL_DATABASE,
    username: process.env.DB_DEV_URL_USERNAME,
    password: process.env.DB_DEV_URL_PASSWORD,
    host: process.env.DB_DEV_URL_HOST,
    dialect: 'postgres',
  },
  test: {
    database: 'todo-test',
    use_env_variables: 'DB_TEST_URL',
    dialect: 'postgres',
  },
  production: {
    database: 'todo-pro',
    use_env_variables: 'DB_PRO_URL',
    dialect: 'postgres',
  },
};
