const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('transaction_eth', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    hash: {
        type: Sequelize.STRING,
    },
    cosmos_hash: {
        type: Sequelize.STRING,
    },

});

module.exports = Model;
