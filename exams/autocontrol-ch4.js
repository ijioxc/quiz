/* 自動控制 第 4 章：控制系統的時域響應分析（老師列的習題）。
   新增科目的方法看 ../README.md；pick()、fmt() 由 engine.js 提供。
   題號照原講義；答案依講義標示，並逐題重算核對過。 */
const f3=v=>String(+v.toFixed(3));
const p3=v=>String(+v.toPrecision(3));
const zetaOfMp=M=>-Math.log(M)/Math.sqrt(Math.PI**2+Math.log(M)**2);
const mpOf=z=>Math.exp(-z*Math.PI/Math.sqrt(1-z*z));
const poly=(b,c)=>`s² ${b?`+ ${fmt(b)}s `:''}+ ${fmt(c)}`;

const BANK = [
{id:'4-1', set:1, n:1, topic:'一階系統', short:'由步階響應讀時間常數', gen:'tau',
 q:'某控制系統之單位步階響應為 y(t) = 1 − e^(−t)，t ≥ 0，請問此系統之時間常數 (time constant) 為何？',
 o:['0.5 秒','1 秒','1.5 秒','2 秒'], a:1,
 exp:'一階系統單位步階響應的標準形是 y(t) = 1 − e^(−t/τ)。把 e^(−t) 寫成 e^(−t/1)，對照可知 τ = 1 秒。',
 deep:'<p><b>時間常數 τ 的意義：</b>響應走到最終值 63.2% 所需的時間。t = τ 時 y = 1 − e⁻¹ ≈ 0.632。</p><p>對應的轉移函數是 G(s) = 1/(τs + 1)，極點在 s = −1/τ。極點離虛軸越遠，τ 越小，反應越快。</p><p>常用的倍數：t = 4τ 時 y ≈ 98%（2% 安定時間），t = 3τ 時 y ≈ 95%。</p><p class="trap">陷阱：指數寫成 e^(−at) 時，τ = 1/a，不是 a。例如 1 − e^(−2t) 的 τ = 0.5 秒。</p>'},

{id:'4-3', set:1, n:3, topic:'暫態與穩態', short:'會衰減到零的是暫態響應',
 q:'對於一個穩定的控制系統時間響應，則當時間趨近於無窮大時，其會衰減至零的部分稱為何種響應？',
 o:['穩態響應 (steady-state response)','暫態響應 (transient response)','頻率響應 (frequency response)','強制響應 (forced response)'], a:1,
 exp:'總響應 = 暫態響應 + 穩態響應。暫態是含 e^(−σt) 的部分，t → ∞ 時衰減到零；剩下不會消失的是穩態響應。',
 deep:'<p>以 y(t) = 1 − e^(−t) 為例：「1」是穩態響應，「−e^(−t)」是暫態響應。</p><p>暫態由系統的極點決定（又叫自然響應）；穩態由輸入決定（又叫強制響應）。所以 (D) 強制響應其實是穩態那一部分，不是會消失的部分。</p><p class="trap">陷阱：只有「穩定」系統的暫態才會衰減到零。若有極點在右半平面，暫態會發散。</p>'},

{id:'4-4', set:1, n:4, topic:'二階系統', short:'ζωn 相同 → 安定時間相同',
 q:'有兩個二階系統之轉移函數分別為 G₁(s) = 1/(s² + s + 1) 和 G₂(s) = 4/(s² + s + 4)，則在時域響應上兩系統會有何種性質相同？',
 o:['最大超越量 (maximum overshoot)','尖峰時間 (peak time)','安定時間 (settling time)','延遲時間 (delay time)'], a:2,
 exp:'對照 s² + 2ζωn s + ωn²：G₁ 的 ωn = 1、ζ = 0.5；G₂ 的 ωn = 2、ζ = 0.25。兩者 2ζωn 都等於 1，即 ζωn = 0.5 相同。安定時間 ts = 4/(ζωn) = 8 秒，所以安定時間相同。',
 deep:'<p>ζωn 是極點的實部（取負號）。實部相同 → 包絡線 e^(−ζωn t) 衰減一樣快 → 安定時間相同。</p><p>其他性質：最大超越量只看 ζ（0.5 和 0.25 不同）；尖峰時間 tp = π/ωd，ωd = ωn√(1−ζ²) 兩者不同（0.866 與 1.936）。</p><p class="trap">技巧：一眼看 s 的一次項係數。一次項係數 = 2ζωn，相同就代表安定時間相同。</p>'},

{id:'4-5', set:1, n:5, topic:'二階系統', short:'兩個相同實數極點 = 臨界阻尼',
 q:'對於有兩個相同實數極點的穩定系統，則此系統應為何？',
 o:['無阻尼系統','欠阻尼系統','臨界阻尼系統','過阻尼系統'], a:2,
 exp:'極點 s = −ζωn ± ωn√(ζ² − 1)。ζ = 1 時根號內為 0，兩個極點重合在 −ωn，是相同的實數極點，即臨界阻尼。',
 deep:'<p>依 ζ 分類二階系統的極點：</p><ul><li>ζ = 0 無阻尼：一對純虛數極點 ±jωn，持續振盪。</li><li>0 &lt; ζ &lt; 1 欠阻尼：一對共軛複數極點，有超越量、會振盪後收斂。</li><li>ζ = 1 臨界阻尼：兩個相同實數極點，最快且不超越。</li><li>ζ &gt; 1 過阻尼：兩個相異實數極點，慢慢爬升、不超越。</li></ul><p class="trap">陷阱：「相異」實數極點是過阻尼，「相同」才是臨界阻尼。</p>'},

{id:'4-7', set:1, n:7, topic:'二階系統', short:'對照標準式求 ζ', gen:'zeta',
 q:'有一標準二階系統之轉移函數 T(s) = 100/(s² + 5s + 100)，則其阻尼比 ζ 為何？',
 o:['1','0.25','0.5','10'], a:1,
 exp:'標準式 ωn²/(s² + 2ζωn s + ωn²)。常數項 ωn² = 100 → ωn = 10；一次項 2ζωn = 5 → ζ = 5/(2 × 10) = 0.25。',
 deep:'<p>解題固定兩步：先由常數項開根號得 ωn，再用一次項係數 ÷ 2ωn 得 ζ。</p><p class="trap">陷阱 1：忘了除以 2，會算成 0.5。</p><p class="trap">陷阱 2：(D) 10 是 ωn，不是 ζ。</p><p>ζ = 0.25 在 0 和 1 之間，是欠阻尼，步階響應會有超越量。</p>'},

{id:'4-9', set:1, n:9, topic:'暫態性能指標', short:'最大超越量只和 ζ 有關',
 q:'對於低阻尼比 (underdamped) 之標準二階系統，其單位步階響應圖形之最大超越量與自然頻率 ωn 有何關係？',
 o:['成反比','成正比','先成反比，再成正比','無關'], a:3,
 exp:'Mp = e^(−ζπ/√(1−ζ²))，式子裡只有 ζ，沒有 ωn，所以最大超越量與 ωn 無關。',
 deep:'<p>ωn 只影響「快慢」（時間軸被壓縮或拉長），不影響「形狀」。把 ωn 加倍，整條曲線在時間上縮成一半，但峰值高度一樣。</p><p>所以：tr、tp、ts 都和 ωn 有關（ωn 大 → 越快）；Mp 只和 ζ 有關（ζ 大 → 超越量越小）。</p><p class="trap">這題常和第 4 題一起考：看到「哪個性質相同」要想到 Mp 看 ζ、ts 看 ζωn。</p>'},

{id:'4-11', set:1, n:11, topic:'二階系統', short:'由 ζ 判斷阻尼類型', gen:'cls',
 q:'一個二階系統 G(s) = 1000/(s² + 12s + 1000)，則該系統為何？',
 o:['過阻尼系統','無阻尼系統','欠阻尼系統','臨界阻尼系統'], a:2,
 exp:'ωn = √1000 ≈ 31.6，2ζωn = 12 → ζ = 12/(2 × 31.6) ≈ 0.19。0 < ζ < 1，是欠阻尼系統。',
 deep:'<p>快速判斷法：比較一次項係數 b 和 2√c（c 是常數項）。</p><ul><li>b = 0 → 無阻尼</li><li>0 &lt; b &lt; 2√c → 欠阻尼</li><li>b = 2√c → 臨界阻尼</li><li>b &gt; 2√c → 過阻尼</li></ul><p>這題 b = 12，2√1000 ≈ 63.2，12 &lt; 63.2 → 欠阻尼。等同判別式 b² − 4c &lt; 0（極點是共軛複數）。</p><p class="trap">陷阱：別被大數字 1000 嚇到以為是過阻尼，要看的是 b 和 2√c 的比較。</p>'},

{id:'4-13', set:1, n:13, topic:'暫態性能指標', short:'由步階響應圖讀 Mp 求 ζ', gen:'zmp',
 img:'assets/autocontrol-ch4/q13-step.svg',
 q:'某標準二階系統，其單位步階響應圖形如下所示（峰值 1.3 出現在 t = 0.01 s，最終值 1.0），求其阻尼比 ζ 為多少？',
 o:['0.158','0.258','0.268','0.358'], a:3,
 exp:'由圖讀出最大超越量 Mp = (1.3 − 1.0)/1.0 = 0.3。ζ = −ln Mp / √(π² + (ln Mp)²) = 1.204/√(9.870 + 1.450) = 1.204/3.365 ≈ 0.358。',
 deep:'<p>這條公式是由 Mp = e^(−ζπ/√(1−ζ²)) 反解 ζ 得到的：取 ln 後平方整理即可。</p><p>本題只用到峰值高度；圖上的 t = 0.01 s 是尖峰時間 tp，若題目再問 ωn，就用 tp = π/(ωn√(1−ζ²)) 求。</p><p class="trap">陷阱 1：Mp 是「超出最終值的比例」，要用 1.3 − 1.0 = 0.3，不是 1.3。</p><p class="trap">陷阱 2：ln 是自然對數，不是 log₁₀。</p>'},

{id:'4-14', set:1, n:14, topic:'暫態性能指標', short:'單位負回授 → 先求閉迴路再算 Mp', gen:'mp',
 q:'某單位負回授系統，其開迴路轉移函數 G(s) = 2/[s(s + 2)]，若此二階系統受到單位步階函數輸入，則其響應的最大超越量為何？',
 o:['0.0432','0.432','0.5','0.55'], a:0,
 exp:'閉迴路 T(s) = G/(1 + G) = 2/(s² + 2s + 2)。ωn = √2，2ζωn = 2 → ζ = 1/√2 ≈ 0.707。Mp = e^(−ζπ/√(1−ζ²)) = e^(−π) ≈ 0.0432（4.32%）。',
 deep:'<p><b>單位負回授的閉迴路：</b>T(s) = G(s)/[1 + G(s)]。G = N/D 時，T = N/(D + N)。這題 D = s² + 2s、N = 2，所以分母 s² + 2s + 2。</p><p>ζ = 0.707 時 ζ/√(1−ζ²) 剛好等於 1，Mp = e^(−π)。這是常見的「最佳阻尼」設計值，超越量約 4.3%。</p><p class="trap">陷阱 1：直接拿開迴路 s² + 2s 去套公式會找不到 ωn，一定要先求閉迴路。</p><p class="trap">陷阱 2：0.432 是把 4.32% 寫錯小數點，答案是 0.0432。</p>'},

{id:'4-15', set:1, n:15, topic:'暫態性能指標', short:'尖峰時間 tp = π/ωd', gen:'tp',
 q:'某個二階系統之轉移函數 G(s) = 25/(s² + 4s + 25)，試問其峰值時間 tp = π/(ωn√(1 − ζ²)) 為何？',
 o:['0.486 sec','0.586 sec','0.686 sec','0.786 sec'], a:2,
 exp:'ωn = √25 = 5，2ζωn = 4 → ζ = 0.4。ωd = ωn√(1 − ζ²) = 5 × √0.84 ≈ 4.583 rad/s。tp = π/ωd = 3.1416/4.583 ≈ 0.686 秒。',
 deep:'<p>ωd 叫「阻尼自然頻率」，是極點的虛部。極點 s = −ζωn ± jωd = −2 ± j4.583。</p><p>tp 是響應第一次到達峰值的時間，恰好是振盪半個週期：tp = π/ωd。</p><p class="trap">陷阱：用 ωn 代替 ωd 會算成 π/5 ≈ 0.628 秒，錯。一定要乘上 √(1 − ζ²)。</p>'},

{id:'4-c7', set:1, n:16, no:'計算題 7', topic:'二階系統', short:'方塊圖 → T(s)、極點、ζ、ωn、tr、tp、Mp、ts',
 img:'assets/autocontrol-ch4/p7-block.svg',
 q:'以下為一個二階系統的方塊圖（單位負回授，前向 G(s) = 5/(s² + 2s)），請針對此系統計算下列各小題。',
 html:`<div class="section"><div class="section-title">已知條件</div><div class="data-grid">
<div class="data-label">前向轉移函數</div><div class="data-value">G(s) = 5/(s² + 2s)</div>
<div class="data-label">回授</div><div class="data-value">單位負回授 H(s) = 1</div></div></div>
<div class="section"><div class="section-title">求解</div><div class="content">
(a) 閉迴路轉移函數 Y(s)/R(s)<br>(b) 特性方程式的根<br>(c) 阻尼比 ζ 與無阻尼自然頻率 ωn<br>(d) 上升時間 tr<br>(e) 峰值時間 tp<br>(f) 最大超越量百分比 Mo%<br>(g) 安定時間 ts（2% 容許誤差帶）</div></div>`,
 sol:`<div class="section"><div class="section-title">(a) 閉迴路轉移函數</div><div class="content">單位負回授：T = G/(1 + G)。G = 5/(s² + 2s)，分子 5 加到分母：
<div class="formula">Y(s)/R(s) = 5 / (s² + 2s + 5)</div></div></div>
<div class="section"><div class="section-title">(b) 特性方程式的根</div><div class="content">特性方程式就是分母 = 0：
<div class="formula">s² + 2s + 5 = 0<br>s = [−2 ± √(4 − 20)] / 2 = −1 ± j2</div>判別式 &lt; 0 → 共軛複數根 → 欠阻尼。</div></div>
<div class="section"><div class="section-title">(c) ζ 與 ωn</div><div class="content">對照 s² + 2ζωn s + ωn²：
<div class="formula">ωn² = 5 → ωn = √5 ≈ 2.236 rad/s<br>2ζωn = 2 → ζ = 1/√5 ≈ 0.447</div>順便算出之後要用的兩個量：
<div class="formula">σ = ζωn = 1（根的實部）<br>ωd = ωn√(1 − ζ²) = 2 rad/s（根的虛部）</div></div></div>
<div class="section"><div class="section-title">(d) 上升時間 tr（0 → 100%）</div><div class="content">
<div class="formula">θ = cos⁻¹ζ = cos⁻¹(0.447) ≈ 1.107 rad（63.4°）<br>tr = (π − θ)/ωd = (3.1416 − 1.107)/2 ≈ 1.017 s</div>
<div class="note">若課本用 10%→90% 的近似式 tr ≈ (1 − 0.4167ζ + 2.917ζ²)/ωn，會得到 ≈ 0.62 s。考試以老師用的定義為準。</div></div></div>
<div class="section"><div class="section-title">(e) 峰值時間 tp</div><div class="content">
<div class="formula">tp = π/ωd = π/2 ≈ 1.571 s</div></div></div>
<div class="section"><div class="section-title">(f) 最大超越量</div><div class="content">
<div class="formula">Mo = e^(−ζπ/√(1−ζ²)) = e^(−π·0.447/0.894) = e^(−π/2) ≈ 0.208<br>Mo% ≈ 20.8%</div>
<div class="note">小技巧：ζ/√(1−ζ²) 就等於 σ/ωd = 1/2，所以指數直接是 −π/2。</div></div></div>
<div class="section"><div class="section-title">(g) 安定時間（2%）</div><div class="content">
<div class="formula">ts ≈ 4/(ζωn) = 4/1 = 4 s</div>
<div class="note">2% 誤差帶用 4，5% 誤差帶用 3。</div></div></div>
<div class="answer-box">(a) 5/(s²+2s+5)　(b) −1 ± j2　(c) ζ ≈ 0.447，ωn ≈ 2.236 rad/s<br>(d) tr ≈ 1.02 s　(e) tp ≈ 1.57 s　(f) Mo ≈ 20.8%　(g) ts ≈ 4 s</div>
<div class="checkpoint">✓ 極點 −1 ± j2：實部 1 = ζωn（決定 ts），虛部 2 = ωd（決定 tp）。先求出極點，後面每一小題都是直接套。</div>`},
];

const GEN = {
  tau:{
    orig:{a:1},
    rand:()=>({a:[0.5,2,4,5,10][pick(0,4)]}),
    build:({a})=>{const t=1/a,e=a===1?'t':`${a}t`;return{
      q:`某控制系統之單位步階響應為 y(t) = 1 − e^(−${e})，t ≥ 0，請問此系統之時間常數為何？`,
      correct:`${f3(t)} 秒`,
      wrongs:[`${f3(a)} 秒`,`${f3(4*t)} 秒`,`${f3(0.632*t)} 秒`,`${f3(2*t)} 秒`],
      steps:[`標準形 y(t) = 1 − e^(−t/τ)`,`−t/τ = −${e} → τ = 1/${a}`,`τ = ${f3(t)} 秒`]}}},
  zeta:{
    orig:{wn:10,z:0.25},
    rand:()=>({wn:[2,4,5,10,20][pick(0,4)],z:[0.1,0.2,0.25,0.4,0.5,0.6,0.8][pick(0,6)]}),
    build:({wn,z})=>{const c=wn*wn,b=2*z*wn;return{
      q:`有一標準二階系統之轉移函數 T(s) = ${c}/(${poly(b,c)})，則其阻尼比 ζ 為何？`,
      correct:f3(z),
      wrongs:[f3(2*z),f3(wn),f3(b/c),f3(z/2)],
      steps:[`ωn² = ${c} → ωn = ${wn}`,`2ζωn = ${fmt(b)}`,`ζ = ${fmt(b)} / (2 × ${wn}) = ${f3(z)}`]}}},
  cls:{
    orig:{wn:Math.sqrt(1000),k:1},
    rand:()=>{const wn=[2,3,4,5,10][pick(0,4)];return{wn,k:pick(0,3)}},
    build:({wn,k})=>{
      const T=['無阻尼系統','欠阻尼系統','臨界阻尼系統','過阻尼系統'];
      const c=Math.round(wn*wn),z=k===1&&c===1000?12/(2*Math.sqrt(1000)):[0,[0.2,0.3,0.5][pick(0,2)],1,[1.25,1.5,2.5][pick(0,2)]][k];
      const b=Math.round(2*z*Math.sqrt(c)*100)/100;return{
      q:`一個二階系統 G(s) = ${c}/(${poly(b,c)})，則該系統為何？`,
      correct:T[k], wrongs:T.filter((_,i)=>i!==k),
      steps:[`ωn = √${c} ≈ ${f3(Math.sqrt(c))}`,`2√c = ${f3(2*Math.sqrt(c))}，一次項 b = ${fmt(b)}`,`ζ = b/(2ωn) ≈ ${f3(b/(2*Math.sqrt(c)))} → ${T[k]}`]}}},
  zmp:{
    orig:{M:0.3},
    rand:()=>({M:[0.05,0.1,0.15,0.2,0.25,0.4,0.5][pick(0,6)]}),
    build:({M})=>{const z=zetaOfMp(M),L=-Math.log(M);return{
      q:`（換數字版，附圖數字不適用）某標準二階系統的單位步階響應，峰值為 ${fmt(1+M)}、最終值為 1.0，求其阻尼比 ζ 為多少？`,
      correct:f3(z),
      wrongs:[f3(L/Math.PI),f3(1-M),f3(Math.max(0.05,z-0.1)),f3(z+0.1)],
      steps:[`Mp = ${fmt(1+M)} − 1 = ${fmt(M)}`,`−ln Mp = ${f3(L)}`,`ζ = ${f3(L)} / √(π² + ${f3(L)}²) = ${f3(z)}`]}}},
  mp:{
    orig:{a:2,K:2},
    rand:()=>{const a=[2,4,6][pick(0,2)];return{a,K:a*a*[0.5,1,2,4][pick(0,3)]}},
    build:({a,K})=>{const wn=Math.sqrt(K),z=a/(2*wn),M=mpOf(z);return{
      q:`某單位負回授系統，其開迴路轉移函數 G(s) = ${K}/[s(s + ${a})]，受到單位步階輸入，其響應的最大超越量為何？`,
      correct:p3(M),
      wrongs:[p3(M*10),f3(z),p3(Math.exp(-z*Math.PI)),p3(M/10)],
      steps:[`閉迴路 T(s) = ${K}/(s² + ${a}s + ${K})`,`ωn = √${K} ≈ ${f3(wn)}，ζ = ${a}/(2ωn) ≈ ${f3(z)}`,`Mp = e^(−ζπ/√(1−ζ²)) ≈ ${p3(M)}（${p3(M*100)}%）`]}}},
  tp:{
    orig:{wn:5,z:0.4},
    rand:()=>({wn:[2,4,5,8,10][pick(0,4)],z:[0.2,0.3,0.4,0.5,0.6][pick(0,4)]}),
    build:({wn,z})=>{const c=wn*wn,b=2*z*wn,wd=wn*Math.sqrt(1-z*z),t=Math.PI/wd;return{
      q:`某個二階系統之轉移函數 G(s) = ${c}/(${poly(b,c)})，試問其峰值時間 tp 為何？`,
      correct:`${f3(t)} sec`,
      wrongs:[`${f3(Math.PI/wn)} sec`,`${f3(4/(z*wn))} sec`,`${f3((Math.PI-Math.acos(z))/wd)} sec`,`${f3(2*t)} sec`],
      steps:[`ωn = √${c} = ${wn}，ζ = ${fmt(b)}/(2 × ${wn}) = ${z}`,`ωd = ${wn} × √(1 − ${z}²) ≈ ${f3(wd)} rad/s`,`tp = π/ωd ≈ ${f3(t)} 秒`]}}},
};

QUIZ.register({
  id:'autocontrol-ch4',
  title:'自動控制 第 4 章',
  eyebrow:'Automatic Control · Ch.4 時域響應',
  sets:[{id:1,label:'習題'}],
  bank:BANK, gen:GEN,
  formulas:[
    ['y(t) = 1 − e^(−t/τ)，G(s) = 1/(τs + 1)','一階系統步階響應；t = τ 時到 63.2%','第 1 題'],
    ['T(s) = ωn² / (s² + 2ζωn s + ωn²)','標準二階系統：常數項 → ωn，一次項 ÷ 2ωn → ζ','第 4、7、11、15 題'],
    ['s = −ζωn ± jωd，ωd = ωn√(1 − ζ²)','極點：實部 ζωn、虛部 ωd','計算題 7'],
    ['ζ = 0 / 0~1 / 1 / >1','無阻尼 / 欠阻尼 / 臨界阻尼 / 過阻尼','第 5、11 題'],
    ['T = G / (1 + G)','單位負回授的閉迴路轉移函數','第 14 題、計算題 7'],
    ['tr = (π − θ)/ωd，θ = cos⁻¹ζ','上升時間（0 → 100%）','計算題 7'],
    ['tp = π / ωd','尖峰時間','第 15 題、計算題 7'],
    ['Mp = e^(−ζπ/√(1−ζ²))','最大超越量，只和 ζ 有關','第 9、14 題、計算題 7'],
    ['ζ = −ln Mp / √(π² + (ln Mp)²)','由超越量反求 ζ','第 13 題'],
    ['ts ≈ 4/(ζωn)（2%）、3/(ζωn)（5%）','安定時間，只和 ζωn 有關','第 4 題、計算題 7'],
  ],
  unitNote:'ln 是自然對數；角度 θ 用弧度 (rad) 代入 tr 公式。',
});
