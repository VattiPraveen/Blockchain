// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract RTKN is ERC20 {
    address private owner;
    event Minted(address indexed to);

    constructor() ERC20("RapidToken", "RTKN") {
        owner = msg.sender;
    }

    function mintTKN(address _to) internal {
        _mint(_to, 100);
        emit Minted(_to);
    }

    function ethToTkn() public payable {
        require(msg.value == 1 ether, "Send only 1 ether");
        mintTKN(msg.sender);
    }
}
