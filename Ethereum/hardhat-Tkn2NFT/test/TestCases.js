const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tkn2NFT test contract", function () {
  var owner, addr1, addr2;    
  var Token, NFT, Tkn2NFT;
  var hardhatToken, hardhatNFT, hardhatTkn2NFT;

  it("1) This should make the exchange of Tokens and NFT succesful", async function () {

    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("RTKN");
    hardhatToken = await Token.deploy();

    NFT = await ethers.getContractFactory("RINFT");
    hardhatNFT = await NFT.connect(addr1).deploy();

    Tkn2NFT = await ethers.getContractFactory("Tkn2NFT");
    hardhatTkn2NFT = await Tkn2NFT.deploy(hardhatToken.address, hardhatNFT.address);

    await hardhatToken.connect(owner).mintTKN(owner.address);
    await hardhatToken.connect(owner).approve(hardhatTkn2NFT.address, 4000);
    await hardhatNFT.connect(addr1).mintRINFT(addr1.address, "1st NFT");
    await hardhatNFT.connect(addr1).setApprovalForAll(hardhatTkn2NFT.address, true);

    await hardhatTkn2NFT.tkn2nft(owner.address, addr1.address, 1);

    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(20);
  });

});