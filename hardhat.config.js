require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: {
        version: "0.8.20"
    },
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};