const tokenDB = require("../models/token");

const data = [{
    hash: "0x2c4892e981de30f83d813992231641997136d615".toLowerCase(),
    tx_count: 0,
    total_holder: 0,
    status: "ACTIVE",
    type: "erc1155",
    created_at: new Date(),
    updated_at: new Date(),
}, {
    hash: "0xc4AD58EAa53fA146698111FfeEfBe14740575Ac6".toLowerCase(),
    tx_count: 0,
    total_holder: 0,
    status: "ACTIVE",
    type: "erc721",
    created_at: new Date(),
    updated_at: new Date(),
},
    {
        hash: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd".toLowerCase(),//prod
        tx_count: 0,
        total_holder: 0,
        status: "ACTIVE",
        type: "erc20",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        hash: "0xa496991f721685095d04677a6e2e88bce6bfa149".toLowerCase(), //test
        tx_count: 0,
        total_holder: 0,
        status: "ACTIVE",
        type: "erc721",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

async function run() {
    for (let i = 0; i < data.length; i++) {
        let isCheck = await tokenDB.findOne({
            where: {
                hash: data[i].hash.toLowerCase(),
            },
        });
        if (!isCheck) {
            await tokenDB.create(
                data[i],
            );
        } else {
            await tokenDB.update({
                hash: data[i].hash,
                type: data[i].type,
            }, {
                where: {
                    hash: data[i].hash.toLowerCase(),
                },
            });
        }
    }
    console.log("done");
}

run();
