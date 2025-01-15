// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import { Token } from "./Token.sol";

contract Counter {
    uint256 public fee;
    address public owner;

    constructor(uint256 _fee) {
        fee = _fee;
        owner = msg.sender;
    }
}
