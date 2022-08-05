// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address owner;
    constructor() ERC20("Gold", "GLD") {
        owner = msg.sender;
        _mint(msg.sender, 100000000);
    }

    function increaseSupply(uint amount) public{
        _mint(owner,amount);
    }
}