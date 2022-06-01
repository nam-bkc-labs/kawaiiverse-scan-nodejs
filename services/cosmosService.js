require('dotenv').config();
const axios = require('axios');
module.exports = {
    GetBlockByApi: async (height) => {
        try {
            let data = await axios.get(`${process.env.RPC_EVMOS_COSMOS}/cosmos/base/tendermint/v1beta1/blocks/${height}`);
            return {block: data.data, err: null};
        } catch (e) {
            return {block: null, err: e};
        }
    },
    GetDetailTxsByNewCosmos: async (height) => {
        try {
            let data = await axios.get(`${process.env.RPC_EVMOS_COSMOS}/cosmos/tx/v1beta1/txs/${height}`);
            return {tmpTx: data.data, err: null};
        } catch (e) {
            return {tmpTx: null, err: e};
        }
    },
};
