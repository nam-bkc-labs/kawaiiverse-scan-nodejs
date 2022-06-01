'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tx_eths', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            hashCosmos: {
                type: Sequelize.STRING,
            },
            hash: {
                type: Sequelize.STRING,
            },
            nonce: {
                type: Sequelize.BIGINT,
            },
            blockHash: {
                type: Sequelize.STRING,
            },
            blockNumber: {
                type: Sequelize.BIGINT,
            },
            transactionIndex: {
                type: Sequelize.INTEGER,
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
            gas: {
                type: Sequelize.BIGINT,
            },
            gasPrice: {
                type: Sequelize.STRING,
            },
            input: {
                type: Sequelize.TEXT,
            },
            contractAddress: {
                type: Sequelize.STRING,
            },
            cumulativeGasUsed: {
                type: Sequelize.BIGINT,
            },
            gasUsed: {
                type: Sequelize.BIGINT,
            },
            from_model: {
                type: Sequelize.STRING,
            },
            to_model: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            timestamp: {
                type: Sequelize.DATE,
            },
            i_tx: {
                type: Sequelize.INTEGER,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tx_eths');
    },
};
