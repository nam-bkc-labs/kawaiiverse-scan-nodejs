const logEthDB = require("../models/log_eth");
const internalTxDB = require("../models/internal_tx");
const txErc20DB = require("../models/tx_erc20");
const txErc1155DB = require("../models/tx_erc1155");
const web3Service = require('../services/web3Service');

async function run() {
    // let txLogEthData = await logEthDB.findAll()
    // txLogEthData = JSON.stringify(txLogEthData)
    // txLogEthData = JSON.parse(txLogEthData)
    // for (let i = 0; i < txLogEthData.length; i++) {
    //     console.log(i);
    //     let block = await web3Service.GetBlock(txLogEthData[i].block_number)
    //     await logEthDB.update({timestamp: block.block.timestamp}, {
    //         where: {
    //             transaction_hash: txLogEthData[i].transaction_hash,
    //         },
    //     });
    // }
    //--internal
    // let txInternal = await internalTxDB.findAll()
    // txInternal = JSON.stringify(txInternal)
    // txInternal = JSON.parse(txInternal)
    // for (let i = 0; i < txInternal.length; i++) {
    //     console.log(i);
    //     let block = await web3Service.GetBlock(txInternal[i].block_number)
    //     await internalTxDB.update({timestamp: block.block.timestamp}, {
    //         where: {
    //             hash: txInternal[i].hash,
    //         },
    //     });
    // }
    // console.log("done");
    //--tx erc20
    // let txErc20Data = await txErc20DB.findAll();
    // txErc20Data = JSON.stringify(txErc20Data);
    // txErc20Data = JSON.parse(txErc20Data);
    // for (let i = 0; i < txErc20Data.length; i++) {
    //     console.log(i);
    //     let tx = await web3Service.GetTransaction(txErc20Data[i].tx_hash);
    //     let block = await web3Service.GetBlock(tx.txEthData.blockNumber);
    //     await txErc20DB.update({timestamp: block.block.timestamp}, {
    //         where: {
    //             tx_hash: txErc20Data[i].tx_hash,
    //         },
    //     });
    // }
    // console.log("done");


    //--tx erc1155
    let txErc1155Data = await txErc1155DB.findAll();
    txErc1155Data = JSON.stringify(txErc1155Data);
    txErc1155Data = JSON.parse(txErc1155Data);
    for (let i = 0; i < txErc1155Data.length; i++) {
        console.log(i);
        let tx = await web3Service.GetTransaction(txErc1155Data[i].tx_hash);
        let block = await web3Service.GetBlock(tx.txEthData.blockNumber);
        await txErc1155DB.update({timestamp: block.block.timestamp}, {
            where: {
                tx_hash: txErc1155Data[i].tx_hash,
            },
        });
    }
    console.log("done");
}

run();
