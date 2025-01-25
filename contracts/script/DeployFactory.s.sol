// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol"; 
import {Factory} from "../src/Factory.sol";

contract DeployFactory is Script {
    uint256 public constant FEE = 0.01 ether;
    
    function run() external returns (address factoryAddress) {
        vm.startBroadcast();
        Factory factory = new Factory(FEE);
        vm.stopBroadcast();
        
        console.log("Factory deployed at:", address(factory));
        
        return address(factory);
    }
}