const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('account', {
  address: { type: Sequelize.STRING, primaryKey: true },
  balance: { type: Sequelize.FLOAT },
  txn_count: { type: Sequelize.FLOAT },
  txs_id: { type: Sequelize.INTEGER },
}, {
  freezeTableName: true,
});

module.exports = Model;
