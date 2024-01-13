require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/QyHyojlrEJB5jBi1p8DpdOQWR11Smpk4',
      accounts: ['0e6dd5dbcb54e8a5f5bec3cb8ceb48876506b7ea25bb8f928e332d7c53bae8d1'],
    },
  },
};