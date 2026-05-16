# Superpowers 中文版 — Hermes Agent 安裝指南

在 [Hermes Agent](https://github.com/NousResearch/hermes-agent) 中使用 superpowers-zh 的完整指南。

## 自動安裝

```bash
cd /your/project
npx superpowers-zh --tool hermes
```

安裝腳本會將 20 個 skills 複製到 `.hermes/skills/` 目錄，並自動產生 `HERMES.md` 引導檔案（含工具映射表和 skills 列表）。

如果專案中已存在 `.hermes` 目錄或 `HERMES.md` 檔案，也會被自動偵測到：

```bash
npx superpowers-zh   # 自動偵測
```

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.hermes/skills
```

## 透過 HERMES.md 引導

Hermes Agent 在會話開始時自動載入專案根目錄下的 `HERMES.md`（或 `.hermes.md`）作為上下文。安裝器會自動產生此檔案，內容包括：

- 工具映射表（Claude Code → Hermes Agent 工具名稱）
- 所有可用 skills 的列表和描述
- 核心规则和使用说明

## 透過 config.yaml 設定外部 skills 目錄

如果希望全域使用 superpowers-zh skills，可以在 `~/.hermes/config.yaml` 中設定：

```yaml
skills:
  external_dirs:
    - /path/to/superpowers-zh/skills
```

## 工具映射

Skills 中引用的 Claude Code 工具名稱對應 Hermes Agent 的等價工具：

| Claude Code | Hermes Agent |
|-------------|-------------|
| `Read` | `read_file` |
| `Write` | `write_file` |
| `Edit` | `patch` |
| `Bash` | `terminal` |
| `Grep` / `Glob` | `search_files` |
| `Skill` | `skill_view` |
| `Task`（子智能体） | `delegate_task` |
| `WebSearch` | `web_search` |
| `WebFetch` | `web_extract` |
| `TodoWrite` | `todo` |

完整映射參見 `skills/using-superpowers/references/hermes-tools.md`。

## 使用技能

Hermes Agent 支援三級漸進式載入：

```
# 瀏覽所有可用技能
skills_list

# 載入某個技能的完整內容
skill_view("brainstorming")

# 查看技能的引用檔案
skill_view("using-superpowers", "references/hermes-tools.md")
```

## 故障排查

### Skills 未發現

1. 確認 `.hermes/skills/` 目錄存在且包含 skill 資料夾
2. 每個 skill 目錄下需要有 `SKILL.md` 檔案
3. 使用 `skills_list` 查看已發現的技能

### HERMES.md 未載入

1. 確認檔案在專案根目錄（與 `.hermes/` 同級）
2. 檔名可以是 `HERMES.md` 或 `.hermes.md`

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- 專案主頁：https://github.com/jnMetaCode/superpowers-zh
- Hermes Agent 文件：https://hermes-agent.nousresearch.com/docs/
