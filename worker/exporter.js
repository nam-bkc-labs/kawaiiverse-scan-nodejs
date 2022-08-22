const crypto = require('crypto');
const dbService = require('../services/dbService');
const web3Service = require('../services/web3Service');
const cosmosService = require('../services/cosmosService');
const transactionHelper = require('../helpers/transactionHelper');
const blockHelper = require('../helpers/blockHelper');
const teleUtils = require('../utils/teleNoti');

async function sync() {
  try {
    //return dbHeight, totalTxs, err
    const blockLateHeight = await dbService.QueryLatestBlockHeight();
    if (blockLateHeight.dbHeight === -1) {
      console.log(`${blockLateHeight.err},failed to query the latest block height on the active network`);
      await teleUtils.sendError(`${blockLateHeight.err},failed to query the latest block height on the active network`);
      return;
    }

    // return latestBlockHeight, err
    const latestBlockHeight = await web3Service.GetLatestBlockHeight();
    if (latestBlockHeight.latestBlockHeight === -1) {
      console.log(`${latestBlockHeight.err},failed to query the latest block height on the active network`);
      await teleUtils.sendError(`${latestBlockHeight.err},failed to query the latest block height on the active network`);
      return;
    }

    for (let i = blockLateHeight.dbHeight + 1; i <= latestBlockHeight.latestBlockHeight; i++) {
      const updateValidator = (i - blockLateHeight.dbHeight) % 10 === 0 || (i === blockLateHeight.dbHeight + 1);
      const crawlBlockEth = await blockHelper.crawlBlock(i);
      if (crawlBlockEth !== 1) {
        break;
      }

      const crawTxEth = await getTxEthByBlock(i);
      if (crawTxEth !== 1) {
        break;
      }

      console.log(`synced block ${i}/${latestBlockHeight.latestBlockHeight}`);
    }
  } catch (e) {
    console.log(`failed to sync e = ${e}`);
    await teleUtils.sendError(`failed to sync e = ${e}`);
  }
}

async function getTxEthByBlock(height) {
  try {
    const blockData = await cosmosService.GetBlockByApi(height);
    const time = blockData.block.block.header.time;

    const txs = blockData.block.block.data.txs;
    for (let i = 0; i < txs.length; i++) {
      const txHashCosmos = crypto.createHash('sha256').update(Buffer.from(txs[i], 'base64')).digest('hex');
      const txDetail = await cosmosService.GetDetailTxsByNewCosmos(txHashCosmos);
      if (txDetail.err !== null) {
        console.log(`failed to query Txs by tx hash using rpc client,${txDetail.err}`);
        await teleUtils.sendError(`failed to query Txs by tx hash using rpc client,${txDetail.err}`);
        return -1;
      }
      const messages = txDetail.tmpTx.tx.body.messages;
      for (let j = 0; j < messages.length; j++) {
        const txEth = messages[j].hash;
        const crawTx = await transactionHelper.crawlTransaction(txHashCosmos, txEth, time);
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
