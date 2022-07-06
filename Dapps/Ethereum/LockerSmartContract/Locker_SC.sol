// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// @title: Locker_SC -> Locker Smart Contract
contract LockerSC {
    //creating a mapping function to keep track of user accounts and balances.
    mapping(address => uint256) private _accounts;

    //Creating events to call them when required.
    event Deposited(address indexed depositor, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);

    //function to deposit eth to Locker smart contract
    function deposit() public payable {
        _accounts[msg.sender] = _accounts[msg.sender] + msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    //function to withdraw eth from respective account on Locker smart contract
    function withdraw(uint256 _amount) public {
        //Checking if there is enough balance in the use account on Locker smart contract.
        require(
            _accounts[msg.sender] > _amount,
            "Not enough balance. Please withdraw small value."
        );

        //Checking if the amount requested exceeds 70% of total user balance on Locker smart contract.
        require(
            _amount < ((_accounts[msg.sender] * 7) / 10),
            "You can only withdraw 70% balance. Please enter small value."
        );

        payable(msg.sender).transfer(_amount);

        _accounts[msg.sender] = _accounts[msg.sender] - _amount;

        emit Withdrawn(msg.sender, _amount);
    }

    //function to check the balance.
    function getBalance() public view returns (uint256) {
        return _accounts[msg.sender];
    }

    //function to check the balance.
    function getTotalLockerDeposit() public view returns (uint256) {
        return address(this).balance;
    }

    //receive fuction for users who want to directly send eth to Locker smart contract.
    receive() external payable {
        _accounts[msg.sender] = _accounts[msg.sender] + msg.value;

        emit Deposited(msg.sender, msg.value);
    }
}
