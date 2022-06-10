const accountDB = require("../models/account");
const converter = require('bech32-converting');
const data = require('./data/account.json');
const axios = require('axios');

async function run() {
    // let item = await accountDB.findOne({
    //     where:{
    //         address:"oraie17h3tsp7fgzu5v2zss7yd6rcad0r3gftd7fgj29"
    //     }
    // })
    // console.log(item);
    // return
    let data = require("./data/account.json");
    for (let i = 0; i < data.length; i++) {
        console.log(`${i}/${data.length}`);
        let addrCosmos = converter('oraie').toBech32(data[i]);
        console.log(addrCosmos);
        let item = await axios.get(` http://167.172.151.137:1317/cosmos/bank/v1beta1/balances/${addrCosmos}`);
        let balance = Number(item.data.balances[0].amount) / 1e18;
        await accountDB.update({balance: balance}, {
            where: {
                address: addrCosmos.toLowerCase(),
            },
        });
    }
    console.log("done");
}

run();
