export interface Product {
  id: string;
  title: string;
  url: string;
  img: string;
  hoverImg?: string;
  price: string;
  rawPrice: number;
  category: 'tracksuits' | 'jackets' | 'hoodies' | 'sets' | 'limited';
  tag?: string;
  badge?: 'BESTSELLER' | 'NEW DROP' | 'SELLING FAST' | 'EXCLUSIVE';
  description: string;
  colors: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  details: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'awm-active-tracksuit-grey-yellow',
    title: 'AWM Active Tracksuit (Grey & Illuminous Yellow)',
    url: '/products/awm-active-tracksuit-grey-illuminous-yellow',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-01-01at13.23.26_2.jpg?v=1767275624&width=1000',
    hoverImg: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-01-01at13.23.26_1.jpg?v=1767275494&width=1000',
    price: '£85.00',
    rawPrice: 85,
    category: 'tracksuits',
    tag: 'Activewear Tech',
    badge: 'BESTSELLER',
    description: 'High-density custom interlock fabric engineered with hi-vis electric accents, waterproof zipped pockets, and signature ergonomic paneling for unmatched streetwear silhouette.',
    colors: ['#808080', '#eab308', '#111111'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Tailored athletic taper silhouette',
      'Dual sealed reverse-coil zippers with AWM rubber pulls',
      'Reflective neon piped panel construction',
      'Heavyweight 380 GSM cotton-poly fleece'
    ],
    inStock: true
  },
  {
    id: 'chenille-puffer-jacket',
    title: 'AWM Heavyweight Chenille Puffer Jacket',
    url: '/products/chenille-puffer-jacket',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/backofjacket.jpg?v=1765879741&width=1000',
    hoverImg: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-03-24at10.59.40.jpg?v=1774350350&width=1000',
    price: '£130.00',
    rawPrice: 130,
    category: 'jackets',
    tag: 'Winter Outerwear',
    badge: 'EXCLUSIVE',
    description: 'Statement cold-weather luxury. Featuring custom chenille back embroidery, down-alternative thermal quilting, and concealed draft-guard windproofing.',
    colors: ['#0f0f10', '#1e293b'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    details: [
      'Oversized chenille textured crest branding across yoke',
      'Thermal micro-fill down insulation (tested to -10°C)',
      'Matte soft-touch water-repellent outer shell',
      'Interior secure drop pockets and storm cuffs'
    ],
    inStock: true
  },
  {
    id: 'awm-active-tracksuit-navy',
    title: 'AWM Active Tracksuit (Midnight Navy)',
    url: '/products/awm-active-tracksuit-navy',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2025-10-15at13.19.29_c831db9b.jpg?v=1760530857&width=1000',
    price: '£85.00',
    rawPrice: 85,
    category: 'tracksuits',
    tag: 'Midnight Edition',
    badge: 'SELLING FAST',
    description: 'Deep navy technical street set with high-gauge double knit weave, gunmetal metal hardware, and tonal silicon chest logo.',
    colors: ['#1e3a5f', '#0b132b'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Precision cut slim-fit joggers with bungee toggle hem',
      'Funnel collar zip hoodie with 3-piece lined hood',
      'Antimicrobial sweat-wicking internal lining',
      'AWM silicone heat-bonded branding'
    ],
    inStock: true
  },
  {
    id: 'awm-active-tracksuit-black-grey',
    title: 'AWM Active Tracksuit (Stealth Black & Grey)',
    url: '/products/awm-active-tracksuit-black-grey',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-01-01at13.23.26_1.jpg?v=1767275494&width=1000',
    price: '£85.00',
    rawPrice: 85,
    category: 'tracksuits',
    tag: 'Signature Cut',
    badge: 'BESTSELLER',
    description: 'Dual-tone contrast paneling with reinforced articulated knee flex zones and signature matte black hardware.',
    colors: ['#121212', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      'Dual-tone architectural panel distribution',
      'Deep side pockets with concealed zip locks',
      'Comfort-stretch ribbing at wrists and ankles',
      '380 GSM brushed interior fleece'
    ],
    inStock: true
  },
  {
    id: 'been-trapping-hoodie-black',
    title: 'Been Trapping Heavyweight Graphic Hoodie (Black)',
    url: '/products/sorry-i-ve-been-trapping-hoodie-1',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/51BCA4EA-A0F4-472B-8AAC-3CF1907CA3A8.jpg?v=1750505284&width=1000',
    hoverImg: 'https://alwayswantmore.co.uk/cdn/shop/files/B1859462-83F2-42FD-968B-645CC9A709B0.jpg?v=1750505272&width=1000',
    price: '£40.00',
    rawPrice: 40,
    category: 'hoodies',
    tag: 'Cult Graphic Drop',
    badge: 'NEW DROP',
    description: 'The iconic viral drop. 450 GSM ultra-heavy boxy cut hoodie with puff screen print typography on chest and rear statement typography.',
    colors: ['#000000', '#f3f4f6'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Drop-shoulder relaxed oversized drape',
      'High-density 3D puff print graphic',
      'Heavy-ribbed cuffs and double-layered seamless hood',
      'Pre-shrunk 100% combed ringspun cotton'
    ],
    inStock: true
  },
  {
    id: 'been-trapping-hoodie-sky-blue',
    title: 'Been Trapping Heavyweight Hoodie (Sky Blue)',
    url: '/products/sorry-i-ve-been-trapping-hoodie',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/9438E651-771D-4CF6-90F1-4DD645212685.jpg?v=1750505313&width=1000',
    price: '£40.00',
    rawPrice: 40,
    category: 'hoodies',
    tag: 'Limited Colorway',
    badge: 'EXCLUSIVE',
    description: 'Pastel energy in a heavyweight street silhouette. Custom dyed sky blue with crisp high-relief puff chest detailing.',
    colors: ['#7dd3fc', '#ffffff'],
    sizes: ['S', 'M', 'L'],
    details: [
      'Signature garment-dye pastel treatment',
      'Double needle stitching along hem and seams',
      'Soft brushed fleece interior',
      'Heavyweight 420 GSM formulation'
    ],
    inStock: true
  },
  {
    id: 'awm-the-world-is-yours-green',
    title: 'AWM The World Is Yours Twin Set (Forest Green)',
    url: '/products/awm-the-world-is-yours-set-green',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/IMG-20251022-WA0088.jpg?v=1761214745&width=1000',
    hoverImg: 'https://alwayswantmore.co.uk/cdn/shop/files/IMG-20251022-WA0064.jpg?v=1761213530&width=1000',
    price: '£50.00',
    rawPrice: 50,
    category: 'sets',
    tag: 'Twin Set',
    badge: 'NEW DROP',
    description: 'Relaxed street coordinates featuring custom globe typography and tonal rib accents for summer transitions.',
    colors: ['#166534', '#064e3b'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Includes coordinated crewneck top & relaxed shorts',
      'Reinforced metal aglet drawstrings',
      'Custom screen-printed globe artwork',
      'Breathable 320 GSM French Terry'
    ],
    inStock: true
  },
  {
    id: 'awm-washed-short-set-french-terry',
    title: 'Always Want More French Terry Short Set (Heather Grey)',
    url: '/products/always-want-more-french-terry-short-set-heather-grey',
    img: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-05-13at11.53.52_1.jpg?v=1778764232&width=1000',
    price: '£65.00',
    rawPrice: 65,
    category: 'sets',
    tag: 'Washed Essentials',
    badge: 'SELLING FAST',
    description: 'Mineral-washed vintage aesthetic with supreme comfort loopback French Terry. Built for luxury lounging and city movement.',
    colors: ['#9ca3af', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Acid-wash vintage mineral finish',
      'Custom embossed AWM metal badge',
      'Deep hip pockets and rear zip storage',
      'Pure organic loopback cotton'
    ],
    inStock: true
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Marcus K.',
    city: 'London, UK',
    item: 'AWM Active Tracksuit (Grey & Yellow)',
    rating: 5,
    text: 'Quality is unmatched. Heavyweight fabric, tapers perfectly at the ankles, and the yellow piping pops in real life. Worth every penny.',
    date: '3 days ago',
    verified: true
  },
  {
    id: 2,
    name: 'Tariq S.',
    city: 'Manchester, UK',
    item: 'Chenille Puffer Jacket',
    rating: 5,
    text: 'Best jacket in my wardrobe. Wore it in freezing rain in town and was totally warm and dry. The chenille logo on the back is pure luxury.',
    date: '1 week ago',
    verified: true
  },
  {
    id: 3,
    name: 'Jordan M.',
    city: 'Birmingham, UK',
    item: 'Been Trapping Hoodie (Black)',
    rating: 5,
    text: 'Puff print is thick and resilient after multiple washes. Fits oversized just how you want high-end streetwear to fit. Delivery was next day.',
    date: '2 weeks ago',
    verified: true
  }
];
