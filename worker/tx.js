const logEthDB = require("../models/log_eth");

module.exports = {
    analysisTxReceipt: async (data) => {
        try {
            let items = [];
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
                        items.push({
                            block_number: data.blockNumber,
                            block_hash: data.blockHash,
                            transaction_hash: data.transactionHash.toUpperCase(),
                            address: logs[i].address,
                            data: logs[i].data,
                            log_index: logs[i].logIndex,
                            removed: logs[i].removed,
                            topics: logs[i].topics,
                            transaction_index: logs[i].transactionIndex,
                            created_at: new Date(),
                            updated_at: new Date(),
                        });
                    }
                }
            }
            return items;
        } catch (e) {
            return e;
        }
    },
};
