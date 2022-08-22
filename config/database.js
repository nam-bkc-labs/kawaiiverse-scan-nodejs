const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.postgres.name, config.postgres.user, config.postgres.password, {
  dialect: config.postgres.dialect,
  logging: false,
  host: config.postgres.host,
  port: config.postgres.port,
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
    id: false,
    createdAt: false,
    updatedAt: false,
  },
});

module.exports = sequelize;
