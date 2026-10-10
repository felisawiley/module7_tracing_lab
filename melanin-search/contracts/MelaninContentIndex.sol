// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MelaninContentIndex
 * @notice On-chain index of content with IPFS pointers and community curation
 * @dev Content metadata lives on IPFS, this contract stores pointers and scores
 */
contract MelaninContentIndex is AccessControl {
    bytes32 public constant CURATOR_ROLE = keccak256("CURATOR_ROLE");
    
    // Reference to verification contract
    address public verificationContract;

    enum Category {
        Hair,
        Beauty,
        Fashion,
        Culture,
        Business,
        Web3,
        Wellness
    }

    struct Content {
        string ipfsCID;           // IPFS content identifier
        address submitter;        // Who submitted this
        address source;           // Verified source address
        address creator;          // Verified creator address (optional)
        Category category;
        uint256 submittedAt;
        uint256 upvotes;
        uint256 flags;
        bool isApproved;
        bool isActive;
    }

    // Content ID => Content
    mapping(uint256 => Content) public contents;
    
    // Track who upvoted/flagged what
    mapping(uint256 => mapping(address => bool)) public hasUpvoted;
    mapping(uint256 => mapping(address => bool)) public hasFlagged;
    
    // Category => Content IDs
    mapping(Category => uint256[]) public contentByCategory;
    
    // Source address => Content IDs
    mapping(address => uint256[]) public contentBySource;
    
    uint256 public contentCount;
    uint256 public flagThreshold = 10; // Auto-deactivate after this many flags

    event ContentSubmitted(uint256 indexed contentId, address indexed submitter, string ipfsCID);
    event ContentApproved(uint256 indexed contentId, address indexed approver);
    event ContentUpvoted(uint256 indexed contentId, address indexed voter);
    event ContentFlagged(uint256 indexed contentId, address indexed flagger, string reason);
    event ContentDeactivated(uint256 indexed contentId, string reason);

    constructor(address _verificationContract) {
        verificationContract = _verificationContract;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CURATOR_ROLE, msg.sender);
    }

    /**
     * @notice Submit new content for review
     * @param ipfsCID IPFS CID pointing to content metadata
     * @param source Address of the verified source
     * @param creator Address of the verified creator (optional, use address(0) if none)
     * @param category Content category
     */
    function submitContent(
        string calldata ipfsCID,
        address source,
        address creator,
        Category category
    ) external returns (uint256) {
        contentCount++;
        uint256 contentId = contentCount;

        contents[contentId] = Content({
            ipfsCID: ipfsCID,
            submitter: msg.sender,
            source: source,
            creator: creator,
            category: category,
            submittedAt: block.timestamp,
            upvotes: 0,
            flags: 0,
            isApproved: false,
            isActive: true
        });

        emit ContentSubmitted(contentId, msg.sender, ipfsCID);
        return contentId;
    }

    /**
     * @notice Approve submitted content (curators only)
     */
    function approveContent(uint256 contentId) external onlyRole(CURATOR_ROLE) {
        require(contents[contentId].submittedAt > 0, "Content does not exist");
        require(!contents[contentId].isApproved, "Already approved");
        
        contents[contentId].isApproved = true;
        
        // Add to category index
        contentByCategory[contents[contentId].category].push(contentId);
        
        // Add to source index
        if (contents[contentId].source != address(0)) {
            contentBySource[contents[contentId].source].push(contentId);
        }

        emit ContentApproved(contentId, msg.sender);
    }

    /**
     * @notice Upvote content
     */
    function upvote(uint256 contentId) external {
        require(contents[contentId].isApproved, "Content not approved");
        require(contents[contentId].isActive, "Content not active");
        require(!hasUpvoted[contentId][msg.sender], "Already upvoted");

        hasUpvoted[contentId][msg.sender] = true;
        contents[contentId].upvotes++;

        emit ContentUpvoted(contentId, msg.sender);
    }

    /**
     * @notice Flag content for review
     */
    function flag(uint256 contentId, string calldata reason) external {
        require(contents[contentId].isApproved, "Content not approved");
        require(!hasFlagged[contentId][msg.sender], "Already flagged");

        hasFlagged[contentId][msg.sender] = true;
        contents[contentId].flags++;

        emit ContentFlagged(contentId, msg.sender, reason);

        // Auto-deactivate if too many flags
        if (contents[contentId].flags >= flagThreshold) {
            contents[contentId].isActive = false;
            emit ContentDeactivated(contentId, "Flag threshold reached");
        }
    }

    /**
     * @notice Get content by category
     * @param category The category to query
     * @param offset Starting index for pagination
     * @param limit Max number of results
     */
    function getContentByCategory(
        Category category,
        uint256 offset,
        uint256 limit
    ) external view returns (uint256[] memory) {
        uint256[] storage allContent = contentByCategory[category];
        
        if (offset >= allContent.length) {
            return new uint256[](0);
        }
        
        uint256 end = offset + limit;
        if (end > allContent.length) {
            end = allContent.length;
        }
        
        uint256[] memory result = new uint256[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = allContent[i];
        }
        
        return result;
    }

    /**
     * @notice Get content details
     */
    function getContent(uint256 contentId) external view returns (
        string memory ipfsCID,
        address source,
        address creator,
        Category category,
        uint256 upvotes,
        uint256 flags,
        bool isApproved,
        bool isActive
    ) {
        Content memory c = contents[contentId];
        return (
            c.ipfsCID,
            c.source,
            c.creator,
            c.category,
            c.upvotes,
            c.flags,
            c.isApproved,
            c.isActive
        );
    }

    /**
     * @notice Update flag threshold (governance)
     */
    function setFlagThreshold(uint256 newThreshold) external onlyRole(DEFAULT_ADMIN_ROLE) {
        flagThreshold = newThreshold;
    }
}
