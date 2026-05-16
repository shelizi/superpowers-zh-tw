# Superpowers 中文版 — Trae 安裝指南

在 [Trae](https://www.trae.ai)（字节跳动 AI IDE）中使用 superpowers-zh 的完整指南。

## 快速安裝

```bash
cd /your/project
npx superpowers-zh
```

安裝腳本會自動檢測 `.trae/` 目錄並將 skills 複製到 `.trae/rules/`。

## 手動安裝

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
mkdir -p /your/project/.trae/rules
cp -r superpowers-zh/skills/* /your/project/.trae/rules/
```

## 工作原理

Trae 使用 `.rules` 機制管理 AI 行為：

- **目錄**：`.trae/rules/`
- **格式**：Markdown + metadata（description、globs、alwaysApply、priority）
- **規則類型**：
  - **專案規則**（Project Rules）— 僅作用於當前專案
  - **個人規則**（Personal Rules）— 使用者級別，可被專案規則覆蓋
- **優先級**：1-4，數值越高優先級越高

### Skills 適配

superpowers-zh 的 SKILL.md 檔案可以直接作為 Trae 的 rules 使用。Trae 會在初始化時載入 `.trae/rules/` 下的所有規則檔案。

### 推薦配置

安裝完成後，在 Trae 的 Builder Mode 或 Chat 中提到 skill 名稱即可啟動：

```
使用腦力激盪 skill 來分析這個需求
```

## 中文支援

Trae 原生支援中文，與 superpowers-zh 完美配合：
- 所有 skills 均為中文
- 中文程式碼審查、中文 Git 工作流等國內特色 skills 開箱即用
- 支援 MCP 協議擴充

## 更新

```bash
cd /your/project
npx superpowers-zh
```

## 解除安裝 / 誤裝清理

如果不小心在主目錄（`~`）誤跑了 `npx superpowers-zh`，會把 skills 和 `.trae/rules/superpowers-zh.md` 寫到你的 home。v1.2.1 起會主動拒絕，但舊版本可能已經污染過。清理：

```bash
cd ~                                    # 或具體的專案目錄
npx superpowers-zh@latest --uninstall
```

會刪除 `.trae/skills/` 下裝過的 skill、`.trae/rules/superpowers-zh.md`，並清理 `CLAUDE.md` 等檔案裡的 superpowers-zh 段（保留你自己寫的內容）。

## 獲取說明

- 提交 Issue：https://github.com/jnMetaCode/superpowers-zh/issues
- Trae 文件：https://docs.trae.ai/ide/rules
