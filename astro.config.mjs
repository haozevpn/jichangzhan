import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jichangzhan.com',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => {
      const pathname = new URL(page).pathname;
      const isProviderDetail = pathname.startsWith('/providers/') && pathname !== '/providers/';
      return !isProviderDetail && !pathname.startsWith('/data/') && pathname !== '/contact/';
    },
  })],
});
