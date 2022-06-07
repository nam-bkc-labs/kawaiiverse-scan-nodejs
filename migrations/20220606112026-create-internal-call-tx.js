'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('internal_call_txes', {
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('internal_call_txes');
    },
};
