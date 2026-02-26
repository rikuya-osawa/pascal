// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import { SIMPLE_ICONS, LUCIDE_ICONS } from './src/data/icon-list';

export default defineConfig({
  site: 'https://mental-model-atlas.pages.dev',
  integrations: [
    sitemap(),
    icon({
      include: {
        'simple-icons': SIMPLE_ICONS,
        'lucide': LUCIDE_ICONS,
      },
    }),
  ],
});