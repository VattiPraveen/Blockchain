// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

abstract contract AutoFarm is IERC20 {
    struct PoolInfo {
        IERC20 want; // Address of the want token.
        uint256 allocPoint; // How many allocation points assigned to this pool. AUTO to distribute per block.
        uint256 lastRewardBlock; // Last block number that AUTO distribution occurs.
        uint256 accAUTOPerShare; // Accumulated AUTO per share, times 1e12. See below.
        address strat; // Strategy address that will auto compound want tokens
    }

    PoolInfo[] public poolInfo;

    function poolLength() external virtual returns (uint256);

    function owner() external view virtual returns (address);

    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do. (Only if want tokens are stored here.)

    //function add(uint256 _allocPoint, IERC20 _want, bool _withUpdate, address _strat) external;

    // Update the given pool's BUST allocation point. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) external virtual;

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        external
        virtual
        returns (uint256);

    // View function to see pending BUST on frontend.
    function pendingBUST(uint256 _pid, address _user)
        external
        virtual
        returns (uint256);

    //  View function to see pending BUST on frontend.

    function pendingBNB(uint256 _pid, address _user)
        external
        virtual
        returns (uint256);

    // View function to see staked Want tokens on frontend.
    function stakedWantTokens(uint256 _pid, address _user)
        external
        virtual
        returns (uint256);

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() external virtual;

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) external virtual;
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

    function getAlloc(uint256 _pid) public returns (uint256) {
        uint256 allocVal = farmContract.poolInfo[_pid];
        return allocVal;
    }
}
