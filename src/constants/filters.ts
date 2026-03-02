export type Language = 'ja' | 'en';

export const LAYERS = {
  META: { ja: "メタ", en: "META" },
  CORE: { ja: "コア", en: "CORE" },
  TOOL: { ja: "ツール", en: "TOOL" },
} as const;

export const VIEWPOINTS = {
  NB: { ja: "新規事業", en: "NEW BUSINESS" },
  DM: { ja: "意思決定", en: "DECISION MAKING" },
  PS: { ja: "問題解決", en: "PROBLEM SOLVING" },
  LIFE: { ja: "人生・キャリア", en: "LIFE" },
  LT: { ja: "論理思考", en: "LOGICAL THINKING" },
} as const;

/**
 * 言語別ラベルオブジェクトから指定言語のラベルを取得
 * @param labelObj { ja: string, en: string } 形式のラベルオブジェクト
 * @param lang 取得対象言語
 * @returns 指定言語のラベル
 */
export const getLabel = (
  labelObj: { ja: string; en: string },
  lang: Language
): string => {
  return labelObj[lang] || labelObj.ja;
};

/**
 * 複数ラベルオブジェクトから指定言語の全ラベルを取得
 * @param obj ラベルオブジェクトの辞書
 * @param lang 取得対象言語
 * @returns 指定言語のラベル辞書
 */
export const getLabelsByLang = (
  obj: Record<string, { ja: string; en: string }>,
  lang: Language
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = getLabel(value, lang);
  }
  return result;
};