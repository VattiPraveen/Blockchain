const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Should be able to increase tokens total supply", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        var ownerBalance = await hardhatToken.balanceOf(owner.address);
        var amount = 100000;
        await hardhatToken.increaseSupply(amount);
        
        expect(await hardhatToken.totalSupply()).to.equal(parseInt(amount) + parseInt(ownerBalance));
        

    });
});