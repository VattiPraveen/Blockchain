const hre = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("RINFT")
    const token = await Token.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
    
    const myadd = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const mynft = await token.mintRINFT(myadd, "1st NFT")
    
    console.log(mynft.data)
    //console.log(await token.ownerOf(mynft))

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
