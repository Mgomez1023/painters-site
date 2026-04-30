import {useEffect} from 'react';

const siteOrigin = 'https://marompainting.org';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SeoHead({title, description, path, jsonLd}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag('description', description);
    setCanonical(path);
    setJsonLd(jsonLd);

    return () => {
      removeManagedJsonLd();
    };
  }, [description, jsonLd, path, title]);

  return null;
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function setCanonical(path: string) {
  let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }

  tag.href = `${siteOrigin}${path}`;
}

function setJsonLd(jsonLd: SeoHeadProps['jsonLd']) {
  removeManagedJsonLd();

  if (!jsonLd) {
    return;
  }

  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoManaged = 'true';
    script.dataset.seoIndex = String(index);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function removeManagedJsonLd() {
  document
    .querySelectorAll<HTMLScriptElement>('script[data-seo-managed="true"]')
    .forEach((script) => script.remove());
}
