// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public beneficiary;
    uint256 public auctionEndTime;

    // current state of the auction
    address public highestBidder;
    uint256 public highestbid;
    bool ended;

    mapping(address => uint256) pendingReturns;

    event highestBidIncreased(address indexed bidder, uint256 amount);
    event returnPrevBidAmt(address indexed bidder, uint256 amount);
    event auctionEnded(address indexed winner, uint256 amount);
    event withdrawnAmount(address indexed bidder, uint256 amount);

    constructor(uint256 _biddingTime, address payable _beneficiary) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    function bid() public payable {
        require(block.timestamp < auctionEndTime, "The Auction Time Is Over");
        if (msg.value > highestbid) {
            if (pendingReturns[msg.sender] > 0) {
                uint256 amount = pendingReturns[msg.sender];
                payable(msg.sender).transfer(amount);
                emit returnPrevBidAmt(msg.sender, amount);
            }

            pendingReturns[msg.sender] = msg.value;
            highestBidder = msg.sender;
            highestbid = msg.value;
            emit highestBidIncreased(msg.sender, msg.value);
        } else {
            revert("sorry, the bid is not high enough!");
        }
    }

    function withdraw() public payable returns (bool) {
        require(ended, "You Cannot Withdraw Until The Auction Has Ended");
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
        }

        if (!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;
        } else {
            emit withdrawnAmount(msg.sender, amount);
        }
        return true;
    }

    function auctionEnd() public {
        require(
            block.timestamp > auctionEndTime,
            "The Auction Cannot End Before The Specified Time"
        );
        if (ended) revert("the auction is already over!");
        ended = true;
        emit auctionEnded(highestBidder, highestbid);
        beneficiary.transfer(highestbid);
    }
}
