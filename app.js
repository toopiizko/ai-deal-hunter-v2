const listings = [
  { id: 1, icon: "📱", title: "iPhone 15 128GB", price: 22900, market: 29900, fair: 28500, score: 92, risk: "ต่ำ", battery: 93, storage: "128 GB", condition: "ดีมาก", location: "กรุงเทพฯ", age: "2 วันที่แล้ว", category: "phones" },
  { id: 2, icon: "📱", title: "iPhone 14 256GB", price: 18500, market: 25900, fair: 24800, score: 88, risk: "ต่ำ", battery: 84, storage: "256 GB", condition: "ดี", location: "หาดใหญ่", age: "3 วันที่แล้ว", category: "phones" },
  { id: 3, icon: "📱", title: "iPhone 13 128GB", price: 14900, market: 19900, fair: 18500, score: 85, risk: "ปานกลาง", battery: 87, storage: "128 GB", condition: "ดี", location: "ภูเก็ต", age: "1 วันที่แล้ว", category: "phones" },
  { id: 4, icon: "📱", title: "iPhone 12 64GB", price: 9900, market: 14900, fair: 13200, score: 78, risk: "ต่ำ", battery: 80, storage: "64 GB", condition: "พอใช้", location: "กรุงเทพฯ", age: "4 วันที่แล้ว", category: "phones" },
  { id: 5, icon: "💻", title: "MacBook Air M2", price: 28900, market: 34900, fair: 32000, score: 88, risk: "ต่ำ", battery: 91, storage: "256 GB", condition: "ดีมาก", location: "นนทบุรี", age: "1 วันที่แล้ว", category: "laptops" },
  { id: 6, icon: "🖥️", title: "RTX 4070", price: 18900, market: 22900, fair: 21000, score: 85, risk: "ต่ำ", battery: null, storage: "12 GB", condition: "ดี", location: "เชียงใหม่", age: "วันนี้", category: "gpus" },
  { id: 7, icon: "🎧", title: "AirPods Pro 2", price: 7900, market: 9900, fair: 8600, score: 80, risk: "ปานกลาง", battery: null, storage: "—", condition: "ดี", location: "กรุงเทพฯ", age: "วันนี้", category: "more" }
];

const state = {
  page: "home",
  query: "",
  category: "all",
  sort: "score",
  current: null,
  detailTab: "overview",
  saved: JSON.parse(localStorage.getItem("dealHunterSaved") || "[1,5,6,2,7]"),
  compare: JSON.parse(localStorage.getItem("dealHunterCompare") || "[1,2]"),
  alerts: JSON.parse(localStorage.getItem("dealHunterAlerts") || "[1,5,6]"),
};

const app = document.querySelector("#app");
const money = value => `฿${value.toLocaleString("th-TH")}`;
const discount = item => Math.round((1 - item.price / item.market) * 100);
const status = () => `<div class="status"><span>9:41</span><span>▮▮▮ ◉ ▰</span></div>`;
const categories = () => `<div class="categories">
  ${[["all","⌘","ทั้งหมด"],["phones","▯","มือถือ"],["laptops","⌨","แล็ปท็อป"],["gpus","▣","การ์ดจอ"],["more","•••","อื่นๆ"]].map(([key,icon,label]) => `<button class="category ${state.category === key ? "active" : ""}" data-category="${key}"><span>${icon}</span>${label}</button>`).join("")}
</div>`;

function card(item, compact = false) {
  return `<article class="${compact ? "list-card" : "deal-card"}" data-open="${item.id}">
    <div class="product-art ${compact ? "small" : ""}">${item.icon}</div>
    <div class="${compact ? "list-main" : ""}">
      ${compact ? "" : `<span class="score">◆ ${item.score}</span>`}
      <h3>${item.title}</h3>
      ${compact ? `<span class="score">◆ ${item.score}</span>` : ""}
      <div><span class="price">${money(item.price)}</span> <span class="old-price">${money(item.market)}</span> <span class="discount">-${discount(item)}%</span></div>
      <div class="meta">${item.location} · ${item.age}</div>
    </div>
    <button class="heart ${state.saved.includes(item.id) ? "saved" : ""}" data-save="${item.id}" aria-label="บันทึก">${state.saved.includes(item.id) ? "♥" : "♡"}</button>
  </article>`;
}

function filtered() {
  let result = listings.filter(item => (state.category === "all" || item.category === state.category) && item.title.toLowerCase().includes(state.query.toLowerCase()));
  return result.sort((a,b) => state.sort === "low" ? a.price-b.price : state.sort === "high" ? b.price-a.price : state.sort === "new" ? a.id-b.id : b.score-a.score);
}

function home() {
  return `<section class="page">${status()}
    <header class="topbar"><div class="brand"><i class="brand-mark"><span>◆</span></i> AI Deal Hunter</div><button class="icon-btn" data-nav="alerts">♧<i class="dot"></i></button></header>
    <div class="hero"><h1>ค้นหาดีลที่<br><em>ใช่สำหรับคุณ</em></h1><p class="subhead">เปรียบเทียบ ตัดสินใจ ซื้ออย่างชาญฉลาด</p>
      <label class="search-box"><span>⌕</span><input data-search placeholder="ค้นหาสินค้า แบรนด์..." value="${state.query}"></label>${categories()}</div>
    <div class="section-title"><h2>ดีลแนะนำสำหรับคุณ</h2><button data-nav="search">ดูทั้งหมด ›</button></div>
    <div class="deal-grid">${filtered().slice(0,4).map(item => card(item)).join("") || `<p class="empty">ไม่พบสินค้าที่ค้นหา</p>`}</div>
  </section>`;
}

function search() {
  const items = filtered();
  return `<section class="page">${status()}<div class="page-head"><h2 class="page-title">ค้นหาดีล</h2><button class="icon-btn">⋯</button></div>
    <div class="search-row"><label class="search-box"><span>⌕</span><input data-search placeholder="ค้นหาสินค้า" value="${state.query}"></label><button class="filter-btn" data-filter>⌘</button></div>
    ${categories()}<div class="result-bar"><span>${items.length} รายการ</span><label>เรียง: <select data-sort><option value="score" ${state.sort === "score" ? "selected" : ""}>ดีลดีที่สุด</option><option value="low" ${state.sort === "low" ? "selected" : ""}>ราคาต่ำสุด</option><option value="high" ${state.sort === "high" ? "selected" : ""}>ราคาสูงสุด</option><option value="new" ${state.sort === "new" ? "selected" : ""}>ใหม่ล่าสุด</option></select></label></div>
    <div class="results">${items.map(item => card(item, true)).join("") || `<div class="empty">ไม่พบดีลที่ตรงกับการค้นหา</div>`}</div>
  </section>`;
}

function detail() {
  const item = listings.find(x => x.id === state.current) || listings[0];
  const tab = state.detailTab;
  const tabContent = tab === "history" ? historyPanel(item) : tab === "analysis" ? `<div class="panel"><h3>✦ การวิเคราะห์ดีล</h3><p>ราคาต่ำกว่าตลาด ${discount(item)}% และสภาพโดยรวมดี คะแนนผู้ขายอยู่ในระดับน่าเชื่อถือ แนะนำตรวจสอบเครื่องและหมายเลข IMEI ก่อนชำระเงิน</p></div>` : tab === "seller" ? `<div class="panel"><h3>ผู้ขาย: Narin</h3><p>สมาชิกมาแล้ว 4 ปี · ตอบกลับเร็ว · คะแนนผู้ขาย 4.8/5 · นัดรับได้ที่ ${item.location}</p></div>` : `<div class="panel"><h3>✦ สรุปโดย AI <span class="score">AI</span></h3><p>เป็นดีลที่คุ้มสำหรับ ${item.title} สภาพ${item.condition} ราคาต่ำกว่าค่าเฉลี่ยตลาด ${discount(item)}% ${item.battery ? `และแบตเตอรี่ ${item.battery}%` : ""}</p></div>`;
  return `<section class="page detail"><div class="page-head"><button class="back" data-back>‹</button><div><button class="icon-btn" data-share>⇧</button><button class="heart ${state.saved.includes(item.id) ? "saved" : ""}" data-save="${item.id}">${state.saved.includes(item.id) ? "♥" : "♡"}</button></div></div>
    <div class="product-art large">${item.icon}</div><div class="thumbnails">${[1,2,3,4,5].map((x,i) => `<div class="thumbnail ${i===0?"active":""}">${item.icon}</div>`).join("")}</div>
    <h2>${item.title}</h2><span class="score">◆ ${item.score}</span> <span class="score">ดีลคุ้ม</span>
    <div class="detail-price">${money(item.price)} <span class="old-price">${money(item.market)}</span> <span class="discount">-${discount(item)}%</span></div><div class="meta">${item.location} · ${item.age} · ผู้ขาย: Narin</div>
    <div class="stat-row"><div class="stat">แบตเตอรี่<b>${item.battery ? item.battery+"%" : "—"}</b></div><div class="stat">ความจุ<b>${item.storage}</b></div><div class="stat">สภาพ<b>${item.condition}</b></div></div>
    <div class="tabs">${[["overview","ภาพรวม"],["history","ประวัติราคา"],["analysis","วิเคราะห์"],["seller","ผู้ขาย"]].map(([k,l])=>`<button class="${tab===k?"active":""}" data-tab="${k}">${l}</button>`).join("")}</div>${tabContent}
    <div class="detail-actions"><button class="btn" data-compare="${item.id}">⇄ เปรียบเทียบ</button><button class="btn primary" data-save="${item.id}">♡ เพิ่มในรายการโปรด</button></div>
  </section>`;
}

function historyPanel(item) {
  return `<div><div class="pill-tabs"><button>7D</button><button class="active">30D</button><button>3M</button><button>1Y</button></div>
    <div class="chart"><svg viewBox="0 0 400 180" preserveAspectRatio="none" aria-label="กราฟราคาจำลอง"><polyline fill="none" stroke="#6d4aff" stroke-width="3" points="0,30 35,52 60,45 90,80 125,70 160,105 200,95 235,125 270,116 305,137 350,130 400,132"/><circle cx="400" cy="132" r="6" fill="#6d4aff"/></svg></div>
    <div class="stat-row"><div class="stat">ราคาตลาด<b>${money(item.market)}</b></div><div class="stat">ราคายุติธรรม<b>${money(item.fair)}</b></div><div class="stat">ราคาปัจจุบัน<b>${money(item.price)}</b></div></div><div class="buy-box"><b>◉ จังหวะดีในการซื้อ</b><span>ราคาปัจจุบันต่ำกว่าค่าเฉลี่ยตลาด ${discount(item)}%</span></div></div>`;
}

function watch() {
  const items = listings.filter(x => state.saved.includes(x.id));
  return `<section class="page">${status()}<div class="page-head"><h2 class="page-title">รายการโปรดของฉัน</h2><button class="icon-btn" data-toast="สร้างรายการใหม่">＋</button></div><div class="pill-tabs"><button class="active">ทั้งหมด (${items.length})</button><button>มือถือ</button><button>แล็ปท็อป</button><button>การ์ดจอ</button></div><div>${items.map(item => `<div class="watch-row" data-open="${item.id}"><span class="emoji">${item.icon}</span><div class="info"><b>${item.title}</b><strong>${money(item.price)}</strong>　<span class="score">◆ ${item.score}</span><div class="meta">เป้าหมาย: ${money(Math.floor(item.price*.9/100)*100)}</div></div><button class="more">⋯</button></div>`).join("") || `<div class="empty">ยังไม่มีรายการโปรด</div>`}</div></section>`;
}

function alerts() {
  const alertItems = listings.filter(x => state.saved.includes(x.id)).slice(0,3);
  return `<section class="page">${status()}<div class="page-head"><h2 class="page-title">แจ้งเตือนราคา</h2><button class="icon-btn" data-toast="สร้างการแจ้งเตือน">＋</button></div><div class="pill-tabs"><button class="active">เปิดใช้งาน (${state.alerts.length})</button><button>ประวัติ</button></div><div>${alertItems.map(item => `<div class="watch-row"><span class="emoji">${item.icon}</span><div class="info"><b>${item.title}</b><span class="meta">แจ้งเมื่อราคา ≤ ${money(Math.floor(item.price*.9/100)*100)}</span><div class="meta">ปัจจุบัน: ${money(item.price)}</div><button class="link">แก้ไข</button>　<button class="link" data-remove-alert="${item.id}">ลบ</button></div><button class="switch ${state.alerts.includes(item.id)?"on":""}" data-alert="${item.id}" aria-label="เปิดปิดการแจ้งเตือน"></button></div>`).join("")}</div></section>`;
}

function settings() {
  return `<section class="page">${status()}<div class="page-head"><h2 class="page-title">ตั้งค่า</h2></div><div>
    ${[["☼","การแสดงผล","โหมดสว่าง ธีม ภาษา"],["♧","การแจ้งเตือน","ตั้งค่าการแจ้งเตือน"],["▤","ข้อมูลและพื้นที่จัดเก็บ","โหมดออฟไลน์ ล้างข้อมูล"],["ⓘ","เกี่ยวกับ","เวอร์ชัน 1.0.0 · AI Deal Hunter"]].map(([i,t,s])=>`<button class="setting" data-toast="${t}"><span class="setting-icon">${i}</span><span class="info"><b>${t}</b><small>${s}</small></span><span>›</span></button>`).join("")}</div></section>`;
}

function compare() {
  const items = listings.filter(x => state.compare.includes(x.id)).slice(0,4);
  return `<section class="page">${status()}<div class="page-head"><button class="back" data-back>‹</button><h2 class="page-title">เปรียบเทียบ (${items.length})</h2><button class="link" data-clear-compare>ล้างทั้งหมด</button></div>${items.length < 2 ? `<div class="empty">เลือกสินค้าอย่างน้อย 2 รายการเพื่อเปรียบเทียบ</div>` : `<div class="compare-table"><table><thead><tr><th></th>${items.map(x=>`<th>${x.icon}<br>${x.title}<br><b>${money(x.price)}</b><br><span class="score">◆ ${x.score}</span></th>`).join("")}</tr></thead><tbody>${[["ราคา","price",money],["ราคาตลาด","market",money],["ราคายุติธรรม","fair",money],["Deal Score","score",String],["ความเสี่ยง","risk",String],["สภาพ","condition",String],["แบตเตอรี่","battery",x=>x?x+"%":"—"],["ความจุ","storage",String],["พื้นที่","location",String]].map(([l,k,f])=>`<tr><td>${l}</td>${items.map((x,i)=>`<td class="${i===0?"best":""}">${f(x[k])}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="recommend">🏆 <b>ดีลดีที่สุด</b><br>${items[0].title} คุ้มค่ากว่าด้วยคะแนนสูงและความเสี่ยงต่ำ</div>`}</section>`;
}

function render() {
  app.innerHTML = state.page === "home" ? home() : state.page === "search" ? search() : state.page === "detail" ? detail() : state.page === "watch" ? watch() : state.page === "alerts" ? alerts() : state.page === "settings" ? settings() : compare();
  document.querySelectorAll(".bottom-nav button").forEach(button => button.classList.toggle("active", button.dataset.nav === state.page));
  document.querySelector(".bottom-nav").hidden = state.page === "compare";
  window.scrollTo(0,0);
}

function persist() {
  localStorage.setItem("dealHunterSaved", JSON.stringify(state.saved));
  localStorage.setItem("dealHunterCompare", JSON.stringify(state.compare));
  localStorage.setItem("dealHunterAlerts", JSON.stringify(state.alerts));
}

function toast(message) {
  const el = document.querySelector("#toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1800);
}

document.addEventListener("click", event => {
  const target = event.target.closest("button,[data-open]"); if (!target) return;
  if (target.dataset.nav) state.page = target.dataset.nav;
  else if (target.dataset.category) { state.category = target.dataset.category; state.page = state.page === "home" ? "home" : "search"; }
  else if (target.dataset.open) { state.current = Number(target.dataset.open); state.page = "detail"; }
  else if (target.dataset.save) { event.stopPropagation(); const id = Number(target.dataset.save); state.saved = state.saved.includes(id) ? state.saved.filter(x=>x!==id) : [...state.saved,id]; persist(); toast(state.saved.includes(id) ? "เพิ่มในรายการโปรดแล้ว" : "นำออกจากรายการโปรดแล้ว"); }
  else if (target.dataset.tab) state.detailTab = target.dataset.tab;
  else if (target.dataset.back !== undefined) state.page = "search";
  else if (target.dataset.compare) { const id=Number(target.dataset.compare); if (!state.compare.includes(id)) state.compare.push(id); persist(); state.page="compare"; }
  else if (target.dataset.clearCompare !== undefined) { state.compare=[]; persist(); }
  else if (target.dataset.alert) { const id=Number(target.dataset.alert); state.alerts=state.alerts.includes(id)?state.alerts.filter(x=>x!==id):[...state.alerts,id]; persist(); }
  else if (target.dataset.removeAlert) { const id=Number(target.dataset.removeAlert); state.alerts=state.alerts.filter(x=>x!==id); persist(); }
  else if (target.dataset.share !== undefined) navigator.share?.({title:"AI Deal Hunter",text:"ดูดีลนี้",url:location.href}).catch(()=>{});
  else if (target.dataset.filter !== undefined) toast("ตัวกรองพื้นฐานใช้ผ่านหมวดหมู่และการเรียงลำดับ");
  else if (target.dataset.toast) toast(target.dataset.toast);
  render();
});

document.addEventListener("input", event => { if (event.target.matches("[data-search]")) { state.query=event.target.value; if(state.page === "search") render(); } });
document.addEventListener("change", event => { if(event.target.matches("[data-sort]")) { state.sort=event.target.value; render(); } });
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
render();
