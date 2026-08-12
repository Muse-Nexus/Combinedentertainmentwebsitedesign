export const SITE = Object.freeze({
  name: 'Raining Entertainment',
  origin: 'https://www.rainingentertainment.com',
  locale: 'en_US',
  email: 'brentonkeith@magicbrent.com',
  defaultImage: '/media/hero-real-brenton-jolie.webp',
  socialProfiles: [
    'https://www.instagram.com/magicbrent/',
    'https://www.instagram.com/cirquejolie/',
    'https://www.instagram.com/gameshowfanatics/',
    'https://www.facebook.com/MagicBrent/',
    'https://www.facebook.com/cirquejolie',
    'https://www.youtube.com/@magicbrent',
  ],
});

const routes = [
  {
    path: '/',
    title: 'Raining Entertainment | Maui Magic, Circus & Game Shows',
    description:
      'Book Maui comedy magic, Cirque Jolie performers, interactive game shows, casino night parties, balloon decor, face painting and custom event entertainment.',
    image: '/media/hero-real-brenton-jolie.webp',
    imageAlt: 'Brenton Keith and Jolie Strickland performing together at an oceanfront Maui event',
    pageType: 'WebPage',
    schemaKind: 'website',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/balloon-twisting',
    title: 'Maui Balloon Twisting & Face Painting | Cirque Jolie',
    description:
      'Book Cirque Jolie for Maui balloon twisting and face painting at birthday parties, baby luaus, resort celebrations and family events.',
    image: '/media/client-selected/balloon-twisting/twisting-02-parent-toddler-lion.webp',
    imageAlt: 'A parent and toddler enjoying a lion balloon creation by Cirque Jolie on Maui',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Balloon Twisting and Face Painting',
    serviceType: 'Balloon twisting, face painting and kids party entertainment',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/balloon-decor',
    title: 'Maui Balloon Decor, Garlands & Arches | Raining Entertainment',
    description:
      'Custom Maui balloon decor for birthdays, weddings, resorts and corporate events, including garlands, arches, columns, centerpieces and installations.',
    image: '/media/client-selected/balloon-decor/balloon-decor-1c516c9e-tropical-resort-arch-a.webp',
    imageAlt: 'Tropical balloon arch installation created by Cirque Jolie at a Maui resort',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Maui Balloon Decor',
    serviceType: 'Balloon garlands, arches, columns and custom event installations',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/strolling',
    title: 'Maui Stilt Walkers | Cirque Jolie',
    description:
      'Transform a Maui event with Cirque Jolie stilt walkers, imaginative characters and vibrant roaming entertainment for guests of every age.',
    image: '/media/client-selected/stilt-walkers/hero-winged-trio-monkeypod.webp',
    imageAlt: 'Three Cirque Jolie winged stilt walkers welcoming guests at a Maui resort',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Stilt Walkers',
    serviceType: 'Stilt walkers and roaming themed characters',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/led-performers',
    title: 'Maui LED Performers | Cirque Jolie',
    description:
      'Light up a Maui evening with Cirque Jolie LED wing performers, hoops and poi for receptions, resort events, corporate galas and celebrations.',
    image: '/media/client-selected/led-performers/hero-golden-wings-dusk.webp',
    imageAlt: 'Cirque Jolie performers in glowing golden LED wings at dusk on Maui',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Maui LED Performers',
    serviceType: 'LED wing performers, LED hoops and LED poi entertainment',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/magic',
    title: "Maui Magician | Brenton Keith & His Bag O' Tricks",
    description:
      'Hire Brenton Keith & His Bag O’ Tricks for high-energy Maui comedy magic, interactive stage shows and close-up entertainment for parties, luaus and events.',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    imageAlt: 'Brenton Keith performing live comedy magic on Maui',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: "Brenton Keith & His Bag O' Tricks",
    serviceType: 'Comedy magic, stage shows and close-up strolling magic',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/casino-gameshow',
    title: 'Choose Casino NITE or Game Show NITE | Raining Entertainment',
    description:
      'Compare two distinct Maui event services from Raining Entertainment: Casino NITE and the interactive Game Show NITE experience.',
    image: '/media/hero-real-brenton-jolie.webp',
    imageAlt: 'Brenton Keith and Jolie Strickland performing together at an oceanfront Maui event',
    pageType: 'WebPage',
    schemaKind: 'website',
    robots: 'noindex, nofollow',
  },
  {
    path: '/casino',
    title: 'Casino NITE Maui | Blackjack, Poker, Craps & Roulette',
    description:
      'Bring a Las Vegas-style casino night party to Maui with Casino NITE: Blackjack, Poker, Craps, Roulette and engaging professional dealers. Entertainment only; no real-money gambling.',
    image: '/media/client-selected/casino/christmas-poker-table.webp',
    imageAlt: 'Guests enjoying a festive Casino NITE poker table at a Maui event',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Maui Casino NITE',
    serviceType: 'Casino-style party entertainment with Blackjack, Poker, Craps, and Roulette tables',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/game-show',
    title: 'Game Show NITE & Game Show LITE Maui | Gameshow Fanatics',
    description:
      'Gameshow Fanatics brings personalized game show entertainment to Maui with full-production Game Show NITE and compact, travel-ready Game Show LITE for events of every size.',
    image: '/media/casino-gameshow/game-show-tent-wide-maui.webp',
    imageAlt: 'Gameshow Fanatics full mobile game show set and audience under a Maui event tent',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Gameshow Fanatics Mobile Game Show',
    serviceType: 'Interactive full-production mobile game show entertainment',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/corporate',
    title: 'Maui Corporate Entertainment | Raining Entertainment',
    description:
      'Plan memorable Maui corporate entertainment with custom game shows, casino night parties, comedy magic, emcees and scalable team-building experiences.',
    image: '/media/corporate/game-show-ballroom-maui.webp',
    imageAlt: 'Corporate teams competing in a Gameshow Fanatics event in a Maui ballroom',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Maui Corporate Entertainment',
    serviceType: 'Corporate entertainment, team building and event production',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/face-painting',
    title: 'Maui Face Painting for Parties | Cirque Jolie',
    description:
      'Professional Maui face painting by Cirque Jolie for children and adults, with colorful designs for birthdays, luaus, resorts and community events.',
    image: '/media/face-painting/cirque-jolie-face-painting-kids-maui.webp',
    imageAlt: 'Cirque Jolie creating colorful face painting for a child on Maui',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'Maui Face Painting',
    serviceType: 'Professional face painting for parties and events',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/about',
    title: 'Brenton Keith & Jolie Strickland | Raining Entertainment',
    description:
      'Meet Brenton Keith and Jolie Strickland, the Husband-and-Wife Maui entertainment team behind Brenton Keith & His Bag O’ Tricks, Cirque Jolie and Gameshow Fanatics.',
    image: '/media/client-selected/about/jolie-shaka-balloon-crown.webp',
    imageAlt: 'Jolie Strickland smiling in a balloon crown and sharing a shaka on Maui',
    pageType: 'AboutPage',
    schemaKind: 'people',
    priority: '0.8',
    changefreq: 'yearly',
  },
  {
    path: '/contact',
    title: 'Book Maui Event Entertainment | Raining Entertainment',
    description:
      'Tell Raining Entertainment about your Maui party, wedding, corporate event or celebration and request a custom entertainment package.',
    image: '/media/hero-real-brenton-jolie.webp',
    imageAlt: 'Brenton Keith and Jolie Strickland performing together at an oceanfront Maui event',
    pageType: 'ContactPage',
    schemaKind: 'contact',
    priority: '0.8',
    changefreq: 'yearly',
  },
  {
    path: '/upcoming-shows',
    title: 'Maui Magic Shows & Upcoming Events | Brenton Keith',
    description:
      'Find upcoming public performances by Brenton Keith and Raining Entertainment, including Maui comedy magic and family-friendly live events.',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    imageAlt: 'Brenton Keith performing a live Maui magic show',
    pageType: 'CollectionPage',
    schemaKind: 'collection',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/cirque-jolie',
    title: 'Cirque Jolie | Maui Stilts, Balloon Twisting & Face Painting',
    description:
      'Discover Cirque Jolie’s stilt walkers, LED performers, balloon twisting and decor, face painting and imaginative themed characters on Maui.',
    image: '/media/client-selected/about/jolie-shaka-balloon-crown.webp',
    imageAlt: 'Jolie Strickland smiling in a balloon crown and sharing a shaka on Maui',
    pageType: 'ProfilePage',
    schemaKind: 'cirque',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/shows/mulligans-magic-show',
    title: "The Mulligan's Maui Magic Show | Brenton Keith",
    description:
      'See Brenton Keith at The Mulligan’s Maui Magic Show in Wailea, with family-friendly comedy magic and tableside close-up entertainment.',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    imageAlt: "Brenton Keith performing The Mulligan's Magic Show on Maui",
    pageType: 'WebPage',
    schemaKind: 'eventSeries',
    priority: '0.8',
    changefreq: 'weekly',
  },
];

export const ROUTE_METADATA = Object.freeze(
  Object.fromEntries(routes.map((route) => [route.path, Object.freeze(route)])),
);

export const INDEXED_ROUTES = Object.freeze(
  routes.filter((route) => !route.robots?.includes('noindex')).map((route) => route.path),
);

export const NOINDEX_ROUTES = Object.freeze(
  routes.filter((route) => route.robots?.includes('noindex')).map((route) => route.path),
);

export const NOT_FOUND_METADATA = Object.freeze({
  path: null,
  title: 'Page Not Found | Raining Entertainment',
  description:
    'That page is no longer here. Explore Raining Entertainment’s Maui magic, circus performers, game shows, casino night parties and party services.',
  image: SITE.defaultImage,
  imageAlt: 'Raining Entertainment',
  pageType: 'WebPage',
  robots: 'noindex, nofollow',
});

export function normalizePath(pathname = '/') {
  if (!pathname || pathname === '/') return '/';
  return `/${pathname}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
}

export function getRouteMetadata(pathname) {
  return ROUTE_METADATA[normalizePath(pathname)] ?? null;
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE.origin}/`).toString();
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.origin}/#organization`,
    name: SITE.name,
    alternateName: ["Brenton Keith & His Bag O' Tricks", 'Cirque Jolie', 'Gameshow Fanatics'],
    url: `${SITE.origin}/`,
    logo: absoluteUrl('/favicon.png'),
    image: absoluteUrl(SITE.defaultImage),
    email: SITE.email,
    sameAs: SITE.socialProfiles,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Maui, Hawaii' },
      { '@type': 'State', name: 'Hawaii' },
    ],
  };
}

function personSchemas() {
  return [
    {
      '@type': 'Person',
      '@id': `${SITE.origin}/about#brenton-keith`,
      name: 'Brenton Keith',
      alternateName: "Brenton Keith & His Bag O' Tricks",
      url: absoluteUrl('/magic'),
      image: absoluteUrl('/media/about/brent-umbrella-beach.jpg'),
      worksFor: { '@id': `${SITE.origin}/#organization` },
      sameAs: [
        'https://www.instagram.com/magicbrent/',
        'https://www.facebook.com/MagicBrent/',
        'https://www.youtube.com/@magicbrent',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE.origin}/about#jolie-strickland`,
      name: 'Jolie Strickland',
      alternateName: 'Cirque Jolie',
      url: absoluteUrl('/cirque-jolie'),
      image: absoluteUrl('/media/client-selected/about/jolie-shaka-balloon-crown.webp'),
      worksFor: { '@id': `${SITE.origin}/#organization` },
      sameAs: [
        'https://www.instagram.com/cirquejolie/',
        'https://www.facebook.com/cirquejolie',
      ],
    },
  ];
}

export function createStructuredData(metadata) {
  if (!metadata?.path) return null;

  const url = absoluteUrl(metadata.path);
  const image = absoluteUrl(metadata.image);
  const pageId = `${url}#webpage`;
  const graph = [organizationSchema()];
  const page = {
    '@type': metadata.pageType || 'WebPage',
    '@id': pageId,
    url,
    name: metadata.title,
    description: metadata.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.origin}/#website` },
    about: { '@id': `${SITE.origin}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
      caption: metadata.imageAlt,
    },
  };

  if (metadata.schemaKind === 'website') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE.origin}/#organization` },
    });
  } else {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      publisher: { '@id': `${SITE.origin}/#organization` },
    });
  }

  if (metadata.schemaKind === 'service' || metadata.schemaKind === 'cirque') {
    const serviceId = `${url}#service`;
    page.mainEntity = { '@id': serviceId };
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: metadata.serviceName || 'Cirque Jolie Entertainment',
      serviceType:
        metadata.serviceType ||
        'Stilt walkers, LED performers, balloons, face painting and ambient performers',
      description: metadata.description,
      url,
      image,
      provider: { '@id': `${SITE.origin}/#organization` },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Maui, Hawaii' },
        { '@type': 'State', name: 'Hawaii' },
      ],
    });
  }

  if (metadata.schemaKind === 'people' || metadata.schemaKind === 'cirque') {
    graph.push(...personSchemas());
  }

  if (metadata.schemaKind === 'eventSeries') {
    const eventId = `${url}#event-series`;
    page.mainEntity = { '@id': eventId };
    graph.push(...personSchemas().slice(0, 1));
    graph.push({
      '@type': 'EventSeries',
      '@id': eventId,
      name: "The Mulligan's Magic Show",
      description: metadata.description,
      url,
      image,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: "Mulligan's on the Blue",
        address: {
          '@type': 'PostalAddress',
          streetAddress: '100 Kaukahi Street',
          addressLocality: 'Kihei',
          addressRegion: 'HI',
          postalCode: '96753',
          addressCountry: 'US',
        },
      },
      organizer: { '@id': `${SITE.origin}/#organization` },
      performer: { '@id': `${SITE.origin}/about#brenton-keith` },
      eventSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: 'https://schema.org/Thursday',
        startTime: '18:30',
        scheduleTimezone: 'Pacific/Honolulu',
      },
    });
  }

  graph.push(page);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
