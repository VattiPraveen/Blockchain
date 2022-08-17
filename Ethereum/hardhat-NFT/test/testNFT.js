const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT contract", function () {
    var owner, addr1, addr2;
    var hardhatNFT;
    var nft1;

    it("Mint should assign NFT to the given address", async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        nft = await ethers.getContractFactory("RINFT");
        hardhatNFT = await nft.deploy();


        var tx = await hardhatNFT.mintRINFT(owner.address, "1st NFT");
        const reciept = await tx.wait();
        
        const event = reciept.events.find((event) => event.event === "Transfer");

        const [from, to, nftId] = event.args;
        //console.log(await hardhatNFT.ownerOf(nftId));
        nft1 = nftId;

        expect(await hardhatNFT.ownerOf(nftId)).to.equal(owner.address);
    });


    it("Transfer should send NFT to the addr1 address", async function () {
        //simple tansfer
        await hardhatNFT.transf(owner.address, addr1.address, nft1);

        expect(await hardhatNFT.ownerOf(nft1)).to.equal(addr1.address);
    });

    it("Transferfrom, addr2 should send NFT from adrr1 to owner address", async function () {
        //Approval
        await hardhatNFT.connect(addr1).approve(addr2.address, nft1);
        //transferFrom
        await hardhatNFT.connect(addr2).transferFrom(addr1.address, owner.address, nft1);

        expect(await hardhatNFT.ownerOf(nft1)).to.equal(owner.address);
    });
    
    it("This should fail because owner doesnt posses nft", async function () {
        
        await hardhatNFT.connect(owner).transf(owner.address, addr1.address, nft1);

        expect(await hardhatNFT.ownerOf(nft1)).to.equal(owner.address);
    });

    it("This should fail because the nft is burnt", async function () {
        
        await hardhatNFT.connect(addr1).burnn(nft1);

        expect(await hardhatNFT.balanceOf(addr1)).to.equal(1);
    });


});