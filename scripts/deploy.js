// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer,deployer2] = await hre.ethers.getSigners();
 
  const deployerAddress = await deployer.getAddress();
  const accountBalance = await hre.ethers.provider.getBalance(deployerAddress);

  //const deployerAddress2 = await deployer2.getAddress();
  //const accountBalance2 = await hre.ethers.provider.getBalance(deployerAddress2);
  

  console.log("Deploying contracts with account: ", deployerAddress);
  console.log("Depolyer Account balance:", accountBalance.toString());
 // console.log("Deployer2 Account balance:", accountBalance2.toString());
  const waveContract = await hre.ethers.deployContract("WavePortal");
  await waveContract.waitForDeployment(); //deployed//deployed
  const waveAddress = await waveContract.getAddress();

  console.log("WavePortal address: ", waveAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
