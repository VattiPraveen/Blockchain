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

    
    var autoOwner = await hardhatAutofarm.getOwner();

    await helpers.impersonateAccount(autoOwner);
    const impersonatedSigner = await ethers.getSigner(autoOwner);

    //console.log(autoOwner);

    var allocValue = await hardhatAutofarm.getAlloc(56);

    console.log(allocValue);

    



    //expect(await hardhatAutofarm).to.equal(liquidityValue);
  });

});