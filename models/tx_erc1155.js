const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('tx_erc1155s', {
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
    tokenId: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.STRING,
    },
    log_index: {
        type: Sequelize.BIGINT,
    },
    tx_id: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.BOOLEAN,
        default: false,
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