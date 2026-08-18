export type EventType = 'Public' | 'Ticketed' | 'Private';

export interface ShowEvent {
  id: string;
  title: string;
  performer: string;
  date: string;
  startAt?: string;
  time: string;
  doors?: string;
  location: string;
  locationLink?: string;
  type: EventType;
  price?: string;
  description: string;
  bookingLink?: string;
  detailsPath?: string;
  image: string;
  tag?: string;
}

export interface LatestMoment {
  id: string;
  image: string;
  alt: string;
  caption: string;
  href?: string;
  account?: string;
  service?: string;
  timestamp?: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

export type CasinoPackageAccent = 'classic' | 'deluxe' | 'full';

export interface CasinoPackage {
  id: string;
  slug: string;
  name: string;
  price: number;
  taxLabel: string;
  badge?: string;
  accent: CasinoPackageAccent;
  inclusions: string[];
  sortOrder: number;
}

/**
 * Checked-in content keeps the public site useful before Airtable is connected
 * and whenever its API is temporarily unavailable.
 */
export const UPCOMING_SHOWS_FALLBACK: ShowEvent[] = [
  {
    id: 'mulligans-recurring',
    title: "The Mulligan's Magic Show",
    performer: "Brenton Keith & His Bag O' Tricks",
    date: 'Normally every Thursday',
    time: '6:30 PM',
    doors: 'Close-up tableside magic begins before the stage show.',
    location: 'Mulligans on the Blue, Maui',
    locationLink: 'https://www.mulligansontheblue.com',
    type: 'Ticketed',
    description:
      "Brenton Keith's high-energy comedy magic show brings audience participation, surprises, and family-friendly laughs to Wailea each week. Check with the venue for current seating and admission details.",
    bookingLink: 'https://www.mulligansontheblue.com',
    detailsPath: '/shows/mulligans-magic-show',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    tag: 'Recurring Show',
  },
];

export const LATEST_MOMENTS_FALLBACK: LatestMoment[] = [
  {
    id: 'magic-show',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    alt: "Brenton Keith performing the Mulligan's Magic Show in Wailea",
    caption: 'Comedy magic that puts the audience in the middle of the fun.',
    href: 'https://www.instagram.com/magicbrent/',
    account: '@magicbrent',
    service: 'Magic',
  },
  {
    id: 'cirque-jolie',
    image: '/media/about/jolie-shaka-balloons-portrait.webp',
    alt: 'Jolie Strickland throwing a shaka from a ring of colorful twisting balloons',
    caption: 'Living color, character, and a little Maui magic.',
    href: 'https://www.instagram.com/cirquejolie/',
    account: '@cirquejolie',
    service: 'Cirque',
  },
  {
    id: 'balloon-decor',
    image: '/media/balloon-decor/monster-storefront-arch-maui.webp',
    alt: 'Tropical balloon arch installation at a Maui resort',
    caption: 'Balloon decor built to belong in the room and in the photos.',
    href: 'https://www.instagram.com/cirquejolie/',
    account: '@cirquejolie',
    service: 'Balloon Decor',
  },
  {
    id: 'game-show',
    image: '/media/casino-gameshow/brenton-craps-gameshow-fanatics-portrait.webp',
    alt: 'Brenton Keith behind the Gameshow Fanatics craps table at a Maui Casino NITE',
    caption: 'Big reactions, friendly competition, and an instant party.',
    href: 'https://www.instagram.com/gameshowfanatics/',
    account: '@gameshowfanatics',
    service: 'Game Show NITE',
  },
  {
    id: 'face-painting',
    image: '/media/face-painting/cirque-jolie-face-painting-kids-maui.webp',
    alt: 'Detailed dragon face painting created for a child',
    caption: 'Tiny transformations with plenty of personality.',
    href: 'https://www.instagram.com/cirquejolie/',
    account: '@cirquejolie',
    service: 'Face Painting',
  },
  {
    id: 'stilt-performance',
    image: '/media/strolling/red-striped-stilt-performer-night.webp',
    alt: 'Cirque Jolie performer in an illuminated moth stilt costume',
    caption: 'A roaming spectacle guests cannot help but follow.',
    href: 'https://www.instagram.com/cirquejolie/',
    account: '@cirquejolie',
    service: 'Stilt Walkers',
  },
];

export const CASINO_PACKAGES_FALLBACK: CasinoPackage[] = [
  {
    id: 'fallback-classic-casino-nite',
    slug: 'classic-casino-nite',
    name: 'Classic Casino NITE',
    price: 2_750,
    taxLabel: '+ tax',
    accent: 'classic',
    inclusions: [
      '3 hours of high-energy casino gaming',
      'Blackjack, Craps, and Roulette',
      'Up to 25 guests playing simultaneously',
      '3 professional, entertaining dealers',
      '3 tables total (Blackjack, Craps, Roulette)',
      'Hosted, guided gameplay — perfect for beginners',
      'Chips and full casino setup included',
    ],
    sortOrder: 1,
  },
  {
    id: 'fallback-deluxe-casino-nite',
    slug: 'deluxe-casino-nite',
    name: 'Deluxe Casino NITE',
    price: 3_750,
    taxLabel: '+ tax',
    badge: 'Most Popular',
    accent: 'deluxe',
    inclusions: [
      '3 hours of elevated casino entertainment',
      '2 Blackjack Tables, Craps & Roulette',
      'Up to 30–35 guests playing simultaneously',
      '4 of Maui’s most entertaining dealers',
      '4 tables total',
      'Professional sound support (mic + music) for smooth, high-energy gameplay',
      'Ambient lighting included',
    ],
    sortOrder: 2,
  },
  {
    id: 'fallback-full-casino-experience',
    slug: 'full-casino-experience',
    name: 'Full Casino Experience',
    price: 4_500,
    taxLabel: '+ tax',
    accent: 'full',
    inclusions: [
      'A fully immersive casino-style event experience',
      '2 Blackjack Tables, Craps, Roulette & Poker',
      'Up to 40 guests playing simultaneously',
      '5 of Maui’s most entertaining dealers',
      '5 tables total',
      'Custom Balloon Decor by Cirque Jolie',
      'Enhanced sound + DJ-style energy',
      'Upgraded lighting & atmosphere',
      'Red carpet entrance experience',
      'Prizes for top chip leaders',
    ],
    sortOrder: 3,
  },
];
