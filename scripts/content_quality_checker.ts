#!/usr/bin/env npx tsx
/**
 * AI Integrity — Content Quality Checker
 * =======================================
 * Adapted from The Digital Law Firm chapter_quality_agent.ts.
 * Same four readability standards. Different kill list, different
 * claims rules, adapted for web copy and community content.
 *
 * Four standards — for persuasion copy aimed at time-poor UK practice managers:
 *
 *   1. Gunning Fog Index    ≤ 10   — polysyllabic overload kills credibility
 *   2. Flesch Reading Ease  ≥ 70   — commuter-readable; a solicitor on the train
 *   3. Dale-Chall Score     ≤ 6.5  — vocabulary familiar to non-specialists
 *   4. Passive Voice %      < 8%   — passive voice kills urgency
 *
 * Additional checks (AI Integrity specific):
 *   5. Kill List            0 hits  — AI clichés and marketing fluff
 *   6. Citation flags       0 bare stats — every number needs a source
 *   7. Regulator accuracy   no generic "SRA" in cross-sector copy
 *   8. Claim flags          no fabricated case studies or outcomes
 *
 * Usage:
 *   npx tsx scripts/content_quality_checker.ts <file.md>
 *   npx tsx scripts/content_quality_checker.ts src/components/Hero.tsx
 *   npx tsx scripts/content_quality_checker.ts --all    # scan all src/ content files
 *
 * Output:
 *   Console report + ~/Downloads/AI_Integrity_Quality/QUALITY_YYYYMMDD.md
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DRY_RUN = process.argv.includes('--dry-run');
const SCAN_ALL = process.argv.includes('--all');

const REPORTS_DIR = path.join(
  process.env.HOME!,
  'Downloads/AI_Integrity_Quality'
);

// ── Kill List — AI Integrity specific ────────────────────────────────────────
// Inherits DLF kill list + AI marketing clichés + prohibited vague claims.
// Zero tolerance on website copy; ≤ 2 hits allowed in community posts.

const KILL_LIST_HARD = [
  // AI marketing clichés
  'leverage ai', 'harness ai', 'unlock the power', 'ai-powered solutions',
  'cutting-edge ai', 'state-of-the-art', 'game-changing', 'revolutionary',
  'transformative ai', 'ai-driven transformation', 'digital transformation',
  'disruptive', 'paradigm shift', 'seamless integration', 'robust solution',
  // Vague claim language (requires source or deletion)
  'studies show', 'research indicates', 'experts say', 'research proves',
  'many firms', 'most professionals', 'numerous studies', 'it is well known',
  // DLF kill list carried forward
  'it is worth noting', 'in order to', 'due to the fact that',
  'this demonstrates', 'this highlights', 'in conclusion',
  'seamless', 'seamlessly', 'leverage', 'synergy', 'paradigm',
  'holistic', 'innovative', 'ecosystem (outside software)',
  'perhaps consider', 'you could potentially', 'generally speaking',
  'it could be argued',
  // Prohibited in regulated professional services copy
  'guaranteed compliance', 'ensures compliance', 'fully compliant',
  'eliminates risk', 'removes risk', 'risk-free',
];

const KILL_LIST_SOFT = [
  // Allowed but flag for review
  'navigate', 'robust', 'dynamic', 'vibrant', 'empower',
  'deep dive', 'deep-dive', 'thought leader', 'thought leadership',
  'best practice', 'best-in-class', 'world-class',
];

// ── Bare statistics pattern — require source citation ─────────────────────
// Matches patterns like "40%", "60 per cent", "$1.5 billion" without [source] nearby
const BARE_STAT_RE = /\b(\d+(?:\.\d+)?)\s*(%|per cent|percent|billion|million|trillion|thousand)\b(?![^.]*\[)/gi;

// ── Cross-sector SRA leak — flag SRA in non-legal sections ───────────────
// On the generic/cross-sector pages, "SRA" should not appear without qualification
const GENERIC_SRA_RE = /\bSRA\b(?!\s+(compliance|Principle|Code of Conduct|regulated|registered|authorised|solicitors))/g;

// ── Prohibited outcome claims ─────────────────────────────────────────────
// Any claim of measurable outcome without [SOURCE] or [COMMUNITY CASE STUDY]
const OUTCOME_CLAIM_RE = /\b(reduced|cut|saved|improved|increased|decreased|eliminated)\b[^.]*(\d+|significantly|dramatically|substantially)[^.]*(?![\[(])/gi;

// ── Core readability analysis (adapted from chapter_quality_agent.ts) ────

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  const cleaned = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && s.split(/\s+/).length > 3);
}

function extractWords(text: string): string[] {
  return text.match(/\b[a-zA-Z']{2,}\b/g) ?? [];
}

// Passive voice patterns
const PASSIVE_RE = [
  /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi,
  /\b(has|have|had)\s+been\s+\w+ed\b/gi,
];

const DALE_CHALL_FAMILIAR = new Set([
  'a','able','about','above','act','add','after','again','age','ago','agree',
  'air','all','allow','almost','alone','along','already','also','always','am',
  'among','an','and','answer','any','are','arm','around','as','ask','at','away',
  'back','bad','be','because','been','before','begin','being','best','better',
  'between','big','black','blue','body','book','both','box','bring','build',
  'but','by','call','came','can','care','carry','cause','certain','change',
  'check','child','city','class','clean','clear','close','come','cost','could',
  'cover','cut','day','dead','deal','deep','did','different','do','does','done',
  'door','down','draw','drive','drop','dry','during','each','early','earth',
  'end','enough','even','ever','every','face','fact','fall','far','fast','few',
  'field','fight','fill','find','fire','first','five','floor','fly','follow',
  'food','for','force','form','four','free','from','front','full','game','get',
  'give','go','good','government','great','green','group','grow','half','hand',
  'hard','has','have','he','head','hear','heart','heavy','help','her','here',
  'high','him','his','hold','home','hot','hour','how','human','idea','if','in',
  'into','is','it','its','just','keep','kind','know','large','last','late',
  'lead','learn','left','less','let','life','light','like','line','list',
  'little','live','long','look','low','main','make','man','many','matter','may',
  'me','mean','men','might','mind','more','most','move','much','must','my',
  'name','near','never','new','next','night','no','north','not','note','now',
  'number','of','off','often','old','on','once','one','only','open','or',
  'order','other','our','out','over','own','part','past','pay','people','place',
  'plan','play','point','poor','power','press','public','put','question','read',
  'ready','real','reason','red','report','rest','right','road','room','round',
  'run','said','same','say','sea','seem','send','set','she','short','show',
  'side','since','six','small','so','some','soon','stand','start','state','stay',
  'step','still','stop','strong','such','sure','take','talk','ten','than','that',
  'the','their','them','then','there','these','they','thing','think','this',
  'those','three','through','time','to','today','together','too','try','turn',
  'two','under','until','up','use','very','walk','want','was','water','way',
  'we','well','went','were','what','when','where','while','white','who','why',
  'will','with','word','work','world','would','write','year','yes','yet','you',
  'young','your',
  // Professional services terms a practice manager knows:
  'ai','firm','client','law','legal','court','contract','partner','revenue',
  'cost','profit','data','process','staff','team','risk','review','system',
  'plan','result','service','practice','advice','compliance','report','matter',
  'rule','standard','policy','code','fee','bill','claim','issue','training',
  'draft','tool','error','output','task','hour','week','month','budget','target',
  'measure','track','test','check','sign','approve','run','build','save','free',
  'pay','earn','find','fix','show','prove','sra','gdpr','roi','pilot','audit',
  'model','letter','file','client','community','sector','member','template',
  'regulator','guidance','obligation','liability','insurer','indemnity',
  'solicitor','accountant','adviser','architect','surveyor','consultant',
  'fca','ico','icaew','acca','riba','arb','rics','aat','aml','kyc',
]);

function analyse(text: string) {
  const sentences = splitSentences(text);
  const words = extractWords(text);
  const n = Math.max(1, sentences.length);
  const w = Math.max(1, words.length);

  const syllableCount = words.reduce((t, wd) => t + countSyllables(wd), 0);
  const complexWords = words.filter(wd => countSyllables(wd) >= 3 && wd.length > 6).length;
  const asl = w / n;
  const asw = syllableCount / w;

  const gunningFog = 0.4 * (asl + 100 * (complexWords / w));
  const fleschReadingEase = Math.min(100, Math.max(0, 206.835 - 1.015 * asl - 84.6 * asw));

  const unfamiliar = words.filter(wd => !DALE_CHALL_FAMILIAR.has(wd.toLowerCase()));
  const pctUnfamiliar = (unfamiliar.length / w) * 100;
  let daleChallScore = 0.1579 * pctUnfamiliar + 0.0496 * asl;
  if (pctUnfamiliar > 5) daleChallScore += 3.6365;

  const passiveSentences = sentences.filter(s =>
    PASSIVE_RE.some(re => { re.lastIndex = 0; return re.test(s); })
  ).length;
  const passiveVoicePct = (passiveSentences / n) * 100;

  const lower = text.toLowerCase();
  const killHard = KILL_LIST_HARD.filter(p => lower.includes(p.toLowerCase()));
  const killSoft = KILL_LIST_SOFT.filter(p => lower.includes(p.toLowerCase()));

  // Reset regex lastIndex before use
  BARE_STAT_RE.lastIndex = 0;
  const bareStats = [...text.matchAll(BARE_STAT_RE)].map(m => m[0]);

  GENERIC_SRA_RE.lastIndex = 0;
  const genericSra = [...text.matchAll(GENERIC_SRA_RE)].map(m => m[0]);

  OUTCOME_CLAIM_RE.lastIndex = 0;
  const outcomeClaims = [...text.matchAll(OUTCOME_CLAIM_RE)].map(m => m[0].slice(0, 80));

  const hardestSentences = sentences
    .map(s => {
      const sw = extractWords(s);
      const sc = sw.reduce((t, wd) => t + countSyllables(wd), 0);
      const cx = sw.filter(wd => countSyllables(wd) >= 3).length;
      const fog = 0.4 * (sw.length + 100 * (cx / Math.max(1, sw.length)));
      return { s, fog };
    })
    .filter(({ fog }) => fog > 16)
    .sort((a, b) => b.fog - a.fog)
    .slice(0, 3)
    .map(({ s, fog }) => `Fog ${fog.toFixed(0)}: "${s.slice(0, 120)}…"`);

  return {
    gunningFog:       Math.round(gunningFog * 10) / 10,
    fleschReadingEase:Math.round(fleschReadingEase * 10) / 10,
    daleChallScore:   Math.round(daleChallScore * 100) / 100,
    passiveVoicePct:  Math.round(passiveVoicePct * 10) / 10,
    avgSentenceWords: Math.round(asl * 10) / 10,
    totalWords:       w,
    totalSentences:   n,
    killHard,
    killSoft,
    bareStats,
    genericSra,
    outcomeClaims,
    hardestSentences,
  };
}

// ── Report builder ────────────────────────────────────────────────────────────

function buildReport(filePath: string, text: string): string {
  const m = analyse(text);
  const filename = path.basename(filePath);

  const fogOk     = m.gunningFog <= 10;
  const fleschOk  = m.fleschReadingEase >= 70;
  const dcOk      = m.daleChallScore <= 6.5;
  const passiveOk = m.passiveVoicePct < 8;
  const killOk    = m.killHard.length === 0;
  const statsOk   = m.bareStats.length === 0;
  const sraOk     = m.genericSra.length === 0;
  const claimsOk  = m.outcomeClaims.length === 0;

  const allOk = fogOk && fleschOk && dcOk && passiveOk && killOk && statsOk && sraOk && claimsOk;
  const verdict = allOk ? '✅ READY TO PUBLISH'
    : (m.killHard.length > 0 || !statsOk || !claimsOk) ? '❌ BLOCKED — claims issues'
    : '⚠️ NEEDS WORK';

  const lines = [
    `# AI Integrity Content Quality Report`,
    `**File:** ${filename}`,
    `**Date:** ${new Date().toISOString().slice(0, 10)}`,
    `**Verdict:** ${verdict}`,
    '',
    '## Readability',
    '| Standard | Score | Target | Status |',
    '|----------|-------|--------|--------|',
    `| Gunning Fog Index | ${m.gunningFog} | ≤ 10 | ${fogOk ? '✅' : '❌'} |`,
    `| Flesch Reading Ease | ${m.fleschReadingEase} | ≥ 70 | ${fleschOk ? '✅' : '❌'} |`,
    `| Dale-Chall Score | ${m.daleChallScore} | ≤ 6.5 | ${dcOk ? '✅' : '❌'} |`,
    `| Passive Voice | ${m.passiveVoicePct}% | < 8% | ${passiveOk ? '✅' : '❌'} |`,
    '',
    `**Words:** ${m.totalWords} | **Sentences:** ${m.totalSentences} | **Avg sentence:** ${m.avgSentenceWords} words`,
    '',
    '## Claims & Citations (CLAIMS_POLICY.md)',
    `| Check | Result | Status |`,
    `|-------|--------|--------|`,
    `| Kill list (hard) | ${m.killHard.length} violations | ${killOk ? '✅' : '❌'} |`,
    `| Kill list (soft) | ${m.killSoft.length} flags | ${m.killSoft.length === 0 ? '✅' : '⚠️'} |`,
    `| Bare statistics (no source) | ${m.bareStats.length} found | ${statsOk ? '✅' : '❌'} |`,
    `| Generic SRA in cross-sector copy | ${m.genericSra.length} found | ${sraOk ? '✅' : '❌'} |`,
    `| Unsourced outcome claims | ${m.outcomeClaims.length} found | ${claimsOk ? '✅' : '❌'} |`,
    '',
  ];

  if (m.killHard.length > 0) {
    lines.push('### ❌ Kill List violations — delete or rewrite immediately');
    m.killHard.forEach(h => lines.push(`- \`${h}\``));
    lines.push('');
  }

  if (m.killSoft.length > 0) {
    lines.push('### ⚠️ Kill List (soft) — review and replace where possible');
    m.killSoft.forEach(h => lines.push(`- \`${h}\``));
    lines.push('');
  }

  if (m.bareStats.length > 0) {
    lines.push('### ❌ Bare statistics — add [Source: Name, Year] after each');
    m.bareStats.forEach(s => lines.push(`- \`${s}\``));
    lines.push('');
  }

  if (m.genericSra.length > 0) {
    lines.push('### ❌ "SRA" in cross-sector copy — use "your legal regulator" instead');
    m.genericSra.forEach(s => lines.push(`- \`${s}\``));
    lines.push('');
  }

  if (m.outcomeClaims.length > 0) {
    lines.push('### ❌ Unsourced outcome claims — add [SOURCE] or [COMMUNITY CASE STUDY] or remove');
    m.outcomeClaims.forEach(s => lines.push(`- \`${s.slice(0, 100)}\``));
    lines.push('');
  }

  if (m.hardestSentences.length > 0) {
    lines.push('### ⚠️ Hardest sentences — rewrite these first');
    m.hardestSentences.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
    lines.push('');
  }

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const targets: string[] = [];

if (SCAN_ALL) {
  // Scan all .tsx content components and .md files
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !['node_modules', '.git', 'dist'].includes(entry.name)) {
        walk(full);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.md'))) {
        targets.push(full);
      }
    }
  };
  walk(path.join(process.cwd(), 'src'));
  walk(path.join(process.cwd(), 'content'));
} else {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  targets.push(...args);
}

if (targets.length === 0) {
  console.error('Usage: npx tsx scripts/content_quality_checker.ts <file> [file...] | --all');
  process.exit(1);
}

if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

console.log('\n🔍 AI Integrity Content Quality Checker');
console.log(`   Same standard as The Digital Law Firm chapter_quality_agent\n`);

const allReports: string[] = [];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.log(`   ❌ NOT FOUND: ${target}`);
    continue;
  }

  const raw = fs.readFileSync(target, 'utf8');
  // Strip JSX/TSX tags for plain text analysis
  const text = raw
    .replace(/<[^>]+>/g, ' ')           // strip JSX tags
    .replace(/\{[^}]+\}/g, ' ')         // strip JSX expressions
    .replace(/import[^;]+;/g, '')       // strip imports
    .replace(/export\s+(default\s+)?/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length < 100) {
    console.log(`   ⚠️  Too short to analyse: ${path.basename(target)}`);
    continue;
  }

  const report = buildReport(target, text);
  allReports.push(report);

  // Print verdict line
  const verdict = report.includes('✅ READY') ? '✅ READY' :
                  report.includes('❌ BLOCKED') ? '❌ BLOCKED' : '⚠️ NEEDS WORK';
  console.log(`   ${verdict.padEnd(20)} ${path.basename(target)}`);
}

const combined = allReports.join('\n\n---\n\n');
const reportPath = path.join(REPORTS_DIR, `QUALITY_${date}.md`);
fs.writeFileSync(reportPath, combined, 'utf8');
console.log(`\n📄 Full report: ${reportPath}`);
