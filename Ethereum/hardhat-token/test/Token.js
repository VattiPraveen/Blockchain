const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        var ownerBalance = await hardhatToken.balanceOf(owner.address);
        
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);



    });
});