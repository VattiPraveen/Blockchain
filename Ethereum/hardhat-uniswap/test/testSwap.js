const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require('fs');
//const provider = new ethers.providers.JsonRpcProvider();

describe("Uniswap Liquidity contract", function () {
    var owner, addr1, addr2;


    it("This sgould add Liquidity ", async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const Liquidity = await ethers.getContractFactory("Liquidity");
        console.log("15");
        const LiquidityAddress = "0xbE7A285543D2c295F5711f3ee668b5e671181143";
        //const hardhatLiquidity = await Liquidity.attach(LiquidityAddress);
        
        //console.log(Liquidity.abi);

        const provider = new ethers.providers.JsonRpcProvider();
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/Liquidity.sol/Liquidity.json', 'utf8'));
        //console.log(abi.abi);
        const contractLiq = new ethers.Contract(LiquidityAddress, abi.abi, provider);
        console.log("23");

        //const contractLiq = new ethers.Contract(LiquidityAddress, abiLquidity, provider);
        
        //console.log(contractLiq);
        
        const blockNumber = await ethers.provider.getBlockNumber();
        const block = await ethers.provider.getBlock(blockNumber);
        const blockTimestamp = block.timestamp;
        const deadline = blockTimestamp + 300;

        var tx = await contractLiq.connect(owner).addLiquidityToPool(
            "0x1aDABe4941e0f662976DC94B9C7e2050b5445664",
            "0xf58a36e7C22e5e2F39D2eb92e1a2Fb767E9cAcA9",
            100000,
            100000,
            450,
            450,
            owner.address,
            deadline
        );

        console.log("41");
        const reciept = await tx.wait();
        console.log("43");

        const event = reciept.events.find((event) => event.event === "Transfer");

        const [from, to, liquidityValue] = event.args;
        //console.log(await hardhatLiquidity.ownerOf(liquidityValue));
        //nft1 = nftId;

        expect(await hardhatLiquidity.balanceOf(owner.address)).to.equal(liquidityValue);
    });


});