#!/usr/bin/env bash
# 品質審計腳本 —— 跑 4 類檢查防漂移
#
# 1. 靜態校驗：JSON parse / SKILL.md frontmatter / symlink / hook 可執行性
# 2. Installer 功能：17 款工具裝 / 解除安裝 / 幂等
# 3. 上游對齊：hooks 3 檔案 + brainstorm scripts 3 檔案 + 14 翻譯 skill 結構層級
# 4. 交叉引用：README → docs/ 連結 + skill 間引用 + bootstrap 注入路徑
#
# 用法：
#   bash scripts/audit.sh                 # 跑全部，FAIL > 0 時 exit 1
#   bash scripts/audit.sh --quick         # 跳過 installer 功能測試
#   bash scripts/audit.sh --no-upstream   # 跳過上游對齊（CI 沒 upstream remote 時）
#
# CI 預設在 PR + push to main 跑，發現漂移立刻攔下。

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

QUICK=0
NO_UPSTREAM=0
for arg in "$@"; do
  case "$arg" in
    --quick) QUICK=1 ;;
    --no-upstream) NO_UPSTREAM=1 ;;
  esac
done

PASS=0; FAIL=0; WARN=0
declare -a FAILURES=()
declare -a WARNINGS=()
INSTALLER="$ROOT/bin/superpowers-zh.js"

ok()   { PASS=$((PASS+1)); }
bad()  { FAIL=$((FAIL+1)); FAILURES+=("$1"); echo "  ❌ $1"; }
warn() { WARN=$((WARN+1)); WARNINGS+=("$1"); echo "  ⚠️  $1"; }
hdr()  { echo ""; echo "=== $1 ==="; }

# 確保有 upstream remote（CI 上需要 fetch）
ensure_upstream() {
  if [ "$NO_UPSTREAM" = "1" ]; then return 1; fi
  if ! git ls-remote --exit-code upstream HEAD >/dev/null 2>&1; then
    if git remote get-url upstream >/dev/null 2>&1; then
      git fetch upstream main --depth=50 --quiet 2>/dev/null || return 1
    else
      git remote add upstream https://github.com/shelizi/superpowers-zh-tw.git 2>/dev/null
      git fetch upstream main --depth=50 --quiet 2>/dev/null || return 1
    fi
  fi
  return 0
}

#==============================================================================
hdr "Category 1: 静态校验"
#==============================================================================

# 1a. JSON parse
while IFS= read -r f; do
  if node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" 2>/dev/null; then
    ok
  else
    bad "JSON parse failure: $f"
  fi
done < <(find . -name "*.json" \
            -not -path "./node_modules/*" \
            -not -path "./.git/*" \
            -not -path "./tests/*/node_modules/*")

# 1b. SKILL.md frontmatter 完整性
for f in skills/*/SKILL.md; do
  if ! head -1 "$f" | grep -q '^---$'; then
    bad "No frontmatter: $f"
    continue
  fi
  fm=$(sed -n '/^---$/,/^---$/p' "$f" | head -20)
  for field in name description; do
    if ! echo "$fm" | grep -q "^${field}:"; then
      bad "Missing frontmatter field '$field': $f"
    fi
  done
  ok
done

# 1c. Symlink 解析
while IFS= read -r l; do
  if [ -e "$l" ]; then ok; else bad "Broken symlink: $l"; fi
done < <(find . -type l -not -path "./node_modules/*" -not -path "./.git/*")

# 1d. Hook 腳本可執行權限
for f in hooks/session-start hooks/run-hook.cmd; do
  if [ -x "$f" ]; then ok; else bad "Not executable: $f"; fi
done

#==============================================================================
if [ "$QUICK" != "1" ]; then
hdr "Category 2: Installer 功能測試（17 款工具）"
#==============================================================================

declare -a TOOLS=(claude cursor codex kiro deerflow trae antigravity vscode openclaw windsurf gemini aider opencode qwen hermes claw copilot)

for tool in "${TOOLS[@]}"; do
  TMP=$(mktemp -d)
  pushd "$TMP" >/dev/null

  if ! node "$INSTALLER" --tool "$tool" >/dev/null 2>&1; then
    bad "Installer: $tool 安裝失敗"
    popd >/dev/null
    rm -rf "$TMP"
    continue
  fi

  # 幂等：再装一遍不应炸
  if ! node "$INSTALLER" --tool "$tool" >/dev/null 2>&1; then
    bad "Installer: $tool 二次安裝失敗（幂等性破壞）"
    popd >/dev/null
    rm -rf "$TMP"
    continue
  fi

  if ! node "$INSTALLER" --uninstall >/dev/null 2>&1; then
    bad "Installer: $tool 解除安裝失敗"
  else
    ok
  fi

  popd >/dev/null
  rm -rf "$TMP"
done

else
echo ""
echo "[--quick 跳過 installer 功能測試]"
fi

#==============================================================================
hdr "Category 3: 上游對齊"
#==============================================================================

if ! ensure_upstream; then
  warn "無法存取 upstream，跳過對齊檢查（CI 上請確保有網路）"
else
  # 3a. Hooks 3 文件 + cursor manifest
  for f in hooks/session-start hooks/hooks.json hooks/run-hook.cmd hooks/hooks-cursor.json; do
    d=$(diff <(git show upstream/main:$f 2>/dev/null) "$f" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$d" = "0" ]; then ok; else    bad "Hooks 漂移: $f ($d 行)"; fi
  done

  # 3b. Brainstorm scripts 3 文件
  for f in skills/brainstorming/scripts/server.cjs \
           skills/brainstorming/scripts/start-server.sh \
           skills/brainstorming/scripts/stop-server.sh; do
    d=$(diff <(git show upstream/main:$f 2>/dev/null) "$f" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$d" = "0" ]; then ok; else    bad "Brainstorm script 漂移: $(basename $f) ($d 行)"; fi
  done

  # 3c. 14 翻譯 skill 結構層級（H1-H4 標題數）
  declare -a SKILLS=(brainstorming dispatching-parallel-agents executing-plans \
    finishing-a-development-branch receiving-code-review requesting-code-review \
    subagent-driven-development systematic-debugging test-driven-development \
    using-git-worktrees using-superpowers verification-before-completion \
    writing-plans writing-skills)

  for s in "${SKILLS[@]}"; do
    up=$(git show upstream/main:skills/$s/SKILL.md 2>/dev/null | grep -cE '^#{1,4} ' || echo 0)
    our=$(grep -cE '^#{1,4} ' "skills/$s/SKILL.md" 2>/dev/null || echo 0)
    diff=$((up - our))
    abs=${diff#-}
    # 允许 3 个 header 差异（翻译造成的合并/拆分小幅波动）
    if [ "$abs" -le "3" ]; then
      ok
    else
      warn "Skill 結構漂移: ${s} (上游 H=${up}, 我們 H=${our}) -- 可能 v5.1.0 沒跟，或主動擴寫"
    fi
  done

  # 3d. requesting-code-review/code-reviewer.md 結構（v5.1.0 self-contained）
  up=$(git show upstream/main:skills/requesting-code-review/code-reviewer.md 2>/dev/null | grep -cE '^#{1,3} ' || echo 0)
  our=$(grep -cE '^#{1,3} ' skills/requesting-code-review/code-reviewer.md)
  diff=$((up - our))
  abs=${diff#-}
  if [ "$abs" -le "2" ]; then
    ok
  else
    bad "code-reviewer.md 結構漂移 (上游 v5.1.0 self-contained, H=${up}; 我們 H=${our})"
  fi
fi

#==============================================================================
hdr "Category 4: 交叉引用完整性"
#==============================================================================

# 4a. README → docs/ 連結
BROKEN=0
while IFS= read -r link; do
  link=${link#(}; link=${link%)}
  if [ -f "$link" ]; then ok; else
    bad "README 連結斷: $link"
    BROKEN=$((BROKEN+1))
  fi
done < <(grep -oE '\(docs/README\.[a-z-]+\.md\)' README.md)

# 4b. Skill 間引用（superpowers:xxx）
while IFS= read -r line; do
  skill_file=$(echo "$line" | cut -d: -f1)
  refs=$(echo "$line" | grep -oE '\bsuperpowers:[a-z-]+\b' | sort -u)
  for ref in $refs; do
    name=${ref#superpowers:}
    if [ -d "skills/$name" ]; then ok; else
      src=$(basename $(dirname "$skill_file"))
      bad "Skill 引用斷: $src 引用了不存在的 skills/$name"
    fi
  done
done < <(grep -rln 'superpowers:' skills/*/SKILL.md 2>/dev/null | \
         xargs -I{} grep -H 'superpowers:' {} 2>/dev/null)

# 4c. 裝完後 .claude/skills/using-superpowers/SKILL.md 路徑必須存在（hook 相依性）
TMP=$(mktemp -d)
pushd "$TMP" >/dev/null
if node "$INSTALLER" --tool claude >/dev/null 2>&1; then
  if [ -f "$TMP/.claude/skills/using-superpowers/SKILL.md" ]; then
    ok
  else
    bad "裝完後 .claude/skills/using-superpowers/SKILL.md 不存在（hook 會找不到）"
  fi
fi
popd >/dev/null
rm -rf "$TMP"

#==============================================================================
echo ""
echo "=========================================="
echo "📊 審計結果"
echo "=========================================="
echo "✅ PASS: $PASS"
echo "⚠️  WARN: $WARN"
echo "❌ FAIL: $FAIL"

if [ "$WARN" -gt 0 ]; then
  echo ""
  echo "Warnings（不阻擋）："
  for w in "${WARNINGS[@]}"; do echo "  ⚠️  $w"; done
fi

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "Failures（必須修）："
  for f in "${FAILURES[@]}"; do echo "  ❌ $f"; done
  echo ""
  echo "❌ Audit 失敗：$FAIL 個 P0 問題。看 README 「品質審計」段了解每項含義。"
  exit 1
fi

echo ""
echo "✅ Audit 通過"
exit 0
