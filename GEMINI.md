@./skills/using-superpowers/SKILL.md
@./skills/using-superpowers/references/gemini-tools.md


# Superpowers-ZH 中文增強版

本專案已安裝 superpowers-zh 技能框架（20 個 skills）。

## 核心規則

1. **收到任務時，先檢查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要檢查
2. **設計先於編碼** — 收到功能需求時，先用 brainstorming skill 做需求分析
3. **測試先於實作** — 寫程式碼前先寫測試（TDD）
4. **驗證先於完成** — 聲稱完成前必須執行驗證命令

## 可用 Skills

Skills 位於 `.gemini/skills/` 目錄，每個 skill 有獨立的 `SKILL.md` 檔案。

- **brainstorming**: 在任何創造性工作之前必須使用此技能——建立功能、建構元件、新增功能或修改行為。在實作之前先探索使用者意圖、需求和設計。
- **chinese-code-review**: 中文 review 溝通參考——話術範本、分級標註（必須修復/建議修改/僅供參考）、國內團隊常見反模式應對。僅在使用者顯式 /chinese-code-review 時呼叫，不要根據上下文自動觸發。
- **chinese-commit-conventions**: 中文 commit 與 changelog 設定參考——Conventional Commits 中文適配、commitlint/husky/commitizen 中文範本、conventional-changelog 中文設定。僅在使用者顯式 /chinese-commit-conventions 時呼叫，不要根據上下文自動觸發。
- **chinese-documentation**: 中文文件排版參考——中英文空格、全半角標點、術語保留、連結格式、中文文案排版指北約定。僅在使用者顯式 /chinese-documentation 時呼叫，不要根據上下文自動觸發。
- **chinese-git-workflow**: 國內 Git 平台設定參考——Gitee、Coding.net、極狐 GitLab、CNB 的 SSH/HTTPS/憑證/CI 接入差異與鏡像同步設定。僅在使用者顯式 /chinese-git-workflow 時呼叫，不要根據上下文自動觸發。
- **dispatching-parallel-agents**: 當面對 2 個以上可以獨立進行、無共享狀態或順序相依性的任務時使用
- **executing-plans**: 當你有一份書面實作計畫需要在單獨的會話中執行，並設有審查檢查點時使用
- **finishing-a-development-branch**: 當實作完成、所有測試通過、需要決定如何整合工作時使用——透過提供合併、PR 或清理等結構化選項來引導開發工作的收尾
- **mcp-builder**: MCP 伺服器建置方法論 — 系統化建置生產級 MCP 工具，讓 AI 助手連接外部能力
- **receiving-code-review**: 收到程式碼審查回饋後、實施建議之前使用，尤其當回饋不明確或技術上有疑問時——需要技術嚴謹性和驗證，而非敷衍附和或盲目執行
- **requesting-code-review**: 完成任務、實作重要功能或合併前使用，用於驗證工作成果是否符合要求
- **subagent-driven-development**: 當在當前會話中執行包含獨立任務的實作計畫時使用
- **systematic-debugging**: 遇到任何 bug、測試失敗或異常行為時使用，在提出修復方案之前執行
- **test-driven-development**: 在實作任何功能或修復 bug 時使用，在編寫實作程式碼之前
- **using-git-worktrees**: 當需要開始與當前工作區隔離的功能開發或執行實作計畫之前使用——建立具有智慧目錄選擇和安全驗證的隔離 git 工作樹
- **using-superpowers**: 在開始任何對話時使用——確立如何查找和使用技能，要求在任何回應（包括釐清性問題）之前呼叫 Skill 工具
- **verification-before-completion**: 在聲稱工作完成、已修復或測試通過之前使用，在提交或建立 PR 之前——必須執行驗證命令並確認輸出後才能聲稱成功；始終用證據支撐斷言
- **workflow-runner**: 在 Claude Code / OpenClaw / Cursor 中直接執行 agency-orchestrator YAML 工作流——無需 API key，使用當前會話的 LLM 作為執行引擎。當使用者提供 .yaml 工作流檔案或要求多角色協作完成任務時觸發。
- **writing-plans**: 當你有規格說明或需求用於多步驟任務時使用，在動手寫程式碼之前
- **writing-skills**: 當建立新技能、編輯現有技能或在部署前驗證技能是否有效時使用

## 如何使用

當任務匹配某個 skill 時，讀取對應的 `.gemini/skills/<skill-name>/SKILL.md` 並嚴格遵循其流程。
