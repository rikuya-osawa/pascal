import fs from 'node:fs';
import path from 'node:path';
import { MODEL_ICONS } from '../constants/model-icons';

type ModelEntry = {
  slug: string;
  data: {
    related_models?: string[];
  };
};

function collectInvalidRelatedModels(entries: ModelEntry[], lang: 'ja' | 'en') {
  const slugSet = new Set(entries.map((e) => e.slug.split('/').pop()));
  const invalidLinks: Array<{ source: string; target: string }> = [];

  for (const entry of entries) {
    const sourceSlug = entry.slug.split('/').pop() || '';
    const targets = entry.data.related_models || [];

    for (const target of targets) {
      if (!slugSet.has(target)) {
        invalidLinks.push({ source: sourceSlug, target });
      }
    }
  }

  if (invalidLinks.length > 0) {
    console.warn(
      `\x1b[33m[Warning]\x1b[0m Invalid related_models in ${lang}: ` +
      invalidLinks.map((x) => `${x.source} -> ${x.target}`).join(', ')
    );
  }

  return invalidLinks;
}

export function validateModelSync(jaEntries: ModelEntry[], enEntries: ModelEntry[]) {
  const jaSlugs = jaEntries.map(e => e.slug.split('/').pop());
  const enSlugs = enEntries.map(e => e.slug.split('/').pop());

  const missingEn = jaSlugs.filter(slug => !enSlugs.includes(slug));
  const missingJa = enSlugs.filter(slug => !jaSlugs.includes(slug));

  const allSlugs = Array.from(new Set([...jaSlugs, ...enSlugs]));
  const missingIcons = allSlugs.filter(slug => !MODEL_ICONS[slug as string]);
  const invalidJaRelated = collectInvalidRelatedModels(jaEntries, 'ja');
  const invalidEnRelated = collectInvalidRelatedModels(enEntries, 'en');

  let logContent = `Build Log: ${new Date().toLocaleString()}\n`;
  logContent += "========================================\n";

  // 言語同期チェック
  if (missingEn.length > 0) logContent += `[Missing EN]:\n - ${missingEn.join('\n - ')}\n`;
  if (missingJa.length > 0) logContent += `[Missing JA]:\n - ${missingJa.join('\n - ')}\n`;

  // アイコン設定チェック
  if (missingIcons.length > 0) {
    logContent += `\n[Missing Icon Configuration]:\n - ${missingIcons.join('\n - ')}\n`;
    console.warn(`\x1b[33m[Warning]\x1b[0m Icon not set for: ${missingIcons.join(', ')} (Using default brain icon)`);
  }

  // 関連モデル参照チェック
  if (invalidJaRelated.length > 0) {
    logContent += "\n[Invalid related_models: JA]:\n";
    logContent += invalidJaRelated.map((x) => ` - ${x.source} -> ${x.target}`).join('\n') + '\n';
  }

  if (invalidEnRelated.length > 0) {
    logContent += "\n[Invalid related_models: EN]:\n";
    logContent += invalidEnRelated.map((x) => ` - ${x.source} -> ${x.target}`).join('\n') + '\n';
  }

  if (
    missingEn.length === 0 &&
    missingJa.length === 0 &&
    missingIcons.length === 0 &&
    invalidJaRelated.length === 0 &&
    invalidEnRelated.length === 0
  ) {
    logContent += "All models are synchronized and icons are configured.\n";
  }

  const logPath = path.resolve('./logs/build-report.txt');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.writeFileSync(logPath, logContent, 'utf-8');
}