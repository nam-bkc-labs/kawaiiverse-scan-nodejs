const web3 = require("../connect/web3").web3();

const abiKawaiiCore = require("../abi/KawaiiCore.json");
const abiKawaii721 = require("../abi/Kawaii721.json");
const abiERC20 = require("../abi/ERC20.json");

const tokenModel = require("../models/token");
const accountEthModel = require("../models/accountETH");
const txErc1155Model = require("../models/tx_erc1155");
const txErc721Model = require("../models/tx_erc721");
const txErc20Model = require("../models/tx_erc20");

const categoryConst = require("../const/category");

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const teleUtils = require("../utils/teleNoti");

async function run() {
    try {
        //get account eth
        let accountEth = await accountEthModel.findAll({
                attributes: ["hash"],
            },
        );
        accountEth = JSON.stringify(accountEth);
        accountEth = JSON.parse(accountEth);

        //get list token
        let tokenData = await tokenModel.findAll();
        tokenData = JSON.stringify(tokenData);
        tokenData = JSON.parse(tokenData);


        for (let k = 0; k < tokenData.length; k++) {
            console.log(`cron k = ${k}`);
            let total = 0;
            let totalTx = 0;
            if (tokenData[k].type === "erc1155") {
                let KawaiiCoreContract = new web3.eth.Contract(abiKawaiiCore, tokenData[k].hash.toLowerCase());
                for (let i = 0; i < accountEth.length; i++) {
                    for (let j = 0; j < categoryConst.length; j++) {
                        let isCheck = await KawaiiCoreContract.methods.getOwnerTokenIdInCategoryLength(accountEth[i].hash, categoryConst[j]).call();
                        if (Number(isCheck) > 0) {
                            total = total + 1;
                            break;
                        }
                    }
                }
                totalTx = await txErc1155Model.count({
                    where: {
                        address: tokenData[k].hash.toLowerCase(),
                    },
                });
            }

            if (tokenData[k].type === "erc721") {
                let Kawaii721Contract = new web3.eth.Contract(abiKawaii721, tokenData[k].hash);
                for (let i = 0; i < accountEth.length; i++) {
                    let isCheck = await Kawaii721Contract.methods.balanceOf(accountEth[i].hash);
                    if (Number(isCheck) > 0) {
                        total = total + 1;
                        break;
                    }
                }
                totalTx = await txErc721Model.count({
                    where: {
                        address: tokenData[k].hash.toLowerCase(),
                    },
                });
            }
            if (tokenData[k].type === "erc20") {
                let ERC20Contract = new web3.eth.Contract(abiERC20, tokenData[k].hash);
                for (let i = 0; i < accountEth.length; i++) {
                    let isCheck = await ERC20Contract.methods.balanceOf(accountEth[i].hash);
                    if (Number(isCheck) > 0) {
                        total = total + 1;
                        break;
                    }
                }
                totalTx = await txErc20Model.count({
                    where: {
                        address: tokenData[k].hash.toLowerCase(),
                    },
                });
            }

            if (totalTx !== 0 && total !== 0) {
                await tokenModel.update({
                    tx_count: totalTx,
                    total_holder: total,
                    updated_at: new Date(),
                }, {
                    where: {
                        hash: tokenData[k].hash.toLowerCase(),
                    },
                });
            }
        }

        console.log("sleep 1h");
        await sleep(7200000);
        run();
    } catch (e) {
        console.log(e);
        await teleUtils.sendError(`sync tx and holder ${e}`);
        await sleep();
        run();
    }
}

run();
