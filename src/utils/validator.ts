import fs from 'node:fs';
import path from 'node:path';

export function validateModelSync(jaEntries: any[], enEntries: any[]) {
  const jaSlugs = jaEntries.map(e => e.slug.split('/').pop());
  const enSlugs = enEntries.map(e => e.slug.split('/').pop());

  const missingEn = jaSlugs.filter(slug => !enSlugs.includes(slug));
  const missingJa = enSlugs.filter(slug => !jaSlugs.includes(slug));

  let logContent = `Build Log: ${new Date().toLocaleString()}\n`;
  logContent += "========================================\n";

  if (missingEn.length > 0 || missingJa.length > 0) {
    if (missingEn.length > 0) logContent += `[Missing EN]:\n - ${missingEn.join('\n - ')}\n`;
    if (missingJa.length > 0) logContent += `[Missing JA]:\n - ${missingJa.join('\n - ')}\n`;
    
    // 開発者への警告
    console.warn(`\x1b[33m[Warning]\x1b[0m Model sync issue found. Check build-report.txt`);
  } else {
    logContent += "All models are synchronized.\n";
  }

  const logPath = path.resolve('./logs/build-report.txt');
  fs.writeFileSync(logPath, logContent, 'utf-8');
}