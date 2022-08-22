const axios = require('axios');
const config = require('../config/config');

module.exports = {
  GetBlockByApi: async (height) => {
    try {
      let data = await axios.get(`${config.rpc.evmosCosmos}/cosmos/base/tendermint/v1beta1/blocks/${height}`);
      return { block: data.data, err: null };
    } catch (e) {
      return { block: null, err: e };
    }
  },
  GetDetailTxsByNewCosmos: async (height) => {
    try {
      let data = await axios.get(`${config.rpc.evmosCosmos}/cosmos/tx/v1beta1/txs/${height}`);
      return { tmpTx: data.data, err: null };
    } catch (e) {
      return { tmpTx: null, err: e };
    }
  },
};
