import type {SeoLink} from './services';

export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogPostData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: BlogSection[];
  relatedLinks: SeoLink[];
};

export const blogPosts: BlogPostData[] = [
  {
    slug: 'top-5-ways-to-refresh-your-kitchen',
    title: 'Top 5 Ways to Refresh Your Kitchen Without a Full Remodel',
    metaTitle: '5 Kitchen Refresh Ideas Without a Full Remodel | Marom Painting',
    metaDescription:
      'Practical kitchen refresh ideas for homeowners, including cabinet painting, trim touch-ups, wall color, patching, and clear project scope.',
    intro:
      'A kitchen can feel dated even when the layout still works. Before planning a full remodel, homeowners can often get a cleaner, brighter space with focused painting and finishing updates.',
    sections: [
      {
        heading: '1. Repaint Cabinets or the Island',
        body: 'Cabinet painting can change the look of a kitchen without replacing the boxes or layout. The important part is prep: cleaning, sanding, priming where needed, and choosing a finish suited to high-touch surfaces.',
      },
      {
        heading: '2. Refresh Trim and Door Casings',
        body: 'Kitchen trim takes a lot of wear from foot traffic, cleaning, pets, and daily use. Fresh trim paint can make walls, floors, and cabinets feel more intentional.',
      },
      {
        heading: '3. Choose a Wall Color That Works With the Light',
        body: 'Natural light, cabinet color, counters, and flooring all affect how a wall color feels. Softer neutrals can brighten a darker kitchen, while deeper colors can add structure when the room has enough light.',
      },
      {
        heading: '4. Patch Worn Corners and Old Holes',
        body: 'Small dents, nail holes, and rough patches are easy to ignore until fresh paint highlights them. A clean kitchen refresh should include surface prep before the final coat.',
      },
      {
        heading: '5. Keep the Scope Focused',
        body: 'Decide whether the project includes walls, trim, doors, cabinets, or only selected touch-ups. A focused scope keeps the estimate clear and helps the update feel controlled.',
      },
    ],
    relatedLinks: [
      {label: 'Cabinet Painting', href: '/services/cabinet-painting'},
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
    ],
  },
  {
    slug: 'how-to-choose-interior-paint-colors',
    title: 'How to Choose Interior Paint Colors for Your Home',
    metaTitle: 'How to Choose Interior Paint Colors | Marom Painting',
    metaDescription:
      'A practical guide to choosing interior paint colors based on light, trim, sheen, adjoining rooms, and everyday use.',
    intro:
      'Paint color is not just a swatch decision. The right color depends on light, trim, flooring, furnishings, sheen, and how each room connects to the rest of the home.',
    sections: [
      {
        heading: 'Start With the Light in the Room',
        body: 'A color can look warm in morning light and cooler at night. View samples at different times of day and under the bulbs you actually use.',
      },
      {
        heading: 'Use Trim as the Anchor',
        body: 'Trim color affects how wall color reads. If trim is yellowed, chipped, or uneven, repainting trim may be just as important as choosing a new wall color.',
      },
      {
        heading: 'Match Sheen to Daily Use',
        body: 'Busy rooms, kitchens, hallways, and kids rooms may need a finish that handles cleaning better. Quieter rooms can often use a softer-looking sheen.',
      },
      {
        heading: 'Consider Adjacent Rooms',
        body: 'Colors do not need to match from room to room, but they should make sense from doorways, hallways, and staircases.',
      },
      {
        heading: 'Ask About Prep Before Finalizing',
        body: 'Fresh color looks better when the surface is ready. Patching, sanding, and edge work should be part of the conversation before paint goes on the wall.',
      },
    ],
    relatedLinks: [
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Painting in Chicago', href: '/areas/chicago-painting'},
    ],
  },
  {
    slug: 'when-should-you-repaint-trim',
    title: 'When Should You Repaint Trim?',
    metaTitle: 'When Should You Repaint Trim? | Marom Painting',
    metaDescription:
      'Learn when baseboards, doors, casing, and trim should be repainted, and how trim painting can refresh a room.',
    intro:
      'Trim quietly frames every room. When it is scuffed, yellowed, chipped, or uneven, even clean walls can look unfinished. Repainting trim can be one of the most effective ways to refresh a space.',
    sections: [
      {
        heading: 'Scuffs and Chips Keep Coming Back',
        body: 'Baseboards and door casing take daily wear. If cleaning does not remove visible marks or chips, repainting may be the cleaner option.',
      },
      {
        heading: 'Old Caulk Lines Are Cracking',
        body: 'Gaps between trim and walls can make a room look rough. Prep and caulking where appropriate can help create sharper transitions.',
      },
      {
        heading: 'The Trim Color Has Yellowed',
        body: 'Older trim paint can yellow or lose consistency over time. A fresh trim finish can brighten the edges of a room and improve contrast with wall color.',
      },
      {
        heading: 'You Are Already Painting Walls',
        body: 'If walls are being repainted, it is worth evaluating the trim at the same time. Walls and trim together often create a more complete result.',
      },
      {
        heading: 'Doors and High-Touch Areas Look Worn',
        body: 'Doors, frames, and hand-contact areas show wear quickly. Repainting these details can make a home feel better maintained.',
      },
    ],
    relatedLinks: [
      {label: 'Trim Work', href: '/services/trim-work'},
      {label: 'Interior Painting', href: '/services/interior-painting'},
      {label: 'Touch-Ups', href: '/services/touch-ups'},
    ],
  },
];

export const blogIndexMeta = {
  title: 'Painting Tips & Resources | Marom Painting',
  description:
    'Helpful painting resources from Marom Painting for kitchen refreshes, interior colors, trim repainting, prep, and clean finishes.',
};
