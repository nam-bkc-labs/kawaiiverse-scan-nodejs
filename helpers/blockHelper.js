const web3Service = require('../services/web3Service');
const web3 = require('../connect/web3');
const blockEthModel = require("../models/block_eth");
const teleUtils = require('../utils/teleNoti');

module.exports = {
    crawlBlock: async (height) => {
        try {
            let blockData = await web3Service.GetBlock(height);
            if (blockData.err !== null) {
                console.log(`failed to query GetBlock by tx hash eth using web3 service,${blockData.err}`);
                await teleUtils.sendError(`failed to query GetBlock by tx hash eth using web3 service,${blockData.err}`);
                return -1;
            }
            let b = {};

            b.number = blockData.block.number;
            b.hash = blockData.block.hash.toLowerCase();
            b.parentHash = blockData.block.parentHash.toLowerCase();
            b.nonce = blockData.block.nonce;
            b.sha3Uncles = blockData.block.sha3Uncles.toLowerCase();
            b.logsBloom = blockData.block.logsBloom.toLowerCase();
            b.transactionsRoot = blockData.block.transactionsRoot.toLowerCase();
            b.stateRoot = blockData.block.stateRoot.toLowerCase();
            b.receiptsRoot = blockData.block.receiptsRoot.toLowerCase();
            b.miner = blockData.block.miner.toLowerCase();
            b.difficulty = blockData.block.difficulty;
            b.totalDifficulty = blockData.block.totalDifficulty;
            b.extraData = blockData.block.extraData.toLowerCase();
            b.size = blockData.block.size;
            b.gasLimit = blockData.block.gasLimit;
            b.gasUsed = blockData.block.gasUsed;
            b.timestamp = blockData.block.timestamp;
            b.totalTxs = blockData.block.transactions.length;
            // b.uncles = blockData.block.uncles
            // b.signer = blockData.block.signer
            // b.m2 = blockData.block.m2
            // b.status = blockData.block.status
            // b.finality = blockData.block.finality
            // b.updateFinalityTime = blockData.block.updateFinalityTime
            // b.e_tx = blockData.block.e_tx

            if (!Number.isInteger(b.gasUsed)) {
                b.gasUsed = web3.utils.hexToNumber(b.gasUsed);
            }
            if (!Number.isInteger(b.number)) {
                b.number = web3.utils.hexToNumber(b.number);
            }
            if (!Number.isInteger(b.size)) {
                b.size = web3.utils.hexToNumber(b.size);
            }

            let queryBlockEthDB = await blockEthModel.findOne({where: {number: height}});
            if (!queryBlockEthDB) {
                await blockEthModel.create(b);
                return 1;
            }
            await blockEthModel.update(b, {where: {number: height}});
            return 1;

        } catch (e) {
            console.log(`failed to crawl block helpers ,${e}`);
            await teleUtils.sendError(`failed to crawl block helpers ,${e}`);
            return -1;
        }
    },
};
