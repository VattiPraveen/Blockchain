// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DataTypes {
    bool public boolean = true;

    uint8 public u8 = 22;
    uint public u256 = 256;
    uint public u = 257; // uint is an alias for uint256


    int8 public i8 = -1;
    int public i256 = 456;
    int public i = -123; // int is same as int256

    // minimum and maximum of int
    int public minInt = type(int).min;
    int public maxInt = type(int).max;

    address public addr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;

    bytes1 a = 0xb5; //  [10110101]
    bytes1 b = 0x56; //  [01010110]

    // Default values
    // Unassigned variables have a default value
    bool public defaultBoolean; // false
    uint public defaultUint; // 0
    int public defaultInt; // 0
    address public defaultAddress; // 0x0000000000000000000000000000000000000000
}