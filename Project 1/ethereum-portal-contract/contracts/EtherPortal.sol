// Specifies which solidity compiler to use
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Similar to like a class. Constructor will run after first initialization
contract EtherPortal {

    // State variable that is initialized to 0 and is stored permanentyl in contract storage
    uint256 helloCount;

    // Events are used to tell font-end applications about blockchain actions.
    event NewGreeting(address indexed from, uint256 timestamp, string message);

    struct Hello {
        address sender; // The address of the user who said hello.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Hello[] hellos;
    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Ethereum Portal Getting Ready !!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sayHello(string memory _message) public {
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
        lastWavedAt[msg.sender] = block.timestamp;

        helloCount += 1;

        /* Here msg.sender is like a built-in authentication. Its the wallet address of the person who called this function.
           To call a smart contract, wallet connection is neccessary 
        */
        console.log("%s has a greeting for you with the message: %s!", msg.sender, _message);

        hellos.push(Hello(msg.sender, _message, block.timestamp));
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if(seed < 50){
            console.log("%s won!", msg.sender);

            // Setting the prize money
            uint256 prizeAmount = 0.0001 ether;

            // Checking if our contract has some ether in it
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            // Send prize amount (ethers) to the sender who said hello to us
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");

            // If the transaction was not successfull then throw error
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewGreeting(msg.sender, block.timestamp, _message);
    }

    function getAllHellos() public view returns (Hello[] memory) {
        return hellos;
    }

    function getTotalHellos() public view returns (uint256) {
        console.log("We have %d total greetings :-) !", helloCount);
        return helloCount;
    }
}