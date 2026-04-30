export type SeoLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  title: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  includes: string[];
  whyChoose: string[];
  process: string[];
  faqs: FaqItem[];
  relatedServices: SeoLink[];
  relatedAreas: SeoLink[];
};

export const servicePages: ServicePageData[] = [
  {
    slug: 'interior-painting',
    title: 'Interior Painting',
    navLabel: 'Interior Painting',
    metaTitle: 'Interior Painting in Chicago & North Shore | Marom Painting',
    metaDescription:
      'Interior painting for Chicago and North Shore homes with clean prep, sharp lines, premium finishes, and clear estimates from Marom Painting.',
    h1: 'Interior Painting for Chicago and North Shore Homes',
    intro:
      'A strong interior paint job should make a room feel cleaner, brighter, and more finished without making the project feel chaotic. Marom Painting helps homeowners plan the scope, protect the space, prep surfaces carefully, and finish walls, ceilings, doors, and trim with sharp lines.',
    includes: [
      'Wall and ceiling painting for bedrooms, living rooms, kitchens, hallways, and finished basements.',
      'Careful masking, floor protection, and setup before work begins.',
      'Small patching, sanding, and surface prep where needed for a smoother finish.',
      'Clean edging around trim, ceilings, built-ins, windows, and doors.',
      'Color and sheen conversations during the estimate so the finish fits the room.',
    ],
    whyChoose: [
      'Clean prep is treated as part of the job, not an afterthought.',
      'Clear estimates help homeowners understand rooms, surfaces, and finish expectations before work starts.',
      'The finished result is built around crisp transitions, consistent coverage, and practical durability.',
    ],
    process: [
      'Walk the space and confirm rooms, surfaces, repairs, colors, and timing.',
      'Protect floors, furniture, fixtures, and nearby finished surfaces.',
      'Patch, sand, spot-prime where needed, and prepare edges for clean lines.',
      'Paint with an organized room-by-room approach and review the finish before cleanup.',
    ],
    faqs: [
      {
        question: 'Do you help with interior paint colors?',
        answer:
          'Yes. We can discuss color direction, lighting, trim contrast, and sheen during the estimate so the final finish fits the way the room is used.',
      },
      {
        question: 'Can interior painting include patching?',
        answer:
          'Yes. Small patching, sanding, and prep can be included in the scope so the finished paint does not highlight avoidable surface issues.',
      },
      {
        question: 'Do I need to move everything before painting?',
        answer:
          'We will discuss access and protection before the project begins. Small items and fragile pieces should be moved, and larger items can be planned around during setup.',
      },
    ],
    relatedServices: [
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
      {label: 'Cabinet Painting', href: '/services/cabinet-painting'},
    ],
    relatedAreas: [
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
      {label: 'Evanston', href: '/areas/evanston-painting'},
    ],
  },
  {
    slug: 'exterior-painting',
    title: 'Exterior Painting',
    navLabel: 'Exterior Painting',
    metaTitle: 'Exterior Painting in Chicago & North Shore | Marom Painting',
    metaDescription:
      'Exterior painting for Chicago and North Shore homes with practical prep, clean lines, and finishes planned around the condition of each surface.',
    h1: 'Exterior Painting for a Cleaner, Sharper Home Exterior',
    intro:
      'Exterior painting has to look good from the street and hold up to real weather. Marom Painting helps homeowners refresh siding, doors, trim, railings, and exterior details with a practical prep plan and a clean finish.',
    includes: [
      'Exterior trim, doors, railings, accent details, and painted surfaces by scope.',
      'Surface review for peeling, cracking, loose paint, gaps, or areas needing prep.',
      'Scraping, sanding, spot prep, and careful masking where appropriate.',
      'Color and finish planning for curb appeal and neighborhood context.',
      'Clean work areas and clear communication around weather-sensitive timing.',
    ],
    whyChoose: [
      'Exterior scope is based on the surface condition instead of a generic one-size quote.',
      'Prep and finish details are discussed before the work begins.',
      'Marom Painting focuses on a professional result without making unsupported claims or vague promises.',
    ],
    process: [
      'Review exterior surfaces and note prep needs.',
      'Confirm paintable areas, color direction, access, and weather planning.',
      'Prepare surfaces, protect nearby areas, and paint in a clean sequence.',
      'Walk the completed work and review details before cleanup.',
    ],
    faqs: [
      {
        question: 'When is the best time for exterior painting?',
        answer:
          'Exterior painting depends on temperature, surface condition, and weather. We will discuss timing during the estimate so the project is planned responsibly.',
      },
      {
        question: 'Can you paint exterior trim only?',
        answer:
          'Yes. Many homeowners refresh exterior trim, doors, railings, or accents without repainting the full exterior.',
      },
      {
        question: 'What prep is included for exterior painting?',
        answer:
          'Prep depends on the condition of the surface and can include cleaning, scraping, sanding, masking, and spot preparation where needed.',
      },
    ],
    relatedServices: [
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
      {label: 'Interior Painting', href: '/services/interior-painting'},
    ],
    relatedAreas: [
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'North Shore', href: '/areas/north-shore-painting'},
      {label: 'Skokie', href: '/areas/skokie-painting'},
    ],
  },
  {
    slug: 'trim-work',
    title: 'Trim Work',
    navLabel: 'Trim Work',
    metaTitle: 'Trim Painting & Detail Work | Marom Painting',
    metaDescription:
      'Trim painting and detail work for baseboards, casing, doors, built-ins, and clean transitions across Chicago and the North Shore.',
    h1: 'Trim Work and Trim Painting With Sharp Lines',
    intro:
      'Trim is one of the first places a homeowner notices wear. Baseboards, casing, doors, and built-ins collect scuffs and can make an otherwise clean room feel unfinished. Marom Painting refreshes trim with careful prep, clean edges, and a premium finish.',
    includes: [
      'Baseboards, door casing, window trim, doors, and selected built-ins by scope.',
      'Cleaning, sanding, light patching, and caulking where appropriate.',
      'Careful protection around walls, floors, hardware, and adjacent surfaces.',
      'Sharp transitions between trim, walls, ceilings, and flooring.',
      'Paint finish planning for durability and a clean visual edge.',
    ],
    whyChoose: [
      'Trim requires patience and detail, not rushed coverage.',
      'Clear estimates define exactly which trim, doors, and details are included.',
      'The work is planned around clean lines and a finish that looks good up close.',
    ],
    process: [
      'Identify trim areas, existing damage, sheen, and color direction.',
      'Protect nearby surfaces and prepare trim for better adhesion.',
      'Paint in a controlled sequence to keep edges clean and consistent.',
      'Review lines, corners, and touch points before wrapping up.',
    ],
    faqs: [
      {
        question: 'When should trim be repainted?',
        answer:
          'Trim is a good candidate for repainting when scuffs, chips, yellowing, cracked caulk lines, or uneven sheen remain visible after cleaning.',
      },
      {
        question: 'Can trim be painted without repainting the walls?',
        answer:
          'Yes. Trim can often be refreshed on its own if the walls are in good shape and can be protected properly.',
      },
      {
        question: 'Do you paint doors and casing?',
        answer:
          'Yes. Doors, casing, baseboards, and other trim details can be included in the estimate.',
      },
    ],
    relatedServices: [
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
      {label: 'Cabinet Painting', href: '/services/cabinet-painting'},
    ],
    relatedAreas: [
      {label: 'Oak Park', href: '/areas/oak-park-painting'},
      {label: 'Evanston', href: '/areas/evanston-painting'},
      {label: 'North Shore', href: '/areas/north-shore-painting'},
    ],
  },
  {
    slug: 'cabinet-painting',
    title: 'Cabinet Painting',
    navLabel: 'Cabinet Painting',
    metaTitle: 'Cabinet Painting in Chicago & North Shore | Marom Painting',
    metaDescription:
      'Cabinet painting for kitchens, vanities, and built-ins with clean prep, smooth finishes, and clear estimates from Marom Painting.',
    h1: 'Cabinet Painting for Kitchens, Vanities, and Built-Ins',
    intro:
      'Cabinet painting can make a kitchen or built-in feel newer without changing the layout. The finish depends heavily on prep: cleaning, sanding, priming where needed, and using a careful process for high-touch surfaces.',
    includes: [
      'Kitchen cabinets, bathroom vanities, built-ins, and selected painted storage pieces by scope.',
      'Cleaning and prep focused on adhesion and smoother finish quality.',
      'Hardware and access planning before work begins.',
      'Color and sheen guidance for a finish that fits the home.',
      'Clean detail work around panels, edges, doors, and drawer fronts.',
    ],
    whyChoose: [
      'Cabinets need more than wall-painting habits; the prep and finish plan matter.',
      'The estimate clarifies what is included before doors, drawers, and surfaces are started.',
      'The goal is a cleaner, more polished space without pretending it is a full remodel.',
    ],
    process: [
      'Review cabinet condition, layout, hardware, and color goals.',
      'Confirm prep steps, access, and timeline before work begins.',
      'Prepare surfaces carefully and apply finish in a controlled sequence.',
      'Reassemble or review completed areas based on the agreed scope.',
    ],
    faqs: [
      {
        question: 'Is cabinet painting a good alternative to replacing cabinets?',
        answer:
          'It can be a strong option when the cabinet layout and boxes still work for the home. The estimate should confirm whether the surfaces are good candidates.',
      },
      {
        question: 'Can you help choose a cabinet color?',
        answer:
          'Yes. We can discuss wall color, trim color, lighting, and the overall feel you want before finalizing a direction.',
      },
      {
        question: 'Does cabinet painting include prep?',
        answer:
          'Yes. Cabinet painting depends on prep, and the scope should include cleaning, sanding, priming where appropriate, and finish planning.',
      },
    ],
    relatedServices: [
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
    ],
    relatedAreas: [
      {label: 'Chicago', href: '/areas/chicago-painting'},
      {label: 'Evanston', href: '/areas/evanston-painting'},
      {label: 'Skokie', href: '/areas/skokie-painting'},
    ],
  },
  {
    slug: 'touch-ups',
    title: 'Touch-Ups',
    navLabel: 'Touch-Ups',
    metaTitle: 'Painting Touch-Ups & Patch Work | Marom Painting',
    metaDescription:
      'Painting touch-ups, patching, and clean finishing work for Chicago and North Shore homes from Marom Painting.',
    h1: 'Touch-Ups, Patching, and Clean Finishing Work',
    intro:
      'Not every project needs a full repaint. Touch-ups, small patching, and clean finishing work can help a home feel cared for before guests, photos, moving, renting, or selling. Marom Painting helps homeowners decide when a targeted touch-up makes sense and when a broader repaint will look cleaner.',
    includes: [
      'Wall scuffs, small patches, nail holes, worn corners, and selected trim touch-ups.',
      'Surface review to determine whether touch-ups will blend acceptably.',
      'Patching, sanding, and finish work by agreed scope.',
      'Touch-up planning for move-in, move-out, rental, sale, or regular home refresh needs.',
      'Clear recommendations when a full repaint is the better option.',
    ],
    whyChoose: [
      'Touch-ups require honest guidance because not every old paint finish blends well.',
      'Marom Painting focuses on a clean, practical result rather than overselling the scope.',
      'Small finish details are handled with the same care as larger painting projects.',
    ],
    process: [
      'Review the affected surfaces and existing paint condition.',
      'Confirm whether touch-up paint is available or if matching is needed.',
      'Patch, sand, and paint the agreed areas.',
      'Review blending and recommend next steps if a larger repaint is needed.',
    ],
    faqs: [
      {
        question: 'Will touch-up paint always blend perfectly?',
        answer:
          'Not always. Age, sheen, fading, surface texture, and previous paint type can affect blending. We will be clear when repainting a larger area is likely to look better.',
      },
      {
        question: 'Are touch-ups useful before selling or renting?',
        answer:
          'Yes. Targeted patching and touch-ups can clean up everyday wear and help a property feel better maintained.',
      },
      {
        question: 'Can touch-ups include trim?',
        answer:
          'Yes. Trim scuffs, worn corners, and selected doors or baseboards can be reviewed as part of the scope.',
      },
    ],
    relatedServices: [
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Exterior Painting', href: '/services/exterior-painting'},
    ],
    relatedAreas: [
      {label: 'Berwyn', href: '/areas/berwyn-painting'},
      {label: 'Cicero', href: '/areas/cicero-painting'},
      {label: 'Chicago', href: '/areas/chicago-painting'},
    ],
  },
];

export const serviceIndexMeta = {
  title: 'Painting Services in Chicago & North Shore | Marom Painting',
  description:
    'Explore Marom Painting services including interior painting, exterior painting, trim work, cabinet painting, touch-ups, prep, patching, and clean finishing work.',
};
