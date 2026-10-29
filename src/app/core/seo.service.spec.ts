import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { canonicalUrl, DEFAULT_DESCRIPTION, SeoService, SITE_NAME } from './seo.service';
import { SeoTitleStrategy } from './seo-title.strategy';

@Component({ template: '' })
class BlankPage {}

describe('SeoService', () => {
  let meta: Meta;
  let doc: Document;

  const content = (selector: string): string | null =>
    meta.getTag(selector)?.getAttribute('content') ?? null;
  const canonical = (): string | null =>
    doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'services',
            component: BlankPage,
            data: { seo: { title: 'Services | CodeCraft', description: 'What we build.' } },
          },
          { path: 'plain', component: BlankPage },
        ]),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
      ],
    });
    meta = TestBed.inject(Meta);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => doc.head.querySelector('link[rel="canonical"]')?.remove());

  it('sets title, description, social tags and canonical from route data on navigation', async () => {
    await TestBed.inject(Router).navigateByUrl('/services');

    expect(TestBed.inject(Title).getTitle()).toBe('Services | CodeCraft');
    expect(content('name="description"')).toBe('What we build.');
    expect(content('property="og:title"')).toBe('Services | CodeCraft');
    expect(content('property="og:description"')).toBe('What we build.');
    expect(content('property="og:url"')).toBe('https://www.codecraftsolutions.rs/services/');
    expect(content('property="og:image"')).toBe('https://www.codecraftsolutions.rs/og-image.png');
    expect(content('name="twitter:card"')).toBe('summary_large_image');
    expect(canonical()).toBe('https://www.codecraftsolutions.rs/services/');
  });

  it('falls back to site defaults when a route has no seo data', async () => {
    await TestBed.inject(Router).navigateByUrl('/plain?ref=x');

    expect(TestBed.inject(Title).getTitle()).toBe(SITE_NAME);
    expect(content('name="description"')).toBe(DEFAULT_DESCRIPTION);
    expect(canonical()).toBe('https://www.codecraftsolutions.rs/plain/');
  });

  it('keeps a single canonical link across navigations', () => {
    const seo = TestBed.inject(SeoService);
    seo.apply(undefined, '/team');
    seo.apply(undefined, '/contact');

    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(canonical()).toBe('https://www.codecraftsolutions.rs/contact/');
  });

  describe('canonicalUrl()', () => {
    it.each([
      ['/', 'https://www.codecraftsolutions.rs/'],
      ['', 'https://www.codecraftsolutions.rs/'],
      ['/services', 'https://www.codecraftsolutions.rs/services/'],
      ['/team/', 'https://www.codecraftsolutions.rs/team/'],
      ['/contact?utm=li#form', 'https://www.codecraftsolutions.rs/contact/'],
    ])('%s → %s', (path, expected) => {
      expect(canonicalUrl(path)).toBe(expected);
    });
  });
});
