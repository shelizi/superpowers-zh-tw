# Superpowers 中文版 — Kiro 安裝指南

在 [Kiro](https://kiro.dev)（Amazon AI IDE）中使用 superpowers-zh 的完整指南。

## 快速安装

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.kiro/` 目錄並將 skills 複製到 `.kiro/steering/`。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills/* /your/project/.kiro/steering/
```

## 工作原理

Kiro 使用 **Steering** 機制管理 AI 行為規則：

- **目錄**：`.kiro/steering/`
- **格式**：Markdown + YAML frontmatter
- **載入模式**：
  - `alwaysApply: true` — 每次對話自動載入
  - `globs: "*.ts"` — 匹配特定檔案時載入
  - 手動引用 — 在聊天中輸入 `#steering-file-name`

### Skills 與 Steering 的對應

superpowers-zh 的 SKILL.md 檔案格式與 Kiro Steering 檔案相容（都是 Markdown + YAML frontmatter）。安裝後，Kiro 會自動識別並載入 skills。

### 推薦配置

在 `.kiro/steering/` 中建立 `superpowers.md`：

```markdown
---
description: 載入 superpowers skills 框架
alwaysApply: true
---

使用 .kiro/steering/ 目錄下的 superpowers skills 來指導工作流程。
優先使用 brainstorming（腦力激盪）開始新任務。
```

## 使用

在 Kiro 中，你可以：
- 直接提到 skill 名稱：「使用腦力激盪來分析這個需求」
- 手動引用：在聊天中輸入 `#brainstorming`
- Skills 會根據任務類型自動啟動

## 更新

```bash
cd /your/project
npx superpowers-zh
```

重新執行安裝命令即可更新到最新版本。

## 获取帮助

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- Kiro 文档：https://kiro.dev/docs/steering/
