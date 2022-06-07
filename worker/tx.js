require('dotenv').config();
const web3 = require("../connect/web3").web3();
const txErc20DB = require("../models/tx_erc20");
const txErc1155DB = require("../models/tx_erc1155");
const internalTxDB = require("../models/internal_tx");
const logEthDB = require("../models/log_eth");
const axios = require('axios');
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
            return `error when analysis tx receipt - ${e}`;
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
                                log_index: logs[i].logIndex.toString(),
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
                                log_index: logs[i].logIndex.toString(),
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
            console.log(e);
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
                                log_index: logs[i].logIndex.toString(),
                                tx_id: logs[i].id,
                            },
                        });
                        if (!isCheckExist) {
                            txErc1155.push({
                                address: logs[i].address.toLowerCase(),
                                tx_hash: logs[i].transactionHash.toUpperCase(),
                                from: "0x" + logs[i].topics[1].substring(26, 66).toLowerCase(),
                                to: "0x" + logs[i].topics[2].substring(26, 66).toLowerCase(),
                                token_id: web3.utils.hexToNumberString(logs[i].data.substring(0, 66)),
                                value: web3.utils.hexToNumberString("0x" + logs[i].data.substring(67, 130)),
                                status: data.status,
                                log_index: logs[i].logIndex.toString(),
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
    debugTxInternal: async (hash, height) => {
        try {
            let data = await axios.post(`${process.env.RPC_ORAIE}`, {
                "jsonrpc": "2.0",
                "method": "debug_traceTransaction",
                "params": [
                    `${hash}`,
                    {
                        "tracer": "callTracer",
                        "timeout": "10s",
                    },
                ],
                "id": 1,
            });
            data = data.data;
            const res = data.result;
            let internalTx = [];
            internalTx.push({
                hash: hash.toUpperCase(),
                block_number: height,
                from: (res.from || '').toLowerCase(),
                to: (res.to || '').toLowerCase(),
                value: web3.utils.hexToNumberString(res.value),
                gas: (res.gas || ''),
                gas_used: (res.gasUsed || ''),
                error: (res.error || ''),
                input: (res.input || ''),
                output: (res.output || ''),
                type: (res.type || ''),
                created_at: new Date(),
                updated_at: new Date(),
            });
            if (Object.prototype.hasOwnProperty.call(res, 'calls')) {
                const calls = res.calls;
                let analysisInternal = await listInternal(calls, hash, height);
                internalTx = internalTx.concat(analysisInternal);
            }
            if (internalTx.length > 0) {
                await internalTxDB.destroy({
                    where: {hash: hash.toUpperCase()},
                });
            }
            // return
            return internalTx;
        } catch (e) {
            console.log(e);
            return `error when analysis tx type ERC1155 - ${e}`;
        }
    },

};

async function listInternal(resultCalls, txHash, blockNumber) {
    let internals = [];
    for (let i = 0; i < resultCalls.length; i++) {
        const call = resultCalls[i];
        // if (Object.prototype.hasOwnProperty.call(call, 'value') && call.value !== '0x0') {
        internals.push({
            hash: txHash.toUpperCase(),
            block_number: blockNumber,
            from: (call.from || '').toLowerCase(),
            to: (call.to || '').toLowerCase(),
            value: web3.utils.hexToNumberString(call.value),
            gas: (call.gas || ''),
            gas_used: (call.gasUsed || ''),
            error: (call.error || ''),
            input: (call.input || ''),
            output: (call.output || ''),
            type: (call.type || ''),
            created_at: new Date(),
            updated_at: new Date(),

        });
        // }
        if (call.calls) {
            const childInternal = await listInternal(call.calls, txHash, blockNumber);
            internals = internals.concat(childInternal);
        }
    }
    return internals;
}
