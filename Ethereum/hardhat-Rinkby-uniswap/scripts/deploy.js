// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const TOKENA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TOKENA.deploy();

  await tokenA.deployed();

  console.log("TokenA contract address: ", tokenA.address);


  const TOKENB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TOKENB.deploy();

  await tokenB.deployed();

  console.log("TokenB contract address: ", tokenB.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
