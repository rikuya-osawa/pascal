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