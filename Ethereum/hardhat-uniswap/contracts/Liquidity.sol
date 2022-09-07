// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./UniswapV2Router02.sol";

contract Liquidity is UniswapV2Router02 {
    address private owner;
    address factoryAdd = 0xc6e7DF5E7b4f2A278906862b61205850344D4e7d;
    address wethAdd = 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c;

    constructor() public UniswapV2Router02(factoryAdd, wethAdd) {
        //constructor() public {
        owner = msg.sender;
    }

    function addLiquidityto(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        internal
        virtual
        ensure(deadline)
        returns (
            uint amountA,
            uint amountB,
            uint liquidity
        )
    {
        (amountA, amountB) = _addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = IUniswapV2Pair(pair).mint(to);
    }

    function addLiquidityToPool(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        public
        returns (
            uint amountA,
            uint amountB,
            uint liquidity
        )
    {
        (amountA, amountB, liquidity) = addLiquidityto(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
    }
}
