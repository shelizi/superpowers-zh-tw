# Superpowers 中文版 — Codex CLI 安裝指南

在 Codex 中使用 superpowers-zh 的完整指南。

## 快速安裝

告訴 Codex：

```
Fetch and follow instructions from https://raw.githubusercontent.com/jnMetaCode/superpowers-zh/refs/heads/main/.codex/INSTALL.md
```

## 手動安裝

### 前置條件

- OpenAI Codex CLI
- Git

### 步驟

1. 複製儲存庫：
   ```bash
   git clone https://github.com/jnMetaCode/superpowers-zh.git ~/.codex/superpowers-zh
   ```

2. 建立 skills 符號連結：
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/superpowers-zh/skills ~/.agents/skills/superpowers
   ```

3. 重新啟動 Codex。

4. **子代理 skills（可選）：** `dispatching-parallel-agents` 和 `subagent-driven-development` 需要 Codex 的多代理功能。在 Codex 設定中新增：
   ```toml
   [features]
   multi_agent = true
   ```

### Windows

使用 junction 代替符號連結（無需開發者模式）：

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers-zh\skills"
```

## 工作原理

Codex 原生支援 skill 發現——啟動時掃描 `~/.agents/skills/` 目錄，解析 SKILL.md 的 frontmatter，按需載入 skills。透過一個符號連結即可註冊所有 skills：

```
~/.agents/skills/superpowers/ → ~/.codex/superpowers-zh/skills/
```

`using-superpowers` skill 會自動被發現並強制執行 skill 使用紀律——無需額外設定。

## 使用

Skills 自動發現。Codex 在以下情況啟動 skills：
- 你提到 skill 名稱（如 "use brainstorming"）
- 任務匹配 skill 的描述
- `using-superpowers` skill 指示 Codex 使用某個 skill

## 更新

```bash
cd ~/.codex/superpowers-zh && git pull
```

Skills 透過符號連結即時更新。

## 解除安裝

```bash
rm ~/.agents/skills/superpowers
```

**Windows (PowerShell):**
```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\superpowers"
```

可選：刪除複製的儲存庫 `rm -rf ~/.codex/superpowers-zh`

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 專案主頁：https://github.com/jnMetaCode/superpowers-zh
