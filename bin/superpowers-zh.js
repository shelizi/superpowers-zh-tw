#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, lstatSync, realpathSync, rmSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

// 手動遞迴複製：跨 Node 版本和作業系統行為一致
// 不使用 cpSync —— 在 Windows + npx 快取（含 junction）+ Node 16.7-18 下不穩定
function copyDirSync(src, dest) {
  // 解析 junction/symlink，避免 Windows npx 快取路徑下 readdir 返回空
  let realSrc = src;
  try { realSrc = realpathSync(src); } catch {}

  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(realSrc, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const srcPath = join(realSrc, entry.name);
    const destPath = join(dest, entry.name);
    let stat;
    try { stat = lstatSync(srcPath); } catch { continue; }
    if (stat.isSymbolicLink()) {
      // 取消引用後按實際類型處理
      try {
        const real = realpathSync(srcPath);
        const realStat = lstatSync(real);
        if (realStat.isDirectory()) copyDirSync(real, destPath);
        else copyFileSync(real, destPath);
      } catch {}
    } else if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else if (stat.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
const SKILLS_SRC = resolve(__dirname, '..', 'skills');
const PROJECT_DIR = process.cwd();

// 歷史遺留 agent 檔名 — 用於 --uninstall 清理已裝使用者機器上的殘留。
// 上游 v5.1.0 把 agents/code-reviewer.md 上升進 requesting-code-review skill，
// agents/ 目錄已刪，但舊版本裝過的使用者機器上仍有殘留檔案需要清理。
const LEGACY_AGENT_FILENAMES = ['code-reviewer.md'];

const TARGETS = [
  { name: 'Claude Code',   dir: '.claude/skills',           detect: '.claude' },
  { name: 'Cursor',        dir: '.cursor/skills',           detect: ['.cursor', '.cursorrules'] },
  { name: 'Codex CLI',     dir: '.codex/skills',            detect: '.codex' },
  { name: 'Kiro',          dir: '.kiro/steering',            detect: '.kiro' },
  { name: 'DeerFlow',      dir: 'skills/custom',             detect: 'deer_flow' },
  { name: 'Trae',          dir: '.trae/skills',              detect: '.trae' },
  { name: 'Antigravity',   dir: '.antigravity/skills',       detect: '.antigravity' },
  { name: 'VS Code',       dir: '.github/superpowers',       detect: '.github/copilot-instructions.md' },
  { name: 'OpenClaw',      dir: 'skills',                     detect: '.openclaw' },
  { name: 'Windsurf',      dir: '.windsurf/skills',          detect: '.windsurf' },
  { name: 'Gemini CLI',    dir: '.gemini/skills',            detect: 'GEMINI.md' },
  { name: 'Aider',         dir: '.aider/skills',             detect: '.aider' },
  { name: 'OpenCode',      dir: '.opencode/skills',          detect: '.opencode' },
  { name: 'Qwen Code',     dir: '.qwen/skills',             detect: '.qwen' },
  { name: 'Hermes Agent',  dir: '.hermes/skills',            detect: ['.hermes', 'HERMES.md', '.hermes.md'] },
  { name: 'Claw Code',     dir: '.claw/skills',              detect: ['.claw', 'CLAW.md'] },
];

function countDirs(dir) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).length;
}

function scanSkillEntries(skillsDir) {
  const entries = [];
  if (!existsSync(skillsDir)) return entries;
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillFile = resolve(skillsDir, entry.name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;
    const content = readFileSync(skillFile, 'utf8');
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const nameMatch = fmMatch[1].match(/^name:\s*(.+)$/m);
    const descMatch = fmMatch[1].match(/^description:\s*["']?(.+?)["']?\s*$/m);
    if (nameMatch) {
      entries.push({
        name: nameMatch[1].trim(),
        desc: descMatch ? descMatch[1].trim() : '',
      });
    }
  }
  return entries;
}

// 段落哨兵：v1.2.1+ 安裝時把追加內容包在兩條 HTML 註釋之間，
// 讓解除安裝可以精確切除，無需依賴標題層級猜測段尾。
const SENTINEL_BEGIN = '<!-- superpowers-zh:begin (do not edit between these markers) -->';
const SENTINEL_END = '<!-- superpowers-zh:end -->';

function wrapWithSentinel(body) {
  return `${SENTINEL_BEGIN}\n${body.replace(/\n+$/, '')}\n${SENTINEL_END}\n`;
}

function generateTraeBootstrapRule(projectDir) {
  const rulesDir = resolve(projectDir, '.trae', 'rules');
  mkdirSync(rulesDir, { recursive: true });

  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillTable = skillEntries.map(s => `| ${s.name} | ${s.desc} |`).join('\n');

  const rule = `---
alwaysApply: true
---

# Superpowers-ZH 中文增强版

你已載入 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 可用 Skills

Skills 位於 \`.trae/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

| Skill | 觸發條件 |
|-------|---------|
${skillTable}

## 如何使用

當任務匹配某個 skill 的觸發條件時，讀取對應的 \`.trae/skills/<skill-name>/SKILL.md\` 並嚴格遵循其流程。
`;

  const rulePath = resolve(rulesDir, 'superpowers-zh.md');
  writeFileSync(rulePath, rule, 'utf8');
  console.log(`  ✅ Trae: bootstrap rule -> ${rulePath}`);
}

function generateAntigravityBootstrap(projectDir) {
  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillList = skillEntries.map(s => `- **${s.name}**: ${s.desc}`).join('\n');

  const content = `# Superpowers-ZH 中文增强版

本專案已安裝 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 可用 Skills

Skills 位於 \`.antigravity/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

${skillList}

## 如何使用

當任務匹配某個 skill 時，讀取對應的 \`.antigravity/skills/<skill-name>/SKILL.md\` 並嚴格遵循其流程。
`;

  // 写入 .antigravity/rules.md（不覆盖用户已有的 GEMINI.md / AGENTS.md）
  const rulePath = resolve(projectDir, '.antigravity', 'rules.md');
  writeFileSync(rulePath, content, 'utf8');
  console.log(`  ✅ Antigravity: bootstrap rule -> ${rulePath}`);
}

function generateAiderBootstrap(projectDir) {
  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillList = skillEntries.map(s => `- **${s.name}**: ${s.desc}`).join('\n');

  const content = `# Superpowers-ZH 工作方法论

本專案已安裝 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 可用 Skills

Skills 位於 \`.aider/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

${skillList}

## 如何使用

當任務匹配某個 skill 時，讀取對應的 \`.aider/skills/<skill-name>/SKILL.md\` 並嚴格遵循其流程。
`;

  // 寫入 CONVENTIONS.md（Aider 原生支援自動載入此檔案）
  // 如果已有 CONVENTIONS.md，追加而不覆盖
  const convPath = resolve(projectDir, 'CONVENTIONS.md');
  if (existsSync(convPath)) {
    const existing = readFileSync(convPath, 'utf8');
    if (!existing.includes('superpowers-zh')) {
      writeFileSync(convPath, existing.replace(/\s+$/, '') + '\n\n' + wrapWithSentinel(content), 'utf8');
      console.log(`  ✅ Aider: 追加 skills 引用 -> ${convPath}`);
    } else {
      console.log(`  ✅ Aider: CONVENTIONS.md 已包含 superpowers-zh 引用`);
    }
  } else {
    writeFileSync(convPath, wrapWithSentinel(content), 'utf8');
    console.log(`  ✅ Aider: bootstrap -> ${convPath}`);
  }
}

function generateGeminiBootstrap(projectDir) {
  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillList = skillEntries.map(s => `- **${s.name}**: ${s.desc}`).join('\n');

  const content = `# Superpowers-ZH 中文增强版

本專案已安裝 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 可用 Skills

Skills 位於 \`.gemini/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

${skillList}

## 如何使用

當任務匹配某個 skill 時，讀取對應的 \`.gemini/skills/<skill-name>/SKILL.md\` 並嚴格遵循其流程。
`;

  // 写入 GEMINI.md（如果已存在则追加）
  const geminiPath = resolve(projectDir, 'GEMINI.md');
  if (existsSync(geminiPath)) {
    const existing = readFileSync(geminiPath, 'utf8');
    if (!existing.includes('superpowers-zh')) {
      writeFileSync(geminiPath, existing.replace(/\s+$/, '') + '\n\n' + wrapWithSentinel(content), 'utf8');
      console.log(`  ✅ Gemini CLI: 追加 skills 引用 -> ${geminiPath}`);
    } else {
      console.log(`  ✅ Gemini CLI: GEMINI.md 已包含 superpowers-zh 引用`);
    }
  } else {
    writeFileSync(geminiPath, wrapWithSentinel(content), 'utf8');
    console.log(`  ✅ Gemini CLI: bootstrap -> ${geminiPath}`);
  }
}

function generateHermesBootstrap(projectDir) {
  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillList = skillEntries.map(s => `- **${s.name}**: ${s.desc}`).join('\n');

  const content = `# Superpowers-ZH 中文增强版

本專案已安裝 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 工具映射

技能中引用的 Claude Code 工具名稱對應 Hermes Agent 的等價工具：
- \`Read\` → \`read_file\`
- \`Write\` → \`write_file\`
- \`Edit\` → \`patch\`
- \`Bash\` → \`terminal\`
- \`Grep\` / \`Glob\` → \`search_files\`
- \`Skill\` → \`skill_view\`
- \`Task\`（子智能体） → \`delegate_task\`
- \`WebSearch\` → \`web_search\`
- \`WebFetch\` → \`web_extract\`
- \`TodoWrite\` → \`todo\`

## 可用 Skills

Skills 位於 \`.hermes/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

${skillList}

## 如何使用

當任務匹配某個 skill 時，使用 \`skill_view\` 載入對應 skill 並嚴格遵循其流程。
`;

  // 写入 HERMES.md（如果已存在则追加）
  const hermesPath = resolve(projectDir, 'HERMES.md');
  if (existsSync(hermesPath)) {
    const existing = readFileSync(hermesPath, 'utf8');
    if (!existing.includes('superpowers-zh')) {
      writeFileSync(hermesPath, existing.replace(/\s+$/, '') + '\n\n' + wrapWithSentinel(content), 'utf8');
      console.log(`  ✅ Hermes Agent: 追加 skills 引用 -> ${hermesPath}`);
    } else {
      console.log(`  ✅ Hermes Agent: HERMES.md 已包含 superpowers-zh 引用`);
    }
  } else {
    writeFileSync(hermesPath, wrapWithSentinel(content), 'utf8');
    console.log(`  ✅ Hermes Agent: bootstrap -> ${hermesPath}`);
  }
}

function generateClaudeCodeBootstrap(projectDir) {
  const skillEntries = scanSkillEntries(SKILLS_SRC);
  const skillList = skillEntries.map(s => `- **${s.name}**: ${s.desc}`).join('\n');

  const content = `# Superpowers-ZH 中文增强版

本專案已安裝 superpowers-zh 技能框架（${skillEntries.length} 個 skills）。

## 核心规则

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證指令

## 可用 Skills

Skills 位於 \`.claude/skills/\` 目錄，每個 skill 有獨立的 \`SKILL.md\` 檔案。

${skillList}

## 如何使用

當任務匹配某個 skill 時，使用 \`Skill\` 工具載入對應 skill 並嚴格遵循其流程。絕不要用 Read 工具讀取 SKILL.md 檔案。

如果你認為哪怕只有 1% 的可能性某個 skill 適用於你正在做的事情，你必須呼叫該 skill 檢查。
`;

  const mdPath = resolve(projectDir, 'CLAUDE.md');
  if (existsSync(mdPath)) {
    const existing = readFileSync(mdPath, 'utf8');
    if (!existing.includes('superpowers-zh')) {
      writeFileSync(mdPath, existing.replace(/\s+$/, '') + '\n\n' + wrapWithSentinel(content), 'utf8');
      console.log(`  ✅ Claude Code: 追加 skills 引用 -> ${mdPath}`);
    } else {
      console.log(`  ✅ Claude Code: CLAUDE.md 已包含 superpowers-zh 引用`);
    }
  } else {
    writeFileSync(mdPath, wrapWithSentinel(content), 'utf8');
    console.log(`  ✅ Claude Code: bootstrap -> ${mdPath}`);
  }
}

// 工具名稱別名映射（使用者輸入 -> TARGETS.name）
const TOOL_ALIASES = {
  'claude':       'Claude Code',
  'claude-code':  'Claude Code',
  'claudecode':   'Claude Code',
  'copilot':      'Claude Code',
  'copilot-cli':  'Claude Code',
  'cursor':       'Cursor',
  'codex':        'Codex CLI',
  'kiro':         'Kiro',
  'deerflow':     'DeerFlow',
  'trae':         'Trae',
  'antigravity':  'Antigravity',
  'vscode':       'VS Code',
  'vs-code':      'VS Code',
  'openclaw':     'OpenClaw',
  'windsurf':     'Windsurf',
  'gemini':       'Gemini CLI',
  'gemini-cli':   'Gemini CLI',
  'aider':        'Aider',
  'opencode':     'OpenCode',
  'qwen':         'Qwen Code',
  'qwen-code':    'Qwen Code',
  'hermes':       'Hermes Agent',
  'hermes-agent': 'Hermes Agent',
  'claw':         'Claw Code',
  'claw-code':    'Claw Code',
  'clawcode':     'Claw Code',
};

function showHelp() {
  const toolNames = [...new Set(Object.values(TOOL_ALIASES))];
  console.log(`
  superpowers-zh v${PKG.version} — AI 编程超能力中文版

  用法：
    npx superpowers-zh                   自動偵測工具並安裝
    npx superpowers-zh --tool cursor     指定工具安裝（偵測不到時使用）
    npx superpowers-zh --uninstall       解除安裝當前目錄下的 superpowers-zh
    npx superpowers-zh --force           允許在使用者主目錄(~)安裝（預設拒絕）
    npx superpowers-zh --help            顯示說明
    npx superpowers-zh --version         顯示版本

  支援的工具名稱：
    ${Object.keys(TOOL_ALIASES).join(', ')}

  說明：
    自動偵測當前專案使用的 AI 程式設計工具，將 ${countDirs(SKILLS_SRC)} 個 skills 安裝到對應目錄。
    如果自動偵測不到，請用 --tool 指定你的工具，例如：
      npx superpowers-zh --tool cursor
      npx superpowers-zh --tool trae

    誤裝到主目錄可以這樣清理：
      cd ~ && npx superpowers-zh --uninstall

  專案：https://github.com/jnMetaCode/superpowers-zh
`);
}

function installForTarget(target) {
  const dest = resolve(PROJECT_DIR, target.dir);
  const srcCount = countDirs(SKILLS_SRC);
  mkdirSync(dest, { recursive: true });
  copyDirSync(SKILLS_SRC, dest);
  const totalAfter = countDirs(dest);
  if (srcCount > 0 && totalAfter === 0) {
    throw new Error(
      `複製 skills 失敗：來源目錄 ${SKILLS_SRC} 有 ${srcCount} 個 skill，但目標 ${dest} 為空。` +
      `\n  這通常是 npx 快取目錄權限或路徑問題。請嘗試：\n` +
      `    1. 清理快取後重試: npm cache clean --force && npx superpowers-zh\n` +
      `    2. 或全域安裝: npm i -g superpowers-zh && superpowers-zh\n` +
      `    3. 或手動克隆複製: 見 https://github.com/jnMetaCode/superpowers-zh#方式二手動安裝`
    );
  }
  console.log(`  ✅ ${target.name}: ${srcCount} 個 skills -> ${dest}`);

  if (target.name === 'Trae') {
    generateTraeBootstrapRule(PROJECT_DIR);
  }

  if (target.name === 'Antigravity') {
    generateAntigravityBootstrap(PROJECT_DIR);
  }

  if (target.name === 'Aider') {
    generateAiderBootstrap(PROJECT_DIR);
  }

  if (target.name === 'Gemini CLI') {
    generateGeminiBootstrap(PROJECT_DIR);
  }

  if (target.name === 'Hermes Agent') {
    generateHermesBootstrap(PROJECT_DIR);
  }

  if (target.name === 'Claude Code') {
    generateClaudeCodeBootstrap(PROJECT_DIR);
  }
}

function isHomeDir(p) {
  const home = homedir();
  if (!home) return false;
  try {
    return realpathSync(p) === realpathSync(home);
  } catch { return resolve(p) === resolve(home); }
}

// 解除安裝支援：完整刪除的 bootstrap 檔案、需要清理段落的 bootstrap 檔案
const BOOTSTRAP_DELETE = [
  '.trae/rules/superpowers-zh.md',
  '.antigravity/rules.md',
];
const BOOTSTRAP_CLEAN_SECTION = [
  'CLAUDE.md',
  'GEMINI.md',
  'HERMES.md',
  'CONVENTIONS.md',
];
const BOOTSTRAP_SECTION_MARKERS = [
  '# Superpowers-ZH 中文增强版',
  '# Superpowers-ZH 工作方法论',
];

// v1.1.x 安裝的舊 bootstrap 沒有 sentinel，只能憑模板末尾固定句子識別段尾。
// 這些短語必須出現在 superpowers 段最後一行，且足夠獨特不易在使用者內容裡重合。
const FALLBACK_TAIL_HINTS = [
  '你必须调用该 skill 检查。',
  '严格遵循其流程。',
];

function writeOrDelete(filePath, head, tail) {
  const headTrim = head.replace(/\s+$/, '');
  const tailTrim = tail.replace(/^\s+/, '');
  let body = headTrim;
  if (headTrim && tailTrim) body += '\n\n' + tailTrim;
  else body += tailTrim;
  body = body.replace(/\s+$/, '');
  if (body.length === 0) {
    rmSync(filePath);
  } else {
    writeFileSync(filePath, body + '\n', 'utf8');
  }
}

function cleanBootstrapSection(filePath) {
  if (!existsSync(filePath)) return false;
  const content = readFileSync(filePath, 'utf8');

  // 1. 哨兵模式（v1.2.1+）— 精確切除
  const sBegin = content.indexOf(SENTINEL_BEGIN);
  if (sBegin !== -1) {
    const sEnd = content.indexOf(SENTINEL_END, sBegin + SENTINEL_BEGIN.length);
    if (sEnd !== -1) {
      writeOrDelete(filePath, content.slice(0, sBegin), content.slice(sEnd + SENTINEL_END.length));
      return true;
    }
  }

  // 2. 標題 marker（v1.1.x 安裝的）— 找下一個 \n# 一級標題做段尾
  let idx = -1;
  for (const marker of BOOTSTRAP_SECTION_MARKERS) {
    const i = content.indexOf(marker);
    if (i !== -1 && (idx === -1 || i < idx)) idx = i;
  }
  if (idx === -1) return false;

  let end = -1;
  const nextHeading = content.indexOf('\n# ', idx + 1);
  if (nextHeading !== -1) end = nextHeading + 1;

  // 3. 一級標題找不到 — 用末尾固定短語做兜底
  if (end === -1) {
    for (const hint of FALLBACK_TAIL_HINTS) {
      const i = content.lastIndexOf(hint);
      if (i > idx) {
        const nl = content.indexOf('\n', i + hint.length);
        const after = nl !== -1 ? nl + 1 : content.length;
        if (after > end) end = after;
      }
    }
  }

  // 4. 都找不到 — 資料安全，跳過 + 警告
  if (end === -1) {
    console.warn(`  ⚠️  ${filePath}: 無法可靠識別 superpowers-zh 段尾，已跳過以避免資料遺失。`);
    console.warn(`     請手動編輯此檔案並刪除以 "${BOOTSTRAP_SECTION_MARKERS[0]}" 開頭的整段。`);
    return false;
  }

  writeOrDelete(filePath, content.slice(0, idx), content.slice(end));
  return true;
}

function uninstallForTarget(target, srcSkillNames) {
  const dest = resolve(PROJECT_DIR, target.dir);
  if (!existsSync(dest)) return 0;
  let removed = 0;
  for (const entry of readdirSync(dest, { withFileTypes: true })) {
    if (entry.isDirectory() && srcSkillNames.has(entry.name)) {
      rmSync(resolve(dest, entry.name), { recursive: true, force: true });
      removed++;
    }
  }
  // 如果目錄已空（或僅剩 .DS_Store），順手清掉，避免留下空骨架
  try {
    if (existsSync(dest)) {
      const left = readdirSync(dest).filter(n => n !== '.DS_Store');
      if (left.length === 0) rmSync(dest, { recursive: true, force: true });
    }
  } catch {}
  return removed;
}

function uninstall() {
  console.log(`\n  superpowers-zh v${PKG.version} — 解除安裝\n`);
  console.log(`  目標專案: ${PROJECT_DIR}\n`);

  if (!existsSync(SKILLS_SRC)) {
    console.error('  ❌ 錯誤：skills 來源目錄不存在，無法識別要解除安裝的 skill 名單。');
    process.exit(1);
  }

  const srcSkillNames = new Set(
    readdirSync(SKILLS_SRC, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name)
  );

  let totalSkills = 0;
  for (const target of TARGETS) {
    const removed = uninstallForTarget(target, srcSkillNames);
    if (removed > 0) {
      console.log(`  ✅ ${target.name}: 移除 ${removed} 個 skills <- ${resolve(PROJECT_DIR, target.dir)}`);
      totalSkills += removed;
    }
  }

  // 清理 .claude/agents 下舊版本裝過的 legacy agent（v1.2.x 及之前會裝 code-reviewer.md，
  // v1.3.0 起跟隨上游 v5.1.0 移除）。即使 agents/ 來源目錄已刪，已裝使用者跑 --uninstall 仍應能清乾淨。
  const agentsDest = resolve(PROJECT_DIR, '.claude', 'agents');
  if (existsSync(agentsDest)) {
    let agentsRemoved = 0;
    for (const entry of readdirSync(agentsDest)) {
      if (LEGACY_AGENT_FILENAMES.includes(entry)) {
        rmSync(resolve(agentsDest, entry), { recursive: true, force: true });
        agentsRemoved++;
      }
    }
    if (agentsRemoved > 0) console.log(`  ✅ Claude Code agents: 移除 ${agentsRemoved} 個舊版殘留 -> ${agentsDest}`);
    try {
      const left = readdirSync(agentsDest).filter(n => n !== '.DS_Store');
      if (left.length === 0) rmSync(agentsDest, { recursive: true, force: true });
    } catch {}
  }

  let bootstrapsRemoved = 0;
  for (const rel of BOOTSTRAP_DELETE) {
    const full = resolve(PROJECT_DIR, rel);
    if (existsSync(full)) {
      rmSync(full);
      console.log(`  ✅ 删除 bootstrap: ${full}`);
      bootstrapsRemoved++;
    }
  }
  for (const rel of BOOTSTRAP_CLEAN_SECTION) {
    const full = resolve(PROJECT_DIR, rel);
    if (cleanBootstrapSection(full)) {
      console.log(`  ✅ 清理 bootstrap: ${full}`);
      bootstrapsRemoved++;
    }
  }

  if (totalSkills === 0 && bootstrapsRemoved === 0) {
    console.log('  ⚠️  未在當前目錄找到 superpowers-zh 安裝痕跡。');
  } else {
    console.log(`\n  解除安裝完成。共移除 ${totalSkills} 個 skill 目錄、${bootstrapsRemoved} 個 bootstrap 檔案。\n`);
  }
}

function install(forceToolName, force) {
 try {
  console.log(`\n  superpowers-zh v${PKG.version} — AI 程式設計超能力中文版\n`);

  if (!existsSync(SKILLS_SRC)) {
    console.error('  ❌ 錯誤：skills 來源目錄不存在，請重新安裝 superpowers-zh。');
    process.exit(1);
  }

  if (!force && isHomeDir(PROJECT_DIR)) {
    console.error(
`  ⚠️  當前目錄是使用者主目錄: ${PROJECT_DIR}

  superpowers-zh 應該裝到具體專案目錄，而不是 ~/。
  在主目錄安裝會把 skills 和 bootstrap 檔案（CLAUDE.md / HERMES.md 等）
  寫入你的 home，污染所有專案。

  請先 cd 到專案目錄：
    cd /path/to/your/project
    npx superpowers-zh

  如果你確實要在主目錄安裝（不推薦），加 --force：
    npx superpowers-zh --force

  如果你已經在主目錄誤裝過，可以用 --uninstall 清理：
    npx superpowers-zh --uninstall
`);
    process.exit(1);
  }

  console.log(`  源: ${countDirs(SKILLS_SRC)} 個 skills`);
  console.log(`  目標專案: ${PROJECT_DIR}\n`);

  // --tool 指定安裝
  if (forceToolName) {
    const target = TARGETS.find(t => t.name === forceToolName);
    if (!target) {
      console.error(`  ❌ 未知工具: ${forceToolName}`);
      process.exit(1);
    }
    installForTarget(target);
    console.log('\n  安裝完成！重新啟動你的 AI 程式設計工具即可生效。\n');
    return;
  }

  // 自動偵測
  let installed = 0;

  for (const target of TARGETS) {
    const detects = Array.isArray(target.detect) ? target.detect : [target.detect];
    const found = detects.some(d => existsSync(resolve(PROJECT_DIR, d)));
    if (found) {
      installForTarget(target);
      installed++;
    }
  }

  if (installed === 0) {
    console.log('  ⚠️  未偵測到任何已知的 AI 程式設計工具。\n');
    console.log('  如果你使用的是 Cursor、Trae 等工具，請用 --tool 指定：');
    console.log('    npx superpowers-zh --tool cursor');
    console.log('    npx superpowers-zh --tool trae\n');
    console.log('  現在將預設安裝到 .claude/skills/（相容 Claude Code / OpenClaw）\n');

    const dest = resolve(PROJECT_DIR, '.claude', 'skills');
    mkdirSync(dest, { recursive: true });
    copyDirSync(SKILLS_SRC, dest);
    console.log(`  ✅ 預設安裝: ${countDirs(dest)} 個 skills -> ${dest}`);

    generateClaudeCodeBootstrap(PROJECT_DIR);
  }

  console.log('\n  安裝完成！重新啟動你的 AI 程式設計工具即可生效。\n');
 } catch (err) {
    console.error(`  ❌ 安裝失敗：${err.message}`);
    process.exit(1);
 }
}

const args = process.argv.slice(2);
const helpIdx = args.findIndex(a => a === '--help' || a === '-h');
const versionIdx = args.findIndex(a => a === '--version' || a === '-v');
const toolIdx = args.findIndex(a => a === '--tool' || a === '-t');
const uninstallIdx = args.findIndex(a => a === '--uninstall' || a === '-u');
const forceIdx = args.findIndex(a => a === '--force' || a === '-f');
const force = forceIdx !== -1;

if (helpIdx !== -1) {
  showHelp();
} else if (versionIdx !== -1) {
  console.log(PKG.version);
} else if (uninstallIdx !== -1) {
  uninstall();
} else if (toolIdx !== -1) {
  const toolArg = args[toolIdx + 1];
  if (!toolArg) {
    console.error('  ❌ --tool 需要指定工具名稱，例如: --tool cursor\n');
    showHelp();
    process.exit(1);
  }
  const toolName = TOOL_ALIASES[toolArg.toLowerCase()];
  if (!toolName) {
    console.error(`  ❌ 未知工具: ${toolArg}`);
    console.error(`  支援的工具: ${Object.keys(TOOL_ALIASES).join(', ')}\n`);
    process.exit(1);
  }
  install(toolName, force);
} else if (args.length > 0 && args[0].startsWith('-') && forceIdx === -1) {
  console.warn(`  未知參數: ${args[0]}\n`);
  showHelp();
  process.exit(1);
} else {
  install(undefined, force);
}
