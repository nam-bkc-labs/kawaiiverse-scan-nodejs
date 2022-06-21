const Web3 = require("web3");
const web3 = new Web3("https://rpc-2.factorychain.io");
// const web3 = new Web3("https://bsc-dataseed.binance.org/");
const request = require('request');
let tokenFuncs = {
    decimals: '0x313ce567', // hex to decimal
    symbol: '0x95d89b41', // hex tendpoint-testnet.bignft.appo ascii
    totalSupply: '0x18160ddd',
    transfer: '0xa9059cbb',
    name: '0x06fdde03',
};

const frc20Function = {
    totalSupply: '0x18160ddd',
    balanceOf: '0x70a08231',
    allowance: '0xdd62ed3e',
    transfer: '0xa9059cbb',
    approve: '0x095ea7b3',
    transferFrom: '0x23b872dd',
    Transfer: '0xddf252ad',
    Approval: '0x8c5be1e5',
    name: '0x06fdde03',
    symbol: '0x95d89b41',
    decimals: '0x313ce567',
};
const frc721Function = {
    Transfer: '0xddf252ad',
    Approval: '0x8c5be1e5',
    ApprovalForAll: '0x17307eab',
    balanceOf: '0x70a08231',
    ownerOf: '0x6352211e',
    safeTransferFrom1: '0xb88d4fde',
    safeTransferFrom: '0x42842e0e',
    transferFrom: '0x23b872dd',
    approve: '0x095ea7b3',
    // 'setApprovalForAll': '0xa22cb465',
    getApproved: '0x081812fc',
    // 'isApprovedForAll': '0x7070ce33',
    supportsInterface: '0x01ffc9a7',
    totalSupply: '0x18160ddd',
};
const trc21Function = {
    totalSupply: '0x18160ddd',
    balanceOf: '0x70a08231',
    estimateFee: '0x127e8e4d',
    issuer: '0x1d143848',
    allowance: '0xdd62ed3e',
    transfer: '0xa9059cbb',
    approve: '0x095ea7b3',
    transferFrom: '0x23b872dd',
    Transfer: '0xddf252ad',
    Approval: '0x8c5be1e5',
    Fee: '0xfcf5b327',
    name: '0x06fdde03',
    symbol: '0x95d89b41',
    decimals: '0x313ce567',
    minFee: '0x24ec7590',
};

let bech32 = require('bech32');
let sha3 = require('js-sha3');
const util = require('ethereumjs-util');
const secp256k1 = require('secp256k1');

const bech32Converting = require("bech32-converting");

async function test() {
    let data = await web3.eth.getBalance("0xbfb15DbD44D32d264E9f6D283A70D9A6D6fcC522");
    // let data = await web3.eth.getBalance("0x3c5c6b570c1da469e8b24a2e8ed33c278bda3222");
    console.log(JSON.stringify(data));
    //

    // request.post("https://endpoint1.kawaii.global", {
    //     json: {
    //         jsonrpc: '2.0',
    //         method: 'debug_traceTransaction',
    //         params: ["0x42349EDBB23099123242DA7C95306257303CDBDAF4C3DB78FAD9DB8F51847115", {tracer: 'callTracer', timeout: '10s'}],
    //         id: 1
    //     },
    //     timeout: 10000
    // }, (error, res, body) => {
    //     console.log(JSON.stringify(body));
    // })
    //
    // // convert address nodejs
    // const converter = require("bech32-converting");
    // let ethAddr = converter('oraie').toHex('oraie183wxk4cvrkjxn69jfghga5euy79a5v3zsh204g');
    // console.log(ethAddr);
    // let cosmos = converter('oraie').toBech32(ethAddr)
    // console.log(cosmos);
}

test();
