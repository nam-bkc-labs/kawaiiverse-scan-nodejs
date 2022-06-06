'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('internal_txes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            hash: {
                type: Sequelize.STRING,
            },
            from: {
                type: Sequelize.STRING,
            },
            to: {
                type: Sequelize.STRING,
            },
            block_number: {
                type: Sequelize.BIGINT,
            },
            block_hash: {
                type: Sequelize.STRING,
            },
            value: {
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
        await queryInterface.dropTable('internal_txes');
    },
};
