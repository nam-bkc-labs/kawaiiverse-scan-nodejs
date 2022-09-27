const converter = require('bech32-converting');
const accountDB = require('../models/account');
const data = require('./data/account.json');

async function run() {
  for (let i = 0; i < data.length; i++) {
    console.log(`${i}/${data.length}`);
    const addrCosmos = converter('orain').toBech32(data[i]);
    const isCheck = await accountDB.findOne({
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
