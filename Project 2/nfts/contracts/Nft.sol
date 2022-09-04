pragma solidity ^0.8.1;

// OpenZeppelin Contract imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// Inheritance (contract we imported to call other contract from our contract)
contract Nft is ERC721URIStorage{

    // To keep track of token ids
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private total;

    event NewNft(address sender, uint256 tokenId);
    
    // Passing NFT name and its Symbol (ERC721 is the NFT standard)
    constructor() ERC721 ("SquareNFT", "SQUARE") {
        console.log("NFT Contract Starting Up");
    }

    // User will call this function to get their NFT
    function makeAnEpicNFT() public {
        /* Get the current tokenId, this starts at 0.
           _tokenIds is a state variable initialzed to 0. It is to keep track of NFTs unique identifier
           This value will be incremented as the function is called again and again
        */
        uint256 newItemId = _tokenIds.current();
        total = newItemId;

        // Mint the NFT for the person who calls this contract's function.
        _safeMint(msg.sender, newItemId);

        /* This will set the NFT unique identifier along with some data associated with it which makes it valuable
           Its where the actual NFT data lives. The data actually links to a JSON file which is the metadata. This JSON file
           contains 'name', 'description' and any link to a video, image etc
           NFT will be broken if it does not follow OpenSea Requirement 
        */
        _setTokenURI(newItemId, "data:application/json;base64,ewoJIm5hbWUiOiAiRm9vdGJhbGwgU2hvZXMiLAogICAgImRlc2NyaXB0aW9uIjogIkl0cyBub3dheSBjbG9zZSEiLAogICAgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajRLSUNBZ0lEeHpkSGxzWlQ0dVltRnpaU0I3SUdacGJHdzZJSGRvYVhSbE95Qm1iMjUwTFdaaGJXbHNlVG9nYzJWeWFXWTdJR1p2Ym5RdGMybDZaVG9nTVRSd2VEc2dmVHd2YzNSNWJHVStDaUFnSUNBOGNtVmpkQ0IzYVdSMGFEMGlNVEF3SlNJZ2FHVnBaMmgwUFNJeE1EQWxJaUJtYVd4c1BTSmliR0ZqYXlJZ0x6NEtJQ0FnSUR4MFpYaDBJSGc5SWpVd0pTSWdlVDBpTlRBbElpQmpiR0Z6Y3owaVltRnpaU0lnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SW0xcFpHUnNaU0lnZEdWNGRDMWhibU5vYjNJOUltMXBaR1JzWlNJK1JYQnBZMHh2Y21SSVlXMWlkWEpuWlhJOEwzUmxlSFErQ2p3dmMzWm5QZz09Igp9");

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        emit NewNft(msg.sender, newItemId);
    }
}