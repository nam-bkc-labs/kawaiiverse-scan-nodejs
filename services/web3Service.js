const web3 = require('../connect/web3').web3();

module.exports = {
  GetLatestBlockHeight: async () => {
    try {
      const data = await web3.eth.getBlockNumber();
      return { latestBlockHeight: Number(data), err: null };
    } catch (e) {
      return { latestBlockHeight: -1, err: e };
    }
  },
  GetBlock: async (block) => {
    try {
      const data = await web3.eth.getBlock(block);
      return { block: data, err: null };
    } catch (e) {
      console.log(e);
      return { block: null, err: e };
    }
  },
  GetTransaction: async (hash) => {
    try {
      const data = await web3.eth.getTransaction(hash);
      return { txEthData: data, err: null };
    } catch (e) {
      return { txEthData: -1, err: e };
    }
  },
  GetTransactionReceipt: async (hash) => {
    try {
      const data = await web3.eth.getTransactionReceipt(hash);
      return { txEthReceiptData: data, err: null };
    } catch (e) {
      return { txEthReceiptData: -1, err: e };
    }
  },
  GetCode: async (account) => {
    try {
      const code = await web3.eth.getCode(account);
      return { code, err: null };
    } catch (e) {
      return { code: -1, err: e };
    }
  },
  GetBalance: async (account) => {
    try {
      const bal = await web3.eth.getBalance(account);
      return { bal, err: null };
    } catch (e) {
      return { bal: -1, err: e };
    }
  },
};
