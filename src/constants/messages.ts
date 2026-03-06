import type { Language } from './filters';

export const MESSAGES = {
  ja: {
    title: "Mental Model Atlas",
    layerLabel: "レイヤー",
    applicationLabel: "活用場面",
    allLabel: "全て",
    searchFallback: "一致するメンタルモデルが見つかりませんでした。",
    searchPlaceholder: "検索...",
    notFoundTitle: "ページが見つかりません",
    notFoundDescription: "申し訳ありません。お探しのページが見つかりません。",
    notFoundFeature: "ページはまだ翻訳中である可能性があります。",
    notFoundLinks: "以下のリンクをご利用ください：",
    notFoundIssue: "問題を報告する",
    notFoundIssueDesc: "バグや問題が見つかった場合は、GitHub Issues にお知らせください。",
  },
  en: {
    title: "Mental Model Atlas",
    layerLabel: "LAYER",
    applicationLabel: "APPLICATION",
    allLabel: "ALL",
    searchFallback: "No mental models found matching your criteria.",
    searchPlaceholder: "Search models...",
    notFoundTitle: "Page Not Found",
    notFoundDescription: "Sorry, the page you're looking for could not be found.",
    notFoundFeature: "The page may still be under translation.",
    notFoundLinks: "Please use one of the following links:",
    notFoundIssue: "Report an Issue",
    notFoundIssueDesc: "If you found a bug or issue, please let us know on GitHub Issues.",
  },
} as const;

export type Messages = typeof MESSAGES;

/**
 * 指定言語のメッセージを取得
 * @param lang 言語
 * @returns 言語別メッセージオブジェクト
 */
export const getMessages = (lang: Language) => MESSAGES[lang];
