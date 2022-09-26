// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// Import this file to use console.log
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RINFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public nftID;

    constructor() ERC721("RINFT", "RFT") {}

    function mintRINFT(address to, string memory uri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(to, newItemId);
        _setTokenURI(newItemId, uri);
        nftID = newItemId;
        return newItemId;
    }

    function lastNftID() public view returns (uint256) {
        return nftID;
    }

    /*
    function isAproved(address _to, uint256 _tokenId) public returns(bool){
        return (_tokenApprovals[_tokenId] == _to);
    }
    */

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function transf(
        address from,
        address to,
        uint256 tokenId
    ) public {
        _transfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
