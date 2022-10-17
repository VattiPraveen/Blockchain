const { expect } = require("chai");
const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("Uniswap test contract", function () {
  var owner, addr1, addr2;
        
  var Autofarm, hardhatAutofarm;

  it("1) After deployment, Owner should be able to add liquidity to A-B pool", async function () {

    [owner, addr1, addr2] = await ethers.getSigners();
    Autofarm = await ethers.getContractFactory("Farm");
    hardhatAutofarm = await Autofarm.deploy();

    //const address = "0x1234567890123456789012345678901234567890";
    //await helpers.impersonateAccount(address);
    //const impersonatedSigner = await ethers.getSigner(address);
    var autoOwner = await hardhatAutofarm.getOwner();

    console.log(autoOwner)

    //expect(await hardhatAutofarm).to.equal(liquidityValue);
  });

});