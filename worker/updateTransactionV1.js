let transactionETHDB = require("../models/transaction_eth");
let transactionV1DB = require("../models/transaction_v1");
const axios = require('axios');

async function run() {
    let data = await transactionETHDB.findAll();
    data = JSON.stringify(data);
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        console.log(i);
        let item = await axios.get(`http://167.172.151.137:1317/cosmos/tx/v1beta1/txs/${data[i].cosmos_hash}`);
        let insert = {
            id: data[i].id,
            height: item.data.tx_response.height,
            tx_hash: item.data.tx_response.txhash.toUpperCase(),
            code: item.data.tx_response.code,
            messages: item.data.tx.body.messages,
            raw_log: item.data.tx_response.raw_log,
            signatures: item.data.tx.signatures,
            memo: item.data.tx.body.memo,
            fee: JSON.stringify(item.data.tx.auth_info.fee),
            gas_wanted: item.data.tx_response.gas_wanted,
            gas_used: item.data.tx_response.gas_used,
            timestamp: item.data.tx_response.timestamp,
        };
        let isCheck = await transactionV1DB.findOne({
            where: {
                tx_hash: item.data.tx_response.txhash.toUpperCase(),
            },
        });
        if (!isCheck) {
            await transactionV1DB.create(insert);
        }

    }
    console.log("done");
}

run();
