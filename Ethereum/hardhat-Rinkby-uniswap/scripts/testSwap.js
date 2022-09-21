const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require('fs');
//const provider = new ethers.providers.JsonRpcProvider();

describe("Uniswap Liquidity contract", function () {
    var owner, addr1, addr2;


    it("This sgould add Liquidity ", async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const Liquidity = await ethers.getContractFactory("Liquidity");
        //console.log("15");
        const LiquidityAddress = "0xB44494796bB5AE5cD24EF09C80054993263df5dc";
        //const hardhatLiquidity = await Liquidity.attach(LiquidityAddress);
        
        //console.log(Liquidity.abi);

        const provider = new ethers.providers.JsonRpcProvider();
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/Liquidity.sol/Liquidity.json', 'utf8'));
        //console.log(abi.abi);
        const contractLiq = new ethers.Contract(LiquidityAddress, abi.abi, provider);
        //console.log("23");

        //const contractLiq = new ethers.Contract(LiquidityAddress, abiLquidity, provider);
        
        //console.log(contractLiq);
        
        const blockNumber = await ethers.provider.getBlockNumber();
        const block = await ethers.provider.getBlock(blockNumber);
        const blockTimestamp = block.timestamp;
        const deadline = blockTimestamp + 300;

        var tx = await contractLiq.connect(owner).addLiquidityToPool(
            "0xE7e008C64d15E329Eb1AD258A83fa46d4C571095",
            "0xAcfbEcb3Bb3d376a2C6955E4413d7A625B54B94A",
            10000,
            10000,
            450,
            450,
            owner.address,
            deadline
        );

        //console.log("41");
        const reciept = await tx.wait();
        //console.log("43");

        const event = reciept.events.find((event) => event.event === "LiquidityEvent");
        
        //console.log(tx)

        const [factoryA, pair, liquidityValue] = event.args;
        //console.log("Factory address: ",factoryA);
        //console.log("Pair address: ",pair);
        
        //console.log(liquidityValue);
        //nft1 = nftId;

        expect(await contractLiq.connect(owner).getLiquidityFromPair(pair, owner.address)).to.equal(liquidityValue);
    });


});