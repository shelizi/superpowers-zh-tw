---
name: chinese-commit-conventions
description: 中文 commit 與 changelog 設定參考——Conventional Commits 中文適配、commitlint/husky/commitizen 中文範本、conventional-changelog 中文設定。僅在使用者顯式 /chinese-commit-conventions 時呼叫，不要根據上下文自動觸發。
---

# 中文 Git 提交規範

## 1. Conventional Commits 中文適配

基於 Conventional Commits 1.0.0 規範，針對中文團隊的實際使用習慣進行適配。

### 類型（type）定義

| 類型       | 說明                         | 範例場景                   |
| ---------- | ---------------------------- | -------------------------- |
| `feat`     | 新功能                       | 新增使用者註冊模組           |
| `fix`      | 修復缺陷                     | 修復登入頁白屏問題         |
| `docs`     | 文件變更                     | 更新 API 介面文件          |
| `style`    | 程式碼格式（不影響邏輯）       | 調整縮排、補充分號         |
| `refactor` | 重構（非新功能、非修復）     | 拆分過長的服務類           |
| `perf`     | 性能優化                     | 優化首頁列表查詢速度       |
| `test`     | 測試相關                     | 補充使用者模組單元測試       |
| `chore`    | 建構/工具/相依性變更           | 升級 webpack 到 v5         |
| `ci`       | 持續整合設定                 | 修改 GitHub Actions 流程   |
| `revert`   | 回滾提交                     | 回滾 v2.1.0 的登入重構     |

### 原則

- type 保留英文關鍵字（工具鏈相容性好）
- scope 和 description 使用中文
- body 使用中文完整描述

## 2. 中文 commit message 範本

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 完整範例

```
feat(使用者模組): 新增手機號一鍵登入功能

- 接入營運商一鍵登入 SDK
- 支援移動、聯通、電信三網
- 登入失敗自動降級到簡訊驗證碼

Closes #128
```

```
fix(訂單): 修復並發下單導致庫存超賣的問題

在高併發場景下，原有的庫存扣減邏輯存在競態條件。
改用 Redis 分散式鎖 + 資料庫樂觀鎖雙重保障。

影響範圍：訂單服務、庫存服務
測試確認：已通過 500 併發壓測驗證

Closes #256
```

## 3. Subject 行規範

### 格式

```
<type>(<scope>): <description>
```

### 規則

- **type**: 必填，從上方類型表中選取
- **scope**: 選填，表示影響範圍，使用中文模組名
  - 範例：`使用者模組`、`訂單`、`支付`、`基礎元件`
- **description**: 必填，中文簡述，不超過 50 個字元
  - 使用動賓短語：「新增 xxx」「修復 xxx」「優化 xxx」
  - 不加句號結尾
  - 不要寫「修改了程式碼」這種無意義描述

### 好的範例

```
feat(權限): 新增基於 RBAC 的細粒度權限控制
fix(支付): 修復微信支付回調簽名驗證失敗的問題
perf(列表頁): 優化大量資料表格的虛擬捲動渲染
refactor(閘道): 將單體閘道拆分為獨立微服務
```

### 反面範例

```
# 以下寫法應避免
fix: 修了一個 bug
feat: 更新程式碼
chore: 改了點東西
```

## 4. Body 編寫規範

Body 用於詳細說明本次變更的動機、方案和影響。

### 編寫要點

- 說明**為什麼**要做這個變動（背景/原因）
- 說明**怎麼做**的（技術方案摘要）
- 說明**影響範圍**（哪些模組、介面受影響）
- 每行不超過 72 個字元（中文約 36 個漢字）
- 正文與標題之間空一行

### Body 範本

```
<變動背景和原因>

技術方案：
- <方案要點 1>
- <方案要點 2>

影響範圍：<受影響的模組或服務>
```

## 5. Breaking Changes 標註

當提交包含不相容變更時，必須在 footer 中標註。

### 格式一：footer 標註

```
feat(介面): 重構使用者資訊返回結構

將使用者介面返回的扁平結構改為巢狀結構，前端需同步調整欄位取值路徑。

BREAKING CHANGE: /api/user/info 返回結構變更
- avatar 欄位移入 profile 物件
- 移除已廢棄的 nickname 欄位，統一使用 displayName
```

### 格式二：type 後加感嘆號

```
feat(介面)!: 重構使用者資訊返回結構
```

### 團隊約定

- 涉及資料庫表結構變更 -> 必須標註 BREAKING CHANGE
- 涉及公共 API 參數/返回值變更 -> 必須標註
- 涉及設定檔格式變更 -> 必須標註
- 標註時須寫明遷移方法或升級步驟

## 6. Issue 關聯

### GitHub 格式

```
Closes #128
Refs #129, #130
```

### Gitee 格式

```
Closes #I5ABC1
相關需求: https://gitee.com/org/repo/issues/I5ABC1
```

### Coding 格式

```
關聯 Coding 缺陷 #12345
fixed=project-2024/issues/678
```

### 通用寫法

```
# footer 中關聯多個平台
Closes #128
Jira: PROJ-456
禪道: #789
```

## 7. Changelog 自動產生設定

### 安裝 conventional-changelog

```bash
npm install -D conventional-changelog-cli conventional-changelog-conventionalcommits
```

### package.json 腳本

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s",
    "changelog:all": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s -r 0",
    "release": "standard-version"
  }
}
```

### .versionrc.js 中文設定

```javascript
module.exports = {
  types: [
    { type: 'feat', section: '新功能' },
    { type: 'fix', section: '缺陷修復' },
    { type: 'perf', section: '性能優化' },
    { type: 'refactor', section: '程式碼重構' },
    { type: 'docs', section: '文件更新' },
    { type: 'test', section: '測試' },
    { type: 'chore', section: '建構/工具', hidden: true },
    { type: 'ci', section: '持續整合', hidden: true },
    { type: 'style', section: '程式碼格式', hidden: true }
  ],
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}'
}
```

## 8. commitlint 中文設定

### 安裝

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

### commitlint.config.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'ci', 'revert'
    ]],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 100],
    // 允許中文字元，關閉 subject-case 限制
    'subject-case': [0],
    // 關閉 header-max-length 或放寬（中文佔寬較大）
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [1, 'always', 200],
    'footer-max-line-length': [1, 'always', 200]
  },
  prompt: {
    messages: {
      type: '選擇提交類型:',
      scope: '輸入影響範圍（可選）:',
      subject: '填寫簡短描述:',
      body: '填寫詳細描述（可選，使用 "|" 換行）:',
      breaking: '列出不相容變更（可選）:',
      footer: '關聯的 Issue（可選，例如 #123）:',
      confirmCommit: '確認提交以上資訊？'
    }
  }
}
```

## 9. husky + lint-staged 整合

### 安裝與初始化

```bash
npm install -D husky lint-staged
npx husky init
```

### 設定 commit-msg 鉤子

```bash
# .husky/commit-msg
npx --no -- commitlint --edit "$1"
```

### 設定 pre-commit 鉤子

```bash
# .husky/pre-commit
npx lint-staged
```

### lint-staged 設定（package.json）

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```

### 互動式提交（可選）

```bash
npm install -D commitizen cz-conventional-changelog

# package.json 中新增
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "scripts": {
    "commit": "cz"
  }
}
```

執行 `npm run commit` 即可進入互動式提交引導。

## 10. 團隊規範檢查清單

### 提交前自查

- [ ] type 是否正確選擇（feat/fix/docs/...）
- [ ] scope 是否準確描述了影響模組
- [ ] subject 是否為動賓短語且不超過 50 字元
- [ ] subject 末尾是否去掉了句號
- [ ] body 是否說明了變更原因和方案
- [ ] 不相容變更是否標註了 BREAKING CHANGE
- [ ] 相關 Issue 是否已關聯
- [ ] 一次提交是否只做了一件事（原子性）

### 團隊落地步驟

1. **工具鏈設定**：按上述步驟設定 commitlint + husky，讓規範可執行
2. **範本共享**：將 `.commitlintrc`、`.husky/` 等設定提交到倉庫
3. **團隊培訓**：組織 15 分鐘的規範說明會，演示工具使用
4. **Code Review**：Review 時關注 commit message 品質
5. **持續迭代**：每季度回顧規範執行情況，根據團隊回饋調整

### 常見問題

**Q: 中英文混排時空格怎麼處理？**
A: 中文與英文/數字之間加一個空格，如「新增 Redis 快取」。

**Q: scope 用中文還是英文？**
A: 團隊內統一即可。推薦中文（可讀性好），但需在 commitlint 中關閉 scope-case 檢查。

**Q: 多人協作時如何保證規範一致？**
A: 靠工具而非靠自覺。設定好 husky + commitlint，不符合規範的提交會被攔截。
