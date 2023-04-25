// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTHUB is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    address payable owner;
    uint256 listingPrice = 1;

    constructor() ERC721("NFTHUB", "NFTH") {
        owner = payable(msg.sender);
    }

    struct Metadata {
    string author;
    string date;
    string keywords;
}


    struct Item {
        uint256 id;
        address minter;
        address nftAddress;
        uint256 tokenId;
        string name;
        string description;
        string tokenURI;
        Metadata metadata;

    }



    mapping(uint256 => Item) private _idToItem;

    event ItemListed(uint256 indexed id, string name, string tokenURI);

// list an nft in the hub
  function listNFT(
    string memory name,
    string memory description,
    string memory tokenURI,
    string memory author,
    string memory date,
    string memory keywords
) public payable nonReentrant {
    require(msg.value >= listingPrice, "Listing price not met");

    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();

    // Mint the NFT
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);

    // Create a new item
    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    Metadata memory metadata = Metadata(author, date, keywords);

    Item memory newItem = Item(
        itemId,
        msg.sender,
        address(this),
        tokenId,
        name,
        description,
        tokenURI,
        metadata
    );
    _idToItem[itemId] = newItem;

    emit ItemListed(itemId, name, tokenURI);
    payable(owner).transfer(listingPrice);
}


    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function setListingPrice(uint256 newPrice) public {
        require(msg.sender == owner, "Only owner can set listing price");
        listingPrice = newPrice;
    }
// fetch an item from the hub
function fetchItem(
    uint256 itemId
)
    public
    view
    returns (
        uint256,
        address,
        address,
        uint256,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    )
{
    require(_idToItem[itemId].minter != address(0), "Item does not exist");

    Item storage item = _idToItem[itemId];

    return (
        item.id,
        item.minter,
        item.nftAddress,
        item.tokenId,
        item.name,
        item.description,
        item.tokenURI,
        item.metadata.author,
        item.metadata.date,
        item.metadata.keywords
    );
}

// contract owner withdraws balance of contract
    function withdraw() public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds");
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }

}
