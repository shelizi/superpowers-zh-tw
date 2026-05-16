# Superpowers 中文版 — DeerFlow 2.0 安裝指南

在 [DeerFlow 2.0](https://github.com/bytedance/deer-flow)（字节跳动开源 SuperAgent）中使用 superpowers-zh 的完整指南。

## 快速安裝

```bash
cd /your/deerflow-project
npx superpowers-zh
```

安裝腳本會自動檢測 `deer_flow/` 目錄並將 skills 複製到 `skills/custom/`。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
mkdir -p /your/deerflow-project/skills/custom
cp -r superpowers-zh/skills/* /your/deerflow-project/skills/custom/
```

## 工作原理

DeerFlow 2.0 使用 **Custom Skills** 機制擴展 Agent 能力：

- **目錄**：`skills/custom/`
- **格式**：每個 skill 是一個目錄，包含 `SKILL.md` 檔案（Markdown + YAML frontmatter）
- **載入方式**：DeerFlow 自動掃描 `skills/custom/` 下的所有目錄，透過 `description` 欄位匹配 skill

### Skills 格式相容

superpowers-zh 的 SKILL.md 檔案格式與 DeerFlow 自訂 skills 完全相容。安裝後，DeerFlow 會自動發現並載入所有 skills。

### 環境變數

如果你的 DeerFlow 專案不在當前目錄，可以手動指定安裝路徑：

```bash
export DEERFLOW_SKILLS_DIR=/path/to/deerflow/skills/custom
cp -r superpowers-zh/skills/* $DEERFLOW_SKILLS_DIR/
```

## 使用

安裝後，在 DeerFlow 對話中引用 skill 名稱即可：

- 「使用腦力激盪來分析這個需求」
- 「用測試驅動開發來實作這個功能」
- 「按系統化除錯流程排查這個 bug」

DeerFlow 會根據 skill 的 `description` 自動匹配並載入。

## 更新

```bash
cd /your/deerflow-project
npx superpowers-zh
```

重新執行安裝命令即可更新到最新版本。

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- DeerFlow 文件：https://github.com/bytedance/deer-flow
