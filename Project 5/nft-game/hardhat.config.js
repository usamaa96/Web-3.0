require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: process.env.QUICK_NODE_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
