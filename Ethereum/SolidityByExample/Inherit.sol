// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Modifier.sol";

contract Inherit is Modifier {
    //change owner even if you are not owner
    //because 'owner' state vaiable is public in 'Modifier' contract
    function makeMeOwner() public {
        owner = msg.sender;
    }
}
