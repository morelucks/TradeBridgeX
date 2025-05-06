// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TradeBridgeToken} from "../src/ERC20.sol";


contract DeployScript is Script {
    TradeBridgeToken public tradeToken;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // address deployer = 0x2252d89e6966d4ffd7d4EB80394bfCD3a4660e23;

        uint256 initialSupply = 10000 * 10 ** 18;

        // address tokenAddress = 0xf8BB15B31E9eC0c0222F69170Ca8e77a85c55e10;

        tradeToken = new TradeBridgeToken(initialSupply);

        console.log("TradeBridge deployed at: ", address(tradeToken));
        
        vm.stopBroadcast();
    }
}