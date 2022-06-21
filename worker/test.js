const transactionEthDB = require("../models/transaction_eth");
const transactionV1DB = require("../models/transaction_v1");

async function run() {
    let txEth = await transactionEthDB.findOne({
        where: {
            "hash": "0X51A0697D44E6A39459B6BC22E62EE8DB188E30AE20A6A8754E5C488DC9210CF2",
        },
    });
    console.log(txEth);
    let txCosmos = await transactionV1DB.findOne({
        where: {
            "tx_hash": "51A0697D44E6A39459B6BC22E62EE8DB188E30AE20A6A8754E5C488DC9210CF2",
        },
    });
    console.log(txCosmos);
}

run();
