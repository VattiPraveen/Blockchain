const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking contract", function () {
  var owner, addr1, addr2;
        
  var Stake;

  var hardhatStake;

    it("1) Deployment should assign the total supply of tokens to the owner", async function () {

        [owner, addr1, addr2] = await ethers.getSigners();
        Stake = await ethers.getContractFactory("StakingToken");
        hardhatStake = await Stake.deploy(owner.address, 10000000000);

        var ownerBalance = await hardhatStake.balanceOf(owner.address);
        
        expect(await hardhatStake.totalSupply()).to.equal(ownerBalance);
    });

    it("2) Create stake should add stake of user", async function () {

      var stakeValue = 10000;
      //console.log(await hardhatStake.balanceOf(owner.address));
      await hardhatStake.transfer(addr1.address, stakeValue);
      //console.log(await hardhatStake.balanceOf(addr1.address));
      await hardhatStake.connect(addr1).createStake(stakeValue);
      
      expect(await hardhatStake.stakeOf(addr1.address)).to.equal(stakeValue);
  });

  it("3) Calculate reward should equal estimated reward", async function () {

    var stakeValue = 10000;
    var reward = stakeValue/100;

    
    expect(await hardhatStake.calculateReward(addr1.address)).to.equal(reward);
  });

  it("4) This withdrawal should fail as owner hasn't distributed rewards.", async function () {

    var stakeValue = 10000;
    var reward = stakeValue/100;

    await hardhatStake.connect(addr1).withdrawReward();

    expect(await hardhatStake.balanceOf(addr1.address)).to.equal(reward);
  });

  it("5) After distribution, Withdrawal of reward should reflect token balance of the user.", async function () {

    var stakeValue = 10000;
    var reward = stakeValue/100;
    //owner distributing the rewards.
    await hardhatStake.distributeRewards();

    await hardhatStake.connect(addr1).withdrawReward();

    expect(await hardhatStake.balanceOf(addr1.address)).to.equal(reward);
  });



});