const web3Service = require('../services/web3Service');
const accountEthModel = require('../models/account_eth');
const teleUtils = require('../utils/teleNoti');

module.exports = {
  getAccountDetail: async (account) => {
    try {
      const code = await web3Service.GetCode(account);
      if (code.err !== null) {
        console.log(`failed to query GetCode at accountHelper.getAccountDetail, ${code.err}`);
        await teleUtils.sendError(`failed to query GetCode at accountHelper.getAccountDetail, ${code.err}`);
        return -1;
      }
      const a = {};
      a.hash = account.toLowerCase();
      a.code = code.code;
      a.isContract = code.code !== '0x';

      const bal = await web3Service.GetBalance(account);
      if (bal.err !== null) {
        console.log(`failed to query GetBalance at accountHelper.getAccountDetail, ${bal.err}`);
        await teleUtils.sendError(`failed to query GetBalance at accountHelper.getAccountDetail, ${bal.err}`);
        return -1;
      }
      a.balance = bal.bal;
      a.balanceNumber = Number(bal.bal);

      const queryAccountDB = await accountEthModel.findOne({ where: { hash: account.toLowerCase() } });
      if (!queryAccountDB) {
        await accountEthModel.create(a);
        return 1;
      }
      await accountEthModel.update(a, { where: { hash: account.toLowerCase() } });

      return 1;
    } catch (e) {
      console.log(`failed getAccountDetail, ${e}`);
      await teleUtils.sendError(`failed getAccountDetail, ${e}`);
      return -1;
    }
  },
};
