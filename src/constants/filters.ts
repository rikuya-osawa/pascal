export type Language = 'ja' | 'en';

export const NATURES = {
  FRAMEWORK: { ja: "フレームワーク", en: "FRAMEWORK" },
  COGNITION: { ja: "認知", en: "COGNITION" },
  PRINCIPLE: { ja: "原則", en: "PRINCIPLE" },
} as const;

export const APPLICATION = {
  NB: { ja: "新規事業", en: "NEW BUSINESS" },
  DM: { ja: "意思決定", en: "DECISION MAKING" },
  PS: { ja: "問題解決", en: "PROBLEM SOLVING" },
  LIFE: { ja: "人生・キャリア", en: "LIFE" },
  LT: { ja: "論理思考", en: "LOGICAL THINKING" },
} as const;

export const METHODOLOGY = {
  GENERATIVE: {
    en: { label: "Generative", description: "Expand possibilities and create something from nothing." },
    ja: { label: "広げる", description: "可能性を拡散させ、無から有を生み出す" }
  },
  STRUCTURAL: {
    en: { label: "Structural", description: "Break down complex phenomena and visualize relationships." },
    ja: { label: "整える", description: "複雑な事象を分解し、関係性を可視化する" }
  },
  CRITICAL: {
    en: { label: "Critical", description: "Question assumptions and uncover risks and biases." },
    ja: { label: "疑う", description: "前提を疑い、リスクやバイアスを暴く" }
  },
  DECISIVE: {
    en: { label: "Decisive", description: "Determine priorities and make choices in uncertainty." },
    ja: { label: "決める", description: "優先順位を確定し、不確実な中で選択する" }
  },
  INTERACTIVE: {
    en: { label: "Interactive", description: "Incorporate others' perspectives and co-create as a team." },
    ja: { label: "繋げる", description: "他者の視点を取り入れ、チームで共創する" }
  }
} as const;

export const TAGS = {
  /* Core Domains */
  Strategy: { ja: "戦略", en: "Strategy" },
  Marketing: { ja: "マーケティング", en: "Marketing" },
  Management: { ja: "マネジメント", en: "Management" },
  Psychology: { ja: "心理学", en: "Psychology" },
  Statistics: { ja: "統計", en: "Statistics" },
  Economics: { ja: "経済学", en: "Economics" },
  Productivity: { ja: "生産性", en: "Productivity" },
  Innovation: { ja: "新規事業", en: "Innovation" },
  Communication: { ja: "コミュニケーション", en: "Communication" },
  PHILOSOPHY: { ja: "哲学", en: "Philosophy" },

  /* Meta Models */
  "Systems-Thinking": { ja: "システム思考", en: "Systems Thinking" },
  Lean: { ja: "リーン", en: "Lean" },
  Agile: { ja: "アジャイル", en: "Agile" },
  "Game-Theory": { ja: "ゲーム理論", en: "Game Theory" },
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

/**
 * METHODOLOGY エントリから指定言語のラベルを取得
 * @param entry { en: { label: string, description: string }, ja: { label: string, description: string } } 形式
 * @param lang 取得対象言語
 * @returns 指定言語のラベル
 */
export const getMethodologyLabel = (
  entry: { en: { label: string; description: string }; ja: { label: string; description: string } },
  lang: Language
): string => {
  return entry[lang]?.label || entry.ja.label;
};