import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  NOT_FOUND_METADATA,
  SITE,
  absoluteUrl,
  createStructuredData,
  getRouteMetadata,
} from './routeMetadata.js';

type Attributes = Record<string, string>;

function upsertElement<T extends HTMLElement>(
  selector: string,
  tagName: string,
  attributes: Attributes,
) {
  let element = document.head.querySelector<T>(selector);
  if (!element) {
    element = document.createElement(tagName) as T;
    element.dataset.rainingHead = 'true';
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
  return element;
}

function removeElement(selector: string) {
  document.head.querySelector(selector)?.remove();
}

export function RouteHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const knownMetadata = getRouteMetadata(pathname);
    const metadata = knownMetadata ?? NOT_FOUND_METADATA;
    const canonical = knownMetadata ? absoluteUrl(knownMetadata.path) : null;
    const image = absoluteUrl(metadata.image);

    document.title = metadata.title;

    upsertElement<HTMLMetaElement>('meta[name="description"]', 'meta', {
      name: 'description',
      content: metadata.description,
    });
    upsertElement<HTMLMetaElement>('meta[name="robots"]', 'meta', {
      name: 'robots',
      content: metadata.robots ?? 'index, follow, max-image-preview:large',
    });

    if (canonical) {
      upsertElement<HTMLLinkElement>('link[rel="canonical"]', 'link', {
        rel: 'canonical',
        href: canonical,
      });
    } else {
      removeElement('link[rel="canonical"]');
    }

    const socialMetadata: Array<[string, string, string]> = [
      ['property', 'og:site_name', SITE.name],
      ['property', 'og:locale', SITE.locale],
      ['property', 'og:type', 'website'],
      ['property', 'og:title', metadata.title],
      ['property', 'og:description', metadata.description],
      ['property', 'og:url', canonical ?? `${SITE.origin}${pathname}`],
      ['property', 'og:image', image],
      ['property', 'og:image:alt', metadata.imageAlt],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', metadata.title],
      ['name', 'twitter:description', metadata.description],
      ['name', 'twitter:image', image],
      ['name', 'twitter:image:alt', metadata.imageAlt],
    ];

    socialMetadata.forEach(([attribute, key, content]) => {
      upsertElement<HTMLMetaElement>(`meta[${attribute}="${key}"]`, 'meta', {
        [attribute]: key,
        content,
      });
    });

    const structuredData = knownMetadata ? createStructuredData(knownMetadata) : null;
    if (structuredData) {
      const script = upsertElement<HTMLScriptElement>(
        'script#raining-structured-data',
        'script',
        { id: 'raining-structured-data', type: 'application/ld+json' },
      );
      script.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c');
    } else {
      removeElement('script#raining-structured-data');
    }
  }, [pathname]);

  return null;
}
