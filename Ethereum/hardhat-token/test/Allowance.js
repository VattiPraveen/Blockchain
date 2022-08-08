const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Owner has to approve allowance to addr1.", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        var allowance = 500;
        await hardhatToken.approve(addr1.address, allowance);

        expect(await hardhatToken.allowance(owner.address, addr1.address)).to.equal(allowance);

    });
});