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

    constructor() {
        console.log("-smart contract constructed-");
    }

    // function wave() public {
    //     totalWaves += 1;
    //     console.log("sender:%s wave 'in' ", msg.sender);

    // }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        //emit an event
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    
    function getTotalWaves() public view returns (uint256) {
        console.log("total waves: %d", totalWaves);
        return totalWaves;
    }
}
