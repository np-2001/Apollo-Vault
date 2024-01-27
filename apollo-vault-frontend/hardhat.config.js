// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

// Load the environment variables from the .env file
require("dotenv").config();

// Hardhat task to deploy on the Polygon Mumbai testnet
task("deploy-mumbai", "Deploy the contract to the Polygon Mumbai testnet")
  .setAction(async () => {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const ApolloVault = await ethers.getContractFactory("ApolloVault");
    const apolloVault = await ApolloVault.deploy();

    console.log(`Contract address: ${apolloVault.address}`);
  });

module.exports = {
  paths: {
    tests: "./test", // Update the path accordingly
  },
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
