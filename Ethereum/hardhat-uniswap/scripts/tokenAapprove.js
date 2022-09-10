// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const TOKENA = await hre.ethers.getContractFactory("TokenA");
  var TokenAadd = "0x1aDABe4941e0f662976DC94B9C7e2050b5445664";
  var TokenBadd = "0xf58a36e7C22e5e2F39D2eb92e1a2Fb767E9cAcA9";

  const provider = new ethers.providers.JsonRpcProvider();
  const abiA = JSON.parse(fs.readFileSync('./artifacts/contracts/TokenA.sol/TokenA.json', 'utf8'));
  const abiB = JSON.parse(fs.readFileSync('./artifacts/contracts/TokenB.sol/TokenB.json', 'utf8'));
  //console.log(abi.abi);
  const contractTokA = new ethers.Contract(TokenAadd, abiA.abi, provider);
  const contractTokB = new ethers.Contract(TokenBadd, abiB.abi, provider);

  var txA = await contractTokA.connect(owner).approve("0xbE7A285543D2c295F5711f3ee668b5e671181143", 100000);
  var txB = await contractTokB.connect(owner).approve("0xbE7A285543D2c295F5711f3ee668b5e671181143", 100000);

  var txAb = await contractTokA.connect(owner).allowance( owner.address , "0xbE7A285543D2c295F5711f3ee668b5e671181143");
  var txBa = await contractTokB.connect(owner).allowance( owner.address ,"0xbE7A285543D2c295F5711f3ee668b5e671181143");

  console.log(txAb);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
