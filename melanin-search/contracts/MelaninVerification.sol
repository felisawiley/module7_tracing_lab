// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MelaninVerification
 * @notice Soul-bound tokens (SBTs) for Black-owned source and creator verification
 * @dev Non-transferable NFTs that prove verification status
 */
contract MelaninVerification is ERC721, AccessControl {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum VerificationLevel {
        None,
        SelfDeclared,    // Creator self-attested
        CommunityVerified, // Community vouched
        DAOVerified,     // Passed DAO vote
        PartnerVerified  // Verified by partner org (OBWS, etc.)
    }

    enum EntityType {
        Creator,
        Source
    }

    struct Verification {
        EntityType entityType;
        VerificationLevel level;
        string metadataURI;  // IPFS URI with details
        uint256 verifiedAt;
        uint256 vouchCount;
        bool isActive;
    }

    // Token ID => Verification data
    mapping(uint256 => Verification) public verifications;
    
    // Address => Token ID (each address can only have one verification)
    mapping(address => uint256) public addressToToken;
    
    // Address => addresses that vouched for them
    mapping(address => mapping(address => bool)) public vouches;
    
    // Minimum vouches needed for community verification
    uint256 public minVouchesForCommunity = 10;
    
    uint256 private _tokenIdCounter;

    event Registered(address indexed entity, uint256 tokenId, EntityType entityType);
    event Verified(address indexed entity, VerificationLevel level);
    event Vouched(address indexed voucher, address indexed entity);
    event Revoked(address indexed entity, string reason);

    constructor() ERC721("Melanin Verification", "MLNV") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
    }

    /**
     * @notice Register as a creator or source (self-declaration)
     * @param entityType Whether registering as Creator or Source
     * @param metadataURI IPFS URI containing profile/source details
     */
    function register(
        EntityType entityType,
        string calldata metadataURI
    ) external returns (uint256) {
        require(addressToToken[msg.sender] == 0, "Already registered");
        
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        _safeMint(msg.sender, tokenId);
        
        verifications[tokenId] = Verification({
            entityType: entityType,
            level: VerificationLevel.SelfDeclared,
            metadataURI: metadataURI,
            verifiedAt: block.timestamp,
            vouchCount: 0,
            isActive: true
        });
        
        addressToToken[msg.sender] = tokenId;
        
        emit Registered(msg.sender, tokenId, entityType);
        return tokenId;
    }

    /**
     * @notice Vouch for another entity's verification
     * @param entity Address to vouch for
     */
    function vouch(address entity) external {
        require(addressToToken[msg.sender] != 0, "Must be registered to vouch");
        require(addressToToken[entity] != 0, "Entity not registered");
        require(!vouches[entity][msg.sender], "Already vouched");
        require(msg.sender != entity, "Cannot vouch for yourself");
        
        vouches[entity][msg.sender] = true;
        
        uint256 tokenId = addressToToken[entity];
        verifications[tokenId].vouchCount++;
        
        // Auto-upgrade to community verified if enough vouches
        if (
            verifications[tokenId].vouchCount >= minVouchesForCommunity &&
            verifications[tokenId].level == VerificationLevel.SelfDeclared
        ) {
            verifications[tokenId].level = VerificationLevel.CommunityVerified;
            emit Verified(entity, VerificationLevel.CommunityVerified);
        }
        
        emit Vouched(msg.sender, entity);
    }

    /**
     * @notice Upgrade verification level (DAO or Partner)
     * @dev Only callable by verifiers (DAO or partners)
     */
    function verify(
        address entity,
        VerificationLevel level
    ) external onlyRole(VERIFIER_ROLE) {
        require(addressToToken[entity] != 0, "Entity not registered");
        require(
            level == VerificationLevel.DAOVerified || 
            level == VerificationLevel.PartnerVerified,
            "Invalid level"
        );
        
        uint256 tokenId = addressToToken[entity];
        verifications[tokenId].level = level;
        verifications[tokenId].verifiedAt = block.timestamp;
        
        emit Verified(entity, level);
    }

    /**
     * @notice Revoke verification
     * @dev Only callable by governance
     */
    function revoke(
        address entity,
        string calldata reason
    ) external onlyRole(GOVERNANCE_ROLE) {
        require(addressToToken[entity] != 0, "Entity not registered");
        
        uint256 tokenId = addressToToken[entity];
        verifications[tokenId].isActive = false;
        
        emit Revoked(entity, reason);
    }

    /**
     * @notice Get verification status for an address
     */
    function getVerification(address entity) external view returns (
        bool isRegistered,
        EntityType entityType,
        VerificationLevel level,
        uint256 vouchCount,
        bool isActive
    ) {
        uint256 tokenId = addressToToken[entity];
        if (tokenId == 0) {
            return (false, EntityType.Creator, VerificationLevel.None, 0, false);
        }
        
        Verification memory v = verifications[tokenId];
        return (true, v.entityType, v.level, v.vouchCount, v.isActive);
    }

    /**
     * @notice Update minimum vouches required for community verification
     */
    function setMinVouches(uint256 newMin) external onlyRole(GOVERNANCE_ROLE) {
        minVouchesForCommunity = newMin;
    }

    // ============================================
    // SOUL-BOUND: Disable transfers
    // ============================================
    
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Only allow minting (from = 0) and burning (to = 0)
        require(
            from == address(0) || to == address(0),
            "Soul-bound: transfer disabled"
        );
        
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, AccessControl) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
}
