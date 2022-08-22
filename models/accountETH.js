const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('account_eth', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  hash: { type: Sequelize.STRING },
  balance: { type: Sequelize.STRING, defaultValue: 0 },
  code: { type: Sequelize.TEXT, defaultValue: '0x' },
  contract_creation: { type: Sequelize.STRING },
  is_contract: { type: Sequelize.STRING, defaultValue: false },
  is_token: { type: Sequelize.BOOLEAN, defaultValue: false },
  status: { type: Sequelize.BOOLEAN, defaultValue: false },
}, {
  freezeTableName: true,
});

module.exports = Model;
