require('dotenv').config();
const development = {
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};
const test = {
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};
const production = {
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};

module.exports = { development, test, production };
