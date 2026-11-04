/* 自動控制 第 1 章：自動控制導論。set 1 老師列的習題，set 2 用講義各圖做的例題講解 */
const A1 = 'assets/autocontrol-ch1/';
const fig = (f, alt) => `<img src="${A1}${f}" alt="${alt}" style="max-width:100%;height:auto;border-radius:6px">`;
const LTI = ['線性非時變', '線性時變', '非線性'];

const BANK = [
  /* ───────── set 1 習題：選擇題 ───────── */
  {id:'1', set:1, n:1, no:'選擇 1', topic:'回授', short:'依回授可分哪兩大類',
   q:'回授為控制理論中一個非常重要的觀念，依此觀念可將控制系統分成哪兩大類？',
   o:['連續系統與離散系統','線性系統與非線性系統','開迴路系統與閉迴路系統','穩定系統與不穩定系統'], a:2,
   exp:'有沒有把輸出量回來和命令比較，就是「有沒有回授」。沒有回授是開迴路，有回授是閉迴路。',
   deep:'<p>其他三組也是分類，但依據不同：</p><p>連續／離散看<b>訊號在時間上是否連續</b>；線性／非線性看<b>方程式是否符合重疊原理</b>；穩定／不穩定看<b>誤差會不會隨時間趨於零</b>。</p><p class="trap">陷阱：題目關鍵字是「回授」，只有開迴路／閉迴路是依回授分的。</p>'},
  {id:'2', set:1, n:2, no:'選擇 2', topic:'回授', short:'回授訊號由哪個元件產生',
   q:'控制系統中，回授輸出訊號一般都是藉由何種元件來進行？',
   o:['參考輸入','致動器','比較器','測量器'], a:3,
   exp:'輸出（位置、速度、溫度…）要先被「量」出來，轉成電壓或數位資料，才能送回比較器。負責量的是測量器（感測器）。',
   deep:'<p>閉迴路方塊圖的五個訊號：<span class="f">r</span> 參考輸入、<span class="f">e</span> 誤差、<span class="f">u</span> 致動訊號、<span class="f">y</span> 輸出、<span class="f">b</span> 回授訊號。</p><p><span class="f">b</span> 是測量器的輸出，比較器把它和 <span class="f">r</span> 相減得到 <span class="f">e</span>。</p><p class="trap">陷阱：比較器是「用」回授訊號的地方，不是「產生」回授訊號的元件。</p>'},
  {id:'3', set:1, n:3, no:'選擇 3', topic:'開迴路與閉迴路', short:'哪個不是開迴路的優點',
   q:'相較於閉迴路系統，下列何者「不是」開迴路系統的優點？',
   o:['結構簡單','價格便宜','降低干擾','易於保養'], a:2,
   exp:'開迴路看不到輸出，干擾把輸出推偏了也不會修正，所以「降低干擾」是閉迴路的優點，不是開迴路的。',
   deep:'<p>開迴路：少了感測器和比較器 → 結構簡單、便宜、好保養，也沒有回授造成的不穩定問題。</p><p>閉迴路：能自動修正誤差 → 抗干擾、精準度高、對元件參數變化不敏感，但要多花錢、還要擔心穩定性。</p><p class="trap">陷阱：題目問「不是」，要挑閉迴路才有的優點。</p>'},
  {id:'4', set:1, n:4, no:'選擇 4', topic:'開迴路與閉迴路', short:'哪個不是閉迴路的優點',
   q:'相較於開迴路系統，下列何者「不是」閉迴路系統的優點？',
   o:['精準度可提高','不必考慮穩定性問題','可以降低參數變化的靈敏度','可以改進系統的暫態響應'], a:1,
   exp:'閉迴路正好相反：回授會讓系統可能振盪甚至發散，所以閉迴路「一定要」考慮穩定性。',
   deep:'<p>回授把輸出送回輸入，如果修正得太猛或延遲太久，就會越修越偏，像震盪電路一樣（正回授、迴路增益 = 1 時會持續震盪）。</p><p>所以穩定性是閉迴路設計的首要條件（選擇 7）。</p><p class="trap">陷阱：A、C、D 都是閉迴路真的有的優點，只有 B 是錯的敘述。</p>'},
  {id:'5', set:1, n:5, no:'選擇 5', topic:'線性與非線性', short:'哪個是非線性系統',
   q:'下列何者為非線性控制系統？',
   o:['ÿ(t) + ẏ(t) + y(t) = 1','ÿ(t) + ẏ(t) + y(t) = sin(t)','ÿ(t) + y(t)·ẏ(t) = 1','ÿ(t) + 5ẏ(t) + y(t) = e⁻ᵗ'], a:2,
   exp:'C 有 y(t)·ẏ(t)，是「輸出乘輸出的導數」，輸出變 2 倍這一項會變 4 倍，不符合線性。',
   deep:'<p>判斷線性只看<b>輸出 y 和它的各階導數</b>：每一項只能是「係數 × y 或 y 的某階導數」，而且只能一次方。</p><p>出現 <span class="f">y²</span>、<span class="f">y·ẏ</span>、<span class="f">sin y</span>、<span class="f">√y</span> 這類就是非線性。</p><p class="trap">陷阱：右邊的 1、sin(t)、e⁻ᵗ 是外加的輸入，只跟時間 t 有關，不會讓系統變成非線性。</p>'},
  {id:'6', set:1, n:6, no:'選擇 6', topic:'性能要求', short:'哪個不是性能規格的要求',
   q:'下列何者「不是」控制系統對性能規格的要求？',
   o:['價格性','穩定性','快速性','準確性'], a:0,
   exp:'講義 1-5 列的性能要求是：穩定性、快速性、準確性。價格是成本考量，不是性能規格。',
   deep:'<p>三個性能要求：</p><p><b>穩定性</b>：誤差隨時間趨於零（先決條件）。<br><b>快速性</b>：過渡過程夠快，例如砲身追得上目標。<br><b>準確性</b>：穩態誤差夠小。</p><p class="trap">口訣：穩、快、準。</p>'},
  {id:'7', set:1, n:7, no:'選擇 7', topic:'性能要求', short:'控制系統設計的首要條件',
   q:'控制系統設計的首要條件為何？',
   o:['價格性','穩定性','快速性','準確性'], a:1,
   exp:'講義：「穩定性是保證控制系統可以正常工作的先決條件。」不穩定的系統再快再準都沒有意義。',
   deep:'<p>穩定 → 誤差會隨時間減小並趨於零；不穩定 → 輸出越跑越遠（講義圖 1-25(c)）。</p><p>先穩定，再談快速（暫態）和準確（穩態誤差）。</p>'},
  {id:'8', set:1, n:8, no:'選擇 8', topic:'測試訊號', short:'哪個現象可模擬步階函數',
   q:'下列何種現象可以用來模擬步階函數？',
   o:['一個乒乓球掉落至桌面上，接觸的地方所受的壓力','一個電源開關突然啟用','一架飛機在飛行過程突然遭受亂流干擾','飛彈瞄準固定速度的敵軍戰鬥機'], a:1,
   exp:'步階：t < 0 是 0，t ≥ 0 突然跳到固定值 R 並維持。電源開關一按下，電壓從 0 跳到固定值，就是步階。',
   deep:'<p>四種測試訊號對應的生活例子：</p><p><b>步階</b>：開關突然啟動。<br><b>斜坡</b>：目標以固定速度移動（位置 = 速度 × t）。<br><b>脈衝</b>：極短時間內的很大的力，例如球撞桌面。<br><b>正弦</b>：船的搖擺、海浪。</p><p class="trap">陷阱：亂流（C）是干擾，課本把它歸成短暫衝擊，不是維持不變的步階。</p>'},
  {id:'9', set:1, n:9, no:'選擇 9', topic:'測試訊號', short:'哪個現象可模擬脈衝函數',
   q:'同上題選項，何種現象可以用來模擬脈衝函數？',
   o:['一個乒乓球掉落至桌面上，接觸的地方所受的壓力','一個電源開關突然啟用','一架飛機在飛行過程突然遭受亂流干擾','飛彈瞄準固定速度的敵軍戰鬥機'], a:0,
   exp:'脈衝是「作用時間極短、強度極大、面積（總衝量）固定」的訊號。球碰到桌面的接觸時間非常短，接觸力就是脈衝。',
   deep:'<p>定義：<span class="f">f(t) = lim(t₀→0) (A/t₀)[u(t) − u(t−t₀)]</span></p><p>寬 t₀、高 A/t₀ 的方塊，面積永遠是 A。t₀ 越短越高，極限就是脈衝 δ(t)。</p><p>講義原句：用一顆球壓在桌面上，接觸點的壓力會呈現脈衝函數的形式。</p>'},
  {id:'10', set:1, n:10, no:'選擇 10', topic:'測試訊號', short:'哪個現象可模擬斜坡函數',
   q:'同上題選項，何種現象可以用來模擬斜坡函數？',
   o:['一個乒乓球掉落至桌面上，接觸的地方所受的壓力','一個電源開關突然啟用','一架飛機在飛行過程突然遭受亂流干擾','飛彈瞄準固定速度的敵軍戰鬥機'], a:3,
   exp:'敵機速度固定，位置 = 速度 × 時間，隨 t 直線增加，就是斜坡 f(t) = Rt，斜率 R 就是速度。',
   deep:'<p>講義例子：雷達－高射砲防空系統追蹤固定速率飛行的目標，目標軌跡就是斜坡訊號。</p><p class="trap">陷阱：「固定速度」容易聯想到步階（值固定）。要分清楚：速度固定 → 位置是斜坡；位置固定 → 才是步階。</p>'},

  /* ───────── set 1 習題：問答 8（畫方塊圖） ───────── */
  {id:'q8', set:1, n:11, no:'問答 8', topic:'方塊圖', short:'機器手臂加角度計回授的方塊圖',
   q:'機器手臂加入角度計回授，畫出閉迴路方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">同第 2 題中的機器手臂，若是在手臂旋轉處加入角度計進行回授，如下圖所示會形成閉迴路系統，請畫出此閉迴路系統之方塊圖。（課本 P.21）</div></div>${fig('arm-setup.svg','機器手臂閉迴路架構：設定點、比較器、放大器、馬達、手臂、角度計')}<div class="section"><div class="section-title">提示</div><div class="content">先找出：參考輸入是什麼？誰在比較？誰在放大？誰在動？誰在量？</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：把每個元件對到標準閉迴路的位置</div><div class="data-grid">
<div class="data-label">參考輸入 r</div><div class="data-value">設定點：代表 30° 的電壓 Vin</div>
<div class="data-label">比較器</div><div class="data-value">圓圈（+ 設定點，− 回授）</div>
<div class="data-label">誤差 e</div><div class="data-value">設定電壓 − 角度計電壓</div>
<div class="data-label">控制器</div><div class="data-value">放大器（三角形）</div>
<div class="data-label">受控系統</div><div class="data-value">馬達 ＋ 機器手臂</div>
<div class="data-label">輸出 y</div><div class="data-value">手臂實際角度 θ</div>
<div class="data-label">測量器</div><div class="data-value">角度計，把 θ 轉成電壓 b</div></div></div>
<div class="section"><div class="section-title">步驟 2：照訊號流向畫出來</div>${fig('arm-block.svg','機器手臂閉迴路方塊圖')}</div>
<div class="section"><div class="section-title">步驟 3：檢查它怎麼運作</div><div class="content">手臂在 0° 時，回授電壓小於設定電壓 → 誤差為正 → 放大器推動馬達轉 → 角度變大、誤差變小 → 到 30° 時誤差 = 0，馬達停。</div></div>
<div class="answer-box">設定點 30° → (+)比較器(−) → 誤差 → 放大器 → 馬達 → 手臂角度 θ；θ 經角度計回到比較器的 − 端</div>
<div class="checkpoint">✓ 回授接在比較器的「−」端，是負回授：e = r − b<br>✓ 少了角度計就退回第 2 題的開迴路：設定點 → 放大器 → 馬達 → 手臂</div>`},

  /* ───────── set 1 習題：問答 14（拆成 7 小題） ───────── */
  {id:'14-1', set:1, n:12, no:'問答 14(1)', topic:'線性與非線性', short:'c = 5 + r² + t·r̈',
   q:'第 14 題：c(t) 是系統輸出，r(t) 是控制輸入。判斷 (1) c(t) = 5 + r²(t) + t·d²r(t)/dt² 屬於哪一種系統？',
   o:LTI, a:2,
   exp:'有 r²(t)，輸入加倍這一項變 4 倍；還有常數 5，輸入為 0 時輸出不為 0。兩者都違反線性。',
   deep:'<p><b>線性檢查（重疊原理）</b>：輸入 a·r₁ + b·r₂ 時，輸出必須等於 a·c₁ + b·c₂。</p><p>只要出現：輸入的平方或乘積、輸入放進 sin/cos/開根號、<b>額外加上的常數</b>，就是非線性。</p><p>這題的 t·r̈ 有 t 當係數（時變），但已經是非線性了，答「非線性」。</p>'},
  {id:'14-2', set:1, n:13, no:'問答 14(2)', topic:'線性與非線性', short:'c‴ + 3c″ + 6c′ + 8c = r',
   q:'第 14 題 (2)：d³c/dt³ + 3·d²c/dt² + 6·dc/dt + 8c(t) = r(t) 屬於哪一種系統？',
   o:LTI, a:0,
   exp:'每一項都是「常數 × c 的某階導數」，係數 1、3、6、8 都不隨時間變，右邊只有 r(t)。標準的線性常係數（非時變）微分方程式。',
   deep:'<p>這就是講義式 (1-1) 的形式：<span class="f">a₀ dⁿy/dtⁿ + … + aₙy = b₀ dᵐr/dtᵐ + … + bₘr</span>，係數都是常數。</p><p><b>時變的判斷</b>：係數裡面有沒有 t（例如 t·dc/dt、cos ωt）。沒有 → 非時變。</p>'},
  {id:'14-3', set:1, n:14, no:'問答 14(3)', topic:'線性與非線性', short:'t·c′ + c = r + 3r′',
   q:'第 14 題 (3)：t·dc(t)/dt + c(t) = r(t) + 3·dr(t)/dt 屬於哪一種系統？',
   o:LTI, a:1,
   exp:'每一項都只有 c 或 r 的一次方，所以是線性；但 dc/dt 前面的係數是 t，會隨時間改變，所以是時變。',
   deep:'<p>係數是 t 的函數 → 系統特性會隨時間變（像飛機燃油消耗、質量一直變）。</p><p class="trap">陷阱：t 本身不是輸入也不是輸出，t 當係數不會造成非線性，只會造成時變。</p>'},
  {id:'14-4', set:1, n:15, no:'問答 14(4)', topic:'線性與非線性', short:'c = r·cos ωt + 5',
   q:'第 14 題 (4)：c(t) = r(t)·cos ωt + 5 屬於哪一種系統？',
   o:LTI, a:2,
   exp:'關鍵在「+5」：r = 0 時 c = 5 ≠ 0，輸入加倍輸出卻不會加倍，違反齊次性，所以是非線性。（老師講義答案：非線性）',
   deep:'<p>如果沒有 +5，c(t) = r(t)·cos ωt 會是<b>線性時變</b>（cos ωt 是隨時間變的係數）。</p><p>多了常數項之後，重疊原理不成立：r₁ + r₂ 的輸出是 (r₁+r₂)cos ωt + 5，但 c₁ + c₂ = (r₁+r₂)cos ωt + 10。</p><p class="trap">陷阱：常數項看起來無害，但它就是讓系統變非線性的原因。(1) 的 5 也是同理。</p>'},
  {id:'14-5', set:1, n:16, no:'問答 14(5)', topic:'線性與非線性', short:'c = 3r + 6r′ + 5∫r',
   q:'第 14 題 (5)：c(t) = 3r(t) + 6·dr(t)/dt + 5∫₋∞ᵗ r(τ)dτ 屬於哪一種系統？',
   o:LTI, a:0,
   exp:'比例、微分、積分都是線性運算，係數 3、6、5 都是常數，所以是線性非時變。',
   deep:'<p>這個式子其實就是 <b>PID 控制器</b>的樣子：比例 P、微分 D、積分 I。</p><p>微分和積分都滿足重疊原理：d(r₁+r₂)/dt = dr₁/dt + dr₂/dt，∫(r₁+r₂) = ∫r₁ + ∫r₂。</p>'},
  {id:'14-6', set:1, n:17, no:'問答 14(6)', topic:'線性與非線性', short:'c = r²',
   q:'第 14 題 (6)：c(t) = r²(t) 屬於哪一種系統？',
   o:LTI, a:2,
   exp:'輸入 2 倍，輸出變 4 倍，不符合「輸入放大幾倍、輸出也放大幾倍」，是非線性。',
   deep:'<p>快速檢查法：把 r 換成 2r，看 c 是不是剛好變 2c。</p><p>(2r)² = 4r² ≠ 2r²，所以非線性。</p>'},
  {id:'14-7', set:1, n:18, no:'問答 14(7)', topic:'線性與非線性', short:'t < 6 時 c = 0，t ≥ 6 時 c = r',
   q:'第 14 題 (7)：c(t) = 0（t < 6）；c(t) = r(t)（t ≥ 6）。依老師講義，屬於哪一種系統？',
   o:LTI, a:0,
   exp:'輸出只是在 t ≥ 6 之後把輸入原封不動送出，沒有平方、沒有常數項，符合重疊原理，是線性。老師講義標為「線性非時變」。',
   deep:'<p>線性沒有疑問：r₁ + r₂ 的輸出 = c₁ + c₂。</p><p class="trap">注意：若嚴格用「時間平移」檢查非時變，輸入延後 T 秒，開關時間仍固定在 t = 6，輸出不等於原輸出延後 T 秒，依定義會判成<b>時變</b>，部分教科書答案也寫線性時變。考試請以老師講義的「線性非時變」為準，有疑問可以向老師確認。</p>'},

  /* ───────── set 2 例題講解 ───────── */
  {id:'e1', set:2, n:1, no:'圖 1-1、1-3', topic:'開迴路與閉迴路', short:'開迴路和閉迴路方塊圖的差別',
   q:'開迴路與閉迴路方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">比較一般開迴路系統（圖 1-1）和閉迴路系統（圖 1-3）的方塊圖，說明 r、u、y、b、e 各代表什麼，以及閉迴路多了哪些元件。</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：開迴路</div>${fig('open-loop.svg','開迴路方塊圖')}<div class="content">命令 r 進控制器，控制器輸出致動訊號 u 推動受控系統，得到輸出 y。輸出不會回來影響輸入。</div></div>
<div class="section"><div class="section-title">步驟 2：閉迴路</div>${fig('closed-loop.svg','閉迴路方塊圖')}<div class="content">多了<b>測量器</b>和<b>比較器</b>（圓圈）。測量器把 y 轉成回授訊號 b，比較器算出誤差 e = r − b，控制器依誤差決定 u。</div></div>
<div class="section"><div class="section-title">步驟 3：訊號名稱</div><div class="data-grid">
<div class="data-label">r</div><div class="data-value">參考輸入 / 命令（reference input / command）</div>
<div class="data-label">e</div><div class="data-value">誤差訊號（error signal）</div>
<div class="data-label">u</div><div class="data-value">致動訊號（actuating signal / control effort）：電流、流量、開關、電壓</div>
<div class="data-label">y 或 c</div><div class="data-value">系統輸出：位置、速度、角度、溫度、水位</div>
<div class="data-label">b</div><div class="data-value">回授訊號：電壓 / 電流（類比）、資料（數位）</div></div></div>
<div class="answer-box">閉迴路 = 開迴路 ＋ 測量器 ＋ 比較器；靠 e = r − b 自動修正</div>
<div class="checkpoint">✓ 判斷開／閉迴路只看一件事：輸出有沒有被量回來和命令比較</div>`},
  {id:'e2', set:2, n:2, no:'圖 1-2', topic:'開迴路與閉迴路', short:'熱交換器改成閉迴路',
   q:'開迴路熱交換器改成閉迴路',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">圖 1-2 的熱交換器：高溫蒸汽經閥門進入槽內的熱交換線圈，加熱流入的低溫液體，攪拌後由出口輸出。(a) 為什麼它是開迴路？(b) 要怎麼改成閉迴路？畫出方塊圖。</div></div>`,
   sol:`<div class="section"><div class="section-title">(a) 為什麼是開迴路</div><div class="content">閥門開多大是事先設好的，沒有任何元件去量輸出液體的溫度。低溫液體流量一變（干擾），出口溫度就跟著變，系統不會自己修正。</div></div>
<div class="section"><div class="section-title">(b) 改成閉迴路</div><div class="content">在出口加<b>溫度感測器</b>，把實際溫度送回控制器和設定溫度比較；太冷就把蒸汽閥門開大，太熱就關小。</div>${fig('heat-exchanger-closed.svg','熱交換器閉迴路方塊圖')}</div>
<div class="answer-box">設定溫度 → 比較器 → 控制器 → 蒸汽閥門 → 熱交換槽 → 液體溫度，溫度感測器回授</div>
<div class="checkpoint">✓ 干擾（低溫液體流入）畫在受控系統上，閉迴路能把它的影響修掉</div>`},
  {id:'e3', set:2, n:3, no:'講義 1-2-1', topic:'回授', short:'負回授與正回授：e = r ∓ b',
   q:'負回授與正回授',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">某閉迴路系統參考命令 r = 5 V，回授訊號 b = 4.2 V。(a) 若為負回授，誤差 e 是多少？(b) 若為正回授呢？(c) 哪一種會讓輸出穩定在命令附近？正回授有什麼用途？</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：套定義</div><div class="formula">負回授：e = r − b = 5 − 4.2 = 0.8 V<br>正回授：e = r + b = 5 + 4.2 = 9.2 V</div></div>
<div class="section"><div class="section-title">步驟 2：看趨勢</div><div class="content">負回授：輸出越接近命令，b 越接近 r，e 越小，控制器出力越小 → 自動收斂。<br>正回授：輸出越大，e 反而越大 → 越推越大，不會停在命令附近。</div></div>
<div class="section"><div class="section-title">步驟 3：正回授的用途</div><div class="content">震盪電路（oscillation circuit）。Op-amp 放大 A、回授網路 β，當 <b>A × β = 1、相位移 = 0°</b> 時，訊號繞一圈回來大小相同、相位相同，就能持續震盪。</div></div>
<div class="answer-box">(a) 0.8 V　(b) 9.2 V　(c) 負回授穩定在命令附近；正回授用於震盪器</div>
<div class="checkpoint">✓ 控制系統講的「回授」沒特別說明時，都是負回授</div>`},
  {id:'e4', set:2, n:4, no:'講義 Op-amp', topic:'回授', short:'反相放大器增益 G = −Rf/R1',
   q:'反相放大器增益',
   html:`<div class="section"><div class="section-title">已知條件</div><div class="data-grid">
<div class="data-label">輸入電阻</div><div class="data-value">R₁ = 10 kΩ</div>
<div class="data-label">回授電阻</div><div class="data-value">R_f = 100 kΩ</div>
<div class="data-label">輸入電壓</div><div class="data-value">V_i = 0.2 V</div></div></div>
<div class="section"><div class="section-title">求解</div><div class="content">講義的反相放大器（R_f 從輸出接回 − 端，是負回授）：求增益 G 與輸出 V_o。</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：公式</div><div class="formula">G = V_o / V_i = −R_f / R₁</div><div class="content">負號表示輸出和輸入反相。</div></div>
<div class="section"><div class="section-title">步驟 2：代數字</div><div class="formula">G = −100 / 10 = −10<br>V_o = G × V_i = −10 × 0.2 = −2 V</div></div>
<div class="answer-box">G = −10，V_o = −2 V</div>
<div class="checkpoint">✓ 增益只由兩個電阻決定，跟 op-amp 本身的大增益無關，這就是負回授「降低參數變化靈敏度」的例子<br>✓ 常見錯誤：寫成 R₁/R_f（倒過來）或忘了負號</div>`},
  {id:'e5', set:2, n:5, no:'講義 震盪器', topic:'回授', short:'方波震盪器頻率',
   q:'方波震盪器頻率',
   html:`<div class="section"><div class="section-title">已知條件</div><div class="data-grid">
<div class="data-label">充放電電阻</div><div class="data-value">R = 10 kΩ</div>
<div class="data-label">電容</div><div class="data-value">C = 0.1 µF</div>
<div class="data-label">正回授分壓</div><div class="data-value">R₁ = 10 kΩ，R₂ = 10 kΩ</div></div></div>
<div class="section"><div class="section-title">求解</div><div class="content">講義的 op-amp 方波震盪器（R₁、R₂ 接到 + 端，是正回授），求震盪頻率 f。</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：回授比例 β</div><div class="formula">β = R₁ / (R₁ + R₂) = 10 / 20 = 0.5</div></div>
<div class="section"><div class="section-title">步驟 2：週期</div><div class="formula">RC = 10×10³ × 0.1×10⁻⁶ = 1 ms<br>ln[(1+β)/(1−β)] = ln(1.5/0.5) = ln 3 ≈ 1.0986<br>T = 2RC · ln[(1+β)/(1−β)] = 2 × 1 × 1.0986 ≈ 2.197 ms</div></div>
<div class="section"><div class="section-title">步驟 3：頻率</div><div class="formula">f = 1 / T = 1 / 2.197 ms ≈ 455 Hz</div></div>
<div class="answer-box">f ≈ 455 Hz</div>
<div class="checkpoint">✓ kΩ × µF = ms，單位一次換好<br>✓ 常見錯誤：漏了 2（只算半個週期）或漏了 ln 那一項</div>`},
  {id:'e6', set:2, n:6, no:'圖 1-4', topic:'方塊圖', short:'玩電腦遊戲的回授控制',
   q:'玩電腦遊戲的回授方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">小朋友看螢幕玩電腦遊戲，也是一個回授控制系統。請指出期望目標、控制者、致動器、過程（受控系統）、測量各是什麼。</div></div>`,
   sol:`<div class="section"><div class="section-title">對應</div><div class="data-grid">
<div class="data-label">期望目標 r</div><div class="data-value">想讓遊戲角色到的位置 / 想達成的目標</div>
<div class="data-label">控制者</div><div class="data-value">遊戲者（大腦決定怎麼操作）</div>
<div class="data-label">致動器</div><div class="data-value">搖桿</div>
<div class="data-label">過程</div><div class="data-value">電子遊戲</div>
<div class="data-label">測量</div><div class="data-value">遊戲者的眼力、觸覺</div>
<div class="data-label">輸出 y</div><div class="data-value">遊戲目標（畫面上的實際結果）</div></div></div>
<div class="answer-box">期望目標 →(−)→ 遊戲者 → 搖桿 → 電子遊戲 → 遊戲目標；眼睛、觸覺量回來比較</div>
<div class="checkpoint">✓ 「人」可以同時是比較器、控制器和感測器：眼睛量、大腦比較和決定、手去操作</div>`},
  {id:'e7', set:2, n:7, no:'圖 1-5', topic:'方塊圖', short:'頂樓水塔水位控制',
   q:'頂樓水塔水位控制',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">頂樓水塔用浮球和連桿控制進水閘門：水位低，浮球下降，連桿把進水閘門打開；水位到 H_d，閘門關上。有人用水時出水閥會短暫打開。請畫出方塊圖並指出干擾。</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：找元件</div><div class="data-grid">
<div class="data-label">參考輸入</div><div class="data-value">期望水位 H_d（由連桿長度和支點決定）</div>
<div class="data-label">輸出</div><div class="data-value">實際水位 H</div>
<div class="data-label">感測器</div><div class="data-value">浮球（量水位）</div>
<div class="data-label">比較 / 控制</div><div class="data-value">連桿（把水位差轉成閘門開度）</div>
<div class="data-label">致動器</div><div class="data-value">進水閘門 → 進水流量 Q_i</div>
<div class="data-label">干擾</div><div class="data-value">出水流量 Q_o</div></div></div>
<div class="section"><div class="section-title">步驟 2：方塊圖</div>${fig('watertower-block.svg','水塔水位控制方塊圖')}</div>
<div class="answer-box">干擾是出水流量 Q_o；浮球回授讓水位自動回到 H_d</div>
<div class="checkpoint">✓ 這是純機械的閉迴路，沒有電子元件也算自動控制<br>✓ 干擾是「不受控制、會影響輸出」的外來量</div>`},
  {id:'e8', set:2, n:8, no:'圖 1-8', topic:'傳動系統', short:'傳動系統位置控制與齒輪',
   q:'傳動系統位置控制',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">圖 1-8：兩個電位計組成誤差檢測器，一個由 θ_d（設定值）轉動，一個連到負載角度 θ_ℓ（量測值）。差值 e 經放大器 K_p 驅動馬達，馬達經齒輪系帶動負載。(a) 畫出方塊圖。(b) 為什麼要加齒輪系？</div></div>`,
   sol:`<div class="section"><div class="section-title">(a) 方塊圖</div>${fig('servo-block.svg','傳動系統位置控制方塊圖')}<div class="content">電位計把角度轉成電壓，兩個電壓相減就是 e，所以「兩個電位計」合起來就是比較器 ＋ 感測器。</div></div>
<div class="section"><div class="section-title">(b) 齒輪的兩個好處</div><div class="content"><b>1. 增加解析度</b>：馬達轉很多圈，負載只轉一點點，負載角度可以控制得更細。<br><b>2. 省力</b>：小齒輪帶大齒輪，力矩放大 T₂ = T₁ · r₂/r₁，小馬達也推得動大負載。</div></div>
<div class="answer-box">θd →(−)→ 放大器 Kp → 馬達 → 齒輪系 → 負載 θℓ，量測電位計回授；齒輪用來增加解析度、省力</div>`},
  {id:'e9', set:2, n:9, no:'講義 齒輪', topic:'傳動系統', short:'負載慣量換算到馬達側',
   q:'負載慣量換算到驅動側',
   html:`<div class="section"><div class="section-title">已知條件</div><div class="data-grid">
<div class="data-label">負載慣量</div><div class="data-value">J_L = 8 kg·m²</div>
<div class="data-label">馬達側齒輪半徑</div><div class="data-value">r₁ = 5 cm</div>
<div class="data-label">負載側齒輪半徑</div><div class="data-value">r₂ = 20 cm</div></div></div>
<div class="section"><div class="section-title">求解</div><div class="content">馬達「感覺到」的等效慣量 J_eq 是多少？（J_L θ̈₂ = T₂ 換成以 θ₁、T₁ 表示）</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：齒輪的兩個條件</div><div class="formula">接觸力 N 相同：T₁ = N·r₁，T₂ = N·r₂ → T₂ = T₁ · r₂/r₁<br>接觸點速度相同：r₁θ̇₁ = r₂θ̇₂ → θ̈₂ = θ̈₁ · r₁/r₂</div></div>
<div class="section"><div class="section-title">步驟 2：代進負載側方程式</div><div class="formula">J_L θ̈₂ = T₂<br>J_L (r₁/r₂) θ̈₁ = T₁ (r₂/r₁)<br>J_L (r₁/r₂)² θ̈₁ = T₁</div></div>
<div class="section"><div class="section-title">步驟 3：代數字</div><div class="formula">J_eq = J_L (r₁/r₂)² = 8 × (5/20)² = 8 × 1/16 = 0.5 kg·m²</div></div>
<div class="answer-box">J_eq = 0.5 kg·m²</div>
<div class="checkpoint">✓ Jθ̈ = T 是轉動版的 F = ma<br>✓ 減速比 4 倍，慣量變 1/16：比例要平方<br>✓ 常見錯誤：忘了平方（得 2），或比例倒過來（得 128）</div>`},
  {id:'e10', set:2, n:10, no:'機車', topic:'方塊圖', short:'騎機車的速度控制',
   q:'機車速度控制方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">騎士看到速限 50，眼睛看速度碼錶，用手轉油門線控制引擎閥門，引擎出力 F 讓車子加速（M v̇ = F）。指出比較器、控制器、受控系統和感測器。</div></div>`,
   sol:`<div class="section"><div class="section-title">方塊圖</div>${fig('motorbike-block.svg','機車速度控制方塊圖')}</div>
<div class="section"><div class="section-title">對應</div><div class="data-grid">
<div class="data-label">參考輸入</div><div class="data-value">速限 50 km/h</div>
<div class="data-label">比較器</div><div class="data-value">騎士的大腦（50 − 目前車速）</div>
<div class="data-label">控制器 / 致動</div><div class="data-value">手 → 油門線 → 引擎閥門</div>
<div class="data-label">受控系統</div><div class="data-value">車子本身，M v̇ = F</div>
<div class="data-label">感測器</div><div class="data-value">速度碼錶（霍爾效應輪速感測器）＋ 眼睛</div></div></div>
<div class="answer-box">50 →(−)→ 大腦 → 油門線 → 引擎閥門 → F → M v̇ = F → v，碼錶和眼睛回授</div>
<div class="checkpoint">✓ 講義虛線框起來的部分（比較、油門線、眼睛）就是「人」扮演的控制器</div>`},
  {id:'e11', set:2, n:11, no:'圖 1-10、1-11', topic:'方塊圖', short:'函數記錄儀的內迴路與外迴路',
   q:'函數記錄儀方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">函數記錄儀：輸入電壓 u_r 和滑線電阻量到的筆位置電壓 u_p 相減得 Δu，經放大器驅動伺服馬達，馬達經齒輪系和繩輪拉動記錄筆。馬達軸上還有一個測速發電機。說明它有幾個迴路、各自控制什麼。</div></div>`,
   sol:`<div class="section"><div class="section-title">方塊圖</div>${fig('recorder-block.svg','函數記錄儀方塊圖')}</div>
<div class="section"><div class="section-title">兩個迴路</div><div class="content"><b>內迴路</b>：測速發電機量馬達轉速，回授到放大器，控制<b>速度</b>，讓馬達轉得穩、不衝過頭。<br><b>外迴路</b>：測量電路量記錄筆位置 u_p，和 u_r 比較，控制<b>位置</b>，讓筆畫出和輸入一樣的波形。</div></div>
<div class="answer-box">兩個迴路：內迴路（測速發電機）控速度，外迴路（測量電路）控筆的位移</div>
<div class="checkpoint">✓ 看到「一個迴路包在另一個迴路裡」就是多迴路（串級）控制，內迴路通常比較快</div>`},
  {id:'e12', set:2, n:12, no:'圖 1-12、1-13', topic:'方塊圖', short:'飛機自動駕駛的雙迴路',
   q:'飛機自動駕駛方塊圖',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">飛機自動駕駛：給定俯仰角 θ₀，垂直陀螺儀量飛機實際俯仰角 θ，放大器推動舵機改變舵角，舵角再改變飛機姿態。回授電位計量舵機角度。指出內迴路、外迴路和擾動。</div></div>`,
   sol:`<div class="section"><div class="section-title">方塊圖</div>${fig('autopilot-block.svg','飛機自動駕駛方塊圖')}</div>
<div class="section"><div class="section-title">說明</div><div class="data-grid">
<div class="data-label">內迴路</div><div class="data-value">回授電位計 → 控制舵機角度（rudder angle）</div>
<div class="data-label">外迴路</div><div class="data-value">垂直陀螺儀 → 控制飛機俯仰角 θ</div>
<div class="data-label">擾動</div><div class="data-value">作用在飛機上，例如亂流、陣風</div></div></div>
<div class="answer-box">內迴路控制舵機角度，外迴路控制飛機角度，擾動作用在「飛機」方塊</div>
<div class="checkpoint">✓ 和函數記錄儀同樣是雙迴路：內圈管執行機構，外圈管最終輸出</div>`},
  {id:'e13', set:2, n:13, no:'圖 1-14、1-15', topic:'方塊圖', short:'硬碟讀寫頭定位',
   q:'硬碟讀寫頭定位控制',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">硬碟要讓讀寫頭停在指定磁軌上。說明它的參考輸入、輸出、感測器，並說明為什麼一定要閉迴路。</div></div>`,
   sol:`<div class="section"><div class="section-title">對應（圖 1-15）</div><div class="data-grid">
<div class="data-label">參考輸入</div><div class="data-value">預期讀寫頭位置（要讀的磁軌）</div>
<div class="data-label">比較器輸出</div><div class="data-value">偏差</div>
<div class="data-label">控制器</div><div class="data-value">控制裝置（驅動器）</div>
<div class="data-label">受控系統</div><div class="data-value">硬碟讀取系統：讀寫臂轉動</div>
<div class="data-label">輸出</div><div class="data-value">實際讀寫頭位置</div>
<div class="data-label">感測器</div><div class="data-value">讀取磁碟上的位置資訊</div></div></div>
<div class="section"><div class="section-title">為什麼要閉迴路</div><div class="content">磁軌間距極小，碟片高速旋轉、溫度和振動都會讓讀寫頭偏移，開迴路無法修正，一偏就讀錯磁軌。</div></div>
<div class="answer-box">預期位置 →(−)→ 控制裝置 → 硬碟讀取系統 → 實際位置，感測器回授</div>`},
  {id:'e14', set:2, n:14, no:'圖 1-17、1-18', topic:'方塊圖', short:'天線角度控制',
   q:'天線自動控制系統',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">天線控制：輸入角度 θ_i(t) 轉動一個電位計，天線輸出角度 θ_o(t) 經齒輪帶動另一個電位計，兩個電壓送進差動放大器與功率放大器，驅動電樞控制馬達，經齒輪帶動天線（慣量 ＋ 黏性阻尼）。對照方塊圖說明每個方塊。</div></div>`,
   sol:`<div class="section"><div class="section-title">對應圖 1-18</div><div class="data-grid">
<div class="data-label">輸入感測器</div><div class="data-value">電位計：輸入角度 → 成正比的電壓</div>
<div class="data-label">合成點</div><div class="data-value">差動放大器的 + / − 端，相減得誤差（執行訊號）</div>
<div class="data-label">控制器</div><div class="data-value">訊號和功率放大器</div>
<div class="data-label">受控系統</div><div class="data-value">馬達系統、負載和齒輪</div>
<div class="data-label">感測器</div><div class="data-value">電位計：輸出角度 → 成正比的電壓</div></div></div>
<div class="answer-box">輸入角度 → 電位計 → ⊗(−) → 放大器 → 馬達＋負載＋齒輪 → 輸出角度，電位計回授</div>
<div class="checkpoint">✓ 「受控廠」（plant）就是受控系統<br>✓ 兩端都用電位計，因為比較器只能比「同一種量」，角度要先換成電壓</div>`},
  {id:'e15', set:2, n:15, no:'圖 1-19', topic:'離散系統', short:'電阻加熱爐的數位控制',
   q:'電阻加熱爐溫度控制',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">電阻加熱爐：熱電偶量爐溫，經放大濾波、A/D 送進 MCU；MCU 算出控制量，經 D/A、邊緣觸發正反器，觸發矽控整流器（SCR）控制電阻絲電流。(a) 依序寫出訊號路徑。(b) 這是連續還是離散控制系統？</div></div>`,
   sol:`<div class="section"><div class="section-title">(a) 訊號路徑</div><div class="formula">熱電偶 → 放大濾波 → A/D → MCU（比較設定溫度、計算）→ D/A → 邊緣觸發正反器 → 矽控整流器 → 電阻絲 → 爐溫 → 熱電偶</div></div>
<div class="section"><div class="section-title">(b) 離散控制</div><div class="content">MCU 只能處理數位資料，A/D 每隔一段時間取樣一次，訊號在時間上是一個一個的點，所以是<b>離散（數位）控制系統</b>，用差分方程式描述（式 1-2）。</div></div>
<div class="answer-box">感測 → 類比轉數位 → 微控制器 → 數位轉類比 → 功率元件 → 加熱；屬於離散控制系統</div>
<div class="checkpoint">✓ 看到 A/D、MCU、電腦就想到離散系統</div>`},
  {id:'e16', set:2, n:16, no:'式 (1-1)、(1-2)', topic:'離散系統', short:'連續與離散方程式的形式',
   q:'連續和離散系統方程式',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">判斷下列兩式各是連續或離散系統，並寫出階數：<br>(a) 2ÿ(t) + 3ẏ(t) + y(t) = 4r(t)<br>(b) y(k+2) + 0.5y(k+1) − 0.2y(k) = r(k)</div></div>`,
   sol:`<div class="section"><div class="section-title">步驟 1：看自變數</div><div class="content">(a) 用連續時間 t 和導數 d/dt → <b>連續系統</b>，線性常係數微分方程式（式 1-1 的形式）。<br>(b) 用整數 k（第 k 次取樣）和 k+1、k+2 → <b>離散系統</b>，線性常係數差分方程式（式 1-2 的形式）。</div></div>
<div class="section"><div class="section-title">步驟 2：階數</div><div class="formula">(a) 最高 ÿ（二階導數）→ n = 2，a₀=2, a₁=3, a₂=1, b₀=4<br>(b) 最高 y(k+2)（往前 2 步）→ n = 2，a₀=1, a₁=0.5, a₂=−0.2</div></div>
<div class="answer-box">(a) 二階連續系統　(b) 二階離散系統</div>
<div class="checkpoint">✓ 差分方程式的 y(k+1) 角色就像微分方程式的導數</div>`},
  {id:'e17', set:2, n:17, no:'圖 1-25', topic:'性能要求', short:'穩定、漸近穩定、不穩定',
   q:'穩定性的三種情況',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">圖 1-25 畫了三種狀態軌跡 x(t)，起點 x(0) 在平衡點 x_e 附近的小圓內。說明 (a) 穩定、(b) 漸近穩定、(c) 不穩定的差別。</div></div>`,
   sol:`<div class="data-grid">
<div class="data-label">(a) 穩定</div><div class="data-value">x(t) 會離開小圓，但一直待在大圓內，不會跑掉</div>
<div class="data-label">(b) 漸近穩定</div><div class="data-value">x(t) 繞一下後最後回到 x_e，誤差趨於零</div>
<div class="data-label">(c) 不穩定</div><div class="data-value">x(t) 越跑越遠，衝出大圓</div></div>
<div class="answer-box">控制系統要求的是 (b)：誤差隨時間減小並趨於零</div>
<div class="checkpoint">✓ 性能三要求：穩定性（先決條件）、快速性（過渡過程）、準確性（穩態誤差）</div>`},
  {id:'e18', set:2, n:18, no:'講義 1-6', topic:'測試訊號', short:'四種測試訊號的式子與用途',
   q:'四種測試訊號',
   html:`<div class="section"><div class="section-title">題目</div><div class="content">寫出步階、斜坡、脈衝、正弦四種測試訊號的數學式，並各舉一個實際例子和測試用途。另外：步階 R = 3 在 t = 2 時是多少？斜坡 R = 3 在 t = 2 時是多少？</div></div>`,
   sol:`<div class="data-grid">
<div class="data-label">步階 (1-6)</div><div class="data-value">f(t) = 0 (t&lt;0)；R (t≥0)，即 R·u(t)。例：電源開關突然啟動。用途：步階響應看速度、穩定性、誤差收斂</div>
<div class="data-label">斜坡 (1-7)</div><div class="data-value">f(t) = 0 (t&lt;0)；Rt (t≥0)。例：雷達追蹤等速飛行目標</div>
<div class="data-label">脈衝 (1-8)</div><div class="data-value">f(t) = lim(t₀→0) (A/t₀)[u(t) − u(t−t₀)]。例：球撞桌面的接觸力</div>
<div class="data-label">正弦 (1-9)</div><div class="data-value">f(t) = A sin(ωt ± φ)。例：船艦消擺、穩定平台追蹤。用途：測頻寬（波德圖）</div></div>
<div class="section"><div class="section-title">數字</div><div class="formula">步階：f(2) = R = 3（和時間無關）<br>斜坡：f(2) = R·t = 3 × 2 = 6</div></div>
<div class="answer-box">步階 3，斜坡 6</div>
<div class="checkpoint">✓ 斜坡就是步階的積分，步階是脈衝的積分</div>`},

  /* set 2 換數字練習 */
  {id:'p1', set:2, n:19, no:'例題 練習', topic:'回授', short:'反相放大器求 Vo', gen:'opamp',
   q:'反相放大器 R₁ = 10 kΩ、R_f = 100 kΩ，輸入 V_i = 0.2 V，輸出 V_o 是多少？',
   o:['−2 V','2 V','−0.02 V','−2.2 V'], a:0,
   exp:'G = −R_f/R₁ = −10，V_o = −10 × 0.2 = −2 V。',
   deep:'<p class="trap">陷阱：2 V 是忘了負號；−0.02 V 是電阻比倒過來；−2.2 V 是誤用非反相放大器的 1 + R_f/R₁。</p>'},
  {id:'p2', set:2, n:20, no:'例題 練習', topic:'回授', short:'方波震盪器求 f', gen:'osc',
   q:'方波震盪器 R = 10 kΩ、C = 0.1 µF、R₁ = 10 kΩ、R₂ = 10 kΩ，震盪頻率 f 約多少？',
   o:['455.1 Hz','910.2 Hz','500 Hz','227.6 Hz'], a:0,
   exp:'β = 0.5，T = 2RC·ln3 = 2 × 1 ms × 1.0986 = 2.197 ms，f = 1/T ≈ 455 Hz。',
   deep:'<p><span class="f">f = 1 / [2RC · ln((1+β)/(1−β))]</span>，<span class="f">β = R₁/(R₁+R₂)</span></p><p class="trap">陷阱：910 Hz 是漏了 2；500 Hz 是漏了 ln 項。</p>'},
  {id:'p3', set:2, n:21, no:'例題 練習', topic:'傳動系統', short:'負載慣量換算', gen:'gear',
   q:'負載慣量 J_L = 8 kg·m²，馬達側齒輪 r₁ = 5 cm、負載側齒輪 r₂ = 20 cm，換算到馬達側的等效慣量是多少？',
   o:['0.5 kg·m²','2 kg·m²','128 kg·m²','8 kg·m²'], a:0,
   exp:'J_eq = J_L (r₁/r₂)² = 8 × (1/4)² = 0.5 kg·m²。',
   deep:'<p class="trap">陷阱：2 是忘了平方；128 是比例倒過來；8 是忘了換算。</p>'},
  {id:'p4', set:2, n:22, no:'例題 練習', topic:'測試訊號', short:'脈衝近似方塊的高度', gen:'pulse',
   q:'用寬 t₀ = 0.01 s 的方塊近似脈衝，面積（強度）A = 2，方塊高度 A/t₀ 是多少？',
   o:['200','0.02','2','0.005'], a:0,
   exp:'高度 = A/t₀ = 2/0.01 = 200。寬 × 高 = 0.01 × 200 = 2，面積不變。',
   deep:'<p>t₀ 越小高度越大，但面積永遠是 A，t₀ → 0 的極限就是強度 A 的脈衝 A·δ(t)。</p>'},
];

const GEN = {
  opamp:{
    orig:{Rf:100,R1:10,Vi:0.2},
    rand:()=>({Rf:pick(20,200,10),R1:pick(5,20,5),Vi:pick(1,9)/10}),
    build:({Rf,R1,Vi})=>{const G=-Rf/R1,Vo=G*Vi;return{
      q:`反相放大器 R₁ = ${R1} kΩ、R_f = ${Rf} kΩ，輸入 V_i = ${Vi} V，輸出 V_o 是多少？`,
      ans:Vo, unit:' V',
      wr:[-Vo,-Vi*R1/Rf,-(1+Rf/R1)*Vi],
      steps:[`G = −R_f / R₁ = −${Rf} / ${R1} = ${fmt(G)}`,`V_o = G × V_i = ${fmt(G)} × ${Vi} = ${fmt(Vo)} V`]}}},
  osc:{
    orig:{R:10,C:1,R1:10,R2:10},
    rand:()=>({R:pick(5,50,5),C:pick(1,10),R1:pick(5,20,5),R2:pick(5,30,5)}),
    build:({R,C,R1,R2})=>{const RC=R*C/10,b=R1/(R1+R2),L=Math.log((1+b)/(1-b)),T=2*RC*L,f=1000/T;return{
      q:`方波震盪器 R = ${R} kΩ、C = ${fmt(C/10)} µF、R₁ = ${R1} kΩ、R₂ = ${R2} kΩ，震盪頻率 f 約多少？`,
      ans:f, unit:' Hz',
      wr:[2*f,1000/(2*RC),f/2],
      steps:[`β = R₁/(R₁+R₂) = ${R1}/${R1+R2} = ${fmt(b)}`,`RC = ${R} kΩ × ${fmt(C/10)} µF = ${fmt(RC)} ms`,`ln[(1+β)/(1−β)] = ${L.toFixed(4)}`,`T = 2RC · ln[…] = ${T.toFixed(3)} ms`,`f = 1/T = ${fmt(f)} Hz`]}}},
  gear:{
    orig:{JL:8,r1:5,k:4},
    rand:()=>{const k=pick(2,5);return{JL:pick(1,5)*k*k/2,r1:pick(2,10,2),k}},
    build:({JL,r1,k})=>{const r2=r1*k,J=JL/(k*k);return{
      q:`負載慣量 J_L = ${JL} kg·m²，馬達側齒輪 r₁ = ${r1} cm、負載側齒輪 r₂ = ${r2} cm，換算到馬達側的等效慣量是多少？`,
      ans:J, unit:' kg·m²',
      wr:[JL/k,JL*k*k,JL],
      steps:[`r₁/r₂ = ${r1}/${r2} = 1/${k}`,`J_eq = J_L (r₁/r₂)² = ${JL} × 1/${k*k} = ${fmt(J)} kg·m²`]}}},
  pulse:{
    orig:{A:2,t0:10},
    rand:()=>({A:pick(1,10),t0:pick(1,10)*10}),
    build:({A,t0})=>{const t=t0/1000,h=A/t;return{
      q:`用寬 t₀ = ${fmt(t)} s 的方塊近似脈衝，面積（強度）A = ${A}，方塊高度 A/t₀ 是多少？`,
      ans:h, unit:'',
      wr:[A*t,A,1/t],
      steps:[`高度 = A / t₀ = ${A} / ${fmt(t)} = ${fmt(h)}`,`驗算：寬 × 高 = ${fmt(t)} × ${fmt(h)} = ${A}`]}}},
};

QUIZ.register({
  id:'autocontrol-ch1',
  title:'自動控制 第 1 章',
  eyebrow:'Automatic Control · Ch.1',
  sets:[{id:1,label:'習題'},{id:2,label:'例題講解'}],
  bank:BANK, gen:GEN,
  formulas:[
    ['e = r − b','負回授的誤差訊號（正回授為 e = r + b）','講義 1-2-1'],
    ['G = Vo / Vi = −Rf / R₁','反相放大器增益','講義 Op-amp'],
    ['f = 1 / [2RC · ln((1+β)/(1−β))]，β = R₁/(R₁+R₂)','方波震盪器頻率','講義 震盪器'],
    ['Jθ̈ = T','轉動慣量 × 角加速度 = 力矩（類比 F = ma）','講義 齒輪'],
    ['T₁ = N r₁，T₂ = N r₂；r₁θ̇₁ = r₂θ̇₂','齒輪接觸力相同、接觸點速度相同','講義 齒輪'],
    ['J_L (r₁/r₂)² θ̈₁ = T₁','負載慣量換算到驅動側','講義 齒輪'],
    ['a₀ dⁿy/dtⁿ + … + aₙy = b₀ dᵐr/dtᵐ + … + bₘr','連續線性系統：線性常係數微分方程式','式 (1-1)'],
    ['a₀y(k+n) + … + aₙy(k) = b₀r(k+m) + … + bₘr(k)','離散線性系統：線性常係數差分方程式','式 (1-2)'],
    ['f(t) = R·u(t)','步階函數','式 (1-6)'],
    ['f(t) = Rt (t ≥ 0)','斜坡函數','式 (1-7)'],
    ['f(t) = lim(t₀→0) (A/t₀)[u(t) − u(t−t₀)]','脈衝函數','式 (1-8)'],
    ['f(t) = A sin(ωt ± φ)','正弦函數','式 (1-9)'],
    ['a·r₁ + b·r₂ → a·c₁ + b·c₂','線性判斷：重疊原理','問答 14'],
  ],
  unitNote:'kΩ × µF = ms。線性看「有沒有平方、乘積、常數項」，時變看「係數裡有沒有 t」。',
});
