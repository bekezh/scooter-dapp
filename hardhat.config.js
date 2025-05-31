require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,  // Используем URL для Sepolia
      accounts: [process.env.PRIVATE_KEY],  // Приватный ключ из .env файла
    }
  }
};
