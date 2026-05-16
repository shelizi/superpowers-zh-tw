#!/usr/bin/env node
// 把 package.json 的 version 同步到所有 plugin manifest（含巢狀欄位）。
// 由 npm version 鉤子觸發，跑在 version commit 建立之前。
//
// 設計：用 regex 替換而不是 JSON.parse + stringify，目的是保留原檔案格式
// （縮排、行內/多行陣列、空白等不被破壞）。每種 field 路徑對應一個專用 regex。
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

// targets 欄位對齊上游 .version-bump.json 格式（path + field 路徑）。
// 頂層用 "version"，巢狀用 dot-path（如 "plugins.0.version"）。
const TARGETS = [
  { path: '.claude-plugin/plugin.json',      field: 'version' },
  { path: '.cursor-plugin/plugin.json',      field: 'version' },
  { path: '.codex-plugin/plugin.json',       field: 'version' },
  { path: '.claude-plugin/marketplace.json', field: 'plugins.0.version' },
  { path: 'gemini-extension.json',           field: 'version' },
];

function buildPattern(field) {
  if (field === 'version') {
    return /("version"\s*:\s*")[^"]+(")/;
  }
  if (field === 'plugins.0.version') {
    // 錨定到 "plugins": [ { ... 第一個物件內的 version 欄位
    return /("plugins"\s*:\s*\[\s*\{[\s\S]*?"version"\s*:\s*")[^"]+(")/;
  }
  throw new Error(`Unsupported field path: ${field}`);
}

function readField(json, field) {
  if (field === 'version') return json.version;
  if (field === 'plugins.0.version') return json.plugins?.[0]?.version;
  throw new Error(`Unsupported field path: ${field}`);
}

let touched = 0;
for (const { path: rel, field } of TARGETS) {
  const fullPath = resolve(root, rel);
  const text = readFileSync(fullPath, 'utf8');
  const json = JSON.parse(text);
  const current = readField(json, field);
  if (current === pkg.version) continue;

  const pattern = buildPattern(field);
  const updated = text.replace(pattern, `$1${pkg.version}$2`);
  if (updated === text) {
    throw new Error(`未能在 ${rel} 中定位欄位 ${field}`);
  }
  writeFileSync(fullPath, updated, 'utf8');
  console.log(`  ${rel} (${field}): ${current} -> ${pkg.version}`);
  touched++;
}
if (touched === 0) console.log(`  plugin manifests already at ${pkg.version}`);
