// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Modifier {
    // execute 'inherit.sol' file to find the issue. 
    // Always declare 'owner' vairables as 'private', so other contracts can't access the 'owner variable'
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Modifiers can take inputs. This modifier checks that the
    // address passed in is not the zero address.
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    //onlyOwner can change owner variable
    function changeOwner(address _newOwner)
        public
        onlyOwner
        validAddress(_newOwner)
    {
        owner = _newOwner;
    }
}
