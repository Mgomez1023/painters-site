import type {AreaPageData} from './areas';
import type {BlogPostData} from './blog';
import type {ServicePageData} from './services';
import type {FaqItem} from './services';

const siteOrigin = 'https://marompainting.org';
const businessName = 'Marom Painting';
const phone = '+17084201260';

const areaServed = [
  'Chicago',
  'Oak Park',
  'Berwyn',
  'Cicero',
  'Evanston',
  'Skokie',
  'North Shore',
].map((name) => ({
  '@type': 'Place',
  name,
}));

const provider = {
  '@type': 'HousePainter',
  name: businessName,
  url: siteOrigin,
  telephone: phone,
  areaServed,
};

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    name: businessName,
    url: siteOrigin,
    telephone: phone,
    areaServed,
    makesOffer: [
      'Interior painting',
      'Exterior painting',
      'Trim painting',
      'Cabinet painting',
      'Touch-ups',
      'Prep, patching, and clean finishing work',
    ].map((serviceType) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        serviceType,
      },
    })),
  };
}

export function buildServiceSchema(service: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${siteOrigin}/services/${service.slug}`,
    provider,
    areaServed,
  };
}

export function buildAreaServiceSchema(area: AreaPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Painting services in ${area.city}`,
    serviceType: 'Residential painting',
    description: area.metaDescription,
    url: `${siteOrigin}/areas/${area.slug}`,
    provider,
    areaServed: {
      '@type': 'Place',
      name: area.city,
    },
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema(post: BlogPostData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    mainEntityOfPage: `${siteOrigin}/blog/${post.slug}`,
    url: `${siteOrigin}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: businessName,
      url: siteOrigin,
    },
    publisher: {
      '@type': 'Organization',
      name: businessName,
      url: siteOrigin,
    },
  };
}
