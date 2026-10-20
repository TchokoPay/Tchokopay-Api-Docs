import type { MetadataRoute } from 'next';
import { source } from '../lib/source';

const BASE = 'https://docs.tchokopay.com';

/**
 * Every documentation page, so a crawler does not depend on following links to
 * find them. Until this existed, Search Console showed the docs as crawled
 * rarely and not indexed: nothing listed them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: `${BASE}${page.url}`,
    changeFrequency: 'monthly' as const,
    priority: page.url.includes('/quickstart') || page.url === '/docs' ? 0.9 : 0.7,
  }));

  return [{ url: BASE, changeFrequency: 'monthly', priority: 1 }, ...pages];
}
