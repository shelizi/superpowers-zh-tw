# Superpowers 中文版 — Windsurf 安裝指南

在 [Windsurf](https://codeium.com/windsurf) 中使用 superpowers-zh 的完整指南。

## 自動安裝

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.windsurf/` 目錄並將 skills 複製到 `.windsurf/skills/` 目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.windsurf/skills
```

或全域安裝：

```bash
cp -r superpowers-zh/skills ~/.windsurf/skills
```

## Skill 載入優先級

| 位置 | 優先級 | 說明 |
|------|--------|------|
| `.windsurf/skills/` | 最高 | 專案級，僅當前專案 |
| `~/.windsurf/skills/` | 中 | 使用者級，所有專案共享 |

## 使用

安裝完成後重新啟動 Windsurf，skills 會自動生效。

也可以在 `.windsurfrules` 檔案中引用 skills 目錄：

```
請參考 .windsurf/skills/ 目錄中的 SKILL.md 檔案作為工作方法論。
```

## 故障排查

### Skills 未生效

1. 確認 `.windsurf/skills/` 目錄存在且包含 skill 資料夾
2. 每個 skill 需要包含有效 YAML frontmatter 的 `SKILL.md` 檔案
3. 重新啟動 Windsurf

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 專案主頁：https://github.com/jnMetaCode/superpowers-zh
- Windsurf 文件：https://docs.codeium.com/windsurf
