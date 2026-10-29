import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://www.codecraftsolutions.rs';
export const SITE_NAME = 'CodeCraft Solutions';
export const DEFAULT_DESCRIPTION =
  'CodeCraft Solutions is a Novi Sad-based engineering studio that designs, builds and maintains ' +
  'web and mobile software: custom web apps, AngularJS migration and performance engineering.';
const SHARE_IMAGE = `${SITE_URL}/og-image.png`;
const SHARE_IMAGE_ALT = `${SITE_NAME} — We engineer software systems that ship and stay shipped.`;

/** Page metadata, set on a route as `data: { seo: {...} }`. */
export interface PageSeo {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /**
   * Writes title, description, canonical URL and social-preview tags for a page.
   * Runs during prerendering, so the tags are present in the static HTML.
   */
  apply(page: PageSeo | undefined, path: string): void {
    const title = page?.title ?? SITE_NAME;
    const description = page?.description ?? DEFAULT_DESCRIPTION;
    const url = canonicalUrl(path);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: SHARE_IMAGE });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: SHARE_IMAGE_ALT });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: SHARE_IMAGE });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

/**
 * GitHub Pages serves prerendered pages as `<route>/index.html` and redirects
 * `/services` to `/services/`, so non-root canonical URLs end with a slash.
 */
export function canonicalUrl(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean ? `${SITE_URL}${clean}/` : `${SITE_URL}/`;
}
