'use strict';
const Sequelize = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tx_erc1155s', {
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
            token_id: {
                type: Sequelize.STRING,
            },
            value: {
                type: Sequelize.STRING,
            },
            log_index: {
                type: Sequelize.STRING,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tx_erc1155s');
    },
};
