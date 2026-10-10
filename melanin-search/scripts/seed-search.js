const { Meilisearch } = require('meilisearch');

const client = new Meilisearch({
  host: 'http://localhost:7700',
  apiKey: 'melanin123',
});

// Content to index - this would come from your database in production
const content = [
  // HAIR
  {
    id: '1',
    title: 'The Ultimate Guide to Protective Styles for Natural Hair',
    description: 'From box braids to faux locs, discover protective styles that promote hair growth while keeping your crown looking gorgeous. Expert tips from licensed stylists who specialize in textured hair.',
    category: 'hair',
    source: 'CurlPattern',
    creator: 'Maya Johnson',
    url: 'https://curlpattern.com/protective-styles-guide',
    tags: ['protective styles', 'box braids', 'faux locs', 'natural hair', 'hair growth', '4c hair'],
    isBlackOwned: true,
  },
  {
    id: '2',
    title: 'LOC Method: The Secret to Moisturized Type 4 Hair',
    description: 'Learn how to properly layer your products using the Liquid-Oil-Cream method for maximum moisture retention. Perfect for 4A, 4B, and 4C hair textures.',
    category: 'hair',
    source: 'CurlPattern',
    creator: 'Destiny Williams',
    url: 'https://curlpattern.com/loc-method',
    tags: ['LOC method', 'moisture', '4c hair', '4b hair', '4a hair', 'natural hair care'],
    isBlackOwned: true,
  },
  {
    id: '3',
    title: 'Loc Maintenance 101: From Starter Locs to Mature',
    description: 'Everything you need to know about starting and maintaining locs at every stage. Washing techniques, retwisting schedules, and styling tips.',
    category: 'hair',
    source: 'LocLove Magazine',
    creator: 'Marcus Thompson',
    url: 'https://loclovemag.com/loc-maintenance-guide',
    tags: ['locs', 'dreadlocks', 'loc maintenance', 'starter locs', 'retwisting'],
    isBlackOwned: true,
  },
  {
    id: '4',
    title: 'Best Edge Control Products for Laid Baby Hairs',
    description: 'Comprehensive review of edge control products that hold without flaking. Tested on various hair textures with humidity resistance ratings.',
    category: 'hair',
    source: 'MelaninHairCare',
    url: 'https://melaninhaircare.com/edge-control-review',
    tags: ['edges', 'baby hairs', 'edge control', 'laid edges', 'product review'],
    isBlackOwned: true,
  },
  {
    id: '5',
    title: 'Silk Press vs Keratin Treatment: Which is Better?',
    description: 'A detailed comparison of temporary and semi-permanent straightening methods. Pros, cons, damage potential, and maintenance for each.',
    category: 'hair',
    source: 'NaturallyCurly',
    creator: 'Keisha Brown',
    url: 'https://naturallycurly.com/silk-press-vs-keratin',
    tags: ['silk press', 'keratin treatment', 'heat styling', 'natural hair', 'straightening'],
    isBlackOwned: false,
  },
  {
    id: '6',
    title: 'Wash Day Routine for Low Porosity Hair',
    description: 'Low porosity hair needs special attention. Learn how to open up those cuticles for maximum moisture absorption.',
    category: 'hair',
    source: 'CurlPattern',
    creator: 'Destiny Williams',
    url: 'https://curlpattern.com/low-porosity-wash-day',
    tags: ['low porosity', 'wash day', 'deep conditioning', 'natural hair'],
    isBlackOwned: true,
  },
  {
    id: '7',
    title: 'How to Stretch Natural Hair Without Heat',
    description: 'Banding, threading, and twist-out methods to stretch your curls safely. No heat damage, maximum length retention.',
    category: 'hair',
    source: 'BlackHairStyle',
    url: 'https://blackhairstyle.com/stretch-without-heat',
    tags: ['hair stretching', 'no heat', 'twist out', 'banding', 'natural hair'],
    isBlackOwned: true,
  },
  {
    id: '8',
    title: 'Hair Products for 4C Hair: What Actually Works',
    description: 'Honest reviews of products specifically formulated for 4C hair texture. No sponsored content, just real results.',
    category: 'hair',
    source: 'CurlPattern',
    url: 'https://curlpattern.com/4c-hair-products',
    tags: ['4c hair', 'product reviews', 'natural hair', 'coily hair'],
    isBlackOwned: true,
  },

  // BEAUTY
  {
    id: '9',
    title: 'Foundation Matching for Deep Skin Tones',
    description: 'Find your perfect foundation match. Comprehensive guide to undertones, formulas, and the best brands for melanin-rich skin.',
    category: 'beauty',
    source: 'Cocoa Swatches',
    creator: 'Nia Davis',
    url: 'https://cocoaswatches.com/foundation-guide',
    tags: ['foundation', 'deep skin', 'dark skin makeup', 'undertones', 'melanin'],
    isBlackOwned: true,
  },
  {
    id: '10',
    title: 'Skincare for Hyperpigmentation and Dark Spots',
    description: 'Dermatologist-approved ingredients and routines for melanin-rich skin. Vitamin C, niacinamide, and what actually fades dark spots.',
    category: 'beauty',
    source: 'MelaninGlow',
    url: 'https://melaninglow.com/hyperpigmentation-routine',
    tags: ['hyperpigmentation', 'dark spots', 'skincare', 'vitamin c', 'melanin skin'],
    isBlackOwned: true,
  },
  {
    id: '11',
    title: 'Bold Lip Colors That Pop on Dark Skin',
    description: 'From berry tones to classic reds, lipstick shades that complement darker complexions. Swatches on real dark skin.',
    category: 'beauty',
    source: 'Cocoa Swatches',
    creator: 'Nia Davis',
    url: 'https://cocoaswatches.com/bold-lips-dark-skin',
    tags: ['lipstick', 'dark skin', 'bold lips', 'makeup', 'lip color'],
    isBlackOwned: true,
  },
  {
    id: '12',
    title: 'Sunscreen for Dark Skin Without White Cast',
    description: 'Yes, we need sunscreen too. The best sunscreens that protect without leaving that white cast.',
    category: 'beauty',
    source: 'MelaninGlow',
    url: 'https://melaninglow.com/sunscreen-no-white-cast',
    tags: ['sunscreen', 'dark skin', 'SPF', 'no white cast', 'skincare'],
    isBlackOwned: true,
  },
  {
    id: '13',
    title: 'Concealer for Dark Circles on Dark Skin',
    description: 'Color correcting and concealing techniques for under-eye darkness on deeper skin tones.',
    category: 'beauty',
    source: 'Cocoa Swatches',
    url: 'https://cocoaswatches.com/concealer-dark-circles',
    tags: ['concealer', 'dark circles', 'color correcting', 'dark skin'],
    isBlackOwned: true,
  },

  // FASHION
  {
    id: '14',
    title: 'Black-Owned Fashion Brands to Know',
    description: 'From luxury designers like Telfar to emerging streetwear labels. Black-owned fashion brands making waves.',
    category: 'fashion',
    source: 'StyleNoir',
    url: 'https://stylenoir.com/black-owned-fashion-brands',
    tags: ['Black-owned', 'fashion brands', 'Telfar', 'streetwear', 'luxury fashion'],
    isBlackOwned: true,
  },
  {
    id: '15',
    title: 'How to Style Ankara: Modern African Print Fashion',
    description: 'Contemporary styling tips for incorporating traditional African prints into everyday outfits.',
    category: 'fashion',
    source: 'AfroChic',
    creator: 'Amara Okonkwo',
    url: 'https://afrochic.com/ankara-styling-guide',
    tags: ['Ankara', 'African print', 'African fashion', 'styling tips'],
    isBlackOwned: true,
  },

  // CULTURE
  {
    id: '16',
    title: 'The History and Significance of Juneteenth',
    description: 'Understanding the true meaning of Juneteenth, its historical significance, and how communities celebrate.',
    category: 'culture',
    source: 'BlackHistory365',
    url: 'https://blackhistory365.com/juneteenth-history',
    tags: ['Juneteenth', 'Black history', 'freedom', 'American history'],
    isBlackOwned: true,
  },
  {
    id: '17',
    title: 'Black Artists Reshaping Contemporary Art',
    description: 'Meet the artists creating groundbreaking work in painting, sculpture, and digital art.',
    category: 'culture',
    source: 'BlackHistory365',
    url: 'https://blackhistory365.com/emerging-black-artists',
    tags: ['Black artists', 'contemporary art', 'visual art', 'emerging artists'],
    isBlackOwned: true,
  },

  // BUSINESS
  {
    id: '18',
    title: 'Resources for Black Entrepreneurs',
    description: 'Grants, accelerators, and networking opportunities for Black-owned businesses.',
    category: 'business',
    source: 'BlackEntrepreneur',
    url: 'https://blackentrepreneur.com/resources',
    tags: ['entrepreneurship', 'grants', 'Black business', 'funding'],
    isBlackOwned: true,
  },
  {
    id: '19',
    title: 'Black-Owned Restaurants Directory',
    description: 'Find Black-owned restaurants, cafes, and eateries in major cities.',
    category: 'business',
    source: 'SupportBlackOwned',
    url: 'https://supportblackowned.com/restaurants',
    tags: ['restaurants', 'Black-owned', 'food', 'dining'],
    isBlackOwned: true,
  },

  // WELLNESS
  {
    id: '20',
    title: 'Mental Health Resources for the Black Community',
    description: 'Culturally competent therapists, support groups, and mental health resources.',
    category: 'wellness',
    source: 'Therapy for Us',
    url: 'https://therapyforus.com/mental-health-resources',
    tags: ['mental health', 'therapy', 'Black therapists', 'support groups'],
    isBlackOwned: true,
  },
  {
    id: '21',
    title: 'Navigating Therapy as a Black Person',
    description: 'Finding therapists who get it, dealing with stigma, and why mental health care matters.',
    category: 'wellness',
    source: 'Therapy for Us',
    url: 'https://therapyforus.com/navigating-therapy',
    tags: ['therapy', 'mental health', 'Black experience', 'healing'],
    isBlackOwned: true,
  },

  // WEB3
  {
    id: '22',
    title: 'Bitcoin and Black America: Why Crypto Matters',
    description: 'How cryptocurrency can address systemic financial exclusion in Black communities.',
    category: 'web3',
    source: 'Bitcoin & Black America',
    creator: 'Isaiah Jackson',
    url: 'https://bitcoinandblackamerica.com/why-bitcoin',
    tags: ['bitcoin', 'cryptocurrency', 'financial literacy', 'economic empowerment'],
    isBlackOwned: true,
  },
  {
    id: '23',
    title: 'Getting Started with Crypto: A Guide for Beginners',
    description: 'No jargon, no hype. Practical steps to understand and safely invest in cryptocurrency.',
    category: 'web3',
    source: 'Black Bitcoin Billionaires',
    url: 'https://blackbitcoinbillionaire.com/beginners-guide',
    tags: ['cryptocurrency', 'beginner', 'investing', 'education'],
    isBlackOwned: true,
  },
  {
    id: '24',
    title: 'Black NFT Artists to Follow',
    description: 'Black digital artists making waves in the NFT space. Afrofuturism to abstract.',
    category: 'web3',
    source: 'Black NFT Art',
    url: 'https://blacknftart.com/artists-2024',
    tags: ['NFT', 'digital art', 'Black artists', 'Afrofuturism'],
    isBlackOwned: true,
  },
  {
    id: '25',
    title: 'Guapcoin: Cryptocurrency for Black Communities',
    description: 'How Guapcoin aims to keep money circulating within Black communities.',
    category: 'web3',
    source: 'Guapcoin',
    creator: 'Tavonia Evans',
    url: 'https://guapcoin.org/about',
    tags: ['cryptocurrency', 'Black business', 'community', 'Guapcoin'],
    isBlackOwned: true,
  },
];

async function seedSearch() {
  console.log('Creating index...');
  
  // Create or get the index
  const index = client.index('content');
  
  // Configure searchable attributes and ranking
  await index.updateSettings({
    searchableAttributes: [
      'title',
      'description',
      'tags',
      'creator',
      'source',
    ],
    filterableAttributes: [
      'category',
      'isBlackOwned',
    ],
    sortableAttributes: [
      'title',
    ],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
    ],
  });

  console.log('Adding documents...');
  
  // Add documents
  const response = await index.addDocuments(content);
  console.log('Task:', response);

  // Wait for indexing to complete
  await client.waitForTask(response.taskUid);
  
  console.log('Done! Indexed', content.length, 'documents');
  
  // Test search
  console.log('\nTest search for "hair care":');
  const results = await index.search('hair care');
  console.log('Found', results.hits.length, 'results');
  results.hits.slice(0, 3).forEach((hit, i) => {
    console.log(`${i + 1}. ${hit.title}`);
  });
}

seedSearch().catch(console.error);
