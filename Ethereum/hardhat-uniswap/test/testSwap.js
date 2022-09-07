const { expect } = require("chai");
const { ethers } = require("hardhat");
var ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider();



describe("Uniswap Liquidity contract", function () {
    var owner, addr1, addr2;


    it("This sgould add Liquidity ", async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const liquidity = await ethers.getContractFactory("Liquidity");
        const hardhatLiquidity = await liquidity.deploy();

        const contractLiq = new ethers.Contract(hardhatLiquidity.address, hardhatLiquidity.abi, provider);
        var tx = await contractLiq.addLiquidityToPool(
            0xa513E6E4b8f2a923D98304ec87F64353C4D5C853,
            0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6,
            500,
            500,
            450,
            450,
            owner.address,
            100000
        );
        const reciept = await tx.wait();
        
        const event = reciept.events.find((event) => event.event === "Transfer");

        const [from, to, liquidityValue] = event.args;
        //console.log(await hardhatNFT.ownerOf(nftId));
        nft1 = nftId;

        expect(await hardhatLiquidity.balanceOf(owner.address)).to.equal(liquidityValue);
    });


});