/* 自動控制 第 2 章：古典控制學的數學建模（時域建模、拉氏轉換、微分方程求解、轉移函數）。
   set 1 是老師列出的習題（選擇題＋計算題），set 2 是課本例題與講義推導。
   新增科目的方法看 ../README.md；pick()、fmt() 由 engine.js 提供。
   計算大題的 html、sol 是 HTML；q、o、exp 是純文字，次方用上標字元寫。 */
const IMG='assets/autocontrol-ch2/';
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻','.':'·'};
const sup=v=>String(v).split('').map(c=>SUP[c]||c).join('');
const ex=p=>p===1?'e⁻ᵗ':`e⁻${sup(p)}ᵗ`;              // e^(−pt)
const exP=p=>p===1?'eᵗ':`e${sup(p)}ᵗ`;                // e^(pt)
const term=(c,p,first)=>{                              // 係數 c 乘 e^(−pt)，自動處理正負號
  const a=Math.abs(c),body=(a===1?'':fmt(a))+(p===0?(a===1?'1':''):ex(p));
  if(first)return(c<0?'−':'')+body;
  return(c<0?' − ':' + ')+body;
};
const num=v=>v<0?'−'+fmt(-v):fmt(v);                   // 負號用全形減號
const co=v=>v===1?'':fmt(v);                           // 係數 1 不寫
const sum=ts=>ts.map((t,i)=>term(t[0],t[1],i===0)).join('');

/* 計算大題的版面片段 */
const sec=(t,b)=>`<div class="section"><div class="section-title">${t}</div><div class="content">${b}</div></div>`;
const fm=s=>`<div class="formula">${s}</div>`;
const ans=s=>`<div class="answer-box">${s}</div>`;
const chk=s=>`<div class="checkpoint">${s}</div>`;
const note=s=>`<p class="note">${s}</p>`;

const BANK=[
/* ======================= set 1：習題 ======================= */
{id:'hw-m1',set:1,n:1,no:'選擇 1',topic:'拉氏轉換',short:'3te⁻²ᵗ 的拉氏轉換',gen:'lapTexp',
 q:'請問函數 f(t) = 3te⁻²ᵗ 之拉氏轉換為何？',
 o:['3/(s+2)','1/(s+2)²','1/(s+2)','3/(s+2)²'],a:3,
 exp:'先查表 ℒ{t} = 1/s²。乘上 e⁻²ᵗ 等於把 s 換成 s+2（s 平移性質），得 1/(s+2)²；常數 3 直接留著，所以答案是 3/(s+2)²。',
 deep:'<p><b>s 平移（頻率平移）</b>：ℒ{e<sup>−at</sup>f(t)} = F(s+a)。看到「某個函數 × e 的指數」就先算沒有 e 的那部分，再把所有 s 換成 s+a。</p><p>通式：ℒ{tⁿe<sup>−at</sup>} = n!/(s+a)<sup>n+1</sup>。n = 1 時就是 1/(s+a)²。</p><p class="trap">陷阱：3/(s+2) 是 3e⁻²ᵗ 的轉換，少了 t 就少一次方。t 每多一次，分母就多一次方。</p>'},

{id:'hw-m2',set:1,n:2,no:'選擇 2',topic:'拉氏轉換',short:'(ct+d)² 的拉氏轉換',
 q:'令 f(t) = (ct+d)²，則其拉氏轉換為何？',
 o:['d/(s−c)','2c²/s² + 2cd/s + d²','2c²/s³ + 2cd/s² + d²/s','c³/s³ + 2cd/s² + d/s'],a:2,
 exp:'先展開：(ct+d)² = c²t² + 2cdt + d²。逐項查表：ℒ{t²} = 2/s³、ℒ{t} = 1/s²、ℒ{1} = 1/s。所以 F(s) = 2c²/s³ + 2cd/s² + d²/s。',
 deep:'<p><b>線性性質</b>：ℒ{a·f + b·g} = a·F + b·G，所以多項式可以「展開後一項一項轉」。</p><p>ℒ{tⁿ} = n!/s<sup>n+1</sup>：t² 對應 2!/s³ = 2/s³，常數 d² 對應 d²/s。</p><p class="trap">陷阱：常數項也要除以 s。選項 B 把常數 d² 原封不動，這是最常見的錯。</p>'},

{id:'hw-m3',set:1,n:3,no:'選擇 3',topic:'拉氏轉換',short:'e^(ct)·cos dt 的拉氏轉換',
 q:'令 f(t) = eᶜᵗ cos dt，則其拉氏轉換為何？',
 o:['s/((s−c)² + d²)','(s−c)/((s−c)² + d²)','d/((s−c)(s² + d²))','c/((s−c)² + d²)'],a:1,
 exp:'ℒ{cos dt} = s/(s² + d²)。乘上 eᶜᵗ 要把「所有的 s」換成 s−c，分子也要換，所以是 (s−c)/((s−c)² + d²)。',
 deep:'<p>eᶜᵗ（指數為正）對應 s → s−c；e⁻ᵃᵗ（指數為負）對應 s → s+a。</p><p>對照：ℒ{eᶜᵗ sin dt} = d/((s−c)² + d²)，分子是常數 d，不用換。</p><p class="trap">陷阱：選項 A 只換了分母、忘了換分子的 s。cos 的分子有 s，一定要一起平移。</p>'},

{id:'hw-m7',set:1,n:4,no:'選擇 7',topic:'微分方程求解',short:'齊性 ODE 加初始條件求 y(t)',gen:'odeIC',
 q:'若系統 ODE 為 y″(t) + 4y′(t) + 3y(t) = 0，初始條件 y(0) = 2、y′(0) = 0，則此微分方程式的解 y(t) 為何？',
 o:['2e⁻ᵗ − 1e³ᵗ','3e⁻ᵗ − 1e⁻³ᵗ','3e⁻ᵗ − 2e³ᵗ','2e⁻ᵗ − 3e⁻³ᵗ'],a:1,
 exp:'兩邊取拉氏：s²Y − 2s − 0 + 4(sY − 2) + 3Y = 0 → Y = (2s+8)/((s+1)(s+3))。部分分式：在 s=−1 得 6/2 = 3，在 s=−3 得 2/(−2) = −1，所以 y = 3e⁻ᵗ − e⁻³ᵗ。',
 deep:'<p><b>微分性質</b>：ℒ{y′} = sY − y(0)，ℒ{y″} = s²Y − s·y(0) − y′(0)。初始條件就是這樣「自動進到式子裡」。</p><p>快速驗算：t=0 代入 3 − 1 = 2 ✓；y′ = −3e⁻ᵗ + 3e⁻³ᵗ，t=0 時 = 0 ✓。</p><p class="trap">陷阱：特徵根是 −1、−3（s²+4s+3 = (s+1)(s+3)），所以兩項都是負指數。看到 e³ᵗ 這種正指數的選項可以直接刪。</p>'},

{id:'hw-m8',set:1,n:5,no:'選擇 8',topic:'初值與終值定理',short:'Y(s)=(s+1)/(s(s+2)) 的初值與終值',gen:'ivtfvt',
 q:'若某控制輸出的拉氏轉換為 Y(s) = (s+1)/(s(s+2))，試求其初值 yᵢ 及終值 y_f 為何？',
 o:['yᵢ = 1、y_f = 1/2','yᵢ = 1/2、y_f = 1','yᵢ = 1、y_f = 2','yᵢ = 1、y_f = 1'],a:0,
 exp:'初值定理：yᵢ = lim(s→∞) sY = lim (s+1)/(s+2) = 1。終值定理：y_f = lim(s→0) sY = (0+1)/(0+2) = 1/2。',
 deep:'<p><b>初值定理</b>：f(0⁺) = lim<sub>s→∞</sub> sF(s)。<b>終值定理</b>：f(∞) = lim<sub>s→0</sub> sF(s)。兩個都要先乘 s。</p><p>記法：時間「一開始」對應 s 很大；時間「很久以後」對應 s 趨近 0（時間和 s 相反）。</p><p class="trap">陷阱：終值定理只有在 sY(s) 的極點全在左半平面時才成立。本題 sY = (s+1)/(s+2)，極點 −2 在左半平面，可以用。</p>'},

{id:'hw-m10',set:1,n:6,no:'選擇 10',topic:'微分方程求解',short:'二階 ODE 的單位步階響應',gen:'stepODE',
 q:'某系統之輸入為 u(t)，輸出為 y(t)，其輸入輸出的微分方程式為 y″(t) + 3y′(t) + 2y(t) = 6u(t)，且初始條件 y(0) = y′(0) = 0，若 u(t) 為單位步階函數，則其輸出響應為何？',
 o:['2e⁻²ᵗ − 3e⁻ᵗ，t ≥ 0','3e⁻²ᵗ − 6e⁻ᵗ + 3，t ≥ 0','−3e⁻²ᵗ + 3e⁻ᵗ，t ≥ 0','1，t ≥ 0'],a:1,
 exp:'初值為 0，取拉氏：(s² + 3s + 2)Y = 6/s → Y = 6/(s(s+1)(s+2))。部分分式：s=0 得 6/2 = 3；s=−1 得 6/((−1)(1)) = −6；s=−2 得 6/((−2)(−1)) = 3。所以 y = 3 − 6e⁻ᵗ + 3e⁻²ᵗ。',
 deep:'<p>步階輸入 u(t) 的拉氏是 1/s，所以輸出 Y(s) 會多一個 s=0 的極點，這一項就是穩態值（常數）。</p><p>快速檢查：用終值定理 y(∞) = lim sY = 6/2 = 3，只有選項 B 的常數是 3；再看 t=0 時 3 − 6 + 3 = 0 ✓ 符合 y(0)=0。</p><p class="trap">陷阱：選項 C 沒有常數項，等於忘了 1/s 那個極點，那是脈衝響應的形式。</p>'},

{id:'hw-m14',set:1,n:7,no:'選擇 14',topic:'轉移函數',short:'轉移函數成立的條件',
 q:'求解系統「轉移函數」(Transfer function) 時，必需同時具有哪些特性？',
 o:['線性、時變、因果系統','線性、非時變、非鬆弛','非線性、非時變、初值令為零','線性、非時變、初值令為零'],a:3,
 exp:'轉移函數 G(s) = Y(s)/U(s) 只對「線性、非時變（LTI）」系統有定義，而且要在初始條件全為零（鬆弛系統）下求。',
 deep:'<p><b>為什麼要線性</b>：拉氏轉換靠線性性質拆項，非線性（例如 y²、sin y）沒辦法直接轉成 s 的多項式。要先線性化。</p><p><b>為什麼要非時變</b>：係數必須是常數，s 的多項式才會是常係數。</p><p><b>為什麼初值為零</b>：初值不為零時，Y(s) 會多出一項跟輸入無關的「零輸入響應」，Y/U 就不再只跟系統有關。</p><p class="trap">陷阱：「鬆弛」= 初值為零，「非鬆弛」剛好相反，選項 B 是反的。</p>'},

{id:'hw-m-pz',set:1,n:8,no:'講義：極零點',topic:'轉移函數',short:'零點位置對暫態響應的影響',
 q:'G₁(s) = (4s+2)/((s+1)(s+2))，G₂(s) = (1.5s+2)/((s+1)(s+2))，兩者在單位步階輸入下 y₁(∞) = y₂(∞) = 1。哪一個的暫態響應比較大？',
 o:['G₁，會衝到約 1.33 才回到 1','G₂，會衝到約 1.33 才回到 1','一樣大，因為極點相同','無法判斷，要知道初始條件'],a:0,
 exp:'Y₁ = (4s+2)/(s(s+1)(s+2)) → y₁ = 1 + 2e⁻ᵗ − 3e⁻²ᵗ，在 t = ln3 時最大約 1.33（超越 33%）。Y₂ → y₂ = 1 − 0.5e⁻ᵗ − 0.5e⁻²ᵗ，從 0 單調爬到 1，沒有超越。所以 G₁ 的暫態大。',
 deep:'<p>兩個系統極點一樣（−1、−2），終值也一樣，差別只在<b>零點</b>：G₁ 的零點在 −0.5，G₂ 在 −1.33。</p><p>零點越靠近原點（比極點還靠近虛軸），會讓輸出前段衝得越快、越容易超越。</p><p class="trap">陷阱：極點決定「有哪些 e⁻ᵃᵗ 項、衰減多快」，零點決定「各項的係數多大」，兩個都會影響暫態，不要只看極點。</p>'},

{id:'hw-c4',set:1,n:9,no:'計算 4',topic:'線性化',short:'彈簧 F = 12.65y^1.1 的線性化',
 q:'彈簧非線性 F = 12.65y¹·¹，在平衡點 (F₀, y₀) 附近推導線性化方程式。',
 html:sec('題目','假設彈簧之輸入外力 F 與輸出變形量 y 之關係如下，其為非線性函數。若該彈簧在 F₀、y₀ 之平衡點附近進行微小變形運動，請推導在平衡點之線性化方程式。')+fm('F = 12.65 y<sup>1.1</sup>'),
 sol:sec('作法：在平衡點做泰勒展開，只留一次項',fm('F ≈ F₀ + (dF/dy)|<sub>y₀</sub> · (y − y₀)')+'對 y 微分：'+fm('dF/dy = 12.65 × 1.1 × y<sup>0.1</sup> = 13.915 y<sup>0.1</sup>'))
  +sec('線性化方程式',fm('F − F₀ = 13.915 y₀<sup>0.1</sup> (y − y₀)<br>或寫成 ΔF = 13.915 y₀<sup>0.1</sup> Δy，其中 F₀ = 12.65 y₀<sup>1.1</sup>'))
  +ans('ΔF = 13.915 y₀<sup>0.1</sup> · Δy')
  +chk('觀念：線性化就是「在工作點用切線代替曲線」。切線斜率 13.915y₀<sup>0.1</sup> 就是平衡點附近的等效彈簧常數 K，只在小變形內準確。')
  +note('陷阱：微分時次方要減 1（1.1 → 0.1），係數要乘 1.1；最後的斜率要代入 y₀，不是 y。')},

{id:'hw-c8',set:1,n:10,no:'計算 8(2)',topic:'極點與零點',short:'K(2s+3)/(s(s²+2s+2)) 的極零點圖',
 q:'求 G(s) = K(2s+3)/(s(s²+2s+2)) 的極點與零點，並畫出 s 平面分布圖（K 為常數）。',
 html:sec('題目','試求下列轉移函數之極點與零點，並繪出極點零點在 s 平面上之分布圖。')+fm('G(s) = K(2s + 3) / [ s(s² + 2s + 2) ]，K 為常數'),
 sol:sec('零點：分子 = 0',fm('2s + 3 = 0 → s = −1.5'))
  +sec('極點：分母 = 0',fm('s = 0<br>s² + 2s + 2 = 0 → s = (−2 ± √(4 − 8)) / 2 = −1 ± j'))
  +sec('s 平面分布圖（× 極點，○ 零點）',`<svg viewBox="0 0 280 200" width="280" style="max-width:100%;color:inherit" font-size="13" font-family="sans-serif"><g stroke="currentColor" fill="none" stroke-width="1.5"><path d="M10 100H270M200 10V190"/><path d="M265 96l5 4-5 4M196 15l4-5 4 5"/><path d="M194 94l12 12M206 94l-12 12M134 54l12 12M146 54l-12 12M134 134l12 12M146 134l-12 12"/><circle cx="110" cy="100" r="6"/></g><g fill="currentColor"><text x="248" y="118">σ</text><text x="208" y="20">jω</text><text x="204" y="118">0</text><text x="148" y="52">−1+j</text><text x="148" y="160">−1−j</text><text x="92" y="122">−1.5</text><text x="134" y="118">−1</text></g><path d="M140 96v8" stroke="currentColor"/></svg>`)
  +ans('零點：−1.5　極點：0、−1 + j、−1 − j')
  +chk('觀念：極點 = 讓 G(s) 變無限大的 s（分母的根）；零點 = 讓 G(s) 變 0 的 s（分子的根）。K 只影響大小，不影響位置。')
  +note('補充：分母 3 次、分子 1 次，所以在無窮遠處還有 2 個零點，一般畫圖時不畫。')},

{id:'hw-c14',set:1,n:11,no:'計算 14',topic:'阻抗法',short:'R₁ 串接、C 與 (R₂+L) 並聯的轉移函數',img:IMG+'hw-c14.svg',
 q:'試求解下列電路之轉移函數，其中輸入為 u₁(t)，輸出為 u₂(t)。',
 html:sec('題目','試求解下列電路之轉移函數 U₂(s)/U₁(s)。R₁ 串接在上方；C 與（R₂ 串 L）兩條支路都並聯在輸出端。'),
 sol:sec('步驟 1：每個元件換成 s 域阻抗',fm('R → R，L → Ls，C → 1/(Cs)'))
  +sec('步驟 2：算輸出端的並聯阻抗 Z<sub>p</sub>',fm('Z<sub>p</sub> = (1/Cs) ∥ (R₂ + Ls)<br>= (R₂ + Ls)·(1/Cs) / [ (R₂ + Ls) + 1/Cs ]<br>= (Ls + R₂) / (LCs² + R₂Cs + 1)'))
  +sec('步驟 3：分壓',fm('U₂/U₁ = Z<sub>p</sub> / (R₁ + Z<sub>p</sub>)<br>分子分母同乘 (LCs² + R₂Cs + 1)'))
  +ans('U₂(s)/U₁(s) = (Ls + R₂) / [ R₁LCs² + (R₁R₂C + L)s + R₁ + R₂ ]')
  +chk('驗算：s → 0（直流）時，C 開路、L 短路，輸出 = R₂/(R₁+R₂) 的分壓，代入答案也是 R₂/(R₁+R₂) ✓')
  +note('陷阱：並聯要用「積除以和」，R₂ 和 L 是串聯先相加，再和 C 並聯。')},

{id:'hw-c18',set:1,n:12,no:'計算 18',topic:'運算放大器',short:'輸入端 C∥Rᵢ、回授 Rₒ 的 OP 放大器',img:IMG+'hw-c18.svg',
 q:'運算放大器之迴路如下圖所示，請求出其轉移函數 Vₒ(s)/Vᵢ(s)。',
 html:sec('題目','運算放大器之迴路如下圖所示（輸入端是 C 與 Rᵢ 並聯，回授是 Rₒ，+ 端接地），請求出其轉移函數 Vₒ(s)/Vᵢ(s)。'),
 sol:sec('反相放大器公式',fm('Vₒ/Vᵢ = −Z<sub>f</sub> / Z<sub>i</sub>')+'理由：+ 端接地，虛短路讓 a 點電壓 = 0；OP 輸入端不吃電流，所以流過 Z<sub>i</sub> 的電流全部流過 Z<sub>f</sub>：Vᵢ/Z<sub>i</sub> = −Vₒ/Z<sub>f</sub>。')
  +sec('代入阻抗',fm('Z<sub>i</sub> = Rᵢ ∥ (1/Cs) = Rᵢ / (RᵢCs + 1)<br>Z<sub>f</sub> = Rₒ'))
  +ans('Vₒ(s)/Vᵢ(s) = −Rₒ(RᵢCs + 1)/Rᵢ = −(Rₒ/Rᵢ)(RᵢCs + 1)')
  +chk('觀念：這是 PD（比例＋微分）控制器：−Rₒ/Rᵢ 是比例項，−RₒC·s 是微分項（乘 s 就是微分）。')},

{id:'hw-c19',set:1,n:13,no:'計算 19',topic:'運算放大器',short:'輸入 Rᵢ、回授 Rₒ 串 C 的 OP 放大器',img:IMG+'hw-c19.svg',
 q:'運算放大器之迴路如下圖所示，請求出其轉移函數 Vₒ(s)/Vᵢ(s)。',
 html:sec('題目','運算放大器之迴路如下圖所示（輸入端是 Rᵢ，回授是 Rₒ 與 C 串聯，+ 端接地），請求出其轉移函數 Vₒ(s)/Vᵢ(s)。'),
 sol:sec('代入反相放大器公式 Vₒ/Vᵢ = −Z<sub>f</sub>/Z<sub>i</sub>',fm('Z<sub>i</sub> = Rᵢ<br>Z<sub>f</sub> = Rₒ + 1/(Cs) = (RₒCs + 1)/(Cs)'))
  +ans('Vₒ(s)/Vᵢ(s) = −(RₒCs + 1)/(RᵢCs) = −Rₒ/Rᵢ − 1/(RᵢCs)')
  +chk('觀念：這是 PI（比例＋積分）控制器：−Rₒ/Rᵢ 是比例項，−1/(RᵢCs) 是積分項（除以 s 就是積分）。')
  +note('陷阱：串聯阻抗直接相加；並聯才要積除以和。和上一題（計算 18）對照：C 放在輸入端 → 微分；C 放在回授 → 積分。')},

{id:'hw-c-ntust',set:1,n:14,no:'台科 112 碩士班 第 2 題',topic:'轉移函數',short:'含 y(t+1) 與積分項的 ODE 求 Y/R',
 q:'由微分方程式求 LTI 系統的轉移函數 Y(s)/R(s)，初始條件為零。',
 html:sec('題目','The following differential equation represents a linear time-invariant system, where r(t) denotes the input and y(t) the output. Find the transfer function Y(s)/R(s) for the system. Assume zero initial condition. (15%)')
  +fm('d²y(t+1)/dt² + 4·dy(t+1)/dt + 5y(t+1) = dr(t)/dt + 2r(t) + 2∫<sub>−∞</sub><sup>t</sup> r(τ)dτ'),
 sol:sec('步驟 1：時間平移',`y(t+1) 是 y(t) 往前移 1 秒。初值為零時 ℒ{y(t+1)} = e<sup>s</sup>Y(s)（ℒ{f(t−T)} = e<sup>−Ts</sup>F(s)，T = −1）。`)
  +sec('步驟 2：兩邊取拉氏（初值全為零）',fm('左邊：(s² + 4s + 5) e<sup>s</sup> Y(s)<br>右邊：(s + 2 + 2/s) R(s)')+'積分項：初值為零代表 t &lt; 0 時 r = 0，所以 ∫<sub>−∞</sub><sup>t</sup> = ∫<sub>0</sub><sup>t</sup>，轉換後是 R(s)/s。')
  +sec('步驟 3：整理',fm('Y/R = (s + 2 + 2/s) / [ (s² + 4s + 5) e<sup>s</sup> ]<br>分子分母同乘 s'))
  +ans('Y(s)/R(s) = (s² + 2s + 2) e<sup>−s</sup> / [ s(s² + 4s + 5) ]')
  +chk('觀念：e<sup>−s</sup> 代表系統有 1 秒的純時間延遲（輸出比輸入晚 1 秒）。乘 s 是微分、除以 s 是積分。')
  +note('答案由 Claude 推導，截圖沒有附答案。')},

/* ======================= set 2：例題講解 ======================= */
{id:'ex-rlc',set:2,n:1,no:'講義 2-2-1',topic:'電路建模',short:'RLC 串聯電路的動態方程式 (2-6)',img:IMG+'rlc.svg',
 q:'用克希荷夫定律建立 RLC 串聯電路的輸入輸出微分方程式。',
 html:sec('題目','RLC 串聯電路如圖 2-1，輸入電壓 uᵢ(t)，輸出是電容電壓 uₒ(t)。用克希荷夫電壓定律（KVL）推導 uₒ 與 uᵢ 的微分方程式。')
  +sec('會用到的元件關係',fm('電阻 v = Ri　　電感 v = L·di/dt　　電容 v = (1/C)∫i dt')),
 sol:sec('步驟 1：KVL，沿迴路所有電壓相加 = 輸入',fm('L·di/dt + Ri + (1/C)∫i dτ = uᵢ(t)　…(2-4)<br>uₒ(t) = (1/C)∫i dt　…(2-5)'))
  +sec('步驟 2：消去中間變數 i(t)','由 (2-5) 微分：i = C·duₒ/dt，再微分一次：di/dt = C·d²uₒ/dt²。代回 (2-4)：'+fm('L·C·d²uₒ/dt² + R·C·duₒ/dt + uₒ = uᵢ'))
  +ans('LC·uₒ″ + RC·uₒ′ + uₒ = uᵢ　…(2-6)')
  +chk('觀念：串聯電路的電流處處相同，所以先用 i 寫 KVL，再用「電容電壓 ↔ 電流」關係把 i 換掉，就只剩輸入與輸出。')
  +note('二階方程式 ↔ 有兩個儲能元件（L 存磁能、C 存電能）。之後例題 2-12、2-15 都用這條式子。')},

{id:'ex-mck',set:2,n:2,no:'講義 機械建模',topic:'機械建模',short:'質量-彈簧-無質量節點-阻尼器',img:IMG+'mck2.svg',
 q:'質量 M 受力 F，經彈簧 k 接到一個無質量的點，再經阻尼器 c 接到牆。求運動方程式與 X(s)/F(s)、X₁(s)/F(s)。',
 html:sec('題目','如圖，質量 M 受外力 F，位移 x；彈簧 k 另一端是無質量的點（m = 0），位移 x₁；該點經阻尼器 c 接到固定牆。')
  +sec('元件力關係',fm('彈簧 F = k(位移差)　阻尼器 F = c(速度差)　質量 ΣF = mẍ')),
 sol:sec('步驟 1：對 M 畫受力',fm('Mẍ = F − k(x − x₁)'))
  +sec('步驟 2：對無質量節點畫受力（m = 0，所以合力 = 0）',fm('0 = k(x − x₁) − c·ẋ₁'))
  +sec('步驟 3：整理並取拉氏（初值為零）',fm('Mẍ + kx − kx₁ = F　→　(Ms² + k)X − kX₁ = F<br>−kx + cẋ₁ + kx₁ = 0　→　−kX + (cs + k)X₁ = 0'))
  +sec('步驟 4：寫成矩陣解聯立',fm('[ Ms²+k　−k ] [ X ]　 [ F ]<br>[ −k　 cs+k ] [ X₁ ] = [ 0 ]')+'行列式 Δ = (Ms² + k)(cs + k) − k² = cMs³ + kMs² + cks（k² 互相抵消）。')
  +ans('X/F = (cs + k) / (cMs³ + kMs² + cks)<br>X₁/F = k / (cMs³ + kMs² + cks)')
  +chk('觀念：無質量的點也可以列方程式，只是 mẍ = 0，代表兩邊的力要平衡。這和講義上 sympy 的 A.inv()*b 結果一致。')
  +note('MATLAB：syms M k s c F；A=[M*s^2+k -k; -k c*s+k]；b=[F 0].\'；inv(A)*b')},

{id:'ex-gear',set:2,n:3,no:'講義 2-2-1 (2-12)~(2-16)',topic:'機械建模',short:'齒輪系統的等效慣量與阻尼',
 q:'推導齒輪傳動系統折算到軸 1 的等效慣量 J_eq、等效阻尼 B_eq 與等效負載轉矩。',
 html:sec('題目','圖 2-5：馬達轉矩 M<sub>m</sub> 驅動軸 1（慣量 J₁、摩擦 B₁、齒數 N₁），齒輪 1 咬合齒輪 2（齒數 N₂），軸 2 有 J₂、B₂ 與負載轉矩 M<sub>c</sub>。推導從軸 1 看過去的等效系統。')
  +sec('齒輪咬合的條件',fm('接觸點線速度相同：r₁ω₁ = r₂ω₂<br>傳遞功率相同：M₁ω₁ = M₂ω₂<br>齒數與半徑成正比：r₁/r₂ = N₁/N₂')),
 sol:sec('步驟 1：兩根軸各自寫牛頓第二定律',fm('軸 1：J₁·dω₁/dt + B₁ω₁ + M₁ = M<sub>m</sub>　(2-10)<br>軸 2：J₂·dω₂/dt + B₂ω₂ + M<sub>c</sub> = M₂　(2-11)'))
  +sec('步驟 2：用齒輪比消去 ω₂、M₁、M₂',fm('ω₂ = (N₁/N₂)ω₁，M₁ = (N₁/N₂)M₂')+'把 (2-11) 乘 N₁/N₂ 得 M₁，代入 (2-10)：'+fm('M<sub>m</sub> = [J₁ + (N₁/N₂)²J₂]·dω₁/dt + [B₁ + (N₁/N₂)²B₂]ω₁ + (N₁/N₂)M<sub>c</sub>'))
  +ans('J_eq = J₁ + (N₁/N₂)²J₂　B_eq = B₁ + (N₁/N₂)²B₂　M_c,eq = (N₁/N₂)M_c<br>J_eq·θ̈₁ + B_eq·θ̇₁ = M<sub>m</sub> − M_c,eq　(2-16)')
  +chk('觀念：負載端的慣量與阻尼折算到馬達端要乘「齒數比的平方」；轉矩只乘一次。減速齒輪（N₁ &lt; N₂）讓負載看起來變輕。')
  +note('陷阱：ω 和 M 的換算方向相反。ω₂ = (N₁/N₂)ω₁（小齒輪帶大齒輪，轉速變慢），M₂ = (N₂/N₁)M₁（轉矩變大）。')},

{id:'ex2-1',set:2,n:4,no:'例題 2-1',topic:'拉氏轉換',short:'3t − 5sin2t 的拉氏轉換',
 q:'試求 3t − 5sin2t 的拉氏轉換。',
 html:sec('題目','試求下列函數拉氏轉換。')+fm('3t − 5 sin 2t'),
 sol:sec('步驟 1：線性性質，一項一項轉',fm('ℒ{3t − 5sin2t} = 3ℒ{t} − 5ℒ{sin2t}'))
  +sec('步驟 2：查表',fm('ℒ{t} = 1/s²　　ℒ{sin ωt} = ω/(s² + ω²)，ω = 2'))
  +ans('F(s) = 3/s² − 10/(s² + 4)')
  +note('陷阱：sin 的分子是 ω，所以 5 × 2 = 10；cos 的分子才是 s。')},

{id:'ex2-2',set:2,n:5,no:'例題 2-2',topic:'拉氏反轉換',short:'查表求兩個 F(s) 的反轉換',
 q:'試求 (1) F(s) = 1/s + 5/s² − 3/s⁴；(2) F(s) = 1/(s+3) + (s+1)/(s²+9) 的拉氏反轉換。',
 html:sec('題目','試求下列函數之拉氏反轉換。')+fm('(1) F(s) = 1/s + 5/s² − 3/s⁴<br>(2) F(s) = 1/(s + 3) + (s + 1)/(s² + 9)'),
 sol:sec('(1) 用 ℒ⁻¹{n!/s<sup>n+1</sup>} = tⁿ',fm('1/s → 1　　5/s² → 5t<br>3/s⁴ = (3/3!)·(3!/s⁴) → (1/2)t³'))
  +sec('(2) 把 (s+1)/(s²+9) 拆成 cos 和 sin 兩塊',fm('1/(s+3) → e<sup>−3t</sup><br>s/(s² + 9) → cos3t<br>1/(s² + 9) = (1/3)·3/(s² + 9) → (1/3)sin3t'))
  +ans('(1) f(t) = 1 + 5t − ½t³<br>(2) f(t) = e<sup>−3t</sup> + cos3t + ⅓sin3t')
  +note('陷阱：sin 的表是 ω/(s²+ω²)，分子要湊出 ω = 3，所以前面補 1/3；s⁴ 對應 t³ 要除以 3! = 6。')},

{id:'ex2-4',set:2,n:6,no:'例題 2-4',topic:'初值與終值定理',short:'(s+2)/(s(s²+9s+14)) 的初值與終值',
 q:'若 ŷ(s) = (s+2)/(s(s²+9s+14))，求 y(0) 與 lim(t→∞) y(t)。',
 html:sec('題目','若 ŷ(s) = (s + 2) / [ s(s² + 9s + 14) ]，且 ℒ{y(t)} = ŷ(s)，試求：(1) y(0) = ?　(2) lim<sub>t→∞</sub> y(t) = ?'),
 sol:sec('(1) 初值定理',fm('y(0) = lim<sub>s→∞</sub> s·ŷ(s) = lim<sub>s→∞</sub> (s + 2)/(s² + 9s + 14) = 0')+'分母比分子高一次，s 很大時趨近 0。')
  +sec('(2) 終值定理（先確認可以用）',fm('s² + 9s + 14 = (s + 2)(s + 7)，根 −2、−7 都在左半平面 ✓<br>y(∞) = lim<sub>s→0</sub> s·ŷ(s) = 2/14 = 1/7'))
  +ans('y(0) = 0，y(∞) = 1/7')
  +chk('驗算：(s+2) 可以約掉，ŷ = 1/(s(s+7))，y(t) = (1 − e<sup>−7t</sup>)/7。t=0 時 0、t→∞ 時 1/7 ✓')},

{id:'ex2-5',set:2,n:7,no:'例題 2-5',topic:'拉氏轉換',short:'e⁻²ᵗcos6t 與 t³e⁴ᵗ',
 q:'試求 (1) f(t) = e⁻²ᵗcos6t；(2) f(t) = t³e⁴ᵗ 的拉氏轉換。',
 html:sec('題目','試求下列函數之拉氏轉換 ℒ{f(t)} = ?')+fm('(1) f(t) = e<sup>−2t</sup> cos6t　　(2) f(t) = t³e<sup>4t</sup>'),
 sol:sec('(1) s 平移：e<sup>−2t</sup> → s 換成 s+2',fm('ℒ{cos6t} = s/(s² + 36)<br>→ (s + 2)/((s + 2)² + 36)'))
  +sec('(2) s 平移：e<sup>4t</sup> → s 換成 s−4',fm('ℒ{t³} = 3!/s⁴ = 6/s⁴<br>→ 6/(s − 4)⁴'))
  +ans('(1) (s + 2)/((s + 2)² + 36) = (s + 2)/(s² + 4s + 40)<br>(2) 6/(s − 4)⁴')
  +note('陷阱：e 的指數是正的（e<sup>4t</sup>）要變 s − 4，負的才變 s + a。')},

{id:'ex2-6',set:2,n:8,no:'例題 2-6',topic:'拉氏反轉換',short:'1/(s²+2s+5) 配方求反轉換',
 q:'試求 ℒ⁻¹{1/(s²+2s+5)}。',
 html:sec('題目','試求下列拉氏反轉換。')+fm('ℒ<sup>−1</sup>{ 1/(s² + 2s + 5) } = ?'),
 sol:sec('步驟 1：判別式 4 − 20 &lt; 0，是共軛複數根 → 配方',fm('s² + 2s + 5 = (s + 1)² + 4 = (s + 1)² + 2²'))
  +sec('步驟 2：湊成 e<sup>−at</sup>sin ωt 的形式 ω/((s+a)² + ω²)',fm('1/((s+1)² + 2²) = ½ · 2/((s+1)² + 2²)'))
  +ans('f(t) = ½ e<sup>−t</sup> sin2t')
  +chk('觀念：分母配方後，(s+a) 的 a 變成衰減 e<sup>−at</sup>，ω 變成振盪頻率。這就是系統「邊振盪邊衰減」的來源。')},

{id:'ex2-10',set:2,n:9,no:'例題 2-10',topic:'部分分式',short:'含重根 (s−2)² 的部分分式',
 q:'試求 ℒ⁻¹{(2s+1)/((s+1)(s−2)²)}。',
 html:sec('題目','試求下列拉氏反轉換。')+fm('ℒ<sup>−1</sup>{ (2s + 1) / [ (s + 1)(s − 2)² ] } = ?'),
 sol:sec('步驟 1：設部分分式（重根要寫到最高次）',fm('F(s) = A/(s + 1) + B/(s − 2) + C/(s − 2)²'))
  +sec('步驟 2：不重複根 s = −1，蓋掉 (s+1) 代入',fm('A = (2s + 1)/(s − 2)² |<sub>s=−1</sub> = (−1)/9 = −1/9'))
  +sec('步驟 3：重根最高次 C，蓋掉 (s−2)² 代入 s = 2',fm('C = (2s + 1)/(s + 1) |<sub>s=2</sub> = 5/3'))
  +sec('步驟 4：重根低一次 B，對同一個式子微分一次再代入',fm('d/ds[(2s + 1)/(s + 1)] = [2(s + 1) − (2s + 1)]/(s + 1)² = 1/(s + 1)²<br>B = 1/9'))
  +ans('f(t) = −(1/9)e<sup>−t</sup> + (1/9)e<sup>2t</sup> + (5/3)t·e<sup>2t</sup>')
  +chk('驗算：A + B = 0（s 很大時 F ≈ 2/s²，沒有 1/s 項）✓')
  +note('陷阱：重根 (s−a)ⁿ 的係數，最高次直接代入，次高次要微分一次（公式 2-30 的 k = 1），再低要微分兩次並除以 2!。')},

{id:'ex-pf',set:2,n:10,no:'2-3-4 MATLAB 例',topic:'部分分式',short:'(3s+8)/(s²+5s+6) 的部分分式',
 q:'求 (3s+8)/(s²+5s+6) 的部分分式展開。',
 html:sec('題目','欲求下式的部分分式展開（課本用 MATLAB 的 residue 指令示範，這裡用手算）：')+fm('(3s + 8)/(s² + 5s + 6)'),
 sol:sec('步驟 1：分母因式分解',fm('s² + 5s + 6 = (s + 2)(s + 3)'))
  +sec('步驟 2：蓋住法求係數',fm('s = −2：(3(−2) + 8)/(−2 + 3) = 2/1 = 2<br>s = −3：(3(−3) + 8)/(−3 + 2) = (−1)/(−1) = 1'))
  +ans('(3s + 8)/(s² + 5s + 6) = 2/(s + 2) + 1/(s + 3)　→　f(t) = 2e<sup>−2t</sup> + e<sup>−3t</sup>')
  +note('MATLAB：[r,p,k] = residue([3 8],[1 5 6]) 會得到 r = [1; 2]、p = [−3; −2]、k = []。r 是係數，p 是極點，k 是多項式餘項（分子次數 &lt; 分母時為空）。')},

{id:'ex2-12',set:2,n:11,no:'例題 2-12',topic:'微分方程求解',short:'RLC 有初值的步階響應',img:IMG+'rlc.svg',
 q:'RLC 電路 (2-6) 中 L = 1H、C = 1F、R = 1Ω，uₒ(0) = 0.1V、i(0) = 0.1A，輸入 uᵢ = 1V，求電容電壓 uₒ(t)。',
 html:sec('題目','在 RLC 電路的方程式 (2-6) 中，若已知 L = 1H，C = 1F，R = 1Ω，而且電容的電壓初始值 uₒ(0) = 0.1V，初始電流 i(0) = 0.1A，輸入之電源電壓 uᵢ(t) = 1V。試求電路突然接通電源時，電容電壓 uₒ(t) 的輸出響應。')
  +fm('LC·uₒ″ + RC·uₒ′ + uₒ = uᵢ　(2-6)'),
 sol:sec('步驟 1：代入數字，並把初始電流換成 uₒ′(0)',fm('uₒ″ + uₒ′ + uₒ = uᵢ　…(*)<br>i = C·duₒ/dt → uₒ′(0) = i(0)/C = 0.1'))
  +sec('步驟 2：取拉氏（代入初值）',fm('[s²Uₒ − 0.1s − 0.1] + [sUₒ − 0.1] + Uₒ = Uᵢ<br>Uₒ(s) = Uᵢ/(s² + s + 1) + (0.1s + 0.2)/(s² + s + 1)　…(**)'))
  +sec('步驟 3：突然接通 = 單位步階，Uᵢ = 1/s，求反轉換',fm('s² + s + 1 = (s + 0.5)² + 0.866²<br>1/(s(s² + s + 1)) → 1 + 1.15e<sup>−0.5t</sup>sin(0.866t − 120°)<br>(0.1s + 0.2)/(s² + s + 1) → 0.2e<sup>−0.5t</sup>sin(0.866t + 30°)'))
  +ans('uₒ(t) = 1 + 1.15e<sup>−0.5t</sup>sin(0.866t − 120°) + 0.2e<sup>−0.5t</sup>sin(0.866t + 30°)　(***)')
  +sec('名詞','前兩項只跟輸入有關、跟初值無關 → <b>零狀態響應</b>；最後一項只跟初值有關 → <b>零輸入響應</b>。兩者合起來是單位步階響應。若輸入是 δ(t)（Uᵢ = 1），得脈衝響應 uₒ = 1.15e<sup>−0.5t</sup>sin0.866t + 0.2e<sup>−0.5t</sup>sin(0.866t + 30°)。')
  +chk('驗算（初值定理）：uₒ(0) = lim<sub>s→∞</sub> s·Uₒ(s) = 0.1V，和題目一致；終值 lim<sub>s→0</sub> sUₒ = 1V（電容最後充到電源電壓）。')
  +note('陷阱：題目給的是初始「電流」，要先用 i = C·duₒ/dt 換成 uₒ′(0) 才能代進 s²Uₒ − s·uₒ(0) − uₒ′(0)。')},

{id:'ex2-13',set:2,n:12,no:'例題 2-13',topic:'線性化',short:'y = x + 0.4x³ 在三點線性化',
 q:'非線性函數 y = x + 0.4x³，求在 x = 0、1、2 附近的線性化模型。',
 html:sec('題目','考慮一個非線性函數如下：y = x + 0.4x³，試計算該函數在 x = 0, 1, 2 等三點附近微小區域之線性化模型。'),
 sol:sec('公式：工作點 x₀ 附近用切線近似',fm('y ≈ y₀ + (dy/dx)|<sub>x₀</sub> (x − x₀)，dy/dx = 1 + 1.2x²'))
  +sec('三個工作點',fm('x₀ = 0：y₀ = 0，斜率 1　→ Δy = Δx（y ≈ x）<br>x₀ = 1：y₀ = 1.4，斜率 2.2 → Δy = 2.2Δx（y ≈ 2.2x − 0.8）<br>x₀ = 2：y₀ = 5.2，斜率 5.8 → Δy = 5.8Δx（y ≈ 5.8x − 6.4）'))
  +ans('x=0：Δy = Δx　x=1：Δy = 2.2Δx　x=2：Δy = 5.8Δx')
  +chk('觀念：同一個非線性系統，在不同工作點的「增益」（斜率）不一樣。所以線性化模型一定要講清楚是在哪個工作點。')},

{id:'ex2-14',set:2,n:13,no:'例題 2-14',topic:'微分方程求解',short:'三個齊性 ODE 的模態',
 q:'指出 (1) y″−3y′−4y=0；(2) 4y″+4y′+y=0；(3) y″−2y′+2y=0 的系統模態。',
 html:sec('題目','針對下列齊性微分方程式，請指出系統之模態。')+fm('(1) y″ − 3y′ − 4y = 0<br>(2) 4y″ + 4y′ + y = 0<br>(3) y″ − 2y′ + 2y = 0'),
 sol:sec('方法：寫特徵方程式（y″ → s²、y′ → s、y → 1），根 λ 對應模態 e<sup>λt</sup>','')
  +sec('(1) 相異實根',fm('s² − 3s − 4 = (s − 4)(s + 1) = 0 → s = 4、−1<br>模態：e<sup>4t</sup>、e<sup>−t</sup>'))
  +sec('(2) 重根',fm('4s² + 4s + 1 = (2s + 1)² = 0 → s = −½（二重根）<br>模態：e<sup>−t/2</sup>、t·e<sup>−t/2</sup>'))
  +sec('(3) 共軛複數根',fm('s² − 2s + 2 = 0 → s = 1 ± j<br>模態：e<sup>t</sup>cos t、e<sup>t</sup>sin t'))
  +ans('(1) e<sup>4t</sup>, e<sup>−t</sup>　(2) e<sup>−t/2</sup>, te<sup>−t/2</sup>　(3) e<sup>t</sup>cos t, e<sup>t</sup>sin t')
  +chk('觀念：根的實部 &lt; 0 → 模態衰減（穩定）；實部 &gt; 0 → 發散。(1) 有 e<sup>4t</sup>、(3) 有 e<sup>t</sup>，這兩個系統不穩定。')
  +note('陷阱：重根的第二個模態要乘 t，不能寫兩次 e<sup>−t/2</sup>。')},

{id:'ex2-15',set:2,n:14,no:'例題 2-15',topic:'轉移函數',short:'RLC 電路的轉移函數 Uₒ/Uᵢ',img:IMG+'rlc.svg',
 q:'求 RLC 電路 (2-6) 的轉移函數 Uₒ(s)/Uᵢ(s)，R = 1Ω、L = 1H、C = 1F。',
 html:sec('題目','試求 2-2 節中方程式 (2-6) 中 RLC 電路的轉移函數 Uₒ(s)/Uᵢ(s)，其中 R = 1Ω，L = 1H，C = 1F。')+fm('LC·uₒ″ + RC·uₒ′ + uₒ = uᵢ　(2-6)'),
 sol:sec('步驟 1：轉移函數一律假設初值為零，兩邊取拉氏',fm('(LCs² + RCs + 1)Uₒ(s) = Uᵢ(s)'))
  +sec('步驟 2：相除',fm('G(s) = Uₒ/Uᵢ = 1/(LCs² + RCs + 1)'))
  +ans('G(s) = 1/(s² + s + 1)')
  +chk('對照例題 2-12：Uₒ 的第一項 Uᵢ/(s² + s + 1) 就是 G(s)·Uᵢ。轉移函數只描述「輸入怎麼變成輸出」，初值造成的部分不算在裡面。')},

{id:'ex2-16',set:2,n:15,no:'例題 2-16',topic:'轉移函數',short:'齒輪系統 Θ₂(s)/Mₘ(s)',
 q:'圖 2-5 齒輪系統 J₁=1、B₁=1、N₁=25、N₂=50、J₂=4、B₂=4、M_c=0，求 Θ₂(s)/Mₘ(s)。',
 html:sec('題目','在圖 2-5 中的齒輪傳動系統，若 J₁ = 1 kg-m²、B₁ = 1 N-m-s/rad、N₁ = 25、N₂ = 50、J₂ = 4 kg-m²、B₂ = 4 N-m-s/rad、M<sub>c</sub> = 0，試求轉移函數 Θ₂(s)/M<sub>m</sub>(s) = ?'),
 sol:sec('步驟 1：折算到軸 1',fm('N₁/N₂ = 25/50 = 0.5，(N₁/N₂)² = 0.25<br>J_eq = 1 + 0.25 × 4 = 2　　B_eq = 1 + 0.25 × 4 = 2'))
  +sec('步驟 2：軸 1 的轉移函數（2-16 式，M<sub>c</sub> = 0）',fm('J_eq s²Θ₁ + B_eq sΘ₁ = M<sub>m</sub><br>Θ₁/M<sub>m</sub> = 1/(2s² + 2s)'))
  +sec('步驟 3：換到軸 2',fm('θ₂ = (N₁/N₂)θ₁ = 0.5θ₁'))
  +ans('Θ₂(s)/M<sub>m</sub>(s) = 0.5/(2s² + 2s) = 1/(4s(s + 1))')
  +note('陷阱：題目問的是 Θ₂ 不是 Θ₁，最後要再乘 N₁/N₂。（截圖中分子的 Θ₂(s) 是另外加粗標上的；如果考的是 Θ₁，答案是 1/(2s(s+1))。）')},

{id:'ex2-17',set:2,n:16,no:'例題 2-17',topic:'轉移函數',short:'電樞控制直流馬達 Ωₘ(s)/Uₐ(s)',
 q:'求電樞控制直流馬達的轉移函數 Ωₘ(s)/Uₐ(s)。',
 html:sec('題目','試求 2-2 節中方程式 (2-21) 電樞控制直流馬達的轉移函數 Ω<sub>m</sub>(s)/U<sub>a</sub>(s)。（課本 P.25）')
  +sec('馬達的三條方程式',fm('電樞電路：u<sub>a</sub> = L<sub>a</sub>·di<sub>a</sub>/dt + R<sub>a</sub>i<sub>a</sub> + E<sub>a</sub>，E<sub>a</sub> = C<sub>e</sub>ω<sub>m</sub>（反電動勢）<br>馬達轉矩：M<sub>m</sub> = C<sub>m</sub>i<sub>a</sub><br>負載：J<sub>m</sub>·dω<sub>m</sub>/dt + B<sub>m</sub>ω<sub>m</sub> = M<sub>m</sub> − M<sub>c</sub>')),
 sol:sec('步驟 1：取拉氏（初值為零）',fm('(L<sub>a</sub>s + R<sub>a</sub>)I<sub>a</sub> = U<sub>a</sub> − C<sub>e</sub>Ω<sub>m</sub><br>(J<sub>m</sub>s + B<sub>m</sub>)Ω<sub>m</sub> = C<sub>m</sub>I<sub>a</sub> − M<sub>c</sub>'))
  +sec('步驟 2：令 M<sub>c</sub> = 0，消去 I<sub>a</sub>',fm('Ω<sub>m</sub>/U<sub>a</sub> = C<sub>m</sub> / [ (L<sub>a</sub>s + R<sub>a</sub>)(J<sub>m</sub>s + B<sub>m</sub>) + C<sub>m</sub>C<sub>e</sub> ]'))
  +sec('步驟 3：電樞電感很小，L<sub>a</sub> ≈ 0，化成一階',fm('Ω<sub>m</sub>/U<sub>a</sub> = K<sub>m</sub>/(T<sub>m</sub>s + 1)<br>T<sub>m</sub> = R<sub>a</sub>J<sub>m</sub>/(R<sub>a</sub>B<sub>m</sub> + C<sub>m</sub>C<sub>e</sub>)　K<sub>m</sub> = C<sub>m</sub>/(R<sub>a</sub>B<sub>m</sub> + C<sub>m</sub>C<sub>e</sub>)'))
  +ans('G(s) = Ω<sub>m</sub>(s)/U<sub>a</sub>(s) = K<sub>m</sub>/(T<sub>m</sub>s + 1)（一階系統）')
  +sec('負載干擾',`令 u<sub>a</sub> = 0，同樣方法得 Ω<sub>m</sub>/M<sub>c</sub> = −K<sub>c</sub>/(T<sub>m</sub>s + 1)，K<sub>c</sub> = R<sub>a</sub>/(R<sub>a</sub>B<sub>m</sub> + C<sub>m</sub>C<sub>e</sub>)。兩者同時作用時：ω<sub>m</sub>(t) = ℒ<sup>−1</sup>{K<sub>m</sub>U<sub>a</sub>/(T<sub>m</sub>s+1)} + ℒ<sup>−1</sup>{−K<sub>c</sub>M<sub>c</sub>/(T<sub>m</sub>s+1)}（線性系統可以疊加）。`)
  +chk('觀念：馬達「電壓 → 轉速」是一階系統；負號代表負載轉矩會讓轉速下降。')
  +note('課本 (2-21) 式本身沒有出現在截圖，K<sub>m</sub>、T<sub>m</sub> 的寫法是依講義方程式推導；若課本忽略 B<sub>m</sub>，則 T<sub>m</sub> = R<sub>a</sub>J<sub>m</sub>/(C<sub>m</sub>C<sub>e</sub>)、K<sub>m</sub> = 1/C<sub>e</sub>。')},

{id:'ex2-18',set:2,n:17,no:'例題 2-18',topic:'阻抗法',short:'兩迴路電路 I₂(s)/V(s)（克萊瑪法則）',img:IMG+'ex2-18.svg',
 q:'利用阻抗分析求電路的轉移函數 G(s) = I₂(s)/V(s)。',
 html:sec('題目','利用阻抗分析試求下列電路的轉移函數 G(s) = I₂(s)/V(s)。R₁ 在左上，L 在中間（兩迴路共用），R₂ 在右上，C 在右側。'),
 sol:sec('步驟 1：換成 s 域阻抗',fm('L → Ls，C → 1/(Cs)'))
  +sec('步驟 2：兩個迴路各寫 KVL（L 是共用元件，電流是 I₁ − I₂）',fm('迴路 1：(R₁ + Ls)I₁ − LsI₂ = V<br>迴路 2：−LsI₁ + (Ls + R₂ + 1/Cs)I₂ = 0'))
  +sec('步驟 3：克萊瑪法則',fm('Δ = (R₁ + Ls)(Ls + R₂ + 1/Cs) − (Ls)²<br>Δ₁ = | R₁+Ls　V ; −Ls　0 | = LsV<br>I₂ = Δ₁/Δ = LsV/Δ'))
  +sec('步驟 4：展開 Δ 並乘 Cs 化簡',fm('Δ·Cs = (R₁ + R₂)LCs² + (R₁R₂C + L)s + R₁'))
  +ans('G(s) = I₂(s)/V(s) = LCs² / [ (R₁ + R₂)LCs² + (R₁R₂C + L)s + R₁ ]')
  +chk('驗算：s → 0 時 G → 0（直流下電容斷路，I₂ = 0）✓')
  +note('陷阱：共用元件 L 上的電流是 I₁ − I₂，所以兩條式子的交叉項都是 −Ls。')},
];

/* 計算題換數字 */
const GEN={
  lapTexp:{
    orig:{k:3,a:2},
    rand:()=>({k:pick(2,9),a:pick(1,6)}),
    build:({k,a})=>({
      q:`請問函數 f(t) = ${k}t${ex(a)} 之拉氏轉換為何？`,
      correct:`${k}/(s+${a})²`,
      wrongs:[`${k}/(s+${a})`,`1/(s+${a})²`,`${k}/(s−${a})²`,`${k}/(s+${a})³`],
      steps:['查表：ℒ{t} = 1/s²',`乘上 ${ex(a)}：把 s 換成 s+${a} → 1/(s+${a})²`,`再乘常數 ${k}：${k}/(s+${a})²`]})},
  odeIC:{
    orig:{p:1,q:3,m:1},
    rand:()=>{const p=pick(1,3);return{p,q:pick(p+1,6),m:pick(1,2)}},
    build:({p,q,m})=>{const y0=(q-p)*m,A=q*m,B=p*m,ok=sum([[A,p],[-B,q]]);return{
      q:`若系統 ODE 為 y″(t) + ${p+q}y′(t) + ${p*q}y(t) = 0，初始條件 y(0) = ${y0}、y′(0) = 0，則此微分方程式的解 y(t) 為何？`,
      correct:ok,
      wrongs:[sum([[B,p],[-A,q]]),sum([[A,p],[B,q]]),`${A}${exP(p)} − ${B}${exP(q)}`,sum([[y0,p],[-A,q]])],
      steps:[`取拉氏：s²Y − ${co(y0)}s + ${p+q}(sY − ${y0}) + ${p*q}Y = 0`,`Y = ${co(y0)}(s+${p+q}) / ((s+${p})(s+${q}))`,
        `s = −${p}：${y0}×${q}/${q-p} = ${A}`,`s = −${q}：${y0}×${p}/(${num(p-q)}) = ${num(-B)}`,`y(t) = ${ok}`]}}},
  ivtfvt:{
    orig:{a:1,b:2},
    rand:()=>{const b=pick(2,6);let a;do{a=pick(1,6)}while(a===b);return{a,b}},
    build:({a,b})=>{const f=fmt(a/b),pr=(i,x)=>`yᵢ = ${i}、y_f = ${x}`;return{
      q:`若某控制輸出的拉氏轉換為 Y(s) = (s+${a})/(s(s+${b}))，試求其初值 yᵢ 及終值 y_f 為何？`,
      correct:pr(1,f),
      wrongs:[pr(f,1),pr(1,fmt(b/a)),pr(0,f),pr(1,1)],
      steps:[`初值：lim(s→∞) sY = lim (s+${a})/(s+${b}) = 1`,`終值：lim(s→0) sY = ${a}/${b} = ${f}`]}}},
  stepODE:{
    orig:{p:1,q:2,m:3},
    rand:()=>{const p=pick(1,2);return{p,q:pick(p+1,4),m:pick(1,3)}},
    build:({p,q,m})=>{const K=p*q*(q-p)*m,c0=K/(p*q),cp=-K/(p*(q-p)),cq=K/(q*(q-p)),
      ok=sum([[cq,q],[cp,p]])+` + ${fmt(c0)}，t ≥ 0`;return{
      q:`某系統的微分方程式為 y″(t) + ${p+q}y′(t) + ${p*q}y(t) = ${K}u(t)，初始條件 y(0) = y′(0) = 0，u(t) 為單位步階函數，則其輸出響應為何？`,
      correct:ok,
      wrongs:[sum([[cq,q],[cp,p]])+'，t ≥ 0',sum([[-cq,q],[-cp,p]])+` + ${fmt(c0)}，t ≥ 0`,`${fmt(c0)}，t ≥ 0`,sum([[cp,q],[cq,p]])+` + ${fmt(c0)}，t ≥ 0`],
      steps:[`Y = ${K}/(s(s+${p})(s+${q}))`,`s = 0：${K}/${p*q} = ${fmt(c0)}`,`s = −${p}：${K}/((−${p})(${q-p})) = ${num(cp)}`,
        `s = −${q}：${K}/((−${q})(${num(p-q)})) = ${num(cq)}`,`y(t) = ${ok}`]}}},
};

QUIZ.register({
  id:'autocontrol-ch2',
  title:'自動控制 第 2 章',
  eyebrow:'Automatic Control · Ch.2',
  sets:[{id:1,label:'習題'},{id:2,label:'例題講解'}],
  bank:BANK, gen:GEN,
  formulas:[
    ['v = Ri，v = L·di/dt，v = (1/C)∫i dt','電阻、電感、電容的電壓電流關係','2-2-1 (2-1)~(2-3)'],
    ['Z<sub>R</sub> = R，Z<sub>L</sub> = Ls，Z<sub>C</sub> = 1/(Cs)','s 域阻抗（初值為零），串聯相加、並聯積除以和','例題 2-18、計算 14'],
    ['F = Kx，F = c(ẋ₁ − ẋ₂)，ΣF = mẍ','彈簧、阻尼器、質量（平移）','圖 2-2'],
    ['T = Kθ，T = B(θ̇₁ − θ̇₂)，ΣT = Jθ̈','彈簧、阻尼器、慣量（旋轉）','圖 2-3'],
    ['ω₂ = (N₁/N₂)ω₁，M₁ = (N₁/N₂)M₂','齒輪咬合：線速度、功率相同','講義 齒輪'],
    ['J_eq = J₁ + (N₁/N₂)²J₂，B_eq = B₁ + (N₁/N₂)²B₂','齒輪折算到馬達軸','(2-12)(2-13)'],
    ['E<sub>a</sub> = C<sub>e</sub>ω，M<sub>m</sub> = C<sub>m</sub>i<sub>a</sub>','直流馬達反電動勢與轉矩','(2-17)(2-18)'],
    ['Vₒ/Vᵢ = −Z<sub>f</sub>/Z<sub>i</sub>','反相 OP 放大器','計算 18、19'],
    ['F(s) = ∫₀<sup>∞</sup> f(t)e<sup>−st</sup>dt','拉氏轉換定義','(2-24)'],
    ['δ(t) → 1，u(t) → 1/s，tⁿ → n!/s<sup>n+1</sup>','基本轉換表','2-3'],
    ['e<sup>−at</sup> → 1/(s+a)，tⁿe<sup>−at</sup> → n!/(s+a)<sup>n+1</sup>','指數','選擇 1'],
    ['sin ωt → ω/(s²+ω²)，cos ωt → s/(s²+ω²)','正弦、餘弦','例題 2-1'],
    ['e<sup>−at</sup>sin ωt → ω/((s+a)²+ω²)，e<sup>−at</sup>cos ωt → (s+a)/((s+a)²+ω²)','衰減振盪','例題 2-5、2-6'],
    ['ℒ{e<sup>−at</sup>f(t)} = F(s+a)','s 平移（e 的指數為正時換成 s−a）','選擇 3'],
    ['ℒ{f′} = sF − f(0)，ℒ{f″} = s²F − sf(0) − f′(0)','微分性質（帶入初值）','選擇 7、例題 2-12'],
    ['ℒ{∫₀ᵗ f dτ} = F(s)/s','積分性質','台科第 2 題'],
    ['ℒ{f(t−T)u(t−T)} = e<sup>−Ts</sup>F(s)','時間延遲','台科第 2 題'],
    ['f(0⁺) = lim<sub>s→∞</sub> sF(s)','初值定理','選擇 8、例題 2-4'],
    ['f(∞) = lim<sub>s→0</sub> sF(s)（sF 的極點都在左半平面）','終值定理','選擇 8、例題 2-4'],
    ['A<sub>i</sub> = [(s−p<sub>i</sub>)F(s)]<sub>s=p<sub>i</sub></sub>','部分分式：不重複根（蓋住法）','(2-28)'],
    ['A<sub>n−k</sub> = (1/k!)·d<sup>k</sup>/ds<sup>k</sup>[(s−a)ⁿF(s)]<sub>s=a</sub>','部分分式：重根','(2-30)、例題 2-10'],
    ['G(s) = Y(s)/U(s)（LTI、初值為零）','轉移函數定義','選擇 14、例題 2-15'],
    ['Δy ≈ (dy/dx)|<sub>x₀</sub> · Δx','工作點附近線性化','例題 2-13、計算 4'],
  ],
  unitNote:'拉氏轉換表裡 e 的指數若是負的（e⁻ᵃᵗ），s 換成 s+a；指數是正的（eᵃᵗ）換成 s−a。',
});
