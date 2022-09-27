const axios = require('axios');
const converter = require('bech32-converting');
const accountDB = require('../models/account');
const data = require('./data/account.json');

async function run() {
  // let item = await accountDB.findOne({
  //     where:{
  //         address:"orain17h3tsp7fgzu5v2zss7yd6rcad0r3gftd7fgj29"
  //     }
  // })
  // console.log(item);
  // return
  for (let i = 0; i < data.length; i++) {
    console.log(`${i}/${data.length}`);
    const addrCosmos = converter('orain').toBech32(data[i]);
    console.log(addrCosmos);
    const item = await axios.get(` http://167.172.151.137:1317/cosmos/bank/v1beta1/balances/${addrCosmos}`);
    const balance = Number(item.data.balances[0].amount) / 1e18;
    await accountDB.update({ balance: balance }, {
      where: {
        address: addrCosmos.toLowerCase(),
      },
    });
  }
  console.log('done');
}

run();
