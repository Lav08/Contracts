// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IBTToken is ERC20 {
    address public owner;

    constructor() ERC20("IBTToken", "IBT") {
        owner = msg.sender; 
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == owner, "Only owner can burn");
        _burn(from, amount);
    }
}
