const web3 = require("../connect/web3").web3();

const abiKawaiiCore = require("../abi/KawaiiCore.json");

const tokenModel = require("../models/token");
const accountEthModel = require("../models/accountETH");
const txErc1155Model = require("../models/tx_erc1155");
const KawaiiCoreContract = new web3.eth.Contract(abiKawaiiCore, "0x2c4892e981de30f83D813992231641997136D615");

const categoryConst = require("../const/category");

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const teleUtils = require("../utils/teleNoti");

async function run() {
    try {
        let accountEth = await accountEthModel.findAll({
                attributes: ["hash"],
            },
        );
        accountEth = JSON.stringify(accountEth);
        accountEth = JSON.parse(accountEth);
        let total = 0;
        for (let i = 0; i < accountEth.length; i++) {
            for (let j = 0; j < categoryConst.length; j++) {
                let isCheck = await KawaiiCoreContract.methods.getOwnerTokenIdInCategoryLength(accountEth[i].hash, categoryConst[j]).call();
                if (Number(isCheck) > 0) {
                    total = total + 1;
                    break;
                }
            }
        }

        let totalTx = await txErc1155Model.count({
            where: {
                address: "0x2c4892e981de30f83D813992231641997136D615".toLowerCase(),
            },
        });

        let isCheck = await tokenModel.findOne({
            where: {
                hash: "0x2c4892e981de30f83D813992231641997136D615".toLowerCase(),
            },
        });

        if (isCheck) {
            await tokenModel.update({
                hash: "0x2c4892e981de30f83D813992231641997136D615".toLowerCase(),
                tx_count: totalTx,
                total_holder: 0,
                status: "ACTIVE",
                type: "erc1155",
                updated_at: new Date(),
            }, {
                where: {
                    hash: "0x2c4892e981de30f83D813992231641997136D615".toLowerCase(),
                },
            });
        } else {
            await tokenModel.create({
                hash: "0x2c4892e981de30f83D813992231641997136D615".toLowerCase(),
                tx_count: totalTx,
                total_holder: 0,
                status: "ACTIVE",
                type: "erc1155",
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        console.log("sleep 1h");
        await sleep(3600000);
        run();
    } catch (e) {
        console.log(e);
        await teleUtils.sendError(`sync tx and holder ${e}`);
        await sleep();
        run();
    }
}

run();
