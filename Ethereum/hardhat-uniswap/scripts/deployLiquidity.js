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
  const UniswapV2Router02 = await hre.ethers.getContractFactory("UniswapV2Router02");
  const factoryAdd = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
  const wethAdd = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";
  const uniswapV2Router02 = await UniswapV2Router02.deploy(factoryAdd, wethAdd);

  await uniswapV2Router02.deployed();
  //const liqContract = new ethers.Contract(uniswapV2Router02.address, uniswapV2Router02.abi, provider);


  console.log("uUniswapV2Router02 contract address: ", uniswapV2Router02.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
