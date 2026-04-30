import heroImage from '../WorkPhotos/WorkPhotos/Hero1.png';
import interiorDetail from '../WorkPhotos/WorkPhotos/IMG_5973.png';
import trimDetail from '../WorkPhotos/WorkPhotos/IMG_5975.png';
import cabinetDetail from '../WorkPhotos/WorkPhotos/IMG_5954.png';
import cleanFinish from '../WorkPhotos/WorkPhotos/IMG_5976.png';
import exteriorDetail from '../WorkPhotos/WorkPhotos/IMG_5971(edit).png';
import previousExteriorDetail from '../WorkPhotos/WorkPhotos/IMG_6036.png';
import prepDetail from '../WorkPhotos/WorkPhotos/IMG_5992.png';
import wallFinish from '../WorkPhotos/WorkPhotos/IMG_5955.png';

export type PageImage = {
  src: string;
  alt: string;
  caption: string;
};

const sharedImages = {
  hero: {
    src: heroImage,
    alt: 'Interior painting work by Marom Painting',
    caption: 'Clean painting and trim work for homes across Chicago and the North Shore.',
  },
  interior: {
    src: interiorDetail,
    alt: 'Interior painting work by Marom Painting',
    caption: 'Interior painting with clean prep and a polished finish.',
  },
  trim: {
    src: trimDetail,
    alt: 'Trim painting and clean wall finish',
    caption: 'Trim painting and detail work with sharp transitions.',
  },
  cabinets: {
    src: cabinetDetail,
    alt: 'Kitchen painting and cabinet detail',
    caption: 'Kitchen and cabinet detail work planned around a clean finish.',
  },
  finish: {
    src: cleanFinish,
    alt: 'Clean wall finish and painting detail',
    caption: 'Finished surfaces reviewed for clean lines and consistent coverage.',
  },
  exterior: {
    src: exteriorDetail,
    alt: 'Exterior painting and trim work',
    caption: 'Exterior painting and trim work planned around surface condition.',
  },
  previousExterior: {
    src: previousExteriorDetail,
    alt: 'Exterior painting and trim work',
    caption: 'Exterior painting and trim work planned around surface condition.',
  },
  prep: {
    src: prepDetail,
    alt: 'Painting prep and patching detail',
    caption: 'Prep, patching, and finishing details before paint goes on.',
  },
  wall: {
    src: wallFinish,
    alt: 'Clean interior wall painting finish',
    caption: 'Interior wall finish with clean edges and a smooth look.',
  },
} satisfies Record<string, PageImage>;

export const serviceImageMap: Record<string, PageImage[]> = {
  'interior-painting': [sharedImages.interior, sharedImages.wall, sharedImages.trim],
  'exterior-painting': [sharedImages.exterior, sharedImages.finish, sharedImages.prep],
  'trim-work': [sharedImages.trim, sharedImages.wall, sharedImages.interior],
  'cabinet-painting': [sharedImages.cabinets, sharedImages.trim, sharedImages.finish],
  'touch-ups': [sharedImages.prep, sharedImages.finish, sharedImages.wall],
};

export const areaImageMap: Record<string, PageImage[]> = {
  'chicago-painting': [sharedImages.hero, sharedImages.trim],
  'oak-park-painting': [sharedImages.trim, sharedImages.interior],
  'berwyn-painting': [sharedImages.prep, sharedImages.wall],
  'cicero-painting': [sharedImages.finish, sharedImages.exterior],
  'evanston-painting': [sharedImages.interior, sharedImages.trim],
  'skokie-painting': [sharedImages.wall, sharedImages.cabinets],
  'north-shore-painting': [sharedImages.hero, sharedImages.finish],
};

export const blogImageMap: Record<string, PageImage[]> = {
  'top-5-ways-to-refresh-your-kitchen': [
    sharedImages.cabinets,
    sharedImages.trim,
  ],
  'how-to-choose-interior-paint-colors': [sharedImages.interior, sharedImages.wall],
  'when-should-you-repaint-trim': [sharedImages.trim, sharedImages.prep],
};

export const indexImages = {
  services: [
    sharedImages.interior,
    sharedImages.exterior,
    sharedImages.cabinets,
    sharedImages.interior,
    sharedImages.previousExterior,
  ],
  areas: [sharedImages.hero, sharedImages.trim, sharedImages.finish],
  blog: [sharedImages.cabinets, sharedImages.interior, sharedImages.trim],
};
