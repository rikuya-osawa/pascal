import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

type SupportedLang = 'ja' | 'en';

type ModelEntry = {
  slug: string;
  body: string;
};

type ValidationIssue = {
  source: string;
  rule: string;
  message: string;
};

type HeadingInfo = {
  level: number;
  text: string;
  line: number;
};

type SectionMatcher = {
  key: string;
  display: string;
  match: (value: string) => boolean;
};

type LangRules = {
  requiredH2: SectionMatcher[];
  ratingH3: SectionMatcher;
  firstQuestionH3: SectionMatcher[];
  dividerAfter: string[];
};

const ALLOWED_APPLICATIONS = new Set(['NB', 'DM', 'LT', 'PS', 'LIFE']);
const ALLOWED_NATURES = new Set(['FRAMEWORK', 'COGNITION', 'PRINCIPLE']);
const ALLOWED_METHODOLOGY = new Set(['generative', 'structural', 'critical', 'decisive', 'interactive']);
const ALLOWED_SOURCE_TYPES = new Set(['primary', 'reference', 'inspiration']);
const ALLOWED_SOURCE_LANGUAGES = new Set(['ja', 'en', '']);
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION_FORMAT = /^\d+\.\d+$/;

function isValidFormatVersion(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0;
  }

  if (typeof value === 'string') {
    return VERSION_FORMAT.test(value.trim());
  }

  return false;
}

const LANG_RULES: Record<SupportedLang, LangRules> = {
  en: {
    requiredH2: [
      { key: 'overview', display: 'Overview', match: (value) => value === 'Overview' },
      { key: 'rating', display: 'Rating (1-5)', match: (value) => value.startsWith('Rating') },
      { key: 'firstQuestion', display: 'The First Question', match: (value) => value === 'The First Question' },
      { key: 'howToUse', display: 'How to Use', match: (value) => value.startsWith('How to Use') },
      { key: 'outputExamples', display: 'Output Examples', match: (value) => value === 'Output Examples' },
      { key: 'useCases', display: 'Use Cases', match: (value) => value === 'Use Cases' },
      { key: 'typicalMisuses', display: 'Typical Misuses', match: (value) => value === 'Typical Misuses' },
      {
        key: 'relationships',
        display: 'Relationship with Other Models',
        match: (value) => value === 'Relationship with Other Models',
      },
    ],
    ratingH3: {
      key: 'evaluationComment',
      display: 'Evaluation Comment',
      match: (value) => value === 'Evaluation Comment',
    },
    firstQuestionH3: [
      { key: 'objectives', display: 'Objectives', match: (value) => value.startsWith('Objectives') },
      { key: 'poorQuestions', display: 'Poor Questions', match: (value) => value === 'Poor Questions' },
    ],
    dividerAfter: ['rating', 'firstQuestion', 'howToUse', 'outputExamples'],
  },
  ja: {
    requiredH2: [
      { key: 'overview', display: '概要', match: (value) => value === '概要' },
      { key: 'rating', display: '評価 (1-5)', match: (value) => value.startsWith('評価') },
      { key: 'firstQuestion', display: '最初の問い', match: (value) => value === '最初の問い' },
      { key: 'howToUse', display: '使い方', match: (value) => value.startsWith('使い方') },
      {
        key: 'outputExamples',
        display: 'アウトプット例',
        match: (value) => value === 'アウトプット例' || value === '出力例',
      },
      { key: 'useCases', display: 'ユースケース', match: (value) => value === 'ユースケース' },
      { key: 'typicalMisuses', display: '典型的な誤用', match: (value) => value === '典型的な誤用' },
      { key: 'relationships', display: '他のモデルとの関係', match: (value) => value === '他のモデルとの関係' },
    ],
    ratingH3: {
      key: 'evaluationComment',
      display: '評価コメント',
      match: (value) => value === '評価コメント',
    },
    firstQuestionH3: [
      { key: 'objectives', display: '目的', match: (value) => value.startsWith('目的') },
      { key: 'poorQuestions', display: '質の低い問い', match: (value) => value === '質の低い問い' },
    ],
    dividerAfter: ['rating', 'firstQuestion', 'howToUse', 'outputExamples'],
  },
};

function normalizeHeading(value: string): string {
  const noComments = value.replace(/<!--.*?-->/g, '');
  return noComments.replace(/\s+/g, ' ').trim();
}

function readRawModelFile(lang: SupportedLang, slug: string): string | null {
  const filePath = path.resolve(`./src/content/${lang}/models/${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function parseHeadings(body: string): HeadingInfo[] {
  const lines = body.split(/\r?\n/);
  const headings: HeadingInfo[] = [];

  lines.forEach((line, index) => {
    const match = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (!match) {
      return;
    }
    headings.push({
      level: match[1].length,
      text: normalizeHeading(match[2]),
      line: index + 1,
    });
  });

  return headings;
}

function sectionBounds(h2Headings: HeadingInfo[], sectionIndex: number, totalLines: number): { start: number; end: number } {
  const start = h2Headings[sectionIndex]?.line ?? 1;
  const end = h2Headings[sectionIndex + 1] ? h2Headings[sectionIndex + 1].line - 1 : totalLines;
  return { start, end };
}

function validateFrontMatter(lang: SupportedLang, slug: string, issues: ValidationIssue[]) {
  const source = `${lang}/${slug}`;
  const raw = readRawModelFile(lang, slug);

  if (!raw) {
    issues.push({
      source,
      rule: 'FILE_NOT_FOUND',
      message: `Unable to read source markdown file for slug ${slug}.`,
    });
    return;
  }

  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const requiredKeys = ['type', 'name', 'abbreviation', 'description', 'application', 'nature', 'tags'];
  for (const key of requiredKeys) {
    if (!(key in data)) {
      issues.push({ source, rule: 'FM_REQUIRED_KEY', message: `Missing required front matter key: ${key}` });
    }
  }

  if ('layer' in data) {
    issues.push({ source, rule: 'FM_LEGACY_LAYER', message: 'Legacy key "layer" found. Use "nature" instead.' });
  }

  const allowedKeys = new Set([
    'type',
    'name',
    'abbreviation',
    'description',
    'application',
    'nature',
    'methodology',
    'related_models',
    'tags',
    'format_version',
    'sources',
    'last_updated',
  ]);

  for (const key of Object.keys(data)) {
    if (!allowedKeys.has(key)) {
      issues.push({ source, rule: 'FM_UNKNOWN_KEY', message: `Unknown front matter key: ${key}` });
    }
  }

  if (data.type !== 'mental-model') {
    issues.push({ source, rule: 'FM_TYPE', message: 'type must be "mental-model".' });
  }

  if (typeof data.name !== 'string' || data.name.trim() === '') {
    issues.push({ source, rule: 'FM_NAME', message: 'name must be a non-empty string.' });
  }

  if (typeof data.abbreviation !== 'string' || data.abbreviation.trim() === '') {
    issues.push({ source, rule: 'FM_ABBREVIATION', message: 'abbreviation must be a non-empty string.' });
  }

  if (typeof data.description !== 'string' || data.description.trim() === '') {
    issues.push({ source, rule: 'FM_DESCRIPTION', message: 'description must be a non-empty string.' });
  }

  if (!Array.isArray(data.application)) {
    issues.push({ source, rule: 'FM_APPLICATION_TYPE', message: 'application must be an array.' });
  } else {
    if (data.application.length > 3) {
      issues.push({ source, rule: 'FM_APPLICATION_MAX', message: 'application should contain up to 3 values.' });
    }
    for (const value of data.application) {
      if (typeof value !== 'string' || !ALLOWED_APPLICATIONS.has(value)) {
        issues.push({ source, rule: 'FM_APPLICATION_ENUM', message: `Invalid application value: ${String(value)}` });
      }
    }
  }

  if (typeof data.nature !== 'string' || !ALLOWED_NATURES.has(data.nature)) {
    issues.push({ source, rule: 'FM_NATURE', message: 'nature must be FRAMEWORK, COGNITION, or PRINCIPLE.' });
  }

  if ('methodology' in data) {
    if (!Array.isArray(data.methodology)) {
      issues.push({ source, rule: 'FM_METHODOLOGY_TYPE', message: 'methodology must be an array when provided.' });
    } else {
      if (data.methodology.length > 3) {
        issues.push({ source, rule: 'FM_METHODOLOGY_MAX', message: 'methodology should contain up to 3 values.' });
      }

      for (const value of data.methodology) {
        if (typeof value !== 'string' || !ALLOWED_METHODOLOGY.has(value)) {
          issues.push({
            source,
            rule: 'FM_METHODOLOGY_ENUM',
            message: `Invalid methodology value: ${String(value)}`,
          });
        }
      }
    }
  }

  if (!Array.isArray(data.tags) || !data.tags.includes('mental-model')) {
    issues.push({ source, rule: 'FM_TAGS', message: 'tags must be an array that includes "mental-model".' });
  }

  if ('related_models' in data) {
    if (!Array.isArray(data.related_models)) {
      issues.push({ source, rule: 'FM_RELATED_MODELS_TYPE', message: 'related_models must be an array.' });
    } else {
      for (const related of data.related_models) {
        if (typeof related !== 'string' || !KEBAB_CASE.test(related)) {
          issues.push({
            source,
            rule: 'FM_RELATED_MODELS_FORMAT',
            message: `related_models value must be kebab-case slug: ${String(related)}`,
          });
        }
      }
    }
  }

  if ('format_version' in data) {
    if (!isValidFormatVersion(data.format_version)) {
      issues.push({
        source,
        rule: 'FM_FORMAT_VERSION',
        message: 'format_version should be a positive number or a string like "0.4".',
      });
    }
  }

  if ('sources' in data) {
    if (!Array.isArray(data.sources)) {
      issues.push({ source, rule: 'FM_SOURCES_TYPE', message: 'sources must be an array when provided.' });
    } else {
      data.sources.forEach((item, index) => {
        if (!item || typeof item !== 'object') {
          issues.push({ source, rule: 'FM_SOURCE_ITEM_TYPE', message: `sources[${index}] must be an object.` });
          return;
        }

        const sourceItem = item as Record<string, unknown>;
        if (typeof sourceItem.title !== 'string' || sourceItem.title.trim() === '') {
          issues.push({ source, rule: 'FM_SOURCE_TITLE', message: `sources[${index}].title is required.` });
        }
        if ('author' in sourceItem && typeof sourceItem.author !== 'string') {
          issues.push({ source, rule: 'FM_SOURCE_AUTHOR', message: `sources[${index}].author must be string.` });
        }
        if ('url' in sourceItem && typeof sourceItem.url !== 'string') {
          issues.push({ source, rule: 'FM_SOURCE_URL', message: `sources[${index}].url must be string.` });
        }
        if (!ALLOWED_SOURCE_TYPES.has(String(sourceItem.sourceType))) {
          issues.push({
            source,
            rule: 'FM_SOURCE_TYPE',
            message: `sources[${index}].sourceType must be primary, reference, or inspiration.`,
          });
        }
        if (!ALLOWED_SOURCE_LANGUAGES.has(String(sourceItem.sourceLanguage))) {
          issues.push({ source, rule: 'FM_SOURCE_LANGUAGE', message: `sources[${index}].sourceLanguage must be ja/en/empty.` });
        }
        if ('description' in sourceItem && typeof sourceItem.description !== 'string') {
          issues.push({ source, rule: 'FM_SOURCE_DESCRIPTION', message: `sources[${index}].description must be string.` });
        }
      });
    }
  }
}

function validateHeadings(lang: SupportedLang, slug: string, body: string, issues: ValidationIssue[]) {
  const source = `${lang}/${slug}`;
  const rules = LANG_RULES[lang];
  const lines = body.split(/\r?\n/);
  const headings = parseHeadings(body);

  const h1 = headings.filter((heading) => heading.level === 1);
  if (h1.length === 0) {
    issues.push({ source, rule: 'H1_MISSING', message: 'Missing H1 title heading.' });
  }

  const deepHeading = headings.find((heading) => heading.level >= 4);
  if (deepHeading) {
    issues.push({
      source,
      rule: 'HEADING_DEPTH',
      message: `Unexpected heading depth found at line ${deepHeading.line} (H${deepHeading.level}).`,
    });
  }

  const h2 = headings.filter((heading) => heading.level === 2);
  const foundH2 = new Map<string, number>();

  for (const section of rules.requiredH2) {
    const index = h2.findIndex((heading) => section.match(heading.text));
    if (index === -1) {
      issues.push({ source, rule: 'H2_MISSING', message: `Missing H2 section: ${section.display}` });
    } else {
      foundH2.set(section.key, index);
    }
  }

  let previous = -1;
  for (const section of rules.requiredH2) {
    const current = foundH2.get(section.key);
    if (typeof current !== 'number') {
      continue;
    }
    if (current < previous) {
      issues.push({ source, rule: 'H2_ORDER', message: `H2 section out of order: ${section.display}` });
    }
    previous = current;
  }

  const ratingIndex = foundH2.get('rating');
  if (typeof ratingIndex === 'number') {
    const { start, end } = sectionBounds(h2, ratingIndex, lines.length);
    const hasRatingComment = headings.some(
      (heading) => heading.level === 3 && heading.line > start && heading.line <= end && rules.ratingH3.match(heading.text)
    );
    if (!hasRatingComment) {
      issues.push({ source, rule: 'H3_MISSING', message: `Missing H3 in rating section: ${rules.ratingH3.display}` });
    }
  }

  const firstQuestionIndex = foundH2.get('firstQuestion');
  if (typeof firstQuestionIndex === 'number') {
    const { start, end } = sectionBounds(h2, firstQuestionIndex, lines.length);
    for (const requiredH3 of rules.firstQuestionH3) {
      const exists = headings.some(
        (heading) => heading.level === 3 && heading.line > start && heading.line <= end && requiredH3.match(heading.text)
      );
      if (!exists) {
        issues.push({ source, rule: 'H3_MISSING', message: `Missing H3 in first question section: ${requiredH3.display}` });
      }
    }
  }

  for (const sectionKey of rules.dividerAfter) {
    const sectionIndex = foundH2.get(sectionKey);
    if (typeof sectionIndex !== 'number') {
      continue;
    }
    const { start, end } = sectionBounds(h2, sectionIndex, lines.length);
    const hasDivider = lines
      .slice(Math.max(start, 1), end)
      .some((line) => line.trim() === '---');

    if (!hasDivider) {
      const section = rules.requiredH2.find((value) => value.key === sectionKey);
      issues.push({
        source,
        rule: 'DIVIDER_RECOMMENDED',
        message: `Recommended divider (---) is missing after section: ${section?.display ?? sectionKey}`,
      });
    }
  }
}

function appendTemplateValidationReport(issues: ValidationIssue[]) {
  const logPath = path.resolve('./logs/build-report.txt');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  let content = '\n[Template Validation Warnings]:\n';
  if (issues.length === 0) {
    content += ' - none\n';
  } else {
    content += issues.map((issue) => ` - [${issue.rule}] ${issue.source}: ${issue.message}`).join('\n');
    content += '\n';
  }

  fs.appendFileSync(logPath, content, 'utf-8');
}

function printTemplateValidationSummary(issues: ValidationIssue[]) {
  if (issues.length === 0) {
    return;
  }

  const preview = issues.slice(0, 10).map((issue) => `${issue.source} (${issue.rule})`).join(', ');
  const more = issues.length > 10 ? ` and ${issues.length - 10} more` : '';
  console.warn(
    `\x1b[33m[Warning]\x1b[0m Template format issues detected: ${issues.length} (${preview}${more}). See logs/build-report.txt`
  );
}

function validateCollection(lang: SupportedLang, entries: ModelEntry[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const entry of entries) {
    const slug = entry.slug.split('/').pop() || entry.slug;
    validateFrontMatter(lang, slug, issues);
    validateHeadings(lang, slug, entry.body, issues);
  }

  return issues;
}

export function validateModelTemplateSync(jaEntries: ModelEntry[], enEntries: ModelEntry[]) {
  const issues = [
    ...validateCollection('ja', jaEntries),
    ...validateCollection('en', enEntries),
  ];

  printTemplateValidationSummary(issues);
  appendTemplateValidationReport(issues);
}
