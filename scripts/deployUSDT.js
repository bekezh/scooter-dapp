async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying TestUSDT with address:", deployer.address);

  const Token = await ethers.getContractFactory("TestUSDT");
  const token = await Token.deploy();
  await token.deployed();

  console.log("TestUSDT deployed at:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
