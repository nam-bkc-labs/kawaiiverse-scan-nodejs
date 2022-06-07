const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('internal_call_txes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    hash: {
        type: Sequelize.STRING,
    },
    error: {
        type: Sequelize.STRING,
    },
    from: {
        type: Sequelize.STRING,
    },
    gas: {
        type: Sequelize.STRING,
    },
    gas_used: {
        type: Sequelize.STRING,
    },
    input: {
        type: Sequelize.STRING,
    },
    type: {
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
