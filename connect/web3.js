const Web3 = require('web3');
const config = require('../config/config')

module.exports = {
  web3: () => new Web3(new Web3.providers.HttpProvider(config.rpc.oraie)),
};
