# Superpowers 中文版 — Gemini CLI 安裝指南

在 [Gemini CLI](https://github.com/google-gemini/gemini-cli) 中使用 superpowers-zh 的完整指南。

## 自动安装

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.gemini/` 目錄並將 skills 複製到 `.gemini/skills/` 目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.gemini/skills
```

或作為 Gemini 擴充套件安裝（全域）：

```bash
mkdir -p ~/.gemini/extensions/superpowers-zh/skills
cp -r superpowers-zh/skills/* ~/.gemini/extensions/superpowers-zh/skills/
cp superpowers-zh/gemini-extension.json ~/.gemini/extensions/superpowers-zh/
```

## 透過 GEMINI.md 引用

在專案根目錄的 `GEMINI.md` 中引用 skills：

```markdown
# 工作方法论

请参考 .gemini/skills/ 目录中的 SKILL.md 文件。
遇到新功能开发时，先使用 brainstorming skill。
编写代码时，遵循 test-driven-development skill。
```

## Skill 載入優先級

| 位置 | 優先級 | 說明 |
|------|--------|------|
| `.gemini/skills/` | 最高 | 專案級，僅當前專案 |
| `~/.gemini/extensions/*/skills/` | 中 | 擴充級，所有專案共享 |

## 故障排查

### Skills 未生效

1. 確認 `.gemini/skills/` 目錄存在且包含 skill 資料夾
2. 每個 skill 需要包含有效 YAML frontmatter 的 `SKILL.md` 檔案
3. 重新啟動 Gemini CLI

### 扩展模式未加载

1. 檢查 `gemini-extension.json` 是否正確放在擴充目錄中
2. 確認擴充目錄結構：`~/.gemini/extensions/superpowers-zh/`

## 获取帮助

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 项目主页：https://github.com/jnMetaCode/superpowers-zh
- Gemini CLI 文档：https://github.com/google-gemini/gemini-cli
