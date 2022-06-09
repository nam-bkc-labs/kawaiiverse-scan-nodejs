const web3 = require("../connect/web3").web3();
let erc1155DB = require("../models/tx_erc1155");
const web3Service = require('../services/web3Service');
const txErc1155DB = require('../models/tx_erc1155');

async function run() {
    console.log("vao day");

    let erc1155Data = await erc1155DB.findAll();
    erc1155Data = JSON.stringify(erc1155Data);
    erc1155Data = JSON.parse(erc1155Data);
    for (let i = 0; i < erc1155Data.length; i++) {
        console.log(i);
        let txReceipt = await web3Service.GetTransactionReceipt(erc1155Data[i].tx_hash);
        let logs = txReceipt.txEthReceiptData.logs;
        for (let j = 0; j < logs.length; j++) {
            let block = await web3Service.GetBlock(txReceipt.txEthReceiptData.blockNumber);
            if (logs[j].topics[0] === "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62") {
                await txErc1155DB.update({
                    address: logs[j].address.toLowerCase(),
                    from: "0x" + logs[j].topics[2].substring(26, 66).toLowerCase(),
                    to: "0x" + logs[j].topics[3].substring(26, 66).toLowerCase(),
                    token_id: web3.utils.hexToNumberString(logs[j].data.substring(0, 66)),
                    value: web3.utils.hexToNumberString("0x" + logs[j].data.substring(67, 130)),
                    timestamp : block.block.timestamp,
                }, {
                    where: {
                        tx_hash: erc1155Data[i].tx_hash.toUpperCase(),
                        log_index: logs[j].logIndex.toString(),
                        tx_id: logs[j].id,
                    },
                });
            }
        }
    }
    console.log("done");
}

run();
