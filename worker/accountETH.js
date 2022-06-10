const accountETHDB = require("../models/accountETH");

async function run() {
    let data = require("./data/account.json");
    for (let i = 0; i < data.length; i++) {
        console.log(`${i}/${data.length}`);
        let isCheck = await accountETHDB.findOne({
            where: {
                hash: data[i].toLowerCase(),
            },
        });
        if (!isCheck) {
            await accountETHDB.create({
                hash: data[i].toLowerCase(),
            });
        }
    }
    console.log("done");
}

run();
