/**
 * WEB3-NATIVE ARCHITECTURE FOR MELANIN SEARCH
 * 
 * Building the entire platform on decentralized technology:
 * - No central database = no single point of failure/censorship
 * - Community governance = the people decide what's included
 * - Creator ownership = verified status as on-chain credentials
 * - Transparent ranking = algorithm lives on-chain, fully auditable
 */

// ============================================
// CORE WEB3 STACK
// ============================================

export const web3Stack = {
  // BLOCKCHAIN: Where the core logic lives
  blockchain: {
    primary: "Base", // Ethereum L2 - low fees, high speed
    alternatives: ["Optimism", "Arbitrum", "Polygon"],
    why: "Need low transaction costs for community interactions (votes, submissions, tips)",
  },

  // STORAGE: Where content metadata lives
  storage: {
    contentIndex: "IPFS", // Decentralized file storage
    permanentArchive: "Arweave", // Permanent storage for important content
    why: "Content can't be censored or taken down by any single entity",
  },

  // IDENTITY: How creators verify themselves
  identity: {
    walletAuth: "Sign-In with Ethereum (SIWE)",
    credentials: "Soul-bound tokens (SBTs) for verification badges",
    profiles: "Lens Protocol or Farcaster profiles",
    why: "Creators own their identity, portable across platforms",
  },

  // GOVERNANCE: How the community makes decisions
  governance: {
    voting: "Snapshot + on-chain execution",
    treasury: "Gnosis Safe multisig",
    token: "Governance token for voting power",
    why: "Community decides what sources get verified, ranking weights, etc.",
  },

  // FRONTEND: The user interface
  frontend: {
    hosting: "IPFS + ENS domain (melaninsearch.eth)",
    framework: "Next.js with ethers.js/viem",
    wallet: "RainbowKit or ConnectKit",
    why: "Fully decentralized - even the frontend can't be taken down",
  },
};

// ============================================
// SMART CONTRACTS
// ============================================

/**
 * Core contracts that power the platform
 */
export const contracts = {
  // Verification Registry - tracks verified sources & creators
  verificationRegistry: {
    purpose: "Store and manage verification status on-chain",
    functions: [
      "registerSource(address, metadata, verificationLevel)",
      "verifyCreator(address, proofHash)",
      "revokeVerification(address, reason)",
      "getVerificationStatus(address)",
    ],
    soulBoundTokens: true, // Verification = non-transferable NFT
  },

  // Content Index - pointers to content stored on IPFS
  contentIndex: {
    purpose: "Maintain searchable index of all content",
    functions: [
      "submitContent(ipfsHash, sourceAddress, category)",
      "updateContent(contentId, newIpfsHash)",
      "flagContent(contentId, reason)",
      "getContentByCategory(category)",
    ],
    storage: "IPFS CIDs stored on-chain, actual content on IPFS",
  },

  // Ranking Algorithm - transparent, on-chain logic
  rankingAlgorithm: {
    purpose: "Fully transparent ranking that anyone can audit",
    functions: [
      "calculateScore(contentId) returns (uint256)",
      "updateWeights(newWeights) onlyGovernance",
      "getWeights() returns (RankingWeights)",
    ],
    governance: "Weights can only be changed via DAO vote",
  },

  // Community Curation - upvotes, flags, submissions
  communityCuration: {
    purpose: "Community signals that feed into ranking",
    functions: [
      "upvote(contentId)",
      "flag(contentId, reason)",
      "submitForReview(ipfsHash, category)",
      "voteOnSubmission(submissionId, approve)",
    ],
    incentives: "Curators earn tokens for quality submissions",
  },

  // Creator Tips - direct crypto payments to creators
  creatorTips: {
    purpose: "Let users tip creators directly",
    functions: [
      "tip(creatorAddress, amount)",
      "tipWithMessage(creatorAddress, amount, message)",
      "withdrawTips()",
    ],
    fees: "0% platform fee - 100% goes to creator",
  },

  // Governance Token
  governanceToken: {
    purpose: "Vote on platform decisions",
    name: "MELANIN",
    symbol: "MLN",
    distribution: [
      "40% - Community airdrops to early users",
      "25% - Creator rewards",
      "20% - Development fund",
      "15% - Team (4-year vesting)",
    ],
    utility: [
      "Vote on verification decisions",
      "Vote on ranking algorithm changes",
      "Vote on treasury spending",
      "Stake for curation rewards",
    ],
  },
};

// ============================================
// VERIFICATION AS SOUL-BOUND TOKENS
// ============================================

/**
 * Soul-bound tokens (SBTs) for verification
 * These are non-transferable NFTs that prove status
 */
export const verificationSBTs = {
  // For sources/publications
  sourceSBT: {
    name: "Verified Black-Owned Source",
    symbol: "VBO",
    levels: [
      {
        level: 1,
        name: "Community Verified",
        requirements: "10+ community vouches, no flags",
        benefits: "Appears in search with community badge",
      },
      {
        level: 2,
        name: "DAO Verified",
        requirements: "Passed DAO verification vote",
        benefits: "Higher ranking weight, featured placement",
      },
      {
        level: 3,
        name: "Foundation Verified",
        requirements: "Verified by partner orgs (OBWS, NMSDC, etc.)",
        benefits: "Highest trust level, priority ranking",
      },
    ],
  },

  // For individual creators
  creatorSBT: {
    name: "Verified Black Creator",
    symbol: "VBC",
    verification: [
      "Self-attestation (lowest weight)",
      "Community vouching (medium weight)",
      "Identity verification via partner (highest weight)",
    ],
    benefits: [
      "Creator badge on all content",
      "Eligible for creator fund",
      "Direct tipping enabled",
      "Governance voting power",
    ],
  },
};

// ============================================
// DECENTRALIZED CONTENT INDEX
// ============================================

/**
 * How content is stored and indexed
 */
export const contentArchitecture = {
  // Content metadata stored on IPFS
  ipfsContent: {
    structure: {
      title: "string",
      description: "string",
      url: "string",
      category: "string",
      tags: "string[]",
      creatorAddress: "address",
      sourceAddress: "address",
      publishedAt: "timestamp",
      contentHash: "bytes32", // Hash of actual content for integrity
    },
    pinning: "Pinata or web3.storage for reliable availability",
  },

  // On-chain index for searching
  onChainIndex: {
    stored: [
      "IPFS CID (pointer to content)",
      "Category",
      "Source address",
      "Creator address",
      "Submission timestamp",
      "Community score",
    ],
    indexed: "The Graph subgraph for fast queries",
  },

  // Search flow
  searchFlow: [
    "1. User searches on frontend",
    "2. Query hits The Graph subgraph",
    "3. Subgraph returns matching content CIDs + scores",
    "4. Frontend fetches content from IPFS",
    "5. Results displayed with on-chain ranking",
  ],
};

// ============================================
// DAO GOVERNANCE
// ============================================

/**
 * How the community governs the platform
 */
export const daoGovernance = {
  // What can be voted on
  governableDecisions: [
    "Verify/revoke source verification",
    "Adjust ranking algorithm weights",
    "Add new content categories",
    "Allocate treasury funds",
    "Partner with verification organizations",
    "Update smart contracts",
  ],

  // Voting process
  votingProcess: {
    proposalThreshold: "1% of total tokens to submit proposal",
    votingPeriod: "5 days",
    quorum: "10% of tokens must vote",
    passingThreshold: "Simple majority (50%+1)",
    execution: "24-hour timelock before execution",
  },

  // Token distribution for governance
  tokenHolders: [
    "Creators - earn tokens for verified content",
    "Curators - earn tokens for quality submissions",
    "Early users - retroactive airdrop",
    "Stakers - earn yield for securing network",
  ],
};

// ============================================
// ECONOMIC MODEL
// ============================================

/**
 * How value flows through the platform
 */
export const economics = {
  // Revenue streams
  revenue: [
    {
      source: "Creator tips",
      fee: "0%", // Free, but optional donation to treasury
      distribution: "100% to creator",
    },
    {
      source: "Featured placements",
      fee: "Pay with tokens",
      distribution: "100% to treasury",
    },
    {
      source: "API access",
      fee: "Tiered pricing",
      distribution: "Treasury + stakers",
    },
    {
      source: "Verification services",
      fee: "One-time token burn",
      distribution: "Deflationary (burned)",
    },
  ],

  // Creator rewards
  creatorRewards: {
    source: "Treasury allocation",
    criteria: [
      "Content engagement (views, saves)",
      "Community upvotes",
      "Verification level",
      "Consistency of posting",
    ],
    distribution: "Monthly via smart contract",
  },

  // Curation rewards
  curationRewards: {
    source: "Treasury allocation",
    criteria: [
      "Quality of submissions",
      "Early discovery (finding content before it's popular)",
      "Accuracy of flags",
    ],
    distribution: "Weekly via smart contract",
  },
};

// ============================================
// IMPLEMENTATION PHASES
// ============================================

export const implementationPhases = {
  phase1: {
    name: "Foundation",
    duration: "2-3 months",
    deliverables: [
      "Smart contracts (Verification, Content Index)",
      "IPFS integration",
      "Basic frontend with wallet connect",
      "Manual verification process",
    ],
  },

  phase2: {
    name: "Community",
    duration: "2-3 months",
    deliverables: [
      "Community curation contracts",
      "Governance token launch",
      "DAO setup (Snapshot + Safe)",
      "The Graph subgraph",
    ],
  },

  phase3: {
    name: "Scale",
    duration: "3-4 months",
    deliverables: [
      "On-chain ranking algorithm",
      "Creator rewards system",
      "Partner integrations",
      "Mobile app",
    ],
  },

  phase4: {
    name: "Decentralize",
    duration: "Ongoing",
    deliverables: [
      "Full DAO governance",
      "IPFS-hosted frontend",
      "ENS domain (melaninsearch.eth)",
      "Multi-chain deployment",
    ],
  },
};

// ============================================
// TECH STACK SUMMARY
// ============================================

export const techStackSummary = {
  contracts: "Solidity on Base/Optimism",
  storage: "IPFS + Arweave",
  indexing: "The Graph",
  frontend: "Next.js + viem + RainbowKit",
  identity: "SIWE + Soul-bound tokens",
  governance: "Snapshot + Gnosis Safe",
  deployment: "Hardhat + Foundry",
};
