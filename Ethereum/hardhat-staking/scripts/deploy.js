// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const StakingTOKEN = await hre.ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingTOKEN.deploy(owner.address, 1000000000);

  await stakingToken.deployed();

  console.log("Staking contract address: ", stakingToken.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
