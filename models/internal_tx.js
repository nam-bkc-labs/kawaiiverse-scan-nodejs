const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('internal_txes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
    },
    hash: {
        type: Sequelize.STRING,
    },
    block_number: {
        type: Sequelize.BIGINT,
    },
    from: {
        type: Sequelize.STRING,
    },
    to: {
        type: Sequelize.STRING,
    },
    gas: {
        type: Sequelize.STRING,
    },
    gas_used: {
        type: Sequelize.STRING,
    },
    error: {
        type: Sequelize.TEXT,
    },
    input: {
        type: Sequelize.TEXT,
    },
    output: {
        type: Sequelize.TEXT,
    },
    value: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    timestamp: {
        type: Sequelize.STRING,
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
