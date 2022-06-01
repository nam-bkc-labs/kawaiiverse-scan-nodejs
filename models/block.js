const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Model = sequelize.define('block', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    proposer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    moniker: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    block_hash: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parent_hash: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    num_precommits: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    num_txs: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    total_txs: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    txs: {
        type: Sequelize.ARRAY(DataTypes.STRING),
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
    },

});

module.exports = Model;
