// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://mental-model-atlas.pages.dev',
  integrations: [
    sitemap(),
    icon({
        include: {
          'simple-icons': ['github', 'x'],
          'lucide': [
            'refresh-cw',
            'trending-down',
            'atom',
            'shield-check',
            'pie-chart',
            'line-chart',
            'brain'
          ],
        },
    }),
  ],
});