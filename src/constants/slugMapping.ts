/**
 * 日本語と英語のslugマッピング
 * キー: 日本語slug、値: 英語slug（小文字）
 */
export const slugMapping: Record<string, string> = {
  'oodaループ': 'ooda-loop',
  'stp分析': 'stp-analysis',
  'vrio分析': 'vrio-analysis',
  'why-why分析': 'five-whys-analysis',
  'アンチフラジャイル思考': 'antifragile-thinking',
  'イシューツリー': 'issue-tree',
  'オプション思考': 'optionality-thinking',
  'サンクコスト思考': 'sunk-cost-thinking',
  'システム思考': 'systems-thinking',
  'シナリオプランニング': 'senario-planning',
};

/**
 * 逆マッピング（英語 → 日本語）
 */
export const reverseSlugMapping = Object.fromEntries(
  Object.entries(slugMapping).map(([ja, en]) => [en, ja])
);

/**
 * 言語とslugから対応する他言語のslugを取得
 */
export function getAlternateSlug(currentLang: string, currentSlug: string): string {
  if (currentLang === 'ja') {
    const alternateSlug = slugMapping[currentSlug];
    // マッピングが見つからない場合は同じslugを返す（同名ファイルの場合）
    return alternateSlug || currentSlug;
  } else {
    const alternateSlug = reverseSlugMapping[currentSlug];
    // マッピングが見つからない場合は同じslugを返す（同名ファイルの場合）
    return alternateSlug || currentSlug;
  }
}
