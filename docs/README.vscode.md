# Superpowers 中文版 — VS Code (Copilot) 安裝指南

在 VS Code + GitHub Copilot 中使用 superpowers-zh 的完整指南。

## 前置條件

- VS Code（最新版本）
- GitHub Copilot 擴充套件（免費版或付費版均可）

## 快速安装

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.github/` 目錄並將 skills 複製到該目錄。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
mkdir -p /your/project/.github/superpowers
cp -r superpowers-zh/skills/* /your/project/.github/superpowers/
```

## 工作原理

VS Code Copilot 使用 `.github/copilot-instructions.md` 作為專案級自訂指令：

- **位置**：專案根目錄 `.github/copilot-instructions.md`
- **格式**：Markdown
- **生效範圍**：該工作區內的所有 Copilot Chat 和內聯補全
- **自動載入**：儲存檔案後立即生效，無需重新啟動

### 推薦配置

由於 Copilot 主要透過單個指令檔案工作，建議建立 `.github/copilot-instructions.md` 引用 skills：

```markdown
# Copilot 自定义指令

## 工作流方法論

本專案使用 superpowers-zh skills 框架。開始新任務前，請參考以下方法論：

- 新需求 → 先腦力激盪（.github/superpowers/brainstorming/SKILL.md）
- 寫程式碼 → TDD 驅動（.github/superpowers/test-driven-development/SKILL.md）
- 修 Bug → 系統化除錯（.github/superpowers/systematic-debugging/SKILL.md）
- 審查程式碼 → 中文程式碼審查（.github/superpowers/chinese-code-review/SKILL.md）

## 中文專案規範

- 程式碼註解和文件使用中文
- Git commit 遵循中文提交規範
- 技術術語保留英文原文
```

### 使用 .instructions.md 檔案（推薦）

VS Code 還支援更細粒度的 `.instructions.md` 檔案：

```
.github/
  copilot-instructions.md          # 全域指令
  .instructions/
    typescript.instructions.md     # TypeScript 檔案專用
    testing.instructions.md        # 測試相關
```

## 使用

在 VS Code 中：
- **Copilot Chat**（`Ctrl+Shift+I`）：直接引用 skill 名稱
- **內聯補全**：自動遵循 copilot-instructions.md 中的規則
- **`/init`**：在 Chat 中输入，自动生成项目配置

## 局限性

VS Code Copilot 不像 Claude Code 那樣支援 `Skill` 工具或子 Agent 派遣。以下 skills 需要手動參考而非自動執行：

- 派遣並行 Agent（需要 Agent 框架支援）
- 子 Agent 驅動開發（需要 Agent 框架支援）
- Git Worktree 使用（需要終端操作）

其他方法論類 skills（腦力激盪、TDD、除錯、程式碼審查等）完全相容。

## 更新

```bash
cd /your/project
npx superpowers-zh
```

## 获取帮助

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- VS Code Copilot 文档：https://code.visualstudio.com/docs/copilot/customization/custom-instructions
