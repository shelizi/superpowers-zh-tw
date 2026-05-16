# Superpowers-ZH 中文版 Release Notes

> 本文件記錄 `jnMetaCode/superpowers-zh` 中文 fork 自身的 release 歷史。
>
> 上游 `obra/superpowers` 的英文 release notes 見 [`RELEASE-NOTES.md`](./RELEASE-NOTES.md)（原樣保留，未翻譯）。

---

## v1.4.0 (2026-05-12)

本版本核心目標：**修復全量品質審計發現的所有上游漂移 P0 缺陷**。改動全部是"主站有的同步過來"性質，不引入主站沒有的新功能。

### 🔴 上游同步：v5.0.6 brainstorm server 拆分（PR #30）

上游 v5.0.6（commit 9e3ed21）把 brainstorm server 的內容目錄拆成 `CONTENT_DIR` + `STATE_DIR` peer 結構，但我們的 server 腳本還停在舊 `SCREEN_DIR` 單目錄版本，導致 visual brainstorming 教程指向新路徑但 server 用舊結構卡死。

- `skills/brainstorming/scripts/server.cjs` — 81 行 cherry-pick 同步
- `skills/brainstorming/scripts/start-server.sh` — 36 行同步
- `skills/brainstorming/scripts/stop-server.sh` — 29 行同步

**修復後：所有 visual brainstorming 使用者路徑解析正常。**

### 🔴 上游同步：v5.1.0 Code Review 整合（PR #30）

上游 v5.1.0 PR #1299 把 reviewer persona + checklist + dispatch 範本整合到單一 `code-reviewer.md` 實作 self-contained，並把 SKILL.md 裡的 `superpowers:code-reviewer` 命名子代理引用改成 `general-purpose` Task + 範本路徑形式。我們的版本停留在 v5.0.x 拆分式。

- `skills/requesting-code-review/SKILL.md` 改 4 處：3 處 `superpowers:code-reviewer` 引用清零；佔位符從 5 個精簡到 4 個對齊上游；"執行計畫" 整合段從 "每批（3 個任務）後審查" 改為 "每個任務完成後或在自然 checkpoint 審查"（對齊上游 v5.1.0 subagent 節奏調整）
- `skills/requesting-code-review/code-reviewer.md` 完整重寫為 v5.1.0 self-contained 版（H header 6/6 對齊上游）

**修復後：所有走 review 流程的使用者得到的指令指向 `general-purpose` Task 而非已廢棄的命名子代理。**

### 🔴 上游同步：v5.1.0 worktree 安全修復（PR #28）

上游 v5.1.0 [#991](https://github.com/obra/superpowers/issues/991) 修復了兩類 worktree 安全問題：subagent 巢狀建立 + cleanup 誤刪 harness-managed workspace。

- `skills/using-git-worktrees/SKILL.md` 全面重構：新增 Step 0 檢測現有隔離（GIT_DIR/GIT_COMMON + submodule 守衛 + 同意流程）；Step 1 重組為 1a Native Tools + 1b Git Worktree Fallback + 沙盒回退；刪除舊"範例工作流"段（含 `/Users/jesse` 硬編碼）
- `skills/finishing-a-development-branch/SKILL.md` 全面重構：新增 Step 2 檢測環境（三態表）；舊 Step 2-5 重編號為 3-6；Step 4 新增分離 HEAD 3 選項變體；Step 5 Option 1 重寫（MAIN_ROOT cwd safety + merge→verify→cleanup→delete 嚴格排序）；Step 6 清理範圍限定在 `.worktrees/` / `worktrees/` / `~/.config/superpowers/worktrees/`，外部 harness-managed workspace 一律不動

**修復後：subagent 不再巢狀建立 worktree；清理不會誤刪 harness-managed workspace。**

### 🔴 平台相容性修復：Windows Cursor hook 回歸（PR #30）

`hooks/hooks-cursor.json` 的 command 之前被本地改成直接調 unix shell `./hooks/session-start`，丟失上游的 polyglot wrapper `./hooks/run-hook.cmd session-start`，Windows + Cursor 組合使用者 hook 完全不觸發。

- 1 行恢復上游 polyglot wrapper

**修復後：Windows Cursor 使用者 hook 正常觸發。**

### 🆕 防回歸基建：CI 自動漂移檢測（PR #31）

新增 `scripts/audit.sh` + `.github/workflows/audit.yml`，每次 PR 自動跑 4 類共 90+ 項檢查：

1. 靜態校驗（JSON parse / SKILL.md frontmatter / symlink / hook 可執行性）
2. Installer 功能（17 款工具裝/重裝/卸載全跑）
3. 上游對齊（hooks 4 檔案 + brainstorm scripts 3 檔案 + 14 翻譯 skill 結構層級 + code-reviewer.md self-contained 結構）
4. 交叉引用（README → docs/ 連結 + skill 間引用 + 裝完後 .claude/skills/using-superpowers/SKILL.md 路徑解析）

WARN（不阻塞）vs FAIL（阻塞）分級：本次"4 個 P0 漂"事件如果當時有這個 audit 在 CI 跑，PR 階段就會被攔下。

**未來意義：維護者下次手抖把 `hooks-cursor.json` 改壞 / 上游同步漏一項，CI 立刻攔下。**

### 🔧 工具鏈小修

- `scripts/sync-plugin-version.js` 加入 `gemini-extension.json`（之前漏掉，導致 gemini extension manifest 卡在 1.1.6 老版本）
- `package.json` 的 `version` 鉤子 git add 列表同步更新

### 安裝路徑方針釐清

本版本明確：**有官方 plugin marketplace 的工具（Claude Code / Codex CLI / OpenCode / VS Code）首選 marketplace 路徑**，npx `superpowers-zh` 主要服務沒有 marketplace 的工具（Cursor / Trae / Kiro / Gemini CLI / Hermes / Aider / Antigravity / Windsurf / Qwen / Claw / OpenClaw / DeerFlow 共 13 款）。fork 不再嘗試給 marketplace 工具加 npx 路徑的"完整支援"——它們走主站路徑即可。

### 不在本版本範圍

- `executing-plans/SKILL.md` 我們擴寫了 105 行中文範例（主動選擇，保留——是 fork 的中文優化，非漂移）
- `using-superpowers/SKILL.md` 的"中國特色技能路由"段（fork 增量，保留）
- 各 reviewer-prompt.md 翻譯差異（結構對齊，純翻譯漂移，無行為 bug）
- open issues #18/#21/#26/#20（fork 增量需求，按方針延後）

### Refs

- PR #28（worktree 安全修復）
- PR #30（brainstorm scripts + code-reviewer 整合 + hooks-cursor + SKILL.md 引用）
- PR #31（audit script + CI workflow）
- issue #19 追蹤上游 v5.0.6 / v5.1.0 同步 → 關鍵項目全部覆蓋

---

## v1.3.0 (2026-05-10)

### 跟上游對齊 (v5.1.0)

- **同步上游 v5.1.0 的目錄變更**：上游主動刪除了 `commands/`（3 個 deprecated stub）和 `agents/code-reviewer.md`（已上升進 `requesting-code-review` skill）。中文 fork 跟隨刪除以與上游意圖對齊。詳見上游 [#1188](https://github.com/obra/superpowers/pull/1188) 與 PR #1299。
- **`bin/superpowers-zh.js`** 移除安裝時複製 `agents/` 到 `.claude/agents/` 的邏輯，**保留** uninstall 時的清理邏輯（用於已裝使用者清理殘留 `code-reviewer.md`，防止雙 source of truth）。
- **`.github/workflows/ci.yml`** 刪除 "Validate agents" 驗證段（`agents/` 已刪，驗證空目錄無意義）。

### 補齊上游遺漏的根級檔案

- **`CLAUDE.md`** —— 上游 contributor 指南（含 anti-slop-PR 規則）的中文翻譯，末尾追加中文 fork 自己的 PR 流程說明。
- **`AGENTS.md`** —— 軟連結 → `CLAUDE.md`（mode 120000，跟上游一致）。Codex CLI 等工具從 `AGENTS.md` 自動載入等同讀取 CLAUDE.md。
  - **Known limitation**：`npm pack` 預設不跟隨 symlink，因此 npm publish 出來的 tarball 不包含 AGENTS.md。這不影響實際使用：AGENTS.md 是 Codex CLI 在使用者自己專案目錄讀的檔案，不是從 `superpowers-zh` 安裝包讀的；透過 `git clone` 拿到倉庫的貢獻者會正確解析 symlink。
- **`RELEASE-NOTES.md`** —— 上游 release notes 原樣保留（英文版，1180 行）。
- **`RELEASE-NOTES.zh.md`** —— 本檔案，中文 fork 自身 release 記錄。
- **`.codex-plugin/plugin.json`** —— Codex CLI plugin manifest（中文版本地化：name/description/displayName 改為中文版，URL 指向 `jnMetaCode/superpowers-zh`）。
- **`.version-bump.json`** —— 上游版本管理設定檔。
- **`scripts/bump-version.sh`** —— 上游版本同步腳本（含 `--check` 漂移檢測、`--audit` 倉庫審計）。中文版 npm version 鉤子繼續用 `scripts/sync-plugin-version.js`，bump-version.sh 作為補充工具引入。
- **`assets/app-icon.png`** + **`assets/superpowers-small.svg`** —— Codex marketplace 需要的圖示資產。
- **4 個新增上游測試**：`tests/claude-code/test-requesting-code-review.sh`、`tests/claude-code/test-worktree-native-preference.sh`、`tests/opencode/test-bootstrap-caching.{mjs,sh}`。

### 主動修復上游 v5.1.0 的疏忽

- **`.cursor-plugin/plugin.json`** 刪除 dangling 的 `"agents": "./agents/"` 和 `"commands": "./commands/"` 兩行。上游 v5.1.0 刪了目錄但忘了同步清理 manifest（git blame 顯示這兩行從 2026-02-13 加入後從未更新）。中文 fork 主動修掉（向上游開 issue 是後續動作）。

### 修中文版自己的老漂移（PR #23）

- **`.claude-plugin/marketplace.json`** 的 `plugins[0].version` 卡在 `1.1.8` 的老漂移修復（追上其他 4 個 manifest，1.3.0 release 時統一升到 1.3.0）。原因是中文版簡化版 `sync-plugin-version.js` 之前只 match 頂層 `"version":` 欄位，跳過巢狀位置；導致 Claude Code marketplace 使用者看到的 plugin 版本一直停在 1.1.8，跟 npm 套件真實版本不同步。
- **`scripts/sync-plugin-version.js`** 增強為支援巢狀欄位路徑（`plugins.0.version`）。`TARGETS` 改為物件陣列 `{ path, field }`，對齊上游 `.version-bump.json` 格式。仍使用 regex 替換而非 JSON re-stringify，保留原檔案格式（縮排、行內/多行陣列等不被破壞）。

### 不引入

- 上游 `scripts/sync-to-codex-plugin.sh`（推 OpenAI Codex marketplace 用，硬編碼 `prime-radiant-inc/openai-codex-plugins`，中文版用不上）
- 配套測試 `tests/codex-plugin-sync/test-sync-to-codex-plugin.sh`

### 不動（中文版疊加層全部保留）

`bin/` + npx 流程、`docs/` 中文工具文件、4 個 `chinese-*` skill、`mcp-builder`、`workflow-runner`、`README.md` 主推 npx 路徑、`.codex/INSTALL.md`、`.opencode/INSTALL.md`、`.gemini/`、`scripts/sync-plugin-version.js` —— 這些是符合"保持上游主流程不變 + 中文版疊加新增"原則的中文 fork 沉澱，全部保留。

---

## v1.2.1 (2026-05-05)

### 修復

- **`--uninstall` 資料遺失邊界 case** —— 加哨兵註釋 + 保守 fallback，杜絕在某些路徑上誤刪使用者資料。

---

## v1.2.0 (2026-05-05)

### 新增

- **`--uninstall` 子命令** —— `npx superpowers-zh --uninstall` 一條命令清理已安裝的 skills（#17）。
- **HOME 目錄守衛** —— uninstall 時強校驗工作目錄非使用者 HOME，杜絕誤刪全域檔案。
- **計數顯示修復** —— 安裝後輸出實際安裝的 skill 數量（之前顯示固定值）。

---

## v1.1.9 (2026-04-28)

### 修復

- **Claude Code bootstrap 修復** —— npx 安裝到 CC 目標時自動補上 `CLAUDE.md` bootstrap，根治 skill 不觸發問題（#14）。

### 變更

- **Node 引擎要求** 提升到 `>=20`（Node 14/16/18 均已 EOL）。
- **README 重排**：相關專案表挪到顯眼位置；姊妹專案區塊獨立成"相關專案生態"章節，重點推廣 orchestrator。
- **QQ 群** 標識改為 QQ 2群。

---

## v1.1.8 (2026-04-19)

### 新增

- **Claw Code 支援**（第 17 款工具，Rust 版 AI CLI）—— auto-detect `.claw/` 或 `CLAW.md`，支援 `--tool claw/claw-code/clawcode`。
- **CNB（騰訊雲原生建構）平台適配** —— `chinese-git-workflow` skill 新增 CNB 章節，含 `.cnb.yml` CI 範例（#6）。

---

## v1.1.0 – v1.1.7 早期開發（2026-03 ~ 2026-04）

中文 fork 在這一時期完成了主要的多工具適配與中文化基建：

- 第 1 款 → 第 16 款工具陸續上線：Claude Code、Cursor、Codex CLI、Gemini CLI、Trae、VS Code (Copilot)、Antigravity、Hermes Agent、Copilot CLI、Windsurf、Aider、OpenCode、Qwen Code（通義靈碼）、Kiro、OpenClaw、DeerFlow 2.0
- 4 個中國原創 skill 沉澱：`chinese-code-review`、`chinese-commit-conventions`、`chinese-documentation`、`chinese-git-workflow`
- `mcp-builder`、`workflow-runner` 兩個補充 skill
- npx 一條命令自動偵測專案工具並安裝
- 跨平台相容性修復：Windows `cpSync` 問題、低版本 Node 相容、Antigravity/Aider/Gemini CLI 自動產生 bootstrap

---

## v1.0.0 (2026-03-09)

- 中文 fork 初始版本，基於上游 `obra/superpowers` v5.0.0 翻譯。
- 完整翻譯 14 個上游 skill。
- 首批支援 Claude Code 一種工具。
