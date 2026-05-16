# Superpowers 中文版 — Qwen Code 安裝指南

在 [Qwen Code](https://tongyi.aliyun.com/qianwen) (通义灵码) 中使用 superpowers-zh 的完整指南。

## 自動安裝

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.qwen/` 目錄並將 skills 複製到 `.qwen/skills/` 目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.qwen/skills
```

或全域安裝：

```bash
mkdir -p ~/.qwen/skills
cp -r superpowers-zh/skills/* ~/.qwen/skills/
```

## Skill 載入優先級

| 位置 | 優先級 | 說明 |
|------|--------|------|
| `.qwen/skills/` | 最高 | 專案級，僅當前專案 |
| `~/.qwen/skills/` | 中 | 使用者級，所有專案共享 |

## 使用

安裝完成後重新啟動 Qwen Code，skills 會自動生效。

在 Qwen Code 中可以透過以下方式呼叫 skills：

```
請使用 brainstorming skill 來分析這個需求
```

```
按照 test-driven-development skill 的方法來實作這個功能
```

## 故障排查

### Skills 未生效

1. 確認 `.qwen/skills/` 目錄存在且包含 skill 資料夾
2. 每個 skill 需要包含有效 YAML frontmatter 的 `SKILL.md` 檔案
3. 重新啟動 Qwen Code 或重新整理會話

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 專案主頁：https://github.com/jnMetaCode/superpowers-zh
- 通義靈碼文件：https://tongyi.aliyun.com/lingma
