# Superpowers 中文版 — Antigravity 安裝指南

在 [Google Antigravity](https://antigravity.google)（Google AI IDE）中使用 superpowers-zh 的完整指南。

## 快速安裝

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.antigravity/` 目錄並將 skills 複製到該目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
mkdir -p /your/project/.antigravity/skills
cp -r superpowers-zh/skills/* /your/project/.antigravity/skills/
```

## 工作原理

Antigravity 支援多種規則檔案格式：

| 檔案 | 優先級 | 說明 |
|------|--------|------|
| `GEMINI.md` | 最高 | Antigravity 專屬規則 |
| `AGENTS.md` | 中 | 通用規則（Antigravity、Cursor、Claude Code 共享） |
| `.antigravity/rules.md` | 中 | 專案級規則目錄 |
| `CLAUDE.md` | 低 | 也會被自動讀取 |

### 推薦配置方式

**方式一**：在專案根目錄建立 `GEMINI.md`：

```markdown
# GEMINI.md

使用 .antigravity/ 目錄下的 superpowers skills 來指導工作流程。
優先使用 brainstorming（腦力激盪）開始新任務。

Skills 列表參見 .antigravity/ 目錄。
```

**方式二**：在 `AGENTS.md` 中引用（多工具共享）：

```markdown
# AGENTS.md

本專案使用 superpowers-zh skills 框架。
Skills 位於 .antigravity/（Antigravity）或 .claude/skills/（Claude Code）目錄下。
```

### 工具映射

Antigravity 使用 Gemini 模型，工具名稱與 Claude Code 不同：

| Claude Code | Antigravity (Gemini) |
|-------------|---------------------|
| `Read` | `read_file` |
| `Write` | `write_file` |
| `Edit` | `replace` |
| `Bash` | `run_shell_command` |
| `Skill` | `activate_skill` |

Skills 中的 Claude Code 工具名稱會被 Antigravity 自動適配。

## 使用

Antigravity 支援 Agent Manager 並行執行多個 agent：
- 與 superpowers-zh 的「派遣並行 Agent」skill 理念一致
- 可以同時調度多個 skill 處理不同任務

## 全域規則

個人級別的全域規則放在：
```
~/.gemini/GEMINI.md
~/.gemini/AGENTS.md
```

## 更新

```bash
cd /your/project
npx superpowers-zh
```

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- Antigravity 文件：https://antigravity.google/docs/rules-workflows
