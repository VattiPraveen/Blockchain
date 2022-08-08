const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("After aproval, addr1 should be able to use 'transferFrom' and send tokens to addr2 ", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        var allowance = 500;
        await hardhatToken.approve(addr1.address, allowance);
        await hardhatToken.connect(addr1).transferFrom(owner.address, addr2.address, 500);
        
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(allowance);
        
        
    });
});