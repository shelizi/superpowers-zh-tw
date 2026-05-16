# Superpowers 中文版 — OpenClaw 安裝指南

在 [OpenClaw](https://github.com/anthropics/openclaw) 中使用 superpowers-zh 的完整指南。

## 快速安裝

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.openclaw/` 目錄並將 skills 複製到 `skills/` 目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills/* /your/project/skills/
```

或安裝到全域（所有專案共享）：

```bash
cp -r superpowers-zh/skills/* ~/.openclaw/skills/
```

## 工作原理

OpenClaw 按以下優先級載入 skills：

| 位置 | 優先級 | 說明 |
|------|--------|------|
| `<workspace>/skills/` | 最高 | 工作區級，當前專案專用 |
| `~/.openclaw/skills/` | 中 | 使用者級，所有專案共享 |
| 內建 skills | 最低 | OpenClaw 自帶 |

每個 skill 是一個 `skills/{name}/SKILL.md` 檔案，包含 YAML frontmatter 和指令內容。OpenClaw 會自動發現並載入。

### 推薦配置方式

在專案根目錄的 `CLAUDE.md` 或 `AGENTS.md` 中引用：

```markdown
# CLAUDE.md

本專案使用 superpowers-zh skills 框架。
優先使用 brainstorming（腦力激盪）開始新任務。
Skills 位於 skills/ 目錄下。
```

### 工具映射

OpenClaw 與 Claude Code 使用相同的工具名稱，skills 無需額外適配：

| 工具 | OpenClaw | Claude Code |
|------|----------|-------------|
| 讀檔案 | `Read` | `Read` |
| 寫檔案 | `Write` | `Write` |
| 編輯 | `Edit` | `Edit` |
| 終端 | `Bash` | `Bash` |
| Skills | `Skill` | `Skill` |

## 使用

安裝完成後重新啟動 OpenClaw，所有 skills 會自動生效。AI 會按任務上下文自動呼叫對應 skill：

- 新任務 / 新功能 → `brainstorming`（腦力激盪）
- 寫 commit message → `chinese-commit-conventions`（中文 commit 規範）
- 除錯問題 → `systematic-debugging`
- 完成任務後 → `requesting-code-review`（請求程式碼審查）

無需手動 slash command 觸發 —— AI 透過 skill frontmatter 的 `description` 欄位自主選擇匹配的 skill。如果想強制觸發某個 skill，直接在指令裡點名："用 brainstorming 幫我想一下 X 怎麼做"。

## 全域 Skills

如果你想让所有專案都能使用 superpowers-zh：

```bash
mkdir -p ~/.openclaw/skills
cp -r superpowers-zh/skills/* ~/.openclaw/skills/
```

也可以透過 `~/.openclaw/openclaw.json` 設定額外 skills 目錄：

```json
{
  "skills": {
    "load": {
      "extraDirs": ["/path/to/superpowers-zh/skills"]
    }
  }
}
```

## 更新

```bash
cd /your/project
npx superpowers-zh
```

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- QQ 群：833585047
