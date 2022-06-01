let crypto = require('crypto');
const web3 = require("../connect/web3");
const dbService = require("../services/dbService");


const web3Service = require("../services/web3Service");
const cosmosService = require("../services/cosmosService");

const transactionHelper = require("../helpers/transactionHelper");
const blockHelper = require("../helpers/blockHelper");

const teleUtils = require("../utils/teleNoti");

async function sync() {
    try {
        //return dbHeight, totalTxs, err
        let blockLateHeight = await dbService.QueryLatestBlockHeight();
        if (blockLateHeight.dbHeight === -1) {
            console.log(`${blockLateHeight.err},failed to query the latest block height on the active network`);
            await teleUtils.sendError(`${blockLateHeight.err},failed to query the latest block height on the active network`);
            return;
        }

        // return latestBlockHeight, err
        let latestBlockHeight = await web3Service.GetLatestBlockHeight();
        if (latestBlockHeight.latestBlockHeight === -1) {
            console.log(`${latestBlockHeight.err},failed to query the latest block height on the active network`);
            await teleUtils.sendError(`${latestBlockHeight.err},failed to query the latest block height on the active network`);
            return;
        }

        for (let i = blockLateHeight.dbHeight + 1; i <= latestBlockHeight.latestBlockHeight; i++) {
            let updateValidator = false;
            if ((i - blockLateHeight.dbHeight) % 10 === 0 || (i === blockLateHeight.dbHeight + 1)) {
                updateValidator = true;
            }
            let crawlBlockEth = await blockHelper.crawlBlock(i);
            if (crawlBlockEth !== 1) {
                break;
            }

            let crawTxEth = await getTxEthByBlock(i);
            if (crawTxEth !== 1) {
                break;
            }

            console.log(`synced block ${i}/${latestBlockHeight.latestBlockHeight}`);

        }
        return;
    } catch (e) {
        console.log(`failed to sync e = ${e}`);
        await teleUtils.sendError(`failed to sync e = ${e}`);
        return;
    }
}

async function getTxEthByBlock(height) {
    try {
        let blockData = await cosmosService.GetBlockByApi(height);
        let time = blockData.block.block.header.time;

        let txs = blockData.block.block.data.txs;
        for (let i = 0; i < txs.length; i++) {
            let txHashCosmos = crypto.createHash('sha256').update(Buffer.from(txs[i], 'base64')).digest('hex');
            let txDetail = await cosmosService.GetDetailTxsByNewCosmos(txHashCosmos);
            if (txDetail.err !== null) {
                console.log(`failed to query Txs by tx hash using rpc client,${txDetail.err}`);
                await teleUtils.sendError(`failed to query Txs by tx hash using rpc client,${txDetail.err}`);
                return -1;
            }
            let messages = txDetail.tmpTx.tx.body.messages;
            for (let j = 0; j < messages.length; j++) {
                let txEth = messages[j].hash;
                let crawTx = await transactionHelper.crawlTransaction(txHashCosmos, txEth, time);
                if (crawTx !== 1) {
                    return -1;
                }
            }
        }
        return 1;
    } catch (e) {
        console.log(`failed when getTxEthByBlock e ${e}`);
        await teleUtils.sendError(`failed when getTxEthByBlock e ${e}`);
        return -1;
    }

}


sync();

