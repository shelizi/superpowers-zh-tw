# Copilot CLI 工具映射

技能使用 Claude Code 的工具名稱。當你在技能中遇到這些工具時，使用你平台的等價工具：

| 技能中引用的工具 | Copilot CLI 等價工具 |
|-----------------|----------------------|
| `Read`（讀取檔案） | `view` |
| `Write`（建立檔案） | `create` |
| `Edit`（編輯檔案） | `edit` |
| `Bash`（執行指令） | `bash` |
| `Grep`（搜尋檔案內容） | `grep` |
| `Glob`（按名稱搜尋檔案） | `glob` |
| `Skill` 工具（呼叫技能） | `skill` |
| `WebFetch` | `web_fetch` |
| `Task` 工具（分派子智能體） | `task`（參見[智能體類型](#智能體類型)） |
| 多個 `Task` 呼叫（並行） | 多個 `task` 呼叫 |
| Task 狀態/輸出 | `read_agent`、`list_agents` |
| `TodoWrite`（任務追蹤） | `sql` 配合內建 `todos` 表 |
| `WebSearch` | 無等價工具 — 使用 `web_fetch` 配合搜尋引擎 URL |
| `EnterPlanMode` / `ExitPlanMode` | 無等價工具 — 留在主會話中 |

## 智能體類型

Copilot CLI 的 `task` 工具接受 `agent_type` 參數：

| Claude Code 智能體 | Copilot CLI 等價 |
|-------------------|----------------------|
| `general-purpose` | `"general-purpose"` |
| `Explore` | `"explore"` |
| 命名的插件智能體（如 `superpowers:code-reviewer`） | 從已安裝的插件中自動發現 |

## 異步 Shell 會話

Copilot CLI 支援持久化的異步 shell 會話，這在 Claude Code 中沒有直接等價物：

| 工具 | 用途 |
|------|---------|
| `bash` 配合 `async: true` | 在後台啟動長時間執行的指令 |
| `write_bash` | 向執行中的異步會話發送輸入 |
| `read_bash` | 讀取異步會話的輸出 |
| `stop_bash` | 終止異步會話 |
| `list_bash` | 列出所有活躍的 shell 會話 |

## 額外的 Copilot CLI 工具

| 工具 | 用途 |
|------|---------|
| `store_memory` | 持久化程式碼庫相關事實供未來會話使用 |
| `report_intent` | 更新 UI 狀態行顯示當前意圖 |
| `sql` | 查詢會話的 SQLite 資料庫（待辦、元資料） |
| `fetch_copilot_cli_documentation` | 查閱 Copilot CLI 文件 |
| GitHub MCP 工具（`github-mcp-server-*`） | 原生 GitHub API 存取（issue、PR、程式碼搜尋） |
