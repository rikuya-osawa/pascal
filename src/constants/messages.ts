import type { Language } from './filters';

export const MESSAGES = {
  ja: {
    title: "Mental Model Atlas",
    layerLabel: "レイヤー",
    viewpointLabel: "視点",
    allLabel: "全て",
    searchFallback: "一致するメンタルモデルが見つかりませんでした。",
    searchPlaceholder: "検索...",
  },
  en: {
    title: "Mental Model Atlas",
    layerLabel: "LAYER",
    viewpointLabel: "VIEWPOINTS",
    allLabel: "ALL",
    searchFallback: "No mental models found matching your criteria.",
    searchPlaceholder: "Search models...",
  },
} as const;

export type Messages = typeof MESSAGES;

/**
 * 指定言語のメッセージを取得
 * @param lang 言語
 * @returns 言語別メッセージオブジェクト
 */
export const getMessages = (lang: Language) => MESSAGES[lang];
