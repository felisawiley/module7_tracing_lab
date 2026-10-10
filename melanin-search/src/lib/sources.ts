/**
 * Black-Owned Sources Registry
 * 
 * Curated list of Black-owned publications, newsletters, blogs, and content creators
 * to prioritize in search results and actively aggregate content from.
 */

export interface ContentSource {
  id: string;
  name: string;
  url: string;
  rssUrl?: string;
  type: "publication" | "newsletter" | "blog" | "youtube" | "podcast" | "directory";
  categories: string[];
  isBlackOwned: boolean;
  isVerified: boolean;
  description: string;
}

export const blackOwnedSources: ContentSource[] = [
  // HAIR & BEAUTY PUBLICATIONS
  {
    id: "curlpattern",
    name: "CurlPattern",
    url: "https://curlpattern.com",
    type: "blog",
    categories: ["hair"],
    isBlackOwned: true,
    isVerified: true,
    description: "Natural hair care guides and tutorials for all curl types",
  },
  {
    id: "blackgirllonghair",
    name: "Black Girl Long Hair",
    url: "https://blackgirllonghair.com",
    rssUrl: "https://blackgirllonghair.com/feed/",
    type: "publication",
    categories: ["hair", "beauty"],
    isBlackOwned: true,
    isVerified: true,
    description: "Celebrating Black beauty since 2008",
  },
  {
    id: "naturallycurly",
    name: "NaturallyCurly",
    url: "https://www.naturallycurly.com",
    rssUrl: "https://www.naturallycurly.com/feed",
    type: "publication",
    categories: ["hair"],
    isBlackOwned: false,
    isVerified: true,
    description: "Curly and textured hair community and resources",
  },
  {
    id: "un-ruly",
    name: "Un-ruly",
    url: "https://un-ruly.com",
    type: "publication",
    categories: ["hair", "beauty", "culture"],
    isBlackOwned: true,
    isVerified: true,
    description: "Celebrating Black hair in all its forms",
  },
  {
    id: "cocoaswatches",
    name: "Cocoa Swatches",
    url: "https://cocoaswatches.com",
    type: "blog",
    categories: ["beauty"],
    isBlackOwned: true,
    isVerified: true,
    description: "Beauty swatches and reviews for melanin-rich skin",
  },
  {
    id: "blackbeautybombshells",
    name: "Black Beauty Bombshells",
    url: "https://blackbeautybombshells.com",
    type: "blog",
    categories: ["beauty"],
    isBlackOwned: true,
    isVerified: true,
    description: "Beauty tips and product reviews for Black women",
  },

  // NEWSLETTERS
  {
    id: "thecut",
    name: "The Cut",
    url: "https://www.thecut.com",
    type: "newsletter",
    categories: ["beauty", "fashion", "culture"],
    isBlackOwned: false,
    isVerified: true,
    description: "Style, culture, power (features Black voices prominently)",
  },
  {
    id: "forharriet",
    name: "For Harriet",
    url: "https://www.forharriet.com",
    rssUrl: "https://www.forharriet.com/feeds/posts/default",
    type: "newsletter",
    categories: ["culture", "wellness"],
    isBlackOwned: true,
    isVerified: true,
    description: "Celebrating the fullness of Black womanhood",
  },
  {
    id: "blavity",
    name: "Blavity",
    url: "https://blavity.com",
    rssUrl: "https://blavity.com/feed",
    type: "publication",
    categories: ["culture", "business", "news"],
    isBlackOwned: true,
    isVerified: true,
    description: "News and culture for the multi-cultural generation",
  },
  {
    id: "afrotech",
    name: "AfroTech",
    url: "https://afrotech.com",
    rssUrl: "https://afrotech.com/feed",
    type: "newsletter",
    categories: ["business", "web3", "culture"],
    isBlackOwned: true,
    isVerified: true,
    description: "Technology news for the culture",
  },
  {
    id: "theglowup",
    name: "The Glow Up",
    url: "https://theglowup.theroot.com",
    type: "newsletter",
    categories: ["beauty", "fashion"],
    isBlackOwned: true,
    isVerified: true,
    description: "Beauty and style for the culture (part of The Root)",
  },

  // FASHION
  {
    id: "essencefashion",
    name: "ESSENCE",
    url: "https://www.essence.com",
    rssUrl: "https://www.essence.com/feed/",
    type: "publication",
    categories: ["fashion", "beauty", "culture", "wellness"],
    isBlackOwned: true,
    isVerified: true,
    description: "The preeminent lifestyle magazine for Black women",
  },
  {
    id: "ebony",
    name: "EBONY",
    url: "https://www.ebony.com",
    rssUrl: "https://www.ebony.com/feed/",
    type: "publication",
    categories: ["fashion", "culture", "business"],
    isBlackOwned: true,
    isVerified: true,
    description: "Chronicling Black American life since 1945",
  },
  {
    id: "21ninety",
    name: "21Ninety",
    url: "https://21ninety.com",
    type: "publication",
    categories: ["fashion", "beauty", "culture"],
    isBlackOwned: true,
    isVerified: true,
    description: "Black millennial women lifestyle brand",
  },

  // CULTURE & NEWS
  {
    id: "theroot",
    name: "The Root",
    url: "https://www.theroot.com",
    rssUrl: "https://theroot.com/rss",
    type: "publication",
    categories: ["culture", "news"],
    isBlackOwned: true,
    isVerified: true,
    description: "Black news, opinions, politics and culture",
  },
  {
    id: "okayplayer",
    name: "Okayplayer",
    url: "https://www.okayplayer.com",
    rssUrl: "https://www.okayplayer.com/feed",
    type: "publication",
    categories: ["culture", "music"],
    isBlackOwned: true,
    isVerified: true,
    description: "Music, art, and culture from the African diaspora",
  },
  {
    id: "blackenterprise",
    name: "Black Enterprise",
    url: "https://www.blackenterprise.com",
    rssUrl: "https://www.blackenterprise.com/feed/",
    type: "publication",
    categories: ["business", "finance"],
    isBlackOwned: true,
    isVerified: true,
    description: "Business news and investment for Black America",
  },

  // WEB3 & CRYPTO
  {
    id: "bitcoinblackamerica",
    name: "Bitcoin & Black America",
    url: "https://bitcoinandblackamerica.com",
    type: "blog",
    categories: ["web3", "finance"],
    isBlackOwned: true,
    isVerified: true,
    description: "Cryptocurrency and financial freedom for Black communities",
  },
  {
    id: "blackbitcoinbillionaire",
    name: "Black Bitcoin Billionaire",
    url: "https://blackbitcoinbillionaire.com",
    type: "newsletter",
    categories: ["web3", "finance"],
    isBlackOwned: true,
    isVerified: true,
    description: "Crypto education for the culture",
  },
  {
    id: "blacknftart",
    name: "Black NFT Art",
    url: "https://blacknftart.com",
    type: "directory",
    categories: ["web3", "culture"],
    isBlackOwned: true,
    isVerified: true,
    description: "Directory of Black NFT artists and digital creators",
  },

  // WELLNESS & HEALTH
  {
    id: "therapyforblackgirls",
    name: "Therapy for Black Girls",
    url: "https://therapyforblackgirls.com",
    type: "directory",
    categories: ["wellness", "health"],
    isBlackOwned: true,
    isVerified: true,
    description: "Mental health resources and therapist directory",
  },
  {
    id: "melaninandmentalhealth",
    name: "Melanin & Mental Health",
    url: "https://www.melaninandmentalhealth.com",
    type: "directory",
    categories: ["wellness", "health"],
    isBlackOwned: true,
    isVerified: true,
    description: "Connecting people of color to culturally competent therapists",
  },
  {
    id: "blackdoctor",
    name: "BlackDoctor.org",
    url: "https://blackdoctor.org",
    rssUrl: "https://blackdoctor.org/feed/",
    type: "publication",
    categories: ["wellness", "health"],
    isBlackOwned: true,
    isVerified: true,
    description: "Health information for the Black community",
  },

  // YOUTUBE CHANNELS
  {
    id: "naptural85",
    name: "Naptural85",
    url: "https://www.youtube.com/@Naptural85",
    type: "youtube",
    categories: ["hair"],
    isBlackOwned: true,
    isVerified: true,
    description: "Natural hair tutorials and product reviews",
  },
  {
    id: "greenbeautyblogger",
    name: "Green Beauty",
    url: "https://www.youtube.com/@GreenBeauty",
    type: "youtube",
    categories: ["hair", "beauty"],
    isBlackOwned: true,
    isVerified: true,
    description: "Natural hair and clean beauty content",
  },
  {
    id: "jackieaina",
    name: "Jackie Aina",
    url: "https://www.youtube.com/@jackieaina",
    type: "youtube",
    categories: ["beauty"],
    isBlackOwned: true,
    isVerified: true,
    description: "Beauty tutorials and reviews for dark skin tones",
  },
  {
    id: "patriciabrightbeauty",
    name: "Patricia Bright",
    url: "https://www.youtube.com/@PatriciaBright",
    type: "youtube",
    categories: ["beauty", "fashion", "business"],
    isBlackOwned: true,
    isVerified: true,
    description: "Beauty, fashion, and finance content",
  },

  // PODCASTS
  {
    id: "readtofilth",
    name: "Read to Filth",
    url: "https://podcasts.apple.com/us/podcast/read-to-filth",
    type: "podcast",
    categories: ["culture"],
    isBlackOwned: true,
    isVerified: true,
    description: "Pop culture and entertainment podcast",
  },
  {
    id: "therapyforblackgirlspod",
    name: "Therapy for Black Girls Podcast",
    url: "https://therapyforblackgirls.com/podcast",
    type: "podcast",
    categories: ["wellness"],
    isBlackOwned: true,
    isVerified: true,
    description: "Mental health conversations for Black women",
  },

  // DIRECTORIES
  {
    id: "officialblackwallstreet",
    name: "Official Black Wall Street",
    url: "https://officialblackwallstreet.com",
    type: "directory",
    categories: ["business"],
    isBlackOwned: true,
    isVerified: true,
    description: "Directory of Black-owned businesses",
  },
  {
    id: "supportblackowned",
    name: "Support Black Owned",
    url: "https://supportblackowned.com",
    type: "directory",
    categories: ["business"],
    isBlackOwned: true,
    isVerified: true,
    description: "Find and support Black-owned businesses",
  },
  {
    id: "webuybblack",
    name: "WeBuyBlack",
    url: "https://webuyblack.com",
    type: "directory",
    categories: ["business", "fashion"],
    isBlackOwned: true,
    isVerified: true,
    description: "Marketplace for Black-owned products",
  },
];

export function getSourcesByCategory(category: string): ContentSource[] {
  return blackOwnedSources.filter(s => s.categories.includes(category));
}

export function getBlackOwnedSources(): ContentSource[] {
  return blackOwnedSources.filter(s => s.isBlackOwned);
}

export function getSourcesWithRSS(): ContentSource[] {
  return blackOwnedSources.filter(s => s.rssUrl);
}

export function getSourceById(id: string): ContentSource | undefined {
  return blackOwnedSources.find(s => s.id === id);
}
