require("@nomiclabs/hardhat-waffle");
// Import and configure dotenv
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.QUICK_NODE_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    // mainnet: {
    //   chainId: 1,
    //   url: process.env.PROD_QUICKNODE_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
};
