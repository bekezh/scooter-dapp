async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const stablecoinAddress = "0x3813e82e6f7098b9583FC0F33a962D02018B6803";
  const Token = await ethers.getContractFactory("ScooterRentToken");
  const token = await Token.deploy(stablecoinAddress);
  await token.deployed();

  console.log("ScooterRentToken deployed at:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
