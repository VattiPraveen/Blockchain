// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
var ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider();


async function main() {
  //const [owner, addr1, addr2] = await ethers.getSigners();
  const Liquidity = await hre.ethers.getContractFactory("Liquidity");
  const liquidity = await Liquidity.deploy();

  await liquidity.deployed();
  //const liqContract = new ethers.Contract(uniswapV2Router02.address, uniswapV2Router02.abi, provider);


  console.log("Liquidity contract address: ", liquidity.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
