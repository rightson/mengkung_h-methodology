'use strict';

// 逐字稿依集數每 50 集分一個子資料夾（如 transcripts/EP001-050/），
// 避免單一資料夾塞近千個檔案。scrape.js／fallback.js／update-readme.js 共用本模組，
// 確保三者算出的子資料夾名稱、檔案路徑完全一致。

const path = require('path');

const CHUNK_SIZE = 50;

function epId(n) {
  return String(n).padStart(3, '0'); // 補零至三碼 (EP001 … EP688)，方便依檔名排序
}

// 集數 n 所屬的子資料夾名稱，如 EP001-050、EP051-100。
function chunkDirName(n) {
  const start = Math.floor((n - 1) / CHUNK_SIZE) * CHUNK_SIZE + 1;
  const end = start + CHUNK_SIZE - 1;
  return `EP${epId(start)}-${epId(end)}`;
}

// 集數 n 在 outDir 之下的完整檔案路徑（含子資料夾）。
function epPath(outDir, n) {
  return path.join(outDir, chunkDirName(n), `EP${epId(n)}.md`);
}

module.exports = { CHUNK_SIZE, epId, chunkDirName, epPath };
