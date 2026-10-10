// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MelaninRanking
 * @notice On-chain ranking algorithm - fully transparent and auditable
 * @dev Weights can only be changed via governance vote
 */
contract MelaninRanking is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    // Reference contracts
    address public verificationContract;
    address public contentIndexContract;

    // ============================================
    // RANKING WEIGHTS (out of 100)
    // These can only be changed via governance
    // ============================================
    
    struct RankingWeights {
        uint8 sourceBlackOwned;      // Is source Black-owned?
        uint8 sourceBlackCreated;    // Is creator Black?
        uint8 sourceVerification;    // Verification level
        uint8 contentQuality;        // Quality assessment
        uint8 contentFreshness;      // How recent
        uint8 communityUpvotes;      // Community appreciation
        uint8 communitySaves;        // Save count
        uint8 queryRelevance;        // Match to search
    }

    RankingWeights public weights;

    // Verification level scores (out of 100)
    mapping(uint8 => uint8) public verificationScores;

    event WeightsUpdated(RankingWeights newWeights, address indexed updatedBy);
    event ScoreCalculated(uint256 indexed contentId, uint256 score);

    constructor(
        address _verificationContract,
        address _contentIndexContract
    ) {
        verificationContract = _verificationContract;
        contentIndexContract = _contentIndexContract;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);

        // Initialize default weights (must sum to 100)
        weights = RankingWeights({
            sourceBlackOwned: 15,      // 15%
            sourceBlackCreated: 15,    // 15%
            sourceVerification: 10,    // 10%
            contentQuality: 10,        // 10%
            contentFreshness: 8,       // 8%
            communityUpvotes: 15,      // 15%
            communitySaves: 12,        // 12%
            queryRelevance: 15         // 15%
        });

        // Verification level scores
        verificationScores[0] = 0;   // None
        verificationScores[1] = 20;  // SelfDeclared
        verificationScores[2] = 60;  // CommunityVerified
        verificationScores[3] = 85;  // DAOVerified
        verificationScores[4] = 100; // PartnerVerified
    }

    /**
     * @notice Calculate ranking score for content
     * @dev This is a simplified version - full implementation would
     *      query verification contract and content index
     * @param isBlackOwned Whether source is Black-owned
     * @param isBlackCreated Whether creator is Black
     * @param verificationLevel Verification level (0-4)
     * @param qualityScore Quality assessment (0-100)
     * @param ageInDays Days since publication
     * @param upvotes Number of upvotes
     * @param saves Number of saves
     * @param relevanceScore Query relevance (0-100)
     */
    function calculateScore(
        bool isBlackOwned,
        bool isBlackCreated,
        uint8 verificationLevel,
        uint8 qualityScore,
        uint256 ageInDays,
        uint256 upvotes,
        uint256 saves,
        uint8 relevanceScore
    ) external view returns (uint256) {
        uint256 score = 0;

        // Source credibility (40% total)
        if (isBlackOwned) {
            score += weights.sourceBlackOwned;
        }
        if (isBlackCreated) {
            score += weights.sourceBlackCreated;
        }
        score += (uint256(verificationScores[verificationLevel]) * weights.sourceVerification) / 100;

        // Content quality (18% total)
        score += (uint256(qualityScore) * weights.contentQuality) / 100;
        score += (calculateFreshnessScore(ageInDays) * weights.contentFreshness) / 100;

        // Community signals (27% total)
        score += (calculateLogScore(upvotes) * weights.communityUpvotes) / 100;
        score += (calculateLogScore(saves) * weights.communitySaves) / 100;

        // Relevance (15%)
        score += (uint256(relevanceScore) * weights.queryRelevance) / 100;

        return score;
    }

    /**
     * @notice Calculate freshness score based on age
     * @dev Content less than 7 days old gets full score
     *      Decays over 90 days but never below 20
     */
    function calculateFreshnessScore(uint256 ageInDays) public pure returns (uint256) {
        if (ageInDays < 7) {
            return 100;
        }
        
        uint256 decay = (ageInDays - 7) / 2; // Slower decay
        if (decay > 80) {
            return 20; // Minimum score
        }
        
        return 100 - decay;
    }

    /**
     * @notice Calculate logarithmic score to prevent gaming
     * @dev log10(n+1) * 33, capped at 100
     */
    function calculateLogScore(uint256 count) public pure returns (uint256) {
        if (count == 0) return 0;
        
        // Approximate log10 using binary search
        uint256 log = 0;
        uint256 temp = count + 1;
        
        while (temp >= 10) {
            temp /= 10;
            log++;
        }
        
        // Scale to 0-100
        uint256 score = log * 33;
        return score > 100 ? 100 : score;
    }

    /**
     * @notice Update ranking weights (governance only)
     * @dev Weights must sum to 100
     */
    function updateWeights(RankingWeights calldata newWeights) external onlyRole(GOVERNANCE_ROLE) {
        uint256 sum = 
            newWeights.sourceBlackOwned +
            newWeights.sourceBlackCreated +
            newWeights.sourceVerification +
            newWeights.contentQuality +
            newWeights.contentFreshness +
            newWeights.communityUpvotes +
            newWeights.communitySaves +
            newWeights.queryRelevance;
            
        require(sum == 100, "Weights must sum to 100");
        
        weights = newWeights;
        emit WeightsUpdated(newWeights, msg.sender);
    }

    /**
     * @notice Get current weights
     */
    function getWeights() external view returns (RankingWeights memory) {
        return weights;
    }

    /**
     * @notice Update verification score for a level
     */
    function setVerificationScore(
        uint8 level,
        uint8 score
    ) external onlyRole(GOVERNANCE_ROLE) {
        require(level <= 4, "Invalid level");
        require(score <= 100, "Score must be <= 100");
        verificationScores[level] = score;
    }
}
