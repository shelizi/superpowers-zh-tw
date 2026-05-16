# Superpowers 中文版 — Aider 安裝指南

在 [Aider](https://aider.chat) 中使用 superpowers-zh 的完整指南。

## 自动安装

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.aider.conf.yml` 檔案並將 skills 複製到 `.aider/skills/` 目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.aider/skills
```

## 透過 CONVENTIONS.md 引用

Aider 原生支援 `CONVENTIONS.md` 檔案。在其中引用 skills：

```markdown
# 项目约定

## 工作方法论

本專案使用 superpowers-zh skills 作為工作方法論。
Skills 位於 `.aider/skills/` 目錄，每個子目錄的 SKILL.md 定義一個工作流。

- 新功能開發：先使用 brainstorming skill
- 編寫程式碼：遵循 test-driven-development skill
- 除錯問題：使用 systematic-debugging skill
```

## 透過 .aider.conf.yml 設定

在 `.aider.conf.yml` 中新增 read 設定來載入 skills：

```yaml
read:
  - .aider/skills/brainstorming/SKILL.md
  - .aider/skills/test-driven-development/SKILL.md
  - .aider/skills/systematic-debugging/SKILL.md
```

## 故障排查

### Skills 未生效

1. 確認 `.aider/skills/` 目錄存在且包含 skill 資料夾
2. 確保在 `CONVENTIONS.md` 或 `.aider.conf.yml` 中引用了 skills
3. Aider 會自動讀取 `CONVENTIONS.md`，無需額外設定

## 获取帮助

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 项目主页：https://github.com/jnMetaCode/superpowers-zh
- Aider 文档：https://aider.chat/docs/
