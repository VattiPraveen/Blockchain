// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ConstantsImmutables {
    // coding convention to uppercase constant variables
    address public constant CONST_ADDRESS =
        0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc;
    uint256 public constant CONST_UINT = 123;

    // coding convention to uppercase constant variables
    address public immutable IMU_ADDRESS;
    uint256 public immutable IMU_UINT;

    constructor(uint256 _myUint) {
        IMU_ADDRESS = msg.sender;
        IMU_UINT = _myUint;
    }
}
