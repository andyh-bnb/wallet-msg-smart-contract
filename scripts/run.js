const hre = require("hardhat");

async function main() {

  const [owner, randomPerson] = await hre.ethers.getSigners();
  
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = hre.ethers.parseEther("0.001");
 
  const waveContract = await hre.ethers.deployContract("WavePortal");
  await waveContract.waitForDeployment(); //deployed//deployed
  const waveAddress = await waveContract.getAddress();

  console.log("Contract deployed to:", waveAddress);
  console.log("Contract deployed by:", owner.address);

  await waveContract.getTotalWaves();

  const waveTxn = await waveContract.wave();
  await waveTxn.wait();

  await waveContract.getTotalWaves();

  const secondWaveTxn = await waveContract.connect(randomPerson).wave();
  await secondWaveTxn.wait();

  await waveContract.getTotalWaves();
  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
