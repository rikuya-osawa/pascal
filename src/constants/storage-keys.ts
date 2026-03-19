import { SITE_NAME } from './site-config';

const STORAGE_PREFIX = SITE_NAME.trim().toLowerCase().replace(/\s+/g, '-');

export const STORAGE_KEYS = {
  theme: `${STORAGE_PREFIX}:theme`,
  filterPanelOpen: `${STORAGE_PREFIX}:filter-panel-open`,
  modelFilters: `${STORAGE_PREFIX}:model-filters`,
} as const;
