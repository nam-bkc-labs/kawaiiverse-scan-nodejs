'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('block_eths', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            number: {
                type: Sequelize.BIGINT,
            },
            hash: {
                type: Sequelize.STRING,
            },
            parentHash: {
                type: Sequelize.STRING,
            },
            nonce: {
                type: Sequelize.STRING,
            },
            sha3Uncles: {
                type: Sequelize.STRING,
            },
            logsBloom: {
                type: Sequelize.STRING(100000),
            },
            transactionsRoot: {
                type: Sequelize.STRING,
            },
            stateRoot: {
                type: Sequelize.STRING,
            },
            receiptsRoot: {
                type: Sequelize.STRING,
            },
            miner: {
                type: Sequelize.STRING,
            },
            difficulty: {
                type: Sequelize.STRING,
            },
            totalDifficulty: {
                type: Sequelize.STRING,
            },
            extraData: {
                type: Sequelize.STRING,
            },
            size: {
                type: Sequelize.STRING,
            },
            gasLimit: {
                type: Sequelize.STRING,
            },
            gasUsed: {
                type: Sequelize.STRING,
            },
            timestamp: {
                type: Sequelize.DATE,
            },
            totalTxs: {
                type: Sequelize.BIGINT,
            },
            uncles: {
                type: Sequelize.JSON,
            },
            signer: {
                type: Sequelize.STRING,
            },
            m2: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            finality: {
                type: Sequelize.BIGINT,
            },
            updateFinalityTime: {
                type: Sequelize.BIGINT,
            },
            e_tx: {
                type: Sequelize.BIGINT,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('block_eths');
    },
};
