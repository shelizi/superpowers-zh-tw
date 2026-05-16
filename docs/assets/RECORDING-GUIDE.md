# GIF 錄製指南

## 方式一：macOS 錄屏（推薦，最真實）

### 準備
1. 終端字體調到 18pt+，背景用深色
2. 準備一個測試專案目錄 `~/demo-project`
3. 確保 superpowers-zh 已安裝

### 錄製步驟
1. **Cmd+Shift+5** 打開錄屏，選擇錄製區域（只錄終端視窗）
2. 執行以下操作：

```bash
# 第一步：安裝（3秒）
cd ~/demo-project
npx superpowers-zh

# 第二步：給 AI 提需求（等 AI 回覆）
claude "給使用者模組加一個批次匯出功能"
```

3. 等 AI 輸出中文的腦力激盪內容（釐清問題 + 方案），錄到這裡就可以停了
4. 停止錄屏

### 轉 GIF
```bash
# mov 转 gif（用 ffmpeg）
ffmpeg -i recording.mov -vf "fps=10,scale=700:-1:flags=lanczos" -c:v gif docs/assets/demo.gif

# 如果太大（>2MB），降低 fps 或尺寸
ffmpeg -i recording.mov -vf "fps=8,scale=600:-1:flags=lanczos" -c:v gif docs/assets/demo.gif
```

## 方式二：VHS 腳本（模擬輸入，輸出需要手動編排）

```bash
cd /Users/yx/work/wenzhang/superpowers-zh
vhs docs/assets/demo.tape
```

注意：VHS 只模擬鍵盤輸入，AI 輸出需要在 tape 檔案中用 Type 模擬。

## 最終效果要求
- 時長：15-20 秒
- 檔案大小：< 2MB
- 關鍵幀：能看到 AI 用中文輸出設計方案/釐清問題
