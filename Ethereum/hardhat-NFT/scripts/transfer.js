const { expect } = require("chai");
const hre = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("RINFT")
    const token = await Token.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
    
    const myadd = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const reciept = await token.mintRINFT(myadd, "1st NFT")
    
    //const reciept = await tx.wait();
        
    const event = reciept.events.find((event) => event.event === "Transfer");

    console.log(event);
    //const [from, to, nftId] = event.args;
    //console.log(await token.ownerOf(nftId))


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
