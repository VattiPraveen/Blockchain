// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";

/*
interface IERC1155 {
    event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);

    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    event URI(string _value, uint256 indexed _id);

    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;

    function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;

    function balanceOf(address _owner, uint256 _id) external view returns (uint256);

    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);

    function setApprovalForAll(address _operator, bool _approved) external;

    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

*/

contract WhitelistMint is ERC1155 {
    address private owner;
    mapping(address => bool) isWhitelisted;

    constructor() ERC1155("GameNFTs") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized");
        _;
    }

    modifier onlyWhitelisted() {
        require(isWhitelisted[msg.sender], "You are not whitelisted.");
        _;
    }

    function whitelistUser(address _user) public onlyOwner {
        isWhitelisted[_user] = true;
    }

    function totalCount(uint256[] memory _amount)
        internal
        pure
        returns (uint256)
    {
        uint256 count;
        for (uint i = 0; i < _amount.length; i++) {
            count = count + _amount[i];
        }
        return count;
    }

    function mintNFT(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) public payable onlyWhitelisted {
        require(
            totalCount(_amounts) <= 5,
            "You can only mint 5 NFTs at a time."
        );
        uint amount;
        uint reqAmount;
        amount = msg.value;
        reqAmount = (totalCount(_amounts) * 200000000000000000);
        require(
            amount == reqAmount,
            "Send exactly 0.2 eth for minting each NFT"
        );

        _mintBatch(_to, _ids, _amounts, "");
    }
}
