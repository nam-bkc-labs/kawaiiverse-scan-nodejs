const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('transaction_v1', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  height: { type: Sequelize.INTEGER },
  tx_hash: { type: Sequelize.STRING },
  code: { type: Sequelize.INTEGER },
  messages: { type: Sequelize.JSONB },
  raw_log: { type: Sequelize.JSONB },
  signatures: { type: Sequelize.JSONB },
  memo: { type: Sequelize.STRING },
  fee: { type: Sequelize.STRING },
  amount: { type: Sequelize.JSONB },
  gas_wanted: { type: Sequelize.STRING },
  gas_used: { type: Sequelize.STRING },
  timestamp: { type: Sequelize.DATE },
});

module.exports = Model;
