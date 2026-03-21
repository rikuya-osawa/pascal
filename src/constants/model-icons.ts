export const MODEL_ICONS: Record<string, string> = {
  // --- ビジネス・フレームワーク系 ---
  "4p-4c": "lucide:component",
  "business-model-canvas": "lucide:layout-dashboard",
  "stp-analysis": "lucide:users-2", // stp分析
  "vrio-analysis": "lucide:gem", // vrio分析
  "five-forces-analysis": "lucide:swords", // ファイブフォース分析
  "value-chain-analysis": "lucide:link", // バリューチェーン分析
  "economic-moat": "lucide:castle", // 競争優位moat
  "jobs-to-be-done": "lucide:briefcase", // ジョブ理論
  "work-planning-strategy": "lucide:list", // 仕事計画戦略
  "swot-analysis": "lucide:grid-2x2", // SWOT分析
  "pestel-analysis": "lucide:telescope", // PEST分析
  "mandala-chart": "lucide:grid-3x3", // マンダラチャート
  "smart-goals": "lucide:calendar-check", // SMARTゴール
  "5w1h": "lucide:list-check", // 5W1H
  "3c-analysis": "lucide:triangle", // 3C分析
  "eisenhower-matrix": "lucide:grid-2x2", // アイゼンハワーマトリクス

  // --- 思考法・プロセス系 ---
  "mece": "lucide:columns-4",
  "minimum-viable-product": "lucide:rocket",
  "ooda-loop": "lucide:rotate-cw", // oodaループ
  "five-whys-analysis": "lucide:help-circle", // why-why分析
  "issue-tree": "lucide:git-pull-request", // イシューツリー
  "pyramid-principle": "lucide:triangle", // ピラミッド原則
  "premortem-analysis": "lucide:skull", // プレモーテム分析
  "hypothesis-thinking": "lucide:test-tube-2", // 仮説思考
  "essential-thinking": "lucide:target", // 本質思考
  "kanban": "lucide:columns-4", // カンバン

  // --- 戦略・システム系 ---
  "systems-thinking": "lucide:network", // システム思考
  "antifragility": "lucide:dumbbell", // アンチフラジリティ
  "scenario-planning": "lucide:map", // シナリオプランニング
  "flywheel-effect": "lucide:disc-3", // フライホイール思考
  "leverage-thinking": "lucide:wrench", // レバレッジ思考
  "lean-thinking": "lucide:recycle", // リーン思考
  "constraint-based-thinking": "lucide:hourglass", // 制約条件思考
  "blue-ocean-strategy": "lucide:waves", // ブルーオーシャン戦略

  // --- 確率・統計・判断系 ---
  "bayesian-thinking": "lucide:scale", // ベイズ思考
  "expected-value-thinking": "lucide:calculator", // 期待値思考
  "risk-return-thinking": "lucide:trending-up-down", // リスクリターン思考
  "black-swan": "lucide:bird", // ブラックスワン
  "reversible-irreversible-decisions": "lucide:door-open", // 可逆不可逆判断
  "marginal-thinking": "lucide:arrow-right-to-line", // 限界思考
  "statistical-thinking": "lucide:chart-scatter", // 統計的思考
  "barbell-strategy": "lucide:dumbbell", // バーベル戦略

  // --- 認知バイアス・メタ思考系 ---
  "bias-awareness": "lucide:eye-off", // バイアス認識
  "metacognition": "lucide:microscope", // メタ認知
  "abstraction-and-concretization": "lucide:layers", // 抽象化具体化
  "first-principles-thinking": "lucide:atom", // 第一原理思考
  "second-order-thinking": "lucide:layers-3", // 二次思考
  "optionality-thinking": "lucide:split", // オプション思考
  "ladder-of-inference": "lucide:arrow-left-right", // 推論のはしご

  // --- 数学・法則・その他 ---
  "sunk-cost-thinking": "lucide:trending-down", // サンクコスト思考
  "pareto-principle": "lucide:pie-chart", // パレートの法則
  "trade-off-thinking": "lucide:arrow-left-right", // トレードオフ思考
  
  // デフォルト用
  "default": "lucide:brain"
};

export const UI_ICONS = {
  search: 'lucide:search',
  themeLight: 'lucide:sun',
  themeDark: 'lucide:moon',
  filter: 'lucide:sliders-horizontal',
  filterClose: 'lucide:x',
  filterReset: 'lucide:rotate-cw',
  modelsGoBack: 'lucide:arrow-left',
} as const;