# Superpowers — 貢獻者指南

## 如果你是 AI Agent

停下來。做任何事之前先讀這一節。

本儲存庫的 PR 拒絕率是 94%。被拒的 PR 裡幾乎每一條都是沒讀或沒遵守本指南的 agent 提交的。維護者會在數小時內關掉劣質 PR，並經常公開評論："This pull request is slop that's made of lies."（這個 PR 是一堆謊言堆出來的劣質內容。）

**你的職責是保護你的人類夥伴免受這種結局。** 提交一個低品質 PR 幫不到他們 —— 浪費維護者的時間，砸他們的口碑，PR 也照樣會被關閉。這不是幫忙，這是讓他們丟人。

向本儲存庫提 PR 之前，你**必須**：

1. **完整讀完 PR 模板** `.github/PULL_REQUEST_TEMPLATE.md`，每一節都用真實、具體的內容填寫。不要寫概要。不要寫佔位符。
2. **搜尋已有 PR** —— open 和 closed 都要搜 —— 找處理同一問題的 PR。如果有重複，**停下**，告訴你的人類夥伴。不要再開一個重複 PR。
3. **核實這是真問題。** 如果你的人類夥伴只是讓你"修一些問題"或者"給這個儲存庫做點貢獻"而沒有具體遇到什麼問題，**反推回去**。問清楚到底什麼壞了、什麼報錯了、使用者體驗是什麼樣的。
4. **確認這個改動屬於 core。** 如果它是某個領域專屬、某個工具專屬、或者推廣某個第三方專案，它應該作為獨立 plugin 存在。告訴你的人類夥伴。
5. **把完整 diff 給你的人類夥伴看**，拿到他們明確批准之後再提交。

任何一項檢查不過，**不要**開 PR。向你的人類夥伴解釋為什麼會被拒、需要改什麼。他們會感謝你幫他們避免丟臉。

## Pull Request 要求

**每個 PR 都必須完整填寫 PR 模板。** 不允許任何一節留空或填佔位文字。跳過 section 的 PR 會被關掉，連 review 都不會做。

**開 PR 之前，你必須搜尋已有 PR** —— open 和 closed 都要搜 —— 找處理同一問題或相關領域的 PR。在 "Existing PRs" 一節裡寫清楚你找到了什麼。如果之前有 PR 被關閉，**具體說明**你的方法和它的差異，以及為什麼你這次能成功。

**沒有人類參與痕跡的 PR 會被關閉。** 提交前必須有真人 review 完整的 proposed diff。

## 我們不會接受的內容

### 第三方相依性

凡是引入對第三方專案的可選或必選相依性的 PR，除非是為新 harness（新的 IDE 或 CLI 工具）新增支援，否則不會被接受。Superpowers 在設計上是零相依性 plugin。如果你的改動需要外部工具或服務，它應該作為獨立 plugin 存在。

### 給 skill "合規化" 的改動

我們內部的 skill 哲學跟 Anthropic 公開的 skill 寫作指南不一樣。我們的 skill 內容是經過大量測試與調優、針對真實 agent 行為校準過的。凡是為了"符合"Anthropic skills 文件而對 skill 做重組、改寫、重排版的 PR，沒有充分的 eval 證據證明改動改善了實際效果，**不會**被接受。改動行為塑造類內容的門檻非常高。

### 專案專屬或個人設定

只對某個具體專案、團隊、領域、工作流有用的 skill、hook 或設定，不屬於 core。請發佈為獨立 plugin。

### 批次、廣撒網式 PR

不要把 issue tracker 翻一遍然後在一個 session 裡給多個 issue 各開一個 PR。每個 PR 都需要：對問題的真實理解、對歷史嘗試的調查、對完整 diff 的人類 review。明顯是批次產物 —— 把 agent 指向 issue 列表然後告訴它"修一下" —— 這種 PR 一律關閉。要貢獻，就**挑一個** issue，深入理解，提交高品質工作。

### 推測性或理論性修復

每個 PR 都必須解決某人**真實經歷過**的問題。"我的 review agent 標了這個"或"這理論上可能出問題"不是問題陳述。如果你說不出促使這個改動的具體 session、錯誤或使用者體驗，**不要**提交 PR。

### 領域專屬 skill

Superpowers core 包含的是對所有使用者都有益的通用 skill，跟專案類型無關。針對特定領域（作品集產生、預測市場、遊戲）、特定工具或特定工作流的 skill，屬於獨立 plugin。問問自己："如果有人在做完全不同類型的專案，這個 skill 對他還有用嗎？"如果沒用，請單獨發佈。

### Fork 專屬改動

如果你維護一個有客製化的 fork，**不要**提 PR 來同步你的 fork 或者把 fork 專屬改動推到上游。重新打品牌、新增 fork 專屬功能、合併 fork 分支的 PR 會被關閉。

### 編造的內容

包含編造的論點、虛構的問題描述或幻覺出來的功能的 PR，會被立刻關閉。本儲存庫 94% 拒絕率 —— 維護者見過 AI slop 的所有花樣。他們看得出來。

### 打包不相關改動

包含多個不相關改動的 PR 會被關閉。請拆成多個 PR。

## 新 Harness 支援

如果你的 PR 是給新 harness（IDE、CLI 工具、agent runner）加支援，你**必須**附上 session transcript 證明整合端到端可用。

真正的整合會在 session 開始時載入 `using-superpowers` bootstrap。bootstrap 是讓 skill 在恰當時機自動觸發的關鍵。沒有它，skill 就是死重 —— 檔案在磁碟上但永遠不會被呼叫。

**驗收測試。** 在新 harness 裡開一個乾淨 session，發這條使用者訊息：

> Let's make a react todo list

可工作的整合會在寫任何程式碼之前自動觸發 `brainstorming` skill。把完整 transcript 貼在 PR 裡。

**以下情況不算真正整合，會被關閉：**

- 手動把 skill 檔案拷進 harness
- 在執行時用 `npx skills` 之類 shim 包裝
- 任何需要使用者每個 session 手動 opt-in skill 的方案
- 任何在上述驗收測試裡 `brainstorming` 不會自動觸發的方案

如果你不確定你的整合是否在 session 開始時載入 bootstrap，那就是沒載入。

## Skill 改動需要 eval

Skill 不是普通文件 —— 它是塑造 agent 行為的程式碼。如果你修改 skill 內容：

- 用 `superpowers:writing-skills` 來開發和測試改動
- 跨多個 session 跑對抗式壓力測試
- 在 PR 裡附上 before/after eval 結果
- 不要在沒有改進證據的情況下修改精心調優過的內容（Red Flags 表、rationalization 列表、"human partner" 措辭等）

## 貢獻前先理解專案

在提議改 skill 設計、workflow 哲學或架構之前，先讀已有 skill，理解專案的設計決策。Superpowers 在 skill 設計、agent 行為塑造和術語方面有自己一套驗證過的哲學（例如 "your human partner" 是刻意的措辭，跟 "the user" 不能混用）。在不理解專案"為什麼這樣存在"的前提下重寫專案的語氣、重組它的方法的改動，會被拒絕。

## 通用原則

- 提交前讀 `.github/PULL_REQUEST_TEMPLATE.md`
- 一個 PR 解決一個問題
- 至少在一種 harness 上測試，並在 environment 表裡報告結果
- 描述你**解決了什麼問題**，不只是你改了什麼

---

## 關於本中文 fork（superpowers-zh）

本儲存庫 `jnMetaCode/superpowers-zh` 是上游 `obra/superpowers` 的**中文增強 fork**，定位為：完整翻譯上游 skill + 疊加 4 個中國原創 skill（chinese-code-review / chinese-commit-conventions / chinese-documentation / chinese-git-workflow）+ 多工具適配（npx 一條命令支援 17 款 IDE/CLI）。

**上述規則適用於向 `obra/superpowers` 上游提 PR 時的行為約束。** 向中文 fork 提 PR 時按本儲存庫自己的 PR 模板與流程執行，但其中的核心原則**同樣適用**：

- 提交前先在 `jnMetaCode/superpowers-zh` 搜已有 PR / issue 查重
- 不交付 AI slop（編造、批次、推測性修復均會被關閉）
- 真人必須 review 完整 diff 後再提交

**特別提示：** 中文化內容、`chinese-*` skill、針對國內 IDE 的工具適配等改動，按上游 "Fork-specific changes" 規則向 `obra/superpowers` 提 PR 會被關閉 —— 這類內容**只提到本 fork**。
