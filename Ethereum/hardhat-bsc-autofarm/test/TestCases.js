const { expect } = require("chai");
const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("Uniswap test contract", function () {
  var owner, addr1, addr2;
        
  var Autofarm, hardhatAutofarm;

  it("1) Basic interaction with AutoFarm", async function () {

    [owner, addr1, addr2] = await ethers.getSigners();
    Autofarm = await ethers.getContractFactory("Farm");
    hardhatAutofarm = await Autofarm.deploy();

    //var autoFarmAddress = "0x0895196562C7868C5Be92459FaE7f877ED450452";

    const autoFarmAddress = "0x0895196562C7868C5Be92459FaE7f877ED450452";
    const autoFarmContract = await hre.ethers.getContractAt("AutoFarmV2", autoFarmAddress);


    
    var autoOwner = await hardhatAutofarm.getOwner();

    await helpers.impersonateAccount(autoOwner);
    const impersonatedSigner = await ethers.getSigner(autoOwner);

    console.log(impersonatedSigner);

    var allocValue = await autoFarmContract.poolInfo(56);

    console.log(allocValue);
    var pid = 56;
    var allocpoint = 1000;
    var booleanVal = true;
    var tx = await autoFarmContract.connect(impersonatedSigner).set(pid, allocpoint, booleanVal);
    const reciept2 = await tx.wait();

    allocValue = await autoFarmContract.poolInfo(56);

    console.log(allocValue);


    //expect(await hardhatAutofarm).to.equal(liquidityValue);
  });

});