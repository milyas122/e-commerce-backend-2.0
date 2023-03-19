const { Sequelize } = require("sequelize");
const config = require("config");

const dbName = config.get("DB_NAME");
const dbUsername = config.get("DB_USERNAME");
const dbPassword = config.get("DB_PASSWORD");
const dbHost = config.get("DB_HOST");
const dbDialect = config.get("DB_DIALECT");

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

module.exports = sequelize;
