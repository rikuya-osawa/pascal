import type { Language } from './filters';

export const MESSAGES = {
  ja: {
    title: "Mental Model Atlas",
    natureLabel: "モデルの性質",
    applicationLabel: "活用場面",
    allLabel: "全て",
    goBackText: "← モデル一覧に戻る",
    searchFallback: "一致するメンタルモデルが見つかりませんでした。",
    searchPlaceholder: "「/」を入力して検索...",
    notFoundTitle: "ページが見つかりません",
    notFoundDescription: "申し訳ありません。お探しのページが見つかりません。",
    notFoundFeature: "ページはまだ翻訳中である可能性があります。",
    notFoundLinks: "以下のリンクをご利用ください：",
    notFoundIssue: "問題を報告する",
    notFoundIssueDesc: "バグや問題が見つかった場合は、GitHub Issues にお知らせください。",
    // Home page
    homeHeroMainLine1: "より良い意思決定を、", // 全文: "より良い意思決定を、<br>本質的な問題解決を"
    homeHeroMainLine2: "より本質的な問題解決を",
    homeHeroSub: "複雑な世界をシンプルに捉えるための思考の地図（Mental Model Atlas）",
    homeHeroCtaText: "アトラスを探索する",
    homeConceptTitle: "なぜメンタルモデルが必要なのか？",
    homeBenefitFasterDecisions: "意思決定の迅速化",
    homeBenefitFasterDecisionsDesc: "フレームワークを活用することで、複雑な課題を構造化し、素早く最良の判断ができます。",
    homeBenefitAvoidBias: "認知バイアスの回避",
    homeBenefitAvoidBiasDesc: "自分の思考パターンの癖に気づき、より客観的で論理的な判断へ導きます。",
    homeBenefitMultiplePerspectives: "多角的な視点の獲得",
    homeBenefitMultiplePerspectivesDesc: "異なる思考モデルを知ることで、今まで見えなかった視点や可能性が開けます。",
    homeNatureGuideTitle: "モデルの性質ガイド",
    homeNatureGuideDesc: "メンタルモデルを3つの性質に分類。あなたの課題に合ったモデルを見つけやすくしました。",
    homeNatureFramework: "フレームワーク",
    homeNatureFrameworkDesc: "構造を可視化し、情報の抜け漏れを防ぐ「器」としてのモデルです。",
    homeNatureCognition: "認知 / COGNITION",
    homeNatureCognitionDesc: "意識的に思考を切り替え、プロセスを回すための「能動的」なモデルです。",
    homeNaturePrinciple: "原則 / PRINCIPLE",
    homeNaturePrincipleDesc: "社会や自然、心理に備わっている「客観的」な性質を捉えるモデルです。",
    homeGithubTitle: "未完成を公開し、共創する",
    homeGithubDesc: "Mental Model Atlas は完成度よりも、継続的な改善を大切にしています。あなたの気づきやアイデアが、すべてのユーザーのためになります。",
    homeGithubCtaText: "GitHub で貢献する",
    // Models page
    modelsPageTitle: "すべてのメンタルモデル",
    modelsPageDesc: "思考の地図を探索し、あなたの課題に最適なフレームワークを見つけましょう。",
    modelsTotalCount: "件のメンタルモデル",
    modelsFilterTitle: "フィルターで絞り込む",
    modelsActiveFilters: "アクティブフィルター",
    modelsClearFilters: "すべてクリア",
    // Model detail page
    modelDetailHome: "ホーム",
    modelDetailModels: "モデル一覧",
    modelDetailRelatedTitle: "関連するモデル",
    modelDetailRelatedShowMore: "もっと見る（+{count}）",
    modelDetailRelatedShowLess: "閉じる",
  },
  en: {
    title: "Mental Model Atlas",
    natureLabel: "NATURE of MODEL",
    applicationLabel: "APPLICATION",
    allLabel: "ALL",
    goBackText: "← Back to Models",
    searchFallback: "No mental models found matching your criteria.",
    searchPlaceholder: "Type / to search models...",
    notFoundTitle: "Page Not Found",
    notFoundDescription: "Sorry, the page you're looking for could not be found.",
    notFoundFeature: "The page may still be under translation.",
    notFoundLinks: "Please use one of the following links:",
    notFoundIssue: "Report an Issue",
    notFoundIssueDesc: "If you found a bug or issue, please let us know on GitHub Issues.",
    // Home page
    homeHeroMainLine1: "Better Decision-Making,", // 全文: "Better Decision-Making,<br>Lasting Problem-Solving"
    homeHeroMainLine2: "Lasting Problem-Solving",
    homeHeroSub: "A map of thinking to understand complex world simply - Mental Model Atlas",
    homeHeroCtaText: "Explore the Atlas",
    homeConceptTitle: "Why Mental Models Matter",
    homeBenefitFasterDecisions: "Faster Decision-Making",
    homeBenefitFasterDecisionsDesc: "Frameworks help you structure complex challenges and make better decisions quickly.",
    homeBenefitAvoidBias: "Avoid Cognitive Bias",
    homeBenefitAvoidBiasDesc: "Recognize patterns in your thinking and move towards more objective, logical decisions.",
    homeBenefitMultiplePerspectives: "Gain Multiple Perspectives",
    homeBenefitMultiplePerspectivesDesc: "Learn different thinking models and discover new viewpoints and possibilities.",
    homeNatureGuideTitle: "NATURE Guide",
    homeNatureGuideDesc: "Mental models organized in 3 natures to help you find models that fit your challenge.",
    homeNatureFramework: "FRAMEWORK",
    homeNatureFrameworkDesc: "Models as 'structures' to visualize and prevent information gaps.",
    homeNatureCognition: "COGNITION",
    homeNatureCognitionDesc: "Active models to consciously switch thinking and run processes.",
    homeNaturePrinciple: "PRINCIPLE",
    homeNaturePrincipleDesc: "Models that capture 'objective' properties inherent in society, nature, and psychology.",
    homeGithubTitle: "Embrace the Unfinished, Create Together",
    homeGithubDesc: "Mental Model Atlas values continuous improvement over perfection. Your insights and ideas make a difference for everyone.",
    homeGithubCtaText: "Contribute on GitHub",
    // Models page
    modelsPageTitle: "All Mental Models",
    modelsPageDesc: "Explore the map of thinking and find the perfect framework for your challenge.",
    modelsTotalCount: "mental models",
    modelsFilterTitle: "Filter by",
    modelsActiveFilters: "Active Filters",
    modelsClearFilters: "Clear All",
    // Model detail page
    modelDetailHome: "Home",
    modelDetailModels: "Models",
    modelDetailRelatedTitle: "Related Models",
    modelDetailRelatedShowMore: "Show more (+{count})",
    modelDetailRelatedShowLess: "Show less",
  },
} as const;

export type Messages = typeof MESSAGES;

/**
 * 指定言語のメッセージを取得
 * @param lang 言語
 * @returns 言語別メッセージオブジェクト
 */
export const getMessages = (lang: Language) => MESSAGES[lang];
