// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFTHUB is ReentrancyGuard, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    address payable owner;
    uint256 listingPrice = 1;

    constructor() ERC721("NFTHUB", "NFTH") {
        owner = payable(msg.sender);
    }

    struct Item {
        uint256 id;
        address minter;
        address nftAddress;
        uint256 tokenId;
        string name;
        string description;
        string tokenURI;
    }

    mapping(uint256 => Item) private _idToItem;

    event ItemListed(uint256 indexed id, string name, string tokenURI);
     /**
        * @dev Validation checks are performed to ensure validity of the input data
        * @notice Allow users to list and mint an NFT
        * @param name The name of the NFT
        * @param description The description of the NFT
        * @param tokenURI The description of the tokenURI
     */
    function listNFT(
        string calldata name,
        string calldata description,
        string calldata tokenURI
    ) public payable nonReentrant {
        require(msg.value >= listingPrice, "Listing price not met");
        require(bytes(name).length > 0, "Empty name");
        require(bytes(description).length > 0, "Empty description");
        require(bytes(tokenURI).length > 0, "Empty token URI");
     
        uint256 tokenId = _tokenIds.current();
		_tokenIds.increment();

        // Mint the NFT
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        console.log("NFT minted successfully to %s", msg.sender);
        // Create a new item
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        Item memory newItem = Item(
            itemId,
            msg.sender,
            address(this),
            tokenId,
            name,
            description,
            tokenURI
        );
        _idToItem[itemId] = newItem;

        emit ItemListed(itemId, name, tokenURI);
        payable(owner).transfer(listingPrice);
    }
    /// @return listingPrice the price to list an NFT
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
     /**
        * @dev Callable only by deployer/owner
        * @notice Allows the deployer/owner of the smart contract to update the listing price
        * @param newPrice The new value for the listing price
     */
    function setListingPrice(uint256 newPrice) public {
        require(msg.sender == owner, "Only owner can set listing price");
        listingPrice = newPrice;
    }

    function fetchItem(uint256 itemId)
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
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
            item.tokenURI
        );
    }
    // Fetch the data for ui
    function getAllItems() public view returns (Item[] memory) {
        Item[] memory items = new Item[](_itemIds.current());
        for (uint256 i = 1; i <= _itemIds.current(); i++) {
            Item storage item = _idToItem[i];
            items[i - 1] = item;
        }
        return items;
    }
}
