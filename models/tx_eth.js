const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('tx_eths', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hashCosmos: {type: Sequelize.STRING, lowerCase: true},
    hash: {type: Sequelize.STRING, lowerCase: true},
    nonce: {type: Sequelize.INTEGER},
    blockHash: {type: Sequelize.STRING, lowerCase: true},
    blockNumber: {type: Sequelize.BIGINT},
    transactionIndex: {type: Sequelize.INTEGER},
    from: {type: Sequelize.STRING, lowerCase: true},
    to: {type: Sequelize.STRING, lowerCase: true},
    value: {type: Sequelize.STRING},
    gas: {type: Sequelize.BIGINT},
    gasPrice: {type: Sequelize.STRING},
    input: {type: Sequelize.STRING(100000)},
    contractAddress: {type: Sequelize.STRING, lowerCase: true},
    cumulativeGasUsed: {type: Sequelize.BIGINT},
    gasUsed: {type: Sequelize.BIGINT},
    from_model: {type: Sequelize.DataTypes.JSON},
    to_model: {type: Sequelize.DataTypes.JSON},
    status: {type: Sequelize.DataTypes.JSON},
    timestamp: {type: Sequelize.DataTypes.DATE},
    i_tx: {type: Sequelize.DataTypes.INTEGER, defaultValue: 0},
});

module.exports = Model;
