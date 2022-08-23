// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RTKN is ERC20 {
    address private owner;
    event Minted(address indexed to);

    constructor() ERC20("RapidToken", "RTKN") {
        owner = msg.sender;
    }

    function mintTKN(address _to) public {
        _mint(_to, 10000 * (10**18));
        emit Minted(_to);
    }
}
