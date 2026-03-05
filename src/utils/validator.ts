import fs from 'node:fs';
import path from 'node:path';
import { MODEL_ICONS } from '../constants/model-icons';

export function validateModelSync(jaEntries: any[], enEntries: any[]) {
  const jaSlugs = jaEntries.map(e => e.slug.split('/').pop());
  const enSlugs = enEntries.map(e => e.slug.split('/').pop());

  const missingEn = jaSlugs.filter(slug => !enSlugs.includes(slug));
  const missingJa = enSlugs.filter(slug => !jaSlugs.includes(slug));

  const allSlugs = Array.from(new Set([...jaSlugs, ...enSlugs]));
  const missingIcons = allSlugs.filter(slug => !MODEL_ICONS[slug as string]);

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

  if (missingEn.length === 0 && missingJa.length === 0 && missingIcons.length === 0) {
    logContent += "All models are synchronized and icons are configured.\n";
  }

  const logPath = path.resolve('./logs/build-report.txt');
  fs.writeFileSync(logPath, logContent, 'utf-8');
}