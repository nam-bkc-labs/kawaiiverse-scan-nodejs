const web3 = require("../connect/web3").web3();
const txErc20DB = require("../models/tx_erc20");
const txErc1155DB = require("../models/tx_erc1155");
const logEthDB = require("../models/log_eth");
module.exports = {
    analysisTxReceipt: async (data) => {
        try {
            let txReceipt = [];
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
                        txReceipt.push({
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
            return txReceipt;
        } catch (e) {
            return e;
        }
    },
    analysisTxTypeERC20: async (data) => {
        try {
            let txErc20 = [];
            if (data.logs.length !== 0) {
                let logs = data.logs;
                for (let i = 0; i < logs.length; i++) {
                    if (logs[i].topics[0] === "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
                        let isCheckExist = await txErc20DB.findOne({
                            where: {
                                tx_hash: data.transactionHash.toUpperCase(),
                                log_index: logs[i].logIndex,
                                tx_id: logs[i].id,
                            },
                        });
                        if (!isCheckExist) {
                            txErc20.push({
                                address: logs[i].address.toLowerCase(),
                                tx_hash: logs[i].transactionHash.toUpperCase(),
                                from: "0x" + logs[i].topics[1].substring(26, 66).toLowerCase(),
                                to: "0x" + logs[i].topics[2].substring(26, 66).toLowerCase(),
                                value: web3.utils.fromWei(web3.utils.hexToNumberString(logs[i].data), "ether"),
                                status: data.status,
                                log_index: logs[i].logIndex,
                                tx_id: logs[i].id,
                                created_at: new Date(),
                                updated_at: new Date(),
                            });
                        }
                    }

                }
            }
            return txErc20;
        } catch (e) {
            return `error when analysis tx type ERC20 - ${e}`;
        }
    },
    analysisTxTypeERC1155: async (data) => {
        try {
            let txErc1155 = [];
            if (data.logs.length !== 0) {
                let logs = data.logs;
                for (let i = 0; i < logs.length; i++) {
                    if (logs[i].topics[0] === "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62") {
                        let isCheckExist = await txErc1155DB.findOne({
                            where: {
                                tx_hash: data.transactionHash.toUpperCase(),
                                log_index: logs[i].logIndex,
                                tx_id: logs[i].id,
                            },
                        });
                        if (!isCheckExist) {
                            txErc1155.push({
                                address: logs[i].address.toLowerCase(),
                                tx_hash: logs[i].transactionHash.toUpperCase(),
                                from: "0x" + logs[i].topics[1].substring(26, 66).toLowerCase(),
                                to: "0x" + logs[i].topics[2].substring(26, 66).toLowerCase(),
                                tokenId: web3.utils.hexToNumberString(logs[i].data.substring(0, 66)),
                                value: web3.utils.hexToNumberString("0x" + logs[i].data.substring(67, 130)),
                                status: data.status,
                                log_index: logs[i].logIndex,
                                tx_id: logs[i].id,
                                created_at: new Date(),
                                updated_at: new Date(),
                            });
                        }
                    }

                }
            }
            return txErc1155;
        } catch (e) {
            return `error when analysis tx type ERC1155 - ${e}`;
        }
    },
};
