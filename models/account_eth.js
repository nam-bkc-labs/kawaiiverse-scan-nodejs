const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('account_eths', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    hash: {type: Sequelize.STRING},
    balance: {type: Sequelize.STRING},
    balanceNumber: {type: Sequelize.BIGINT},
    code: {type: Sequelize.TEXT},
    minedBlock: {type: Sequelize.BIGINT},
    rewardCount: {type: Sequelize.BIGINT},
    logCount: {type: Sequelize.BIGINT, defaultValue: 0},
    contractCreation: {type: Sequelize.STRING},
    isContract: {type: Sequelize.BOOLEAN},
    storageAt: {type: Sequelize.STRING},
    status: {type: Sequelize.BOOLEAN, defaultValue: false},
    isToken: {type: Sequelize.BOOLEAN},
});

module.exports = Model;
