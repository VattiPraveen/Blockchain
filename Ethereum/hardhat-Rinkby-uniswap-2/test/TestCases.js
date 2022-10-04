const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Uniswap test contract", function () {
  var owner, addr1, addr2;
        
  var TokenA, TokenB, TokenB, Liquidity, Swap, factoryA, pairAB, pairBC;

  var hardhatTokenA, hardhatTokenB, hardhatTokenC, hardhatLiquidity, hardhatSwap;

  it("1) After deployment, Owner should be able to add liquidity to A-B pool", async function () {

    [owner, addr1, addr2] = await ethers.getSigners();
    TokenA = await ethers.getContractFactory("TokenA");
    hardhatTokenA = await TokenA.deploy();

    TokenB = await ethers.getContractFactory("TokenB");
    hardhatTokenB = await TokenB.deploy();

    TokenC = await ethers.getContractFactory("TokenC");
    hardhatTokenC = await TokenC.deploy();

    Liquidity = await ethers.getContractFactory("Liquidity");
    hardhatLiquidity = await Liquidity.deploy();

    Swap = await ethers.getContractFactory("Swap");
    hardhatSwap = await Swap.deploy();

    await hardhatTokenA.approve(hardhatLiquidity.address, 100000);
    await hardhatTokenB.approve(hardhatLiquidity.address, 200000);
    await hardhatTokenC.approve(hardhatLiquidity.address, 100000);

    var blockNumber = await ethers.provider.getBlockNumber();
    var block = await ethers.provider.getBlock(blockNumber);
    var blockTimestamp = block.timestamp;
    var deadline = blockTimestamp + 300;

    var tx1 = await hardhatLiquidity.connect(owner).addLiquidityToPool(
      hardhatTokenA.address,
      hardhatTokenB.address,
      100000,
      100000,
      4500,
      4500,
      owner.address,
      deadline
    );

    var liquidityValue, liquidityValueBC;
    const reciept1 = await tx1.wait();
    var event = reciept1.events.find((event) => event.event === "LiquidityEvent");
    [factoryA, pairAB, liquidityValue] = event.args;

    deadline = blockTimestamp + 600;

    var tx2 = await hardhatLiquidity.connect(owner).addLiquidityToPool(
      hardhatTokenB.address,
      hardhatTokenC.address,
      100000,
      100000,
      4500,
      4500,
      owner.address,
      deadline
    );
    
    const reciept2 = await tx2.wait();
    var event = reciept2.events.find((event) => event.event === "LiquidityEvent");
    [factoryA, pairBC, liquidityValueBC] = event.args;

    expect(await hardhatLiquidity.connect(owner).getLiquidityFromPair(pairAB, owner.address)).to.equal(liquidityValue);
  });

  it("2) Owner shold be able to transfer TokenA to Addr1", async function () {

    await hardhatTokenA.transfer(addr1.address, 100000);
    expect(await hardhatTokenA.balanceOf(addr1.address)).to.equal(100000);
  });

  it("3) Add1 should be able to swap TokenA for TokenB from pool", async function () {

    const blockNumber = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);
    const blockTimestamp = block.timestamp;
    const deadline = blockTimestamp + 300;

    var amountIn = 10000;
    var amountOutMin = 5000;

    //approving contract so that it can approve Router for swap. 
    await hardhatTokenA.connect(addr1).approve(hardhatSwap.address, amountIn);
    
    //getting reserves so that we can calculate expected TokenB amount.
    var reserveTx = await hardhatSwap.getReservesExactIn(hardhatTokenA.address, hardhatTokenB.address);
    var reciept = await reserveTx.wait();
    var event = reciept.events.find((event) => event.event === "getReservesAB");
    var [reserveA, reserveB] = event.args;

    //calculating expected TokenB amount from pool for 10000 TokenAs
    var amountInWithFee = (amountIn * 997)
    var tokenBout = ((amountInWithFee * reserveB)/(reserveA*1000 + amountInWithFee))


    var reserveTx = await hardhatSwap.getReservesExactIn(hardhatTokenB.address, hardhatTokenC.address);
    var reciept = await reserveTx.wait();
    var event = reciept.events.find((event) => event.event === "getReservesAB");
    var [reserveB, reserveC] = event.args;

    var amountInWithFeeBC = (tokenBout * 997)
    var tokenCout = ((amountInWithFeeBC * reserveC)/(reserveB*1000 + amountInWithFeeBC))


    var tx = await hardhatSwap.connect(addr1).swapToken(
      amountIn,
      amountOutMin,
      [hardhatTokenA.address, hardhatTokenB.address, hardhatTokenC.address],
      addr1.address,
      deadline
    );

    const reciept2 = await tx.wait();

  
    expect(await hardhatTokenC.balanceOf(addr1.address)).to.equal(Math.floor(tokenCout));
  });

  it("4) Initial reserve of TokenA is not equal to current reserve.", async function () {

    //getting reserves so that we can calculate expected TokenB amount.
    var reserveTx = await hardhatSwap.getReservesExactIn(hardhatTokenA.address, hardhatTokenB.address);
    var reciept = await reserveTx.wait();
    var event = reciept.events.find((event) => event.event === "getReservesAB");
    var [reserveA, reserveB] = event.args;
  
    expect(reserveA).to.not.equal(100000);
  });


});