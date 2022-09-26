// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.7;

contract TimeLock {
    address owner;
    mapping(address => uint) lockedTime;
    mapping(address => uint) stakeAmount;

    constructor() {
        owner = msg.sender;
    }

    modifier lock() {
        require(
            block.timestamp > lockedTime[msg.sender],
            "Wait till the time deadline is over"
        );
        _;
    }

    function currentBlockTime() public view returns (uint time) {
        time = block.timestamp;
    }

    function stakeAndLock() public payable {
        require(msg.value > 0, "Amount should be more than zero");
        stakeAmount[msg.sender] = msg.value;
        lockedTime[msg.sender] = block.timestamp + 200;
    }

    function getReward() public lock {
        require(lockedTime[msg.sender] != 0, "first you have to add stake");
        uint reward = (stakeAmount[msg.sender] / 100);
        payable(msg.sender).transfer(reward);
    }
}
