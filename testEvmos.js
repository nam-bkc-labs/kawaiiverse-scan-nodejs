const Web3 = require("web3");
const web3 = new Web3("http://167.172.151.137:8545");

let tokenFuncs = {
    decimals: '0x313ce567', // hex to decimal
    symbol: '0x95d89b41', // hex to ascii
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
    decimals: '0x313ce567'
}
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
    totalSupply: '0x18160ddd'
}
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
    minFee: '0x24ec7590'
}


async function test() {
    let data = await web3.eth.getTransactionReceipt("0x5e104ab0deca96c930458ea82e3585cf40e23c837ba0cbc7a7e78a20a76d0e69");
    // let data = await web3.eth.getBalance("0x3c5c6b570c1da469e8b24a2e8ed33c278bda3222");
    console.log(JSON.stringify(data));



   //   data = await web3.eth.getTransactionReceipt("0XA22C0713AFCF12866C33FFF6DF3AE4991D349860E9DD5B3BDE6AC9C0CF31D172");
   //  console.log(data);
   //
   // let  code = await web3.eth.getCode("0x6CD7BBc76c13364C359C3F89f5A029ff857Fae50");
   //  // console.log(data);
   //  for (const name in tokenFuncs) {
   //      let codeCheck = tokenFuncs[name];
   //      codeCheck = codeCheck.replace('0x', '');
   //      if (code.indexOf(codeCheck) >= 0) {
   //          console.log("true");
   //          // return true;
   //      }
   //  }
   //
   //
   //  let isTrc21 = true
   //  for (const trc21 in trc21Function) {
   //      console.log(trc21);
   //      let codeCheck = trc21Function[trc21]
   //      codeCheck = codeCheck.replace('0x', '')
   //      if (code.indexOf(codeCheck) < 0) {
   //          isTrc21 = false
   //          break
   //      }
   //  }
   //  console.log("isTrc21",isTrc21);
   //
   //  let isFrc20 = true
   //  for (const frc20 in frc20Function) {
   //      let codeCheck = frc20Function[frc20]
   //      codeCheck = codeCheck.replace('0x', '')
   //      if (code.indexOf(codeCheck) < 0) {
   //          isFrc20 = false
   //          break
   //      }
   //  }
   //  console.log("isFrc20",isFrc20);
   //
   //  let isFrc721 = true
   //  for (const frc721 in frc721Function) {
   //      let codeCheck = frc721Function[frc721]
   //      codeCheck = codeCheck.replace('0x', '')
   //      console.log(codeCheck);
   //      if (code.indexOf(codeCheck) < 0) {
   //          isFrc721 = false
   //          break
   //      }
   //  }
   //  console.log("isFrc721",isFrc721);

}

test();

