// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MelaninTips
 * @notice Let users tip creators directly - 100% goes to creator, no platform fee
 * @dev Supports ETH and ERC20 tokens
 */
contract MelaninTips is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Reference to verification contract
    address public verificationContract;

    struct Tip {
        address tipper;
        address creator;
        uint256 amount;
        address token; // address(0) for ETH
        string message;
        uint256 timestamp;
    }

    // All tips
    Tip[] public tips;
    
    // Creator => total tips received (in wei for ETH)
    mapping(address => uint256) public totalTipsReceived;
    
    // Creator => tip count
    mapping(address => uint256) public tipCount;
    
    // Creator => token => balance
    mapping(address => mapping(address => uint256)) public pendingWithdrawals;

    event TipSent(
        uint256 indexed tipId,
        address indexed tipper,
        address indexed creator,
        uint256 amount,
        address token,
        string message
    );
    
    event TipWithdrawn(
        address indexed creator,
        address token,
        uint256 amount
    );

    constructor(address _verificationContract) {
        verificationContract = _verificationContract;
    }

    /**
     * @notice Tip a creator with ETH
     * @param creator Address of the creator to tip
     * @param message Optional message with the tip
     */
    function tipETH(
        address creator,
        string calldata message
    ) external payable nonReentrant {
        require(msg.value > 0, "Tip must be > 0");
        require(creator != address(0), "Invalid creator");
        require(creator != msg.sender, "Cannot tip yourself");

        uint256 tipId = tips.length;
        
        tips.push(Tip({
            tipper: msg.sender,
            creator: creator,
            amount: msg.value,
            token: address(0),
            message: message,
            timestamp: block.timestamp
        }));

        pendingWithdrawals[creator][address(0)] += msg.value;
        totalTipsReceived[creator] += msg.value;
        tipCount[creator]++;

        emit TipSent(tipId, msg.sender, creator, msg.value, address(0), message);
    }

    /**
     * @notice Tip a creator with ERC20 tokens
     * @param creator Address of the creator to tip
     * @param token ERC20 token address
     * @param amount Amount of tokens to tip
     * @param message Optional message with the tip
     */
    function tipToken(
        address creator,
        address token,
        uint256 amount,
        string calldata message
    ) external nonReentrant {
        require(amount > 0, "Tip must be > 0");
        require(creator != address(0), "Invalid creator");
        require(token != address(0), "Use tipETH for ETH");
        require(creator != msg.sender, "Cannot tip yourself");

        // Transfer tokens from tipper to contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        uint256 tipId = tips.length;
        
        tips.push(Tip({
            tipper: msg.sender,
            creator: creator,
            amount: amount,
            token: token,
            message: message,
            timestamp: block.timestamp
        }));

        pendingWithdrawals[creator][token] += amount;
        tipCount[creator]++;

        emit TipSent(tipId, msg.sender, creator, amount, token, message);
    }

    /**
     * @notice Withdraw pending tips (ETH)
     */
    function withdrawETH() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender][address(0)];
        require(amount > 0, "No ETH to withdraw");

        pendingWithdrawals[msg.sender][address(0)] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit TipWithdrawn(msg.sender, address(0), amount);
    }

    /**
     * @notice Withdraw pending tips (ERC20)
     * @param token ERC20 token address
     */
    function withdrawToken(address token) external nonReentrant {
        require(token != address(0), "Use withdrawETH for ETH");
        
        uint256 amount = pendingWithdrawals[msg.sender][token];
        require(amount > 0, "No tokens to withdraw");

        pendingWithdrawals[msg.sender][token] = 0;
        
        IERC20(token).safeTransfer(msg.sender, amount);

        emit TipWithdrawn(msg.sender, token, amount);
    }

    /**
     * @notice Get tip details
     */
    function getTip(uint256 tipId) external view returns (
        address tipper,
        address creator,
        uint256 amount,
        address token,
        string memory message,
        uint256 timestamp
    ) {
        require(tipId < tips.length, "Invalid tip ID");
        Tip memory t = tips[tipId];
        return (t.tipper, t.creator, t.amount, t.token, t.message, t.timestamp);
    }

    /**
     * @notice Get tips for a creator
     * @param creator Address of the creator
     * @param offset Starting index
     * @param limit Max results
     */
    function getTipsForCreator(
        address creator,
        uint256 offset,
        uint256 limit
    ) external view returns (Tip[] memory) {
        // Count tips for this creator
        uint256 count = 0;
        for (uint256 i = 0; i < tips.length; i++) {
            if (tips[i].creator == creator) {
                count++;
            }
        }

        if (offset >= count) {
            return new Tip[](0);
        }

        uint256 resultSize = count - offset;
        if (resultSize > limit) {
            resultSize = limit;
        }

        Tip[] memory result = new Tip[](resultSize);
        uint256 resultIndex = 0;
        uint256 skipCount = 0;

        for (uint256 i = 0; i < tips.length && resultIndex < resultSize; i++) {
            if (tips[i].creator == creator) {
                if (skipCount >= offset) {
                    result[resultIndex] = tips[i];
                    resultIndex++;
                } else {
                    skipCount++;
                }
            }
        }

        return result;
    }

    /**
     * @notice Get total tip count
     */
    function getTotalTipCount() external view returns (uint256) {
        return tips.length;
    }

    /**
     * @notice Get pending balance for a creator
     */
    function getPendingBalance(
        address creator,
        address token
    ) external view returns (uint256) {
        return pendingWithdrawals[creator][token];
    }
}
