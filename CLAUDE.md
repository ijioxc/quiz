# 刷題本（quiz）

- 網址：https://ijioxc.github.io/quiz/ ，由 `main` 部署。
- 原本放在資料庫 repo（ijioxc.github.io）的 `web/quiz/`，已拆成獨立 repo，歷史紀錄有保留。資料庫頂列的刷題本按鈕連到這裡。
- 改動從 `origin/main` 開分支再發 PR。

入口和版面都已完成，新增科目時不用重做，也不用重讀整個網站。

```
資料庫頂列的 .quizbtn（ijioxc.github.io 的 index.html）
  → index.html：依 exams.json 自動產生科目卡片，顯示題數和進度
  → play.html?exam=<id>：刷題／錯題本／觀念總覽三個分頁，由 engine.js 繪製
```

## 新增科目

只動這兩處，首頁卡片會自動出現：

1. 新增 `exams/<id>.js`
2. 在 `exams.json` 最前面加一筆，`total` 填題數

- 題庫格式和聽力、附圖、計算大題的寫法，看 `README.md`，只讀這份就夠。
- 不要整份讀 `exams/*.js`（最大 125 KB）。要參考時只讀開頭幾十行。
- 新增科目不要改 `index.html`、`play.html`、`engine.js`、`quiz.css`。
- 科目 id 定了就不要改。進度存在瀏覽器的 `quiz:<id>`，改了會歸零。

## 版面

- 維持現有樣式：方格底、題卡一次一題、藍色重點色。方格只是 `quiz.css` 裡的 CSS 背景，沒有圖檔，保留。
- 不要新增裝飾。要改樣式時才讀 `quiz.css`。
