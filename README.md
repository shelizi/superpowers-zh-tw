# superpowers-zh（AI 程式設計超能力 · 中文增強版）

🌐 **繁體中文** | [English (upstream)](https://github.com/obra/superpowers)

> 🦸 **superpowers（159k+ ⭐）完整繁中化 + 4 個台灣原創 skills** — 讓 Claude Code / Copilot CLI / Hermes Agent / Cursor / Windsurf / Kiro / Gemini CLI 等 **17 款 AI 程式設計工具**真正會幹活。從腦力激盪到程式碼審查，從 TDD 到除錯，每個 skill 都是經過實務驗證的工作方法論。

Chinese community edition of [superpowers](https://github.com/obra/superpowers) — 20 skills across 16 AI coding tools, including full translations and Taiwan-specific development skills.

<!-- 效果对比 -->
<table>
<tr><td>

**未安裝 superpowers-zh：**
```
你：給使用者模組加個批次匯出功能
AI：好的，我來實作...（直接開始寫程式碼）
    export async function exportUsers() { ... }
你：等等，格式不對，沒分頁，大量資料會 OOM...
```

</td><td>

**安裝了 superpowers-zh：**
```
你：給使用者模組加個批次匯出功能
AI：在開始實作之前，我需要了解幾個關鍵問題：
    1. 匯出格式是 CSV 還是 Excel？
    2. 預計資料量多大？需要非同步處理嗎？
    3. 有權限要求嗎？
    → 給出 2-3 個方案，確認後再動手
```

</td></tr>
</table>

[![GitHub stars](https://img.shields.io/github/stars/jnMetaCode/superpowers-zh?style=social)](https://github.com/jnMetaCode/superpowers-zh)
[![npm version](https://img.shields.io/npm/v/superpowers-zh)](https://www.npmjs.com/package/superpowers-zh)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

> 📖 **配套閱讀**：[《AI 程式設計實戰 · 方法論三卷書》](https://book.aibuzhiyu.com/) — 10 個 AI 程式設計工具完整教學 + 真實踩坑 · superpowers 安裝好之後，配上方法論效率翻倍 · 線上書 + PDF · 永久免費

### 📊 專案規模

| 📦 翻譯 Skills | 🇨🇳 台灣特色 Skills | 🤖 支援工具 |
|:---:|:---:|:---:|
| **14** | **6** | **Claude Code / Copilot CLI / Hermes Agent / Cursor / Windsurf / Kiro / Gemini CLI / Codex / Aider / Trae / VS Code (Copilot) / DeerFlow / OpenCode / OpenClaw / Qwen Code / Antigravity / Claw Code** |

---

## 這是什麼？

[superpowers](https://github.com/obra/superpowers) 是目前最熱門的 AI 程式設計 skills 框架（159k+ stars），為 AI 程式設計工具提供**系統化的工作方法論**。

**superpowers-zh** 在完整翻譯的基礎上，新增了面向台灣開發者的特色 skills。

### 🆚 與英文上游的區別（老被問，一次說清）

| 維度 | superpowers（英文上游） | superpowers-zh（中文增強版） |
|------|----------------------|---------------------------|
| ⭐ Star 數 | 159k+ | — |
| 📦 Skills 總數 | 14 | **20**（14 翻譯 + 4 台灣原創 + 2 上游歷史保留）
| 🌐 語言 | 英文 | 中文（技術術語保留英文）
| 🤖 **支援工具** | **6 款**：Claude Code / Cursor / Codex / OpenCode / Copilot CLI / Gemini CLI | **17 款**：上述 6 款 + Hermes Agent / Trae / Kiro / Qwen Code（通義靈碼）/ OpenClaw / Claw Code / Antigravity / DeerFlow / VS Code / Windsurf / Aider |
| ⚡ **安裝方式** | 按工具分別裝（每款一條不同的 plugin marketplace 命令） | **`npx superpowers-zh` 一條命令自動識別專案裡的工具並安裝**；識別不出可 `--tool <name>` 顯式指定
| 🇨🇳 Git 平台 | GitHub 為主 | GitHub + Gitee + Coding + 極狐 GitLab + **CNB（騰訊雲原生建置）**
| 🇨🇳 CI/CD 範例 | GitHub Actions | GitHub Actions + Gitee Go + Coding CI + 極狐 CI + `.cnb.yml`
| 🇨🇳 程式碼審查風格 | 西方直接風格 | 適配國內團隊溝通文化
| 🇨🇳 Git 提交規範 | 無 | Conventional Commits 中文適配
| 🇨🇳 中文文件規範 | 無 | 中文排版 + 中英混排規則 + 告別機翻味
| ➕ MCP 伺服器建置 | 無 | 獨立 `mcp-builder` skill
| ➕ 工作流執行器 | 無 | 獨立 `workflow-runner` skill（多角色 YAML 編排）
| 🔄 版本跟進 | 獨立迭代 | **同步上游 + 台灣增量疊加**
| 🤝 接受新 skill PR | 一般不接受（原文：*"we don't generally accept contributions of new skills"*） | 歡迎 PR（台灣開發者痛點優先）
| 💬 社群 | Discord | 微信公眾號「AI不止語」+ 微信群 + QQ 群
| 📜 License | MIT | MIT |

**一句話總結：** 英文上游 = 方法論內核；中文增強版 = 方法論內核 **+** 17 款工具一鍵適配 **+** 國內 Git/CI 生態 **+** 中文化表達習慣。

### 🤖 支援 17 款主流 AI 程式設計工具

| 工具 | 類型 | 一鍵安裝 | 手動安裝
|------|------|:---:|:---:|
| [Claude Code](https://claude.ai/code) | CLI | `npx superpowers-zh` | `.claude/skills/` |
| [Copilot CLI](https://githubnext.com/projects/copilot-cli) | CLI | `npx superpowers-zh --tool copilot` | `.claude/skills/` |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | CLI | `npx superpowers-zh --tool hermes` | `.hermes/skills/` |
| [Cursor](https://cursor.sh) | IDE | `npx superpowers-zh` | `.cursor/skills/` |
| [Windsurf](https://codeium.com/windsurf) | IDE | `npx superpowers-zh` | `.windsurf/skills/` |
| [Kiro](https://kiro.dev) | IDE | `npx superpowers-zh` | `.kiro/steering/` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | CLI | `npx superpowers-zh` | `.gemini/skills/` |
| [Codex CLI](https://github.com/openai/codex) | CLI | `npx superpowers-zh` | `.codex/skills/` |
| [Aider](https://aider.chat) | CLI | `npx superpowers-zh` | `.aider/skills/` |
| [Trae](https://trae.ai) | IDE | `npx superpowers-zh` | `.trae/skills/` + `.trae/rules/` |
| [VS Code](https://code.visualstudio.com) (Copilot) | IDE 插件 | `npx superpowers-zh` | `.github/superpowers/` |
| [DeerFlow 2.0](https://github.com/bytedance/deer-flow) | Agent 框架 | `npx superpowers-zh` | `skills/custom/` |
| [OpenCode](https://opencode.ai) | CLI | `npx superpowers-zh` | `.opencode/skills/` |
| [OpenClaw](https://github.com/anthropics/openclaw) | CLI | `npx superpowers-zh` | `skills/` |
| [Qwen Code](https://tongyi.aliyun.com/lingma) (通义灵码) | IDE 插件 | `npx superpowers-zh` | `.qwen/skills/` |
| [Antigravity](https://github.com/anthropics/antigravity) | CLI | `npx superpowers-zh` | `.antigravity/skills/` |
| [Claw Code](https://github.com/ultraworkers/claw-code) | CLI (Rust) | `npx superpowers-zh` | `.claw/skills/` |

> 執行 `npx superpowers-zh` 會自動檢測你專案中使用的工具，將 20 個 skills 安裝到正確位置。

### 翻譯的 Skills（14 個）

| Skill | 用途 |
|-------|------|
| **腦力激盪** (brainstorming) | 需求分析 → 設計規格，不寫程式碼先想清楚
| **撰寫計畫** (writing-plans) | 把規格拆成可執行的實施步驟
| **執行計畫** (executing-plans) | 按計畫逐步實施，每步驗證
| **測試驅動開發** (test-driven-development) | 嚴格 TDD：先寫測試，再寫程式碼
| **系統化除錯** (systematic-debugging) | 四階段除錯法：定位→分析→假設→修復
| **請求程式碼審查** (requesting-code-review) | 派遣審查 agent 檢查程式碼品質
| **接收程式碼審查** (receiving-code-review) | 技術嚴謹地處理審查回饋，拒絕敷衍
| **完成前驗證** (verification-before-completion) | 證據先行——聲稱完成前必須跑驗證
| **派遣並行 Agent** (dispatching-parallel-agents) | 多任務並行執行
| **子 Agent 驅動開發** (subagent-driven-development) | 每個任務一個 agent，兩輪審查
| **Git Worktree 使用** (using-git-worktrees) | 隔離式功能開發
| **完成開發分支** (finishing-a-development-branch) | 合併/PR/保留/丟棄四選一
| **撰寫 Skills** (writing-skills) | 建立新 skill 的方法論
| **使用 Superpowers** (using-superpowers) | 元技能：如何呼叫和優先使用 skills

### 🇨🇳 台灣特色 Skills（6 個）

> ⚠️ **下表前 4 個 chinese-\* 為「手動呼叫」skill**——不會自動觸發，需在對話中顯式輸入 `/chinese-xxx` 才會載入。
> 設計為參考資料而非工作流，避免污染上游 skill 的自動排程（如 `requesting-code-review`、`brainstorming` 等）。

| Skill | 用途 | 呼叫方式 | 上游有嗎？
|-------|------|---------|:---:|
| **中文程式碼審查** (chinese-code-review) | 符合國內團隊文化的程式碼審查規範 | `/chinese-code-review`（手動） | 無
| **中文 Git 工作流** (chinese-git-workflow) | 適配 Gitee/Coding/極狐 GitLab/CNB | `/chinese-git-workflow`（手動） | 無
| **中文技術文件** (chinese-documentation) | 中文排版規範、中英混排、告別機翻味 | `/chinese-documentation`（手動） | 無
| **中文提交規範** (chinese-commit-conventions) | 適配國內團隊的 commit message 規範 | `/chinese-commit-conventions`（手動） | 無
| **MCP 伺服器建置** (mcp-builder) | 建置生產級 MCP 工具，擴展 AI 能力邊界 | 自動 | 無
| **工作流執行器** (workflow-runner) | 在 AI 工具內執行多角色 YAML 工作流 | 自動 | 無

---

## 快速開始

### 方式一：npm 安裝（推薦）

```bash
cd /your/project
npx superpowers-zh
```

> ⚠️ **不要在主目錄（`~`）下跑**。v1.2.1 起會拒絕並提示，舊版本會把 skills 和 `CLAUDE.md` 等 bootstrap 檔案寫到你的 home 目錄，污染所有專案。如已誤裝見下文「解除安裝 / 誤裝清理」。

### 方式二：手動安裝（low-fidelity，僅作備選）

> ⚠️ **手動 `cp -r skills` 是低保版安裝，不等同於完整 plugin。**
>
> superpowers-zh 是一個完整 plugin，包含：`skills/`（20 個能力）+ `hooks/`（SessionStart 鉤子，讓 skill 在合適時機自動觸發）+ `CLAUDE.md` / `GEMINI.md` 等 bootstrap 引導檔案 + 4 套 plugin manifest（Claude Code / Cursor / Codex / Marketplace）。
>
> **下面的 `cp -r skills` 命令只複製 skills 目錄**，不會自動設定 hooks、不會產生 bootstrap 引導。結果：skills 實體上存在，但 AI 不會在合適時機自動呼叫，需要你每次手動喊 "use brainstorming skill" 之類。
>
> **強烈推薦用方式一 `npx superpowers-zh`** —— 它會一鍵處理 skills 複製 + bootstrap 產生 + hooks 設定 + 工具特定適配。僅在 npx 不可用（極端無網路環境）時才退到手動。

```bash
# 複製儲存庫
git clone https://github.com/jnMetaCode/superpowers-zh.git

# 複製 skills 到你的專案（選擇你使用的工具）
cp -r superpowers-zh/skills /your/project/.claude/skills      # Claude Code / Copilot CLI
cp -r superpowers-zh/skills /your/project/.hermes/skills      # Hermes Agent
cp -r superpowers-zh/skills /your/project/.cursor/skills      # Cursor
cp -r superpowers-zh/skills /your/project/.codex/skills       # Codex CLI
cp -r superpowers-zh/skills /your/project/.kiro/steering      # Kiro
cp -r superpowers-zh/skills /your/project/skills/custom       # DeerFlow 2.0
cp -r superpowers-zh/skills /your/project/.trae/rules         # Trae
cp -r superpowers-zh/skills /your/project/.antigravity        # Antigravity
cp -r superpowers-zh/skills /your/project/.github/superpowers # VS Code (Copilot)
cp -r superpowers-zh/skills /your/project/skills              # OpenClaw
cp -r superpowers-zh/skills /your/project/.windsurf/skills   # Windsurf
cp -r superpowers-zh/skills /your/project/.gemini/skills     # Gemini CLI
cp -r superpowers-zh/skills /your/project/.aider/skills      # Aider
cp -r superpowers-zh/skills /your/project/.opencode/skills   # OpenCode
cp -r superpowers-zh/skills /your/project/.qwen/skills       # Qwen Code
cp -r superpowers-zh/skills /your/project/.claw/skills       # Claw Code（Rust 版）
```

### 方式三：在設定檔中引用

根據你使用的工具，在對應設定檔中引用 skills：

| 工具 | 設定檔 | 說明
|------|---------|------|
| Claude Code | `CLAUDE.md` | 專案根目錄
| Copilot CLI | `CLAUDE.md` | 與 Claude Code 共用外掛格式
| Hermes Agent | `HERMES.md` 或 `.hermes.md` | 專案根目錄，安裝時自動產生
| Kiro | `.kiro/steering/*.md` | 支援 always/globs/手動三種模式
| DeerFlow 2.0 | `skills/custom/*/SKILL.md` | 位元組跳動開源 SuperAgent，自動發現自訂 skills
| Trae | `.trae/rules/project_rules.md` | 專案級規則
| Antigravity | `GEMINI.md` 或 `AGENTS.md` | 專案根目錄
| VS Code | `.github/copilot-instructions.md` | Copilot 自訂指令
| Cursor | `.cursor/rules/*.md` | 專案級規則目錄
| OpenClaw | `skills/*/SKILL.md` | 工作區級 skills 目錄，自動發現
| Windsurf | `.windsurf/skills/*/SKILL.md` | 專案級 skills 目錄
| Gemini CLI | `.gemini/skills/*/SKILL.md` | 專案級 skills 目錄
| Aider | `.aider/skills/*/SKILL.md` | 專案級 skills 目錄
| OpenCode | `.opencode/skills/*/SKILL.md` | 專案級 skills 目錄
| Hermes Agent | `.hermes/skills/*/SKILL.md` | 專案級 skills 目錄
| Qwen Code | `.qwen/skills/*/SKILL.md` | 專案級 skills 目錄
| Claw Code | `.claw/skills/*/SKILL.md` | Rust 版 CLI agent，相容 Claude Code 的 SKILL.md 格式

> **詳細安裝指南**：[Kiro](docs/README.kiro.md) · [DeerFlow](docs/README.deerflow.md) · [Trae](docs/README.trae.md) · [Antigravity](docs/README.antigravity.md) · [VS Code](docs/README.vscode.md) · [Codex](docs/README.codex.md) · [OpenCode](docs/README.opencode.md) · [OpenClaw](docs/README.openclaw.md) · [Windsurf](docs/README.windsurf.md) · [Gemini CLI](docs/README.gemini-cli.md) · [Aider](docs/README.aider.md) · [Qwen Code](docs/README.qwen.md) · [Hermes Agent](docs/README.hermes.md)

### 解除安裝 / 誤裝清理（v1.2.1+）

```bash
cd /your/project          # 或 cd ~ 如果誤裝到了主目錄
npx superpowers-zh@latest --uninstall
```

會做這些：

- 刪除所有裝過的 skill 目錄（`.claude/skills/`、`.trae/skills/` 等）
- 刪除獨立 bootstrap 檔案（`.trae/rules/superpowers-zh.md`、`.antigravity/rules.md`）
- 清理追加到 `CLAUDE.md` / `HERMES.md` / `GEMINI.md` / `CONVENTIONS.md` 裡的 superpowers-zh 段，**保留你自己寫的內容**

資料安全說明：v1.2.1 起，安裝會把追加內容包在 `<!-- superpowers-zh:begin/end -->` 哨兵註解之間，解除安裝按哨兵精確切除。識別不可靠時跳過 + 警告，**絕不會誤刪使用者內容**。

其他參數：

| 參數 | 用途
|---|---|
| `--tool <name>` | 自動檢測不到時顯式指定（cursor / trae / hermes / 等）
| `--force` | 允許在主目錄(~)安裝（預設拒絕，**不建議**）
| `--uninstall` | 解除安裝當前目錄下的 superpowers-zh
| `--help` / `--version` | 說明 / 版本

---

## 貢獻

歡迎參與！翻譯改進、新增 skills、Bug 修復都可以。

### 貢獻方向

我們只接收符合 superpowers 定位的 skill——**AI 程式設計工作流方法論**。好的 skill 應該：

- 教 AI 助手**怎麼幹活**，而不是某個框架/語言的教學
- 解決上游英文版不覆蓋的**台灣開發者痛點**
- 有明確的步驟、檢查清單、範例，AI 載入後能直接執行

歡迎提 Issue 討論你的想法！

---

## 交流 · Community

微信公眾號 **「AI不止語」**（微信搜尋 `AI_BuZhiYu`）— 技術問答 · 專案更新 · 實務文章

| 渠道 | 加入方式
|------|---------|
| QQ 2群 | [點擊加入](https://qm.qq.com/q/EeNQA9xCxy)（群號 1071280067）
| 微信群 | 關注公眾號後回覆「群」取得入群方式

---

## 🌟 相關專案生態

**五個專案組合使用，覆蓋 AI 程式設計從"方法論 → 角色 → 協作 → 教學 → 安全"的完整鏈路。**

| 專案 | 定位 | 一句話
|------|------|-------|
| **[superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)**（本專案） ![](https://img.shields.io/github/stars/jnMetaCode/superpowers-zh?style=flat&label=⭐) | 🧠 工作方法論 | 20 個 skills 教 AI 怎麼幹活（TDD / 除錯 / 程式碼審查等）
| **[agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh)** ![](https://img.shields.io/github/stars/jnMetaCode/agency-agents-zh?style=flat&label=⭐) | 🎭 專家角色庫 | 211 個**即插即用** AI 專家，含 46 台灣原創（小紅書 / 抖音 / 飛書 / 釘釘）
| **[agency-orchestrator](https://github.com/jnMetaCode/agency-orchestrator)** | 🚀 編排引擎 | 一句話 → 211 專家協作，**幾分鐘出方案**（9 家 LLM / 6 免費）
| **[ai-coding-guide](https://github.com/jnMetaCode/ai-coding-guide)** | 📖 實務教學 | 66 個 Claude Code 技巧 + 9 款工具最佳實踐 + 設定範本
| **[shellward](https://github.com/jnMetaCode/shellward)** | 🛡️ 安全中介軟體 | 8 層防禦 + DLP 資料流 + 注入偵測，**零相依性**（含 MCP Server）

---

### 🔥 重點推薦：[agency-orchestrator](https://github.com/jnMetaCode/agency-orchestrator) — 一句話排程 211 個 AI 專家協作，幾分鐘交付完整方案

以前寫個方案：你當指揮官，把 AI 輪流扮演 5 個角色，複製貼上 10 次，1 小時沒了。

**現在：** 丟一句話進去 `"做一個電商退款流程"`，**產品 → 架構 → 安全 → 測試 → DBA 自動接力**，幾分鐘完整方案落地。

- 🎭 **211+ 專家角色**（含 46 個台灣市場原創：小紅書 / 抖音 / 微信 / 飛書 / 釘釘）
- 🧩 **零程式碼 YAML**，一行 prompt 就能跑
- 💰 **9 家 LLM 可選**（DeepSeek / Claude / OpenAI / Ollama 等，**6 家免費）
- 🔗 **與 superpowers-zh 互補**：本專案管"**怎麼做**"（方法論），orchestrator 管"**誰來做**"（角色協作）

👉 **[立即體驗 agency-orchestrator →](https://github.com/jnMetaCode/agency-orchestrator)**

---

## 致謝

- 原始英文版：[obra/superpowers](https://github.com/obra/superpowers)（MIT 協議）
- 感謝 [@obra](https://github.com/obra) 建立了這個優秀的專案

---

## 授權

MIT License — 自由使用，商業或個人均可。

---

<div align="center">

**🦸 AI 程式設計超能力：讓 Claude Code / Hermes Agent / Cursor / Claw Code 等 17 款工具真正會幹活**

[Star 本專案](https://github.com/jnMetaCode/superpowers-zh) · [提交 Issue](https://github.com/jnMetaCode/superpowers-zh/issues) · [貢獻程式碼](https://github.com/jnMetaCode/superpowers-zh/pulls)

</div>
