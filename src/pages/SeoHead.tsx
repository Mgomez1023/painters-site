import {useEffect} from 'react';

const siteOrigin = 'https://marompainting.org';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
};

export function SeoHead({title, description, path}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag('description', description);
    setCanonical(path);
  }, [description, path, title]);

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
