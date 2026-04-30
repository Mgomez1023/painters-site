import type {FaqItem, SeoLink} from './services';

export type AreaPageData = {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  localAngle: string;
  servicesOffered: string[];
  nearbyAreas: SeoLink[];
  faqs: FaqItem[];
};

const serviceLinks: SeoLink[] = [
  {label: 'Interior Painting', href: '/services/interior-painting'},
  {label: 'Exterior Painting', href: '/services/exterior-painting'},
  {label: 'Trim Work', href: '/services/trim-work'},
  {label: 'Cabinet Painting', href: '/services/cabinet-painting'},
  {label: 'Touch-Ups', href: '/services/touch-ups'},
];

export const areaPages: AreaPageData[] = [
  {
    slug: 'chicago-painting',
    city: 'Chicago',
    metaTitle: 'Chicago Painting Services | Marom Painting',
    metaDescription:
      'Marom Painting serves Chicago homeowners with interior painting, exterior painting, trim work, touch-ups, clean prep, and clear estimates.',
    h1: 'Painting Services in Chicago',
    intro:
      'Chicago homes need painting work that respects the space, the schedule, and the details. Marom Painting helps homeowners across Chicago refresh interiors, exteriors, trim, cabinets, and worn surfaces with clean prep and sharp lines.',
    localAngle:
      'From condos and townhomes to single-family homes and older interiors, Chicago painting projects often involve tight access, active living spaces, older trim, and surfaces that need careful patching before finish paint. We plan the scope around the home instead of treating every project the same.',
    servicesOffered: [
      'Interior painting for rooms, hallways, ceilings, and living spaces.',
      'Exterior painting for trim, doors, details, and selected surfaces by scope.',
      'Trim painting, cabinet painting, touch-ups, patching, and clean finishing work.',
    ],
    nearbyAreas: [
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
      {label: 'Berwyn', href: '/areas/berwyn-painting'},
      {label: 'Cicero', href: '/areas/cicero-painting'},
      {label: 'Evanston', href: '/areas/evanston-painting'},
    ],
    faqs: [
      {
        question: 'Do you provide painting estimates in Chicago?',
        answer:
          'Yes. Share the project type, address, and a few details, and we can plan the next step for a clear estimate.',
      },
      {
        question: 'Can you handle touch-ups and small patching in Chicago homes?',
        answer:
          'Yes. Touch-ups, small patching, trim refreshes, and prep-heavy work can be included based on the condition of the surfaces.',
      },
    ],
  },
  {
    slug: 'oak-park-painting',
    city: 'Oak Park',
    metaTitle: 'Oak Park Painting Services | Marom Painting',
    metaDescription:
      'Painting services in Oak Park for older homes, trim detail, refreshed interiors, cabinets, touch-ups, and clean professional finishes.',
    h1: 'Painting Services in Oak Park',
    intro:
      'Oak Park homes often have trim, casing, built-ins, and older surfaces that deserve careful prep. Marom Painting helps homeowners refresh interiors, trim, cabinets, and worn finishes while respecting the character of the home.',
    localAngle:
      'Older Oak Park homes can have beautiful detail work, but those details also show chips, uneven sheen, old caulk lines, and past patching. A thoughtful repaint can brighten rooms while preserving the visual character that makes the home feel established.',
    servicesOffered: [
      'Interior painting for older rooms, updated living spaces, and move-in refreshes.',
      'Trim painting and detail work for baseboards, casing, doors, and built-ins.',
      'Cabinet painting, touch-ups, patching, and clean finishing work.',
    ],
    nearbyAreas: [
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Berwyn', href: '/areas/berwyn-painting'},
      {label: 'Cicero', href: '/areas/cicero-painting'},
      {label: 'North Shore', href: '/areas/north-shore-painting'},
    ],
    faqs: [
      {
        question: 'Do you paint trim in older Oak Park homes?',
        answer:
          'Yes. Trim painting and detail work can include prep, sanding, caulking where appropriate, and clean transitions around walls and floors.',
      },
      {
        question: 'Can you refresh an Oak Park interior without a full remodel?',
        answer:
          'Yes. Interior painting, trim refreshes, and cabinet painting can make a room feel cleaner and more current without changing the layout.',
      },
    ],
  },
  {
    slug: 'berwyn-painting',
    city: 'Berwyn',
    metaTitle: 'Berwyn Painting Services | Marom Painting',
    metaDescription:
      'Marom Painting helps Berwyn homeowners with bungalow repainting, rental and property prep, touch-ups, trim, interiors, and clean finishes.',
    h1: 'Painting Services in Berwyn',
    intro:
      'Berwyn homes often need practical, well-scoped painting work: refreshed rooms, cleaner trim, property prep, and surfaces ready for daily use. Marom Painting brings clean prep, sharp lines, and clear estimates to each project.',
    localAngle:
      'Many Berwyn projects involve bungalows, rental turnovers, move-in painting, and repainting that needs to make a property feel cared for quickly without ignoring prep. We help define whether the job needs targeted touch-ups, a room repaint, trim work, or a broader refresh.',
    servicesOffered: [
      'Interior repainting for bedrooms, living spaces, hallways, and kitchens.',
      'Touch-ups, patching, rental or property prep, and clean finishing work.',
      'Trim painting, cabinet painting, and exterior refreshes by scope.',
    ],
    nearbyAreas: [
      {label: 'Cicero', href: '/areas/cicero-painting'},
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Skokie', href: '/areas/skokie-painting'},
    ],
    faqs: [
      {
        question: 'Can you help with rental or property prep in Berwyn?',
        answer:
          'Yes. Touch-ups, patching, repainting, and trim refreshes can help a property feel cleaner before a listing, rental, or move-in.',
      },
      {
        question: 'Do Berwyn painting projects need full repaints?',
        answer:
          'Not always. We can review the surfaces and recommend whether touch-ups, selected rooms, or a larger repaint will give the cleanest result.',
      },
    ],
  },
  {
    slug: 'cicero-painting',
    city: 'Cicero',
    metaTitle: 'Cicero Painting Services | Marom Painting',
    metaDescription:
      'Painting services in Cicero for interior refreshes, exterior updates, touch-ups, trim, patching, and clean finishes from Marom Painting.',
    h1: 'Painting Services in Cicero',
    intro:
      'Cicero homeowners often want painting work that makes a space feel clean, refreshed, and ready to use. Marom Painting handles interior and exterior painting, touch-ups, trim, and prep with a practical, professional approach.',
    localAngle:
      'A good Cicero painting project often focuses on everyday wear: scuffed walls, worn trim, exterior details, patched areas, and rooms that need a cleaner finish. We define the project around what will make the biggest useful difference.',
    servicesOffered: [
      'Interior and exterior refreshes for homes and property updates.',
      'Touch-ups, wall repair, patching, trim painting, and clean finishing details.',
      'Cabinet painting and focused updates for kitchens, doors, and high-use spaces.',
    ],
    nearbyAreas: [
      {label: 'Berwyn', href: '/areas/berwyn-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
      {label: 'Evanston', href: '/areas/evanston-painting'},
    ],
    faqs: [
      {
        question: 'Do you offer both interior and exterior painting in Cicero?',
        answer:
          'Yes. We can review interior rooms, trim, exterior details, doors, and selected surfaces based on the project scope.',
      },
      {
        question: 'Can you handle patching before painting?',
        answer:
          'Yes. Small patching and prep can be included so the finished surface looks cleaner.',
      },
    ],
  },
  {
    slug: 'evanston-painting',
    city: 'Evanston',
    metaTitle: 'Evanston Painting Services | Marom Painting',
    metaDescription:
      'Marom Painting serves Evanston with premium interior finishes, trim detail, cabinet painting, exterior refreshes, and clear estimates.',
    h1: 'Painting Services in Evanston',
    intro:
      'Evanston homes often combine older details with updated living spaces. Marom Painting helps homeowners create cleaner interiors, sharper trim, refreshed cabinets, and polished exterior details with careful prep and clear communication.',
    localAngle:
      'In Evanston, the finish details matter: trim around older windows, stairways, built-ins, larger rooms, and high-touch kitchen surfaces all need a patient prep process. We focus on premium-looking finishes without making the project feel overcomplicated.',
    servicesOffered: [
      'Interior painting for larger rooms, stairways, bedrooms, and connected living spaces.',
      'Trim detail, cabinet painting, touch-ups, patching, and clean finishing work.',
      'Exterior painting for doors, trim, accents, and selected surfaces by scope.',
    ],
    nearbyAreas: [
      {label: 'Skokie', href: '/areas/skokie-painting'},
      {label: 'North Shore', href: '/areas/north-shore-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
    ],
    faqs: [
      {
        question: 'Do you help with trim detail in Evanston homes?',
        answer:
          'Yes. Trim painting, doors, casing, and detailed finish work can be included in the estimate.',
      },
      {
        question: 'Can you paint cabinets in Evanston kitchens?',
        answer:
          'Yes. Cabinet painting can be a strong option when the layout works and the surfaces are good candidates for prep and repainting.',
      },
    ],
  },
  {
    slug: 'skokie-painting',
    city: 'Skokie',
    metaTitle: 'Skokie Painting Services | Marom Painting',
    metaDescription:
      'Painting services in Skokie for refreshed interiors, premium trim detail, larger homes, cabinets, touch-ups, and clear estimates.',
    h1: 'Painting Services in Skokie',
    intro:
      'Skokie painting projects often involve family spaces, kitchens, bedrooms, trim, and high-use rooms that need a cleaner finish after years of wear. Marom Painting helps define the right scope and complete the work with clean prep and sharp lines.',
    localAngle:
      'For Skokie homes, a focused repaint can make larger rooms, hallways, kitchens, and trim packages feel newer without changing the layout. We look at wall condition, trim wear, cabinet surfaces, and touch-up needs before recommending a plan.',
    servicesOffered: [
      'Interior painting for bedrooms, family rooms, kitchens, and hallways.',
      'Trim painting, cabinet painting, patching, and touch-up work.',
      'Exterior painting and detail refreshes by agreed scope.',
    ],
    nearbyAreas: [
      {label: 'Evanston', href: '/areas/evanston-painting'},
      {label: 'North Shore', href: '/areas/north-shore-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Cicero', href: '/areas/cicero-painting'},
    ],
    faqs: [
      {
        question: 'Do you paint larger Skokie interiors?',
        answer:
          'Yes. We can plan room-by-room scopes for larger interiors, connected living spaces, hallways, and trim packages.',
      },
      {
        question: 'Can touch-ups work in older painted rooms?',
        answer:
          'Sometimes. We can review whether the existing paint will blend or whether a larger repaint will look cleaner.',
      },
    ],
  },
  {
    slug: 'north-shore-painting',
    city: 'North Shore',
    metaTitle: 'North Shore Painting Services | Marom Painting',
    metaDescription:
      'Marom Painting serves North Shore homes with premium interior painting, exterior painting, trim detail, cabinets, touch-ups, and clean finishes.',
    h1: 'Painting Services for North Shore Homes',
    intro:
      'North Shore homes often call for premium finishes, clean trim detail, organized project planning, and surfaces that look good up close. Marom Painting helps homeowners refresh interiors, exteriors, trim, cabinets, and high-use spaces with careful prep.',
    localAngle:
      'Larger homes and detailed interiors benefit from a clear painting plan: which rooms are included, how trim and doors are handled, where patching is needed, and what finish makes sense for each surface. That clarity helps the final result feel polished rather than rushed.',
    servicesOffered: [
      'Premium interior painting for living areas, bedrooms, stairways, and detailed rooms.',
      'Trim detail, cabinet painting, patching, touch-ups, and clean finishing work.',
      'Exterior painting for trim, doors, accents, and selected surfaces by scope.',
    ],
    nearbyAreas: [
      {label: 'Evanston', href: '/areas/evanston-painting'},
      {label: 'Skokie', href: '/areas/skokie-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
    ],
    faqs: [
      {
        question: 'Do you handle premium finishes for North Shore homes?',
        answer:
          'Yes. We focus on clean prep, sharp lines, and finish details suited to the surface and room.',
      },
      {
        question: 'Can one estimate include several rooms and trim areas?',
        answer:
          'Yes. We can define a multi-room scope that includes walls, trim, cabinets, doors, and touch-ups as needed.',
      },
    ],
  },
];

export const areaServiceLinks = serviceLinks;

export const areaIndexMeta = {
  title: 'Painting Service Areas | Chicago & North Shore | Marom Painting',
  description:
    'Marom Painting serves Chicago, Oak Park, Berwyn, Cicero, Evanston, Skokie, and North Shore homes with clean prep and premium finishes.',
};
