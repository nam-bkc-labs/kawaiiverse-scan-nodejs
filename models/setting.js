const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('settings', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  block_crawl_event: {
    type: Sequelize.BIGINT,
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

module.exports = Model;
