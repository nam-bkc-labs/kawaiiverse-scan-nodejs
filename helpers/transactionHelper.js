const web3Service = require('../services/web3Service');
const accountHelper = require('./accountHelper');
const web3 = require('../connect/web3');
const txEthModel = require('../models/tx_eth');
const teleUtils = require('../utils/teleNoti');

module.exports = {
  crawlTransaction: async (hashCosmos, hash, time) => {
    try {
      const ethData = await web3Service.GetTransaction(hash);
      if (ethData.err !== null) {
        console.log(`failed to query GetTransaction by tx hash eth using web3 service,${ethData.err}`);
        await teleUtils.sendError(`failed to query GetTransaction by tx hash eth using web3 service,${ethData.err}`);
        return -1;
      }
      const tx = {};
      tx.blockHash = ethData.txEthData.blockHash.toLowerCase();
      if (ethData.txEthData.blockHash !== null || ethData.txEthData.blockHash) {
        tx.blockHash = ethData.txEthData.blockHash.toLowerCase();
      }

      tx.blockNumber = ethData.txEthData.blockNumber;
      tx.from = ethData.txEthData.from.toLowerCase();
      if (ethData.txEthData.from !== null || ethData.txEthData.from) {
        tx.from = ethData.txEthData.from.toLowerCase();
      }
      tx.gas = ethData.txEthData.gas;
      tx.gasPrice = ethData.txEthData.gasPrice;
      tx.maxFeePerGas = ethData.txEthData.maxFeePerGas;
      tx.maxPriorityFeePerGas = ethData.txEthData.maxPriorityFeePerGas;
      tx.hash = ethData.txEthData.hash.toLowerCase();
      if (ethData.txEthData.hash !== null || ethData.txEthData.hash) {
        tx.hash = ethData.txEthData.hash.toLowerCase();
      }
      tx.input = ethData.txEthData.input;
      tx.nonce = ethData.txEthData.nonce;

      if (ethData.txEthData.to !== null || ethData.txEthData.to) {
        let accountDetailTo = await accountHelper.getAccountDetail(ethData.txEthData.to);
        if (accountDetailTo === -1) {
          return -1;
        }
        tx.to = ethData.txEthData.to.toLowerCase();
      }

      tx.transactionIndex = ethData.txEthData.transactionIndex;
      tx.value = ethData.txEthData.value;
      tx.type = ethData.txEthData.type;
      tx.accessList = ethData.txEthData.accessList;
      tx.chainId = ethData.txEthData.chainId;
      tx.v = ethData.txEthData.v;
      tx.r = ethData.txEthData.r;
      tx.s = ethData.txEthData.s;
      tx.hashCosmos = hashCosmos.toLowerCase();
      if (hashCosmos !== null || hashCosmos) {
        tx.hashCosmos = hashCosmos.toLowerCase();
      }

      let ethReceiptData = await web3Service.GetTransactionReceipt(hash);
      if (ethReceiptData.err !== null) {
        console.log(`failed to query GetTransactionReceipt by tx hash eth using web3 service, ${ethReceiptData.err}`);
        await teleUtils.sendError(`failed to query GetTransactionReceipt by tx hash eth using web3 service, ${ethReceiptData.err}`);
        return -1;
      }

      let status;

      if (typeof ethReceiptData.txEthReceiptData.status === 'boolean') {
        status = ethReceiptData.txEthReceiptData.status;
      } else {
        status = web3.utils.hexToNumber(ethReceiptData.txEthReceiptData.status);
      }
      if (status === '1' || status === 1 || status === '0x1') {
        status = true;
      }
      if (status === '0' || status === 0 || status === '0x0') {
        status = false;
      }
      tx.status = status;
      tx.cumulativeGasUsed = ethReceiptData.txEthReceiptData.cumulativeGasUsed;
      tx.timestamp = time;
      tx.gasUsed = ethReceiptData.txEthReceiptData.gasUsed;

      if (!Number.isInteger(tx.cumulativeGasUsed)) {
        tx.cumulativeGasUsed = web3.utils.hexToNumber(tx.cumulativeGasUsed);
      }
      if (!Number.isInteger(tx.gasUsed)) {
        tx.gasUsed = web3.utils.hexToNumber(tx.gasUsed);
      }
      if (!Number.isInteger(tx.blockNumber)) {
        tx.blockNumber = web3.utils.hexToNumber(tx.blockNumber);
      }
      if (!Number.isInteger(tx.gas)) {
        tx.gas = web3.utils.hexToNumber(tx.gas);
      }
      if (!Number.isInteger(tx.nonce)) {
        tx.nonce = web3.utils.hexToNumber(tx.nonce);
      }
      if (!Number.isInteger(tx.transactionIndex)) {
        tx.transactionIndex = web3.utils.hexToNumber(tx.transactionIndex);
      }

      let queryTxDB = await txEthModel.findOne({ where: { hash: hash } });
      if (!queryTxDB) {
        await txEthModel.create(tx);
        return 1;
      }
      await txEthModel.update(tx, { where: { hash: hash } });

      return 1;
    } catch (e) {
      console.log(`failed to crawl transaction helpers, ${e}`);
      await teleUtils.sendError(`failed to crawl transaction helpers, ${e}}`);
      return -1;
    }
  },

};
