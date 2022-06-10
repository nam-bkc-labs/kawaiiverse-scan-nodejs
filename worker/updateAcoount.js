const accountDB = require("../models/account");
const converter = require('bech32-converting');

async function run() {
    let data = require("./data/account.json");
    for (let i = 0; i < data.length; i++) {
        console.log(`${i}/${data.length}`);
        let addrCosmos = converter('oraie').toBech32(data[i]);
        let isCheck = await accountDB.findOne({
            where: {
                address: addrCosmos,
            },
        });
        if (!isCheck) {
            await accountDB.create({
                address: addrCosmos.toLowerCase(),
                txn_count: 0,
                txs_id: 0,
            });
        }
    }
}

run();
