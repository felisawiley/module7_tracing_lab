/**
 * WEB3 INTEGRATION FOR MELANIN SEARCH
 * 
 * Three main use cases:
 * 1. DISCOVERY - Help people find Black Web3 creators, projects, and education
 * 2. MONETIZATION - Let creators receive crypto tips/support directly
 * 3. COMMUNITY - Optional token-gated features or DAO governance (future)
 */

// ============================================
// 1. BLACK WEB3 CREATOR & PROJECT DIRECTORY
// ============================================

export interface Web3Creator {
  id: string;
  name: string;
  type: "artist" | "developer" | "educator" | "founder" | "trader" | "analyst";
  bio: string;
  walletAddress?: string; // For tips
  ensName?: string; // e.g., "creator.eth"
  socialLinks: {
    twitter?: string;
    farcaster?: string;
    lens?: string;
    youtube?: string;
    website?: string;
  };
  tags: string[];
  isVerified: boolean;
}

export interface Web3Project {
  id: string;
  name: string;
  type: "nft" | "defi" | "dao" | "infrastructure" | "gaming" | "social" | "education";
  description: string;
  founders: string[]; // Creator IDs
  website: string;
  contractAddress?: string;
  chain: "ethereum" | "solana" | "base" | "polygon" | "multi-chain";
  isBlackFounded: boolean;
  isVerified: boolean;
  tags: string[];
}

export interface NFTCollection {
  id: string;
  name: string;
  artistId: string;
  artistName: string;
  description: string;
  contractAddress: string;
  chain: "ethereum" | "solana" | "base" | "polygon";
  marketplaceUrl: string; // OpenSea, Magic Eden, etc.
  floorPrice?: string;
  totalSupply?: number;
  tags: string[];
}

/**
 * SEED DATA: Black Web3 Creators & Projects
 * This would grow via community submissions
 */
export const seedWeb3Creators: Web3Creator[] = [
  {
    id: "web3_001",
    name: "Maliha Abidi",
    type: "artist",
    bio: "NFT artist and founder of Women Rise NFT, celebrating women of color globally",
    ensName: "womenrise.eth",
    socialLinks: {
      twitter: "https://twitter.com/MalihaAbidi",
      website: "https://www.womenrise.art/",
    },
    tags: ["nft", "art", "women", "diversity"],
    isVerified: true,
  },
  {
    id: "web3_002",
    name: "Black Dave",
    type: "artist",
    bio: "Multidisciplinary artist and musician exploring identity through digital art",
    socialLinks: {
      twitter: "https://twitter.com/BlackDave",
    },
    tags: ["nft", "art", "music", "culture"],
    isVerified: true,
  },
  {
    id: "web3_003",
    name: "Tavonia Evans",
    type: "founder",
    bio: "Founder of Guapcoin, a cryptocurrency designed to support Black businesses",
    socialLinks: {
      twitter: "https://twitter.com/TavoniaEvans",
      website: "https://guapcoin.org/",
    },
    tags: ["defi", "black business", "cryptocurrency"],
    isVerified: true,
  },
  {
    id: "web3_004",
    name: "Isaiah Jackson",
    type: "educator",
    bio: "Author of 'Bitcoin & Black America', educator on crypto for the Black community",
    socialLinks: {
      twitter: "https://twitter.com/IsaiahJackson",
      website: "https://bitcoinandblackamerica.com/",
    },
    tags: ["bitcoin", "education", "financial literacy"],
    isVerified: true,
  },
  {
    id: "web3_005",
    name: "Cleve Mesidor",
    type: "educator",
    bio: "Executive Director of Blockchain Foundation, advocate for inclusive crypto policy",
    socialLinks: {
      twitter: "https://twitter.com/CleveMesidor",
    },
    tags: ["policy", "education", "advocacy"],
    isVerified: true,
  },
  {
    id: "web3_006",
    name: "Oleanji",
    type: "developer",
    bio: "Blockchain developer and educator, making Web3 accessible to underrepresented communities",
    socialLinks: {
      twitter: "https://twitter.com/olaborateone",
      youtube: "https://youtube.com/@oleanji",
    },
    tags: ["development", "education", "solidity"],
    isVerified: true,
  },
];

export const seedWeb3Projects: Web3Project[] = [
  {
    id: "proj_001",
    name: "Guapcoin",
    type: "defi",
    description: "A cryptocurrency designed to circulate within and support Black communities and businesses",
    founders: ["web3_003"],
    website: "https://guapcoin.org/",
    chain: "multi-chain",
    isBlackFounded: true,
    isVerified: true,
    tags: ["cryptocurrency", "black business", "community"],
  },
  {
    id: "proj_002",
    name: "Black NFT Art",
    type: "nft",
    description: "Collective celebrating and promoting Black NFT artists globally",
    founders: [],
    website: "https://blacknftart.com/",
    chain: "ethereum",
    isBlackFounded: true,
    isVerified: true,
    tags: ["nft", "art", "collective", "artists"],
  },
  {
    id: "proj_003",
    name: "Afropolitan",
    type: "dao",
    description: "Building a digital nation for the African diaspora with crypto-native citizenship",
    founders: [],
    website: "https://afropolitan.io/",
    chain: "ethereum",
    isBlackFounded: true,
    isVerified: true,
    tags: ["dao", "community", "african diaspora", "citizenship"],
  },
  {
    id: "proj_004",
    name: "Crypto Baristas",
    type: "nft",
    description: "NFT project funding real-world coffee shops with community ownership",
    founders: [],
    website: "https://cryptocoffee.co/",
    chain: "ethereum",
    isBlackFounded: true,
    isVerified: true,
    tags: ["nft", "community", "real world", "coffee"],
  },
];

// ============================================
// 2. CREATOR MONETIZATION (TIPPING)
// ============================================

export interface TipConfig {
  creatorId: string;
  wallets: {
    ethereum?: string;
    solana?: string;
    bitcoin?: string;
    base?: string;
  };
  preferredCurrency: string;
  minimumTip?: string;
}

/**
 * Generate a tip link for a creator
 * Uses standard wallet connect or simple transfer
 */
export function generateTipLink(
  wallet: string,
  chain: "ethereum" | "solana" | "base",
  amount?: string
): string {
  switch (chain) {
    case "ethereum":
    case "base":
      // EIP-681 payment request
      return `ethereum:${wallet}${amount ? `?value=${amount}` : ""}`;
    case "solana":
      // Solana Pay URL
      return `solana:${wallet}${amount ? `?amount=${amount}` : ""}`;
    default:
      return wallet;
  }
}

// ============================================
// 3. WEB3 CONTENT CATEGORIES
// ============================================

export const web3Categories = [
  {
    id: "nft-art",
    name: "NFT Art",
    description: "Black NFT artists and digital art collections",
    icon: "🎨",
  },
  {
    id: "defi",
    name: "DeFi & Crypto",
    description: "Cryptocurrency, DeFi protocols, and financial tools",
    icon: "💰",
  },
  {
    id: "education",
    name: "Web3 Education",
    description: "Learn about blockchain, crypto, and Web3",
    icon: "📚",
  },
  {
    id: "projects",
    name: "Black-Led Projects",
    description: "Web3 projects founded by Black entrepreneurs",
    icon: "🚀",
  },
  {
    id: "community",
    name: "DAOs & Communities",
    description: "Decentralized communities and organizations",
    icon: "🤝",
  },
  {
    id: "gaming",
    name: "Gaming & Metaverse",
    description: "Blockchain gaming and virtual worlds",
    icon: "🎮",
  },
];

// ============================================
// 4. WEB3 RESOURCES & EDUCATION
// ============================================

export const web3Resources = [
  {
    title: "Bitcoin & Black America",
    description: "Book by Isaiah Jackson on why Bitcoin matters for Black economic empowerment",
    url: "https://bitcoinandblackamerica.com/",
    type: "book",
    tags: ["bitcoin", "education", "economics"],
  },
  {
    title: "Black Bitcoin Billionaires",
    description: "Community and educational platform for Black crypto investors",
    url: "https://blackbitcoinbillionaire.com/",
    type: "community",
    tags: ["bitcoin", "education", "investing"],
  },
  {
    title: "Blockchain Foundation",
    description: "Nonprofit advocating for blockchain policy that includes underrepresented communities",
    url: "https://blockchainfoundation.co/",
    type: "organization",
    tags: ["policy", "advocacy", "education"],
  },
  {
    title: "NFT Now - Black History Month Collection",
    description: "Curated collection of Black NFT artists and their stories",
    url: "https://nftnow.com/",
    type: "media",
    tags: ["nft", "art", "culture"],
  },
];
