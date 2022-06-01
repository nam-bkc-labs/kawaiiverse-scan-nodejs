const bloclEthModel = require("../models/block_eth");
module.exports = {
    QueryLatestBlockHeight: async () => {
        try {
            let data = await bloclEthModel.findOne({
                limit: 1,
                order: [["number", "DESC"]],
            });
            if (!data) {
                return {dbHeight: 0, totalTxs: 0, err: null};
            }
            data = JSON.stringify(data);
            data = JSON.parse(data);

            return {dbHeight: Number(data.number), totalTxs: Number(data.total_txs), err: null};
        } catch (e) {
            return {dbHeight: -1, totalTxs: 0, err: e};
        }
    },
};
