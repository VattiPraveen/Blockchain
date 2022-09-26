// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.7;

//ERC721 interface
interface IERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function approve(address to, uint256 tokenId) external;

    function setApprovalForAll(address operator, bool _approved) external;

    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
}

//ERC20 interface
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

//Token Transfer
contract Tkn2NFT {
    address payable private owner;
    address ERC20Address;
    address ERC721Address;

    constructor(address _erc20, address _erc721) {
        owner = payable(msg.sender);
        ERC20Address = _erc20;
        ERC721Address = _erc721;
    }

    //
    function tkn2nft(
        address _from,
        address _to,
        uint256 _nftID
    ) public {
        require(
            (IERC20(ERC20Address).allowance(_from, address(this))) >= 20,
            "Not enough tokens"
        );
        require(
            IERC721(ERC721Address).isApprovedForAll(_to, address(this)),
            "No Nft"
        );

        IERC20(ERC20Address).transferFrom(_from, _to, 20);
        IERC721(ERC721Address).transferFrom(_to, _from, _nftID);
    }
}
