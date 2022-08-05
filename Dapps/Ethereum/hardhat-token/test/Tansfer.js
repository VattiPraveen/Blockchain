const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("owner should be able to transfer tokens to addr1", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();


        await hardhatToken.transfer(addr1.address, 100);
        var addr1Balance = await hardhatToken.balanceOf(addr1.address);
        var ownerBalance = await hardhatToken.balanceOf(owner.address);

        //checking if the total suply is dame or not
        expect(await hardhatToken.totalSupply()).to.equal(parseInt(ownerBalance)+parseInt(addr1Balance));

    });
});