const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('block_eths', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: Sequelize.BIGINT},
    hash: {type: Sequelize.STRING, toLowerCase: true},
    parentHash: {type: Sequelize.STRING},
    nonce: {type: Sequelize.STRING},
    sha3Uncles: {type: Sequelize.STRING},
    logsBloom: {type: Sequelize.STRING},
    transactionsRoot: {type: Sequelize.STRING},
    stateRoot: {type: Sequelize.STRING},
    receiptsRoot: {type: Sequelize.STRING},
    miner: {type: Sequelize.STRING},
    difficulty: {type: Sequelize.STRING},
    totalDifficulty: {type: Sequelize.STRING},
    extraData: {type: Sequelize.STRING},
    size: {type: Sequelize.BIGINT},
    gasLimit: {type: Sequelize.BIGINT},
    gasUsed: {type: Sequelize.BIGINT},
    timestamp: {type: Sequelize.DATE},
    totalTxs: {type: Sequelize.BIGINT},
    uncles: {type: Sequelize.JSON},
    signer: {type: Sequelize.STRING},
    m2: {type: Sequelize.STRING},
    status: {type: Sequelize.BOOLEAN, defaultValue: false},
    finality: {type: Sequelize.BIGINT, defaultValue: 0},
    updateFinalityTime: {type: Sequelize.BIGINT},
    e_tx: {type: Sequelize.BIGINT, defaultValue: 0},
});

module.exports = Model;
