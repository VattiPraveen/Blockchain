// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

interface AutoFarm {
    function poolLength() external returns (uint256);

    function owner() external view returns (address);

    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do. (Only if want tokens are stored here.)

    //function add(uint256 _allocPoint, IERC20 _want, bool _withUpdate, address _strat) external;

    // Update the given pool's BUST allocation point. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) external;

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        external
        returns (uint256);

    // View function to see pending BUST on frontend.
    function pendingBUST(uint256 _pid, address _user)
        external
        returns (uint256);

    //  View function to see pending BUST on frontend.

    function pendingBNB(uint256 _pid, address _user) external returns (uint256);

    // View function to see staked Want tokens on frontend.
    function stakedWantTokens(uint256 _pid, address _user)
        external
        returns (uint256);

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() external;

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) external;
}

contract Farm {
    address AtFarm = 0x0895196562C7868C5Be92459FaE7f877ED450452;
    AutoFarm farmContract = AutoFarm(AtFarm);

    function getOwner() public view returns (address) {
        address owner = farmContract.owner();
        return owner;
    }

    function setAlloc(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) public {
        farmContract.set(_pid, _allocPoint, _withUpdate);
    }

    //function getAlloc(uint256 _pid) public returns (uint256) {
    //    uint256 allocVal = farmContract.poolInfo[_pid];
    //    return allocVal;
    //}
}
