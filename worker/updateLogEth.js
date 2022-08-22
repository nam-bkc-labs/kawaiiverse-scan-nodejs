const logEthDB = require('../models/log_eth');
const web3Service = require('../services/web3Service');

async function run() {
  let data = await logEthDB.findAll();
  data = JSON.stringify(data);
  data = JSON.parse(data);

  for (let i = 0; i < data.length; i++) {
    console.log(`${i}/${data.length}`);
    const txReceipt = await web3Service.GetTransactionReceipt(data[i].transaction_hash);
    await logEthDB.update({ status: txReceipt.txEthReceiptData.status }, {
      where: {
        transaction_hash: data[i].transaction_hash,
      },
    });
  }
  console.log('done');
}

run();
