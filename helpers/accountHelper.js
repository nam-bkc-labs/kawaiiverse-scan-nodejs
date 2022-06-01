const web3Service = require('../services/web3Service');
const accountEthModel = require('../models/account_eth');
const teleUtils = require('../utils/teleNoti');

module.exports = {
    getAccountrDetail: async (account) => {
        try {
            let code = await web3Service.GetCode(account);
            if (code.err !== null) {
                console.log(`failed to query GetCode at accountHelper.getAccountrDetail,${code.err}`);
                await teleUtils.sendError(`failed to query GetCode at accountHelper.getAccountrDetail,${code.err}`);
                return -1;
            }
            let a = {};
            a.hash = account.toLowerCase();
            if (code.code !== "0x") {
                a.code = code.code;
                a.isContract = true;
            } else {
                a.code = code.code;
                a.isContract = false;
            }


            let bal = await web3Service.GetBalance(account);
            if (bal.err !== null) {
                console.log(`failed to query GetBalance at accountHelper.getAccountrDetail,${bal.err}`);
                await teleUtils.sendError(`failed to query GetBalance at accountHelper.getAccountrDetail,${bal.err}`);
                return -1;
            }
            a.balance = bal.bal;
            a.balanceNumber = Number(bal.bal);


            let queryAccountDB = await accountEthModel.findOne({where: {hash: account.toLowerCase()}});
            if (!queryAccountDB) {
                await accountEthModel.create(a);
                return 1;
            }
            await accountEthModel.update(a, {where: {hash: account.toLowerCase()}});

            return 1;
        } catch (e) {
            console.log(`failed getAccountrDetail,${e}`);
            await teleUtils.sendError(`failed getAccountrDetail,${e}`);
            return -1;
        }
    },
};
