'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('account_eths', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            hash: {type: Sequelize.STRING},
            balance: {type: Sequelize.STRING},
            balanceNumber: {type: Sequelize.BIGINT},
            code: {type: Sequelize.TEXT},
            minedBlock: {type: Sequelize.BIGINT},
            rewardCount: {type: Sequelize.BIGINT},
            logCount: {type: Sequelize.BIGINT, defaultValue: 0},
            contractCreation: {type: Sequelize.STRING},
            isContract: {type: Sequelize.BOOLEAN},
            storageAt: {type: Sequelize.STRING},
            status: {type: Sequelize.BOOLEAN, defaultValue: false},
            isToken: {type: Sequelize.BOOLEAN},

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('account_eths');
    },
};
