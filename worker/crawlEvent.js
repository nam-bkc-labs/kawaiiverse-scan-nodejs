const web3 = require("../connect/web3");
const logEthDB = require("../models/log_eth");
const txErc20DB = require("../models/tx_erc20");
const txErc1155DB = require("../models/tx_erc1155");
const internalTxDB = require("../models/internal_tx");
const settingDB = require("../models/setting");
const web3Service = require("../services/web3Service");
const txWorker = require("./tx");
const teleUtils = require("../utils/teleNoti");

let blockStart = 0;
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function run() {
    try {
        let blockSyncAt = await settingDB.findOne({});
        if (blockSyncAt) {
            blockSyncAt = blockSyncAt.toJSON();
            blockStart = blockSyncAt.block_crawl_event;
        }
        let blockNow = await web3Service.GetLatestBlockHeight();
        if (blockNow.err != null) {
            console.log(`error when get block lastest from onchain ${blockNow.err}`);
            return;
        }
        blockNow = blockNow.latestBlockHeight;
        for (let i = blockStart; i <= blockNow; i++) {
            console.log(`sync block ${i}`);
            let analysisBlockAndTxData = await analysisBlockAndTx(i);
            if (typeof analysisBlockAndTxData !== typeof 1) {
                console.log(`err sync block ${i} - e - ${analysisBlockAndTxData}`);
                await teleUtils.sendError(analysisBlockAndTxData);
                return;
            }

        }
        console.log(`sleep 3s`);
        await sleep(3000);
        run();
    } catch (e) {
        console.log(`error function run - e - ${e}`);
        return;
    }
}

async function analysisBlockAndTx(height) {
    try {
        let blockData = await web3Service.GetBlock(height);
        if (blockData.err != null) {
            console.log(`error when get block data from onchain ${blockData.err}`);
            return `error when get block data from onchain ${blockData.err}`;
        }
        blockData = blockData.block;

        if (blockData.transactions.length !== 0) {
            let txs = blockData.transactions;
            for (let i = 0; i < txs.length; i++) {
                //get tx receipt
                let txReceipt = await web3Service.GetTransactionReceipt(txs[i]);
                if (txReceipt.err != null) {
                    console.log(`error when get transaction receipt`, txReceipt.err);
                    return `error when get transaction receipt e- ${txReceipt.err}`;
                }
                //tx receipt
                let analysisTx = await txWorker.analysisTxReceipt(txReceipt.txEthReceiptData);
                if (typeof analysisTx === 'object' && analysisTx.length !== 0) {
                    await logEthDB.bulkCreate(analysisTx);
                } else if (typeof analysisTx !== 'object') {
                    return `error when analysis tx receipt ${blockData.err}`;
                }
                //tx erc20
                let analysisTxERC20 = await txWorker.analysisTxTypeERC20(txReceipt.txEthReceiptData);
                if (typeof analysisTxERC20 === 'object' && analysisTxERC20.length !== 0) {
                    await txErc20DB.bulkCreate(analysisTxERC20);
                } else if (typeof analysisTxERC20 !== 'object') {
                    return `error when analysis tx erc20 ${analysisTxERC20.err}`;
                }
                //tx erc1155
                let analysisTxERC1155 = await txWorker.analysisTxTypeERC1155(txReceipt.txEthReceiptData);
                if (typeof analysisTxERC1155 === 'object' && analysisTxERC1155.length !== 0) {
                    await txErc1155DB.bulkCreate(analysisTxERC1155);
                } else if (typeof analysisTxERC1155 !== 'object') {
                    return `error when analysis tx erc1155 ${analysisTxERC1155.err}`;
                }
                // debugInternalTx
                let debugInternalTx = await txWorker.debugTxInternal(txs[i], height);
                if (typeof debugInternalTx === 'object' && debugInternalTx.length !== 0) {
                    await internalTxDB.bulkCreate(debugInternalTx);
                } else if (typeof debugInternalTx !== 'object') {
                    return `error when debug internal tx ${debugInternalTx.err}`;
                }
            }
        }
        let blockSync = await settingDB.findOne({});
        if (blockSync) {
            blockSync = blockSync.toJSON();
            await settingDB.update({block_crawl_event: height, updated_at: new Date()}, {
                where: {
                    id: blockSync.id,
                },
            });
        } else {
            await settingDB.create({
                block_crawl_event: height,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        return 1;
    } catch (e) {
        console.log(e);
        return `error when analysisBlockAndTx ${e}`;
    }

}

run();
