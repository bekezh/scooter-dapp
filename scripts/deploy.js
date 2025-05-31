async function main() {
  const [deployer] = await ethers.getSigners();  // Получаем адрес деплойера
  console.log("Deploying from:", deployer.address);  // Логируем его

  const stablecoinAddress = "0x3813e82e6f7098b9583FC0F33a962D02018B6803";  // Адрес stablecoin
  const Token = await ethers.getContractFactory("ScooterRentToken");

  // Передаем два параметра: деплойера как владельца и адрес stablecoin
  const token = await Token.deploy(deployer.address, stablecoinAddress);
  
  await token.deployed();  // Деплоим контракт

  console.log("ScooterRentToken deployed at:", token.address);  // Логируем адрес контракта
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
