const tokenTypeERC20 = {
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

const tokenTypeERC721 = {
  Transfer: '0xddf252ad',
  Approval: '0x8c5be1e5',
  ApprovalForAll: '0x17307eab',
  balanceOf: '0x70a08231',
  ownerOf: '0x6352211e',
  safeTransferFrom: '0x42842e0e',
  safeTransferFrom1: '0xb88d4fde',
  transferFrom: '0x23b872dd',
  approve: '0x095ea7b3',
  getApproved: '0x081812fc',
  supportsInterface: '0x01ffc9a7',
  totalSupply: '0x18160ddd',
};

const tokenTypeERC1155 = {
  TransferSingle: '0xc3d58168',
  TransferBatch: '0x4a39dc06',
  ApprovalForAll: '0x17307eab',
  safeTransferFrom: '0xf242432a',
  safeBatchTransferFrom: '0x2eb2c2d6',
};

module.exports = {
  isErc20: (code) => {
    for (const key in tokenTypeERC20) {
      let codeCheck = tokenTypeERC20[key];
      codeCheck = codeCheck.replace('0x', '');
      if (code.indexOf(codeCheck) < 0) {
        return false;

      }
    }
    return true;
  },
  isErc721: (code) => {
    for (const key in tokenTypeERC721) {
      let codeCheck = tokenTypeERC721[key];
      codeCheck = codeCheck.replace('0x', '');
      if (code.indexOf(codeCheck) < 0) {
        return false;
      }
    }
    return true;
  },
};
