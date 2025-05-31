// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ScooterRentToken is ERC20, Ownable {
    IERC20 public stablecoin;

    // Конструктор теперь принимает два параметра: адрес владельца и адрес stablecoin
    constructor(address initialOwner, address _stablecoin) ERC20("ScooterRentToken", "SRT") {
        _mint(initialOwner, 1_000_000 * 10 ** decimals());  // Минтинг токенов на адрес владельца
        stablecoin = IERC20(_stablecoin);  // Инициализируем stablecoin
        transferOwnership(initialOwner); // Устанавливаем владельца контракта
    }

    // Функция для депозита дивидендов
    function depositDividends(uint256 amount) external onlyOwner {
        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    // Функция для получения дивидендов
    function claimDividends() external {
        uint256 total = totalSupply();
        require(total > 0, "No tokens");

        uint256 balance = balanceOf(msg.sender);
        uint256 pool = stablecoin.balanceOf(address(this));
        uint256 share = (pool * balance) / total;

        require(share > 0, "Nothing to claim");
        require(stablecoin.transfer(msg.sender, share), "Transfer failed");
    }
}
