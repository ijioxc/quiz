/* 自動控制 第 3 章：古典控制學的系統描述（方塊圖、化簡、信號流程圖、梅森公式）。
   素材：課本例題 3-1、老師列的習題 1、3、4、6、8、9、25 與老師板書。pick()、fmt() 由 engine.js 提供 */
const A='assets/autocontrol-ch3/';
const poly=(a,b)=>`s² + ${a===1?'':a}s + ${b}`;

const BANK=[
/* ---------- set 1：習題 ---------- */
{id:'h1',set:1,n:1,no:'習題 1',topic:'方塊圖等效',short:'分支點移到 G₁ 後面',img:A+'q1.svg',
 q:'原方塊圖中，X 同時送進 G₁（得 Y₁）和 G₂（得 Y₂）。若改成「X 先經 G₁ 得到 Y₁，再從 Y₁ 分出一支經過某方塊得到 Y₂」，那個方塊應該是什麼才等效？',
 o:['G₁ − G₂','G₁ + G₂','G₂ / G₁','G₁ / G₂'],a:2,
 exp:'原圖 Y₂ = G₂X。新圖的分支從 Y₁ = G₁X 拉出來，所以 Y₂ = (方塊)·G₁X。要讓 (方塊)·G₁X = G₂X，方塊 = G₂/G₁。',
 deep:'<p><b>分支點（takeoff point）搬移規則</b>：分支點往後（順著訊號方向）移過方塊 G，分出去那條要多乘 <b>1/G</b>，把多算的 G 抵銷掉；往前（逆著訊號）移過 G，分支要多乘 <b>G</b>。</p><p>判斷方法不用背：寫出原圖每個輸出等於多少，再寫新圖的，兩邊相等就解出缺的方塊。</p><p class="trap">陷阱：直覺選 G₁/G₂（倒過來）。記得是「要的 G₂」除以「已經乘進去的 G₁」。</p>'},

{id:'h3',set:1,n:2,no:'習題 3',topic:'回授公式',short:'單位負回授 1/(s+1)·1/s',img:A+'q3.svg',gen:'unity',
 q:'方塊圖中 R(s) 經負回授加法點，串接 1/(s+1) 與 1/s 得 Y(s)，Y(s) 直接拉回加法點（負號）。轉移函數 Y/R 為何？',
 o:['1/(s² + s)','1/(s² + 1)','1/(s² + s + 1)','1/(s + 1)'],a:2,
 exp:'順向 G = 1/(s+1) · 1/s = 1/(s² + s)，回授 H = 1（線直接拉回）。負回授 T = G/(1+GH) = [1/(s²+s)] / [1 + 1/(s²+s)]，上下同乘 (s²+s) 得 1/(s² + s + 1)。',
 deep:'<p><b>單位回授</b>：回授路徑上沒有方塊，就是 H = 1，公式變成 T = G/(1+G)。</p><p><b>分式化簡技巧</b>：G = N/D 時，G/(1+G) = N/(D+N)。分母直接「原分母 + 原分子」，一步到位。</p><p class="trap">陷阱：選 1/(s²+s) 是忘了回授（那是開迴路 G）；負回授分母是「＋」GH，正回授才是「−」。</p>'},

{id:'h4',set:1,n:3,no:'習題 4',topic:'方塊圖化簡',short:'內含分支回授 5 的閉迴路',img:A+'q4.svg',gen:'inner',
 q:'R 經加法點（＋R、−B）進 10/(s+5) 得 X，X 再經 1/s 得 Y。另外 X 經方塊 5 與 Y 在下方加法點相加（＋＋）得 B，B 拉回第一個加法點。閉迴路轉移函數 Y/R 為何？',
 o:['50/(s² + 55s + 50)','10/(s² + 55s + 10)','10/(s² + 55s + 55)','50/(s² + 50s + 10)'],a:1,
 exp:'老師板書的列式法：E = R − 5X − Y，X = 10E/(s+5)，Y = X/s。代入得 (s+5)X/10 = R − 5X − X/s，同乘 10s：s(s+5)X = 10sR − 50sX − 10X，X(s² + 55s + 10) = 10sR。Y = X/s = 10R/(s² + 55s + 10)。',
 deep:'<p><b>列式法（最穩）</b>：每個加法點寫一條式子、每個方塊寫一條「輸出 = 方塊 × 輸入」，再消去中間變數。不怕圖複雜。</p><p><b>公式法</b>：回授訊號 B = 5X + Y = (5 + 1/s)X，等於「X 經過 (H + G₂) 回去」，所以 T = G₁G₂ / (1 + G₁(H + G₂))。一般式推導看例題講解「習題 4 的一般式」。</p><p class="trap">陷阱：把 5 當成只回授到 X 自己（內迴路），會得到錯的分母；它是和 Y 相加後一起拉回最前面。</p>'},

{id:'h6',set:1,n:4,no:'習題 6',topic:'方塊圖化簡',short:'迴路外的 G₁ 直接乘',img:A+'q6.svg',
 q:'R(s) 先經 G₁，再進負回授迴路：順向 C、G₂ 串聯，回授 H。轉移函數 Y/R 為何？',
 o:['CG₂ / (1 + CG₁G₂H)','CG₁G₂ / (1 + CG₂H)','CG₁G₂ / (1 + CG₁H)','CG₁ / (1 + CG₁G₂H)'],a:1,
 exp:'G₁ 在加法點前面、不在迴路裡，只是串聯乘上去。迴路本身：順向 CG₂、回授 H，閉迴路 = CG₂/(1 + CG₂H)。總共 G₁ · CG₂/(1 + CG₂H) = CG₁G₂/(1 + CG₂H)。',
 deep:'<p><b>先圈出迴路</b>：迴路是「從加法點出發、繞一圈回到同一個加法點」經過的方塊。G₁ 沒被繞到，所以不進分母。</p><p class="trap">陷阱：把 G₁ 也乘進分母（選 A）。分母 1 + 迴路增益，只能放「迴路上」的方塊乘積。</p>'},

{id:'h8',set:1,n:5,no:'習題 8',topic:'梅森公式',short:'兩個相接觸迴路的信號流程圖',img:A+'q8.svg',
 q:'信號流程圖：R → 1 → G₁ → G₂ → G₃ → 1 → Y。G₂ 輸出端節點以 −H₁ 回到 G₁ 輸入端節點；G₃ 輸出端節點以 −H₂ 回到 G₂ 輸入端節點。求 Y/R。',
 o:['G₁G₂G₃ / (1 + G₁G₂H₁ + G₁G₃H₂)','G₁G₂G₃ / (1 + G₂G₃H₁ + G₁G₃H₂)','G₁G₂G₃ / (1 + G₁G₂H₁ + G₂G₁H₂)','G₁G₂G₃ / (1 + G₁G₂H₁ + G₂G₃H₂)'],a:3,
 exp:'順向路徑只有一條 P₁ = G₁G₂G₃。迴路：L₁ = G₁G₂(−H₁)（−H₁ 跨過 G₁、G₂），L₂ = G₂G₃(−H₂)（−H₂ 跨過 G₂、G₃）。兩迴路共用 G₂ 的節點，彼此接觸，沒有不接觸項。Δ = 1 − (L₁ + L₂) = 1 + G₁G₂H₁ + G₂G₃H₂；兩迴路都碰到順向路徑，Δ₁ = 1。T = G₁G₂G₃ / (1 + G₁G₂H₁ + G₂G₃H₂)。',
 deep:'<p><b>迴路增益怎麼讀</b>：沿著回授支路的起點與終點，看它「跨過」哪些順向支路，就把那些增益和回授增益相乘。−H₁ 從 G₂ 後面回到 G₁ 前面，跨過 G₁、G₂。</p><p><b>梅森公式步驟</b>：①找所有順向路徑 Pₖ ②找所有迴路 Lᵢ ③找兩兩不接觸的迴路 ④Δ = 1 − ΣL + Σ(兩兩不接觸乘積) − … ⑤Δₖ = 把碰到 Pₖ 的迴路從 Δ 刪掉 ⑥T = ΣPₖΔₖ/Δ。</p><p class="trap">陷阱：迴路增益本身已帶負號（−H），代入 1 − ΣL 後變成 ＋，分母才會是 1 + …。</p>'},

{id:'h9',set:1,n:6,no:'習題 9',topic:'方塊圖化簡',short:'三個回授＋並聯 G₄ 的化簡',img:A+'q9.svg',
 q:'求整個系統的轉移函數 Y/R。',
 html:'<div class="section"><div class="section-title">題目</div><div class="content">如圖所示的控制系統方塊圖：G₁ 後接加法點（Y₂），Y₂ 分兩支，一支經 G₂（得 Y₃）再經 G₃，另一支經 G₄，兩支在最後加法點相加得 Y。回授有三條：Y₃ 經 H₁ 回到 G₁ 前的加法點；Y 經 H₂ 回到 Y₂ 的加法點；Y 直接（單位）回到最前面的加法點。全部為負回授。求整個系統的轉移函數 Y/R。</div></div>',
 sol:'<div class="section"><div class="section-title">解法一：方塊圖化簡（課本）</div><div class="content"><b>1. Y₃ 分支點左移</b>（往前移過 G₂，分支乘 G₂）：H₁ 那條變成 G₂H₁，從 Y₂ 拉回。此時 G₂G₃ 與 G₄ 並聯：<div class="formula">G₂G₃ + G₄</div><b>2. Y₂ 分支點右移</b>（往後移過 G₂G₃+G₄，分支除以它），然後化簡右邊 H₂ 迴路：<div class="formula">(G₂G₃+G₄) / [1 + (G₂G₃+G₄)H₂]，回授支路變成 G₂H₁ / (G₂G₃+G₄)</div><b>3. 串聯 G₁ 後再化簡 G₂H₁ 迴路</b>：<div class="formula">(G₁G₂G₃ + G₁G₄) / (1 + G₂G₃H₂ + G₄H₂ + G₁G₂H₁)</div><b>4. 最外圈單位回授</b>：N/(D+N)<div class="formula">Y/R = (G₁G₂G₃ + G₁G₄) / (1 + G₁G₂H₁ + G₂G₃H₂ + G₄H₂ + G₁G₂G₃ + G₁G₄)</div></div></div><div class="section"><div class="section-title">解法二：梅森公式驗算</div><div class="content">順向路徑：P₁ = G₁G₂G₃、P₂ = G₁G₄。<br>迴路（都帶負號）：−G₁G₂H₁、−G₂G₃H₂、−G₄H₂、−G₁G₂G₃、−G₁G₄。<br>五個迴路都經過 Y₂ 那個節點，兩兩接觸 → Δ = 1 + 五項之和；每個迴路都碰到兩條路徑 → Δ₁ = Δ₂ = 1。<div class="formula">T = (P₁ + P₂)/Δ，與解法一相同 ✓</div></div></div><div class="answer-box">Y/R = (G₁G₂G₃ + G₁G₄) / (1 + G₁G₂H₁ + G₂G₃H₂ + G₄H₂ + G₁G₂G₃ + G₁G₄)</div><div class="checkpoint">檢查：分母 = 1 + 所有迴路增益（去負號）；分子 = 所有順向路徑。所有迴路互相接觸時，梅森公式就這麼簡單。</div>'},

{id:'h25',set:1,n:7,no:'習題 25',topic:'梅森公式',short:'干擾估測器 Y/N',img:A+'q25.svg',
 q:'干擾估測器（disturbance observer）：干擾 N(s) 與輸入 U(s) 疊加後進入受控系統 P(s)。由 Y = P(N + U) 可估出 N̂ = P⁻¹Y − U，再經 Q(s) 回饋：U = U′ − QN̂。用梅森增益公式求閉迴路 Y(s)/N(s)。',
 o:['P(s)','P(s) / (1 + Q(s))','P(s)(1 − Q(s))','P(s)(1 − Q(s)) / (1 + Q(s))'],a:2,
 exp:'梅森：N 到 Y 的順向路徑只有 P₁ = P。迴路 L₁：U → (−) → N̂ → Q → (−) → U，增益 (−1)(Q)(−1) = +Q；迴路 L₂：U → P → Y → P⁻¹ → N̂ → Q → (−) → U，增益 −PP⁻¹Q = −Q。兩迴路接觸，Δ = 1 − (Q − Q) = 1。L₁ 不碰路徑 P（不經過 P、Y），Δ₁ = 1 − Q。Y/N = P(1 − Q)/1。答案 (C)，和截圖標示一致。',
 deep:'<p><b>代數驗算</b>：N̂ = P⁻¹·P(N + U) − U = N，估測值剛好等於真干擾。U = U′ − QN，Y = P(N + U′ − QN) = PU′ + P(1 − Q)N。</p><p><b>物理意義</b>：Q 在低頻接近 1，干擾就被 (1 − Q) 壓到接近 0，這就是「消除干擾」。</p><p><b>Δₖ 的意思</b>：從 Δ 刪掉「碰到第 k 條路徑」的迴路，剩下不碰的保留。這題 L₁ 不碰 P，所以 Δ₁ = 1 − L₁。</p><p class="trap">陷阱：只看到 Q 的回授就套 P/(1 + Q)。Q 的兩條迴路一正一負互相抵銷，分母是 1。</p>'},

/* ---------- set 2：例題講解 ---------- */
{id:'e3-1',set:2,n:1,no:'例題 3-1',topic:'系統建模',short:'電壓量測裝置的方塊圖',img:A+'ex3-1-device.jpg',
 q:'電壓量測裝置（回授系統）：畫出系統方塊圖，並求 E₂(s)/E₁(s)。',
 html:'<div class="section"><div class="section-title">題目</div><div class="content">e₁ 是待測電壓，e₂ 是量測值。若 e₂ ≠ e₁，產生誤差電壓 e = e₁ − e₂，經放大器（Kₐ）放大後驅動雙相伺服馬達（SM）運轉，帶動皮帶輪（半徑 r）使指針移動 L，直到 e₂ = e₁，這時指針指的就是待測電壓。請畫出系統方塊圖。（延伸：求 E₂(s)/E₁(s)。）</div></div>',
 sol:'<div class="section"><div class="section-title">步驟 1：列出每個元件的方程式（初始條件為零，取拉氏轉換）</div><div class="content"><div class="formula">1. 比較器：E(s) = E₁(s) − E₂(s)<br>2. 調變器：U(s) = E(s)<br>3. 放大器：Uₐ(s) = Kₐ E(s)<br>4. 雙相伺服馬達：Mₘ = −C_ω sΘₘ(s) + Mₛ，Mₛ = Cₘ Uₐ(s)<br>　　　　　　　　Mₘ = Jₘ s²Θₘ(s) + Bₘ sΘₘ(s)<br>5. 皮帶傳動：L(s) = rΘₘ(s)<br>6. 測量電位計：E₂(s) = K₁ L(s)</div>符號：Mₘ 馬達力矩；Mₛ 轉速為 0 時的力矩（堵轉轉矩）；C_ω = dMₘ/dωₘ 阻尼係數；Cₘ = Mₛ/E；Jₘ、Bₘ 為折算到馬達的總轉動慣量、黏性摩擦係數。</div></div><div class="section"><div class="section-title">步驟 2：每個方程式畫成一個小方塊</div><div class="content">確定每個元件的輸入與輸出：比較器是加法點（E₁ 正、E₂ 負）；放大器 Kₐ；Cₘ 把 Uₐ 變成 Mₛ；馬達第一式改寫成 Θₘ = (Mₛ − Mₘ)/(C_ω s)，是一個加法點接 1/(C_ω s)；第二式 Mₘ 由 Θₘ 經 Jₘs² 與 Bₘs 兩支相加；r、K₁ 各一個方塊。</div></div><div class="section"><div class="section-title">步驟 3：照訊號流向把方塊接起來</div><div class="content"><img src="'+A+'ex3-1-block.svg" alt="例題 3-1 系統方塊圖" style="width:100%;background:#fff;border-radius:6px">虛線框內是雙相伺服馬達。</div></div><div class="section"><div class="section-title">步驟 4（延伸）：化簡求 E₂/E₁</div><div class="content">馬達內迴路：Θₘ·C_ω s = Mₛ − (Jₘs² + Bₘs)Θₘ<div class="formula">Θₘ / Mₛ = 1 / [Jₘs² + (Bₘ + C_ω)s]</div>順向總增益：<div class="formula">G = Kₐ Cₘ r K₁ / [s(Jₘs + Bₘ + C_ω)]</div>最外圈是單位負回授（E₂ 直接拉回）：<div class="formula">E₂/E₁ = G/(1+G) = KₐCₘrK₁ / [Jₘs² + (Bₘ + C_ω)s + KₐCₘrK₁]</div></div></div><div class="answer-box">E₂/E₁ = KₐCₘrK₁ / [Jₘs² + (Bₘ + C_ω)s + KₐCₘrK₁]</div><div class="checkpoint">檢查：s → 0（穩態）時 E₂/E₁ → 1，指針最後讀到的就是待測電壓，符合量測裝置的目的。<br>注意老師框起來的 −C_ω sΘₘ：馬達轉越快力矩越小，所以是負號，它在方塊圖裡變成負回授的一部分。</div>'},

];

const GEN={
 unity:{orig:{K:1,a:1},rand:()=>({K:pick(1,9),a:pick(1,9)}),
  build:({K,a})=>({
   q:`R(s) 經負回授加法點，串接 ${K}/(s+${a}) 與 1/s 得 Y(s)，Y(s) 直接拉回（單位負回授）。Y/R 為何？`,
   correct:`${K}/(${poly(a,K)})`,
   wrongs:[`${K}/(s² + ${a===1?'':a}s)`,`${K}/(${poly(a,-K).replace('+ -','− ')})`,`${K}/(s + ${a+K})`,`1/(${poly(a,K)})`],
   steps:[`順向 G = ${K}/(s+${a}) · 1/s = ${K}/(s² + ${a===1?'':a}s)`,`單位回授 H = 1，T = G/(1+G)`,`G = N/D 時 T = N/(D+N)：${K}/(${poly(a,K)})`]})},
 inner:{orig:{K:10,a:5,h:5},rand:()=>({K:pick(2,12),a:pick(1,9),h:pick(1,6)}),
  build:({K,a,h})=>{const b=a+K*h,Kh=K*h;return{
   q:`R 經加法點（＋R、−B）進 ${K}/(s+${a}) 得 X，X 經 1/s 得 Y。X 另經方塊 ${h} 與 Y 相加得 B，B 拉回第一個加法點。Y/R 為何？`,
   correct:`${K}/(${poly(b,K)})`,
   wrongs:[`${Kh}/(${poly(b,Kh)})`,`${K}/(${poly(b,b)})`,`${Kh}/(${poly(Kh,K)})`,`${K}/(${poly(a,K)})`],
   steps:[`E = R − ${h}X − Y，X = ${K}E/(s+${a})，Y = X/s`,`一般式 T = G₁G₂/(1 + G₁H + G₁G₂)，同乘 s(s+${a})`,`分母 s(s+${a}) + ${K}·${h}·s + ${K} = ${poly(b,K)}`,`Y/R = ${K}/(${poly(b,K)})`]}}},
};

QUIZ.register({
 id:'autocontrol-ch3',
 title:'自動控制 第 3 章',
 eyebrow:'Automatic Control · Ch.3',
 sets:[{id:1,label:'習題'},{id:2,label:'例題講解'}],
 bank:BANK,gen:GEN,
 formulas:[
  ['C = GE，B = HC，E = R ± B','回授系統三條基本關係','式 3-6'],
  ['T = G / (1 ∓ GH)','閉迴路轉移函數；負回授分母 1 + GH','式 3-7、3-8'],
  ['T = G / (1 + G) = N / (D + N)','單位負回授（H = 1），G = N/D 時一步化簡','習題 3'],
  ['串聯 G₁G₂；並聯 G₁ ± G₂','方塊相乘、相加','習題 9'],
  ['分支點後移 ×1/G，前移 ×G','分支點搬移過方塊 G 的補償','習題 1、9'],
  ['加法點後移 ×G，前移 ×1/G','加法點搬移時另一個輸入的補償','方塊圖化簡'],
  ['T = ΣPₖΔₖ / Δ','梅森增益公式；Pₖ 第 k 條順向路徑','習題 8、25'],
  ['Δ = 1 − ΣLᵢ + ΣLᵢLⱼ − ΣLᵢLⱼLₖ + …','Lᵢ 迴路增益；乘積項只取互不接觸的迴路','習題 8、25'],
  ['Δₖ = Δ 刪掉碰到 Pₖ 的迴路','路徑 k 的餘因式','習題 25'],
 ],
 unitNote:'迴路增益要連同回授的負號一起算，代入 Δ = 1 − ΣL 後負回授會變成 ＋。',
});
