const logEthDB = require("../models/log_eth");
const Sequelize = require('sequelize');

module.exports = {
    analysisTxReceipt: async (data) => {
        try {
            let logs = [];
            if (data.logs.length !== 0) {
                let logs = data.logs;
                for (let i = 0; i < logs.length; i++) {
                    let isCheckExist = await logEthDB.findOne({
                        where: {
                            block_number: data.blockNumber,
                            transaction_hash: data.transactionHash.toUpperCase(),
                            transaction_index: logs[i].transactionIndex,
                            log_index: logs[i].logIndex,
                        },
                    });
                    if (!isCheckExist) {
                        logs.push({
                            block_number: data.blockNumber,
                            block_hash: data.blockHash,
                            transaction_hash: data.transactionHash.toUpperCase(),
                            address: logs[i].address,
                            data: logs[i].data,
                            log_index: logs[i].logIndex,
                            removed: logs[i].removed,
                            topics: logs[i].topics,
                            status: data.status,
                            transaction_index: logs[i].transactionIndex,
                            created_at: new Date(),
                            updated_at: new Date(),
                        });
                    }
                }
            }
            return logs;
        } catch (e) {
            return e;
        }
    },
    analysisTxTypeERC20: async (data) => {
        try {
            console.log(JSON.stringify(data));
            let txErc20 = [];
            if (data.logs.length !== 0) {
                let logs = data.logs;
                for (let i = 0; i < logs.length; i++) {
                    let isCheckExist = await logEthDB.findOne({
                        where: {
                            block_number: data.blockNumber,
                            transaction_hash: data.transactionHash.toUpperCase(),
                            transaction_index: logs[i].transactionIndex,
                            log_index: logs[i].logIndex,
                        },
                    });
                    if (!isCheckExist) {
                        logs.push({
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
                            status: data.status,
                            created_at: new Date(),
                            updated_at: new Date(),
                        });
                    }
                }
            }
        } catch (e) {
            return e;
        }
    },
};
