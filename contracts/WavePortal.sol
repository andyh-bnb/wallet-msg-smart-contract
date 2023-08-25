// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

// Uncomment this line to use console.log
import "hardhat/console.sol";
contract WavePortal {

    uint256 totalWaves;
    event NewWave(address indexed from, uint256 timestamp, string message);

     struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    
     //This is an address => uint mapping, associate an address with a number!
     // storing the address with the last time the user waved at us.
     mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("-smart contract constructed-");
    }

    // function wave() public {
    //     totalWaves += 1;
    //     console.log("sender:%s wave 'in' ", msg.sender);

    // }

    function wave(string memory _message) public {
        
        //Prevent Spam
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30 secs"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s sent a message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        //emit an event
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.000001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Insufficient fund for the prize"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");    
        
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    
    function getTotalWaves() public view returns (uint256) {
        console.log("total waves: %d", totalWaves);
        return totalWaves;
    }
}
