'use strict';
const Sequelize = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tx_erc721s', {
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tx_erc721s');
    },
};