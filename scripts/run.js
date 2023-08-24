const hre = require("hardhat");

async function main() {

  const [owner, randomUser] = await hre.ethers.getSigners();
  
  //const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  //const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = hre.ethers.parseEther("0.001");
  //const [owner, otherAccount] = await ethers.getSigners();
  //const Lock = await ethers.getContractFactory("Lock");
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  const WaveContract = await ethers.getContractFactory("WavePortal");
  const waveContract = await WaveContract.deploy( { value: lockedAmount });

  //const waveContract = await hre.ethers.deployContract("WavePortal");
  await waveContract.waitForDeployment(); //deployed
  const waveAddress = await waveContract.getAddress();

  console.log("Contract deployed to:", waveAddress);
  console.log("Contract deployed by:", owner.address);

  //Check Balance
  let contractBalance = await hre.ethers.provider.getBalance(waveAddress);
  console.log(
    "Contract balance Before:",
    //no longer needs .utils.formatEther
    hre.ethers.formatEther(contractBalance)
  );



  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount);
  
  let waveTxn = await waveContract.wave("Message A");
  await waveTxn.wait(); // Wait for the transaction to be mined

  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract.connect(randomPerson).wave("Another Message B");
  // await waveTxn.wait(); // Wait for the transaction to be mined

  //Check Balance Again
  contractBalance = await hre.ethers.provider.getBalance(waveAddress);
  console.log(
    "Contract balance After:",
    hre.ethers.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  /*  
  //Test for send simple waves
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
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
