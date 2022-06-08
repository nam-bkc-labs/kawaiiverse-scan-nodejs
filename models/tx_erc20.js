const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('tx_erc20s', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    address: {
        type: Sequelize.STRING,
    },
    tx_hash: {
        type: Sequelize.STRING,
    },
    from: {
        type: Sequelize.STRING,
    },
    to: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
    log_index: {
        type: Sequelize.STRING,
    },
    tx_id: {
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
