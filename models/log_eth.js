const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('log_eths', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    block_number: {
        type: Sequelize.BIGINT,
    },
    block_hash: {
        type: Sequelize.STRING,
    },
    transaction_hash: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    address_cosmos: {
        type: Sequelize.STRING,
    },
    data: {
        type: Sequelize.TEXT,
    },
    log_index: {
        type: Sequelize.INTEGER,
    },
    removed: {
        type: Sequelize.BOOLEAN,
    },
    topics: {
        type: Sequelize.JSONB,
    },
    transaction_index: {
        type: Sequelize.INTEGER,
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
