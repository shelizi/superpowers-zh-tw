# Superpowers 中文版 — OpenCode 安裝指南

在 [OpenCode.ai](https://opencode.ai) 中使用 superpowers-zh 的完整指南。

## 安裝

在 `opencode.json`（全域或專案級）的 `plugin` 陣列中新增：

```json
{
  "plugin": ["superpowers@git+https://github.com/jnMetaCode/superpowers-zh.git"]
}
```

重新啟動 OpenCode。外掛透過 Bun 自動安裝並註冊所有 skills。

驗證方式：問 "告訴我你有哪些 superpowers"

## 使用

### 尋找 Skills

使用 OpenCode 原生的 `skill` 工具列出所有可用 skills：

```
use skill tool to list skills
```

### 載入 Skill

```
use skill tool to load superpowers/brainstorming
```

### 個人 Skills

在 `~/.config/opencode/skills/` 中建立你自己的 skills：

```bash
mkdir -p ~/.config/opencode/skills/my-skill
```

建立 `~/.config/opencode/skills/my-skill/SKILL.md`：

```markdown
---
name: my-skill
description: 當 [條件] 時使用 - [功能描述]
---

# 我的 Skill

[你的 skill 內容]
```

### 專案 Skills

在專案的 `.opencode/skills/` 目錄中建立專案級 skills。

**Skill 優先級：** 專案 skills > 個人 skills > Superpowers skills

## 更新

重新啟動 OpenCode 時自動更新。外掛每次啟動都從 git 儲存庫重新安裝。

鎖定特定版本：

```json
{
  "plugin": ["superpowers@git+https://github.com/jnMetaCode/superpowers-zh.git#v1.0.0"]
}
```

## 工作原理

外掛做兩件事：

1. **注入引導上下文** — 透過 `experimental.chat.system.transform` hook，為每次對話新增 superpowers 意識
2. **註冊 skills 目錄** — 透過 `config` hook，讓 OpenCode 發現所有 skills，無需符號連結或手動設定

### 工具映射

為 Claude Code 編寫的 skills 自動適配 OpenCode：

- `TodoWrite` → `todowrite`
- `Task`（子代理）→ OpenCode 的 `@mention` 系統
- `Skill` 工具 → OpenCode 原生 `skill` 工具
- 檔案操作 → OpenCode 原生工具

## 故障排查

### 外掛未載入

1. 檢查 OpenCode 日誌：`opencode run --print-logs "hello" 2>&1 | grep -i superpowers`
2. 確認 `opencode.json` 中的外掛設定正確
3. 確保執行的是最新版本的 OpenCode

### Skills 未找到

1. 使用 `skill` 工具列出可用 skills
2. 檢查外掛是否正確載入（見上）
3. 每個 skill 需要包含有效 YAML frontmatter 的 `SKILL.md` 檔案

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 專案主頁：https://github.com/jnMetaCode/superpowers-zh
- OpenCode 文件：https://opencode.ai/docs/
