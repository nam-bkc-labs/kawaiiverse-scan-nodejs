require('dotenv').config();
const Web3 = require("web3");

module.exports = {
    web3: () => {
        return new Web3(new Web3.providers.HttpProvider(process.env.RPC_EVMOS_WEB3));
    },
};
