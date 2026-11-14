/* App state, rendering, interactions, chat assistant */
/* ============ 狀態與工具 ============ */
let lang = "zh";
const F = {q:"", cat:"all", season:"all", role:"all", src:"all"};
let curRecipe = "r1";
const L = () => lang === "en" ? "en" : "zh";
const t = k => (T[L()][k] ?? T.zh[k]);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pick = o => o ? (o[L()] ?? o.zh) : "";
const curSeason = () => { const m = new Date().getMonth()+1; return Object.keys(SEASONS).find(k => SEASONS[k].months.includes(m)); };
const seasonLabel = k => lang === "tao" ? SEASONS[k].tao : (lang==="en" ? `${SEASONS[k].en} (${SEASONS[k].tao})` : `${SEASONS[k].zh}（${SEASONS[k].tao}）`);
const foodTitle = f => {
  if (lang === "tao") return {main: f.tao, sub: `${f.zh} · ${f.en}`};
  if (lang === "en") return {main: f.en, sub: f.tao !== PENDING_TAO ? f.tao : "Tao name pending"};
  return {main: f.zh, sub: f.tao !== PENDING_TAO ? f.tao : PENDING_TAO};
};

/* ============ 季節輪 ============ */
function arc(cx,cy,r1,r2,a0,a1){
  const p=(r,a)=>[cx+r*Math.cos(a*Math.PI/180), cy+r*Math.sin(a*Math.PI/180)];
  const large = (a1-a0)>180?1:0;
  const [x0,y0]=p(r2,a0),[x1,y1]=p(r2,a1),[x2,y2]=p(r1,a1),[x3,y3]=p(r1,a0);
  return `M${x0},${y0} A${r2},${r2} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r1},${r1} 0 ${large} 0 ${x3},${y3}Z`;
}
function drawWheel(){
  const svg = document.getElementById("wheel");
  const cs = curSeason(), m = new Date().getMonth()+1;
  const spans = {rayon:[-60,90], teyteyka:[90,210], amiyan:[210,300]};
  let h = "";
  for (const k of Object.keys(spans)){
    const [a0,a1]=spans[k], mid=(a0+a1)/2, r=150;
    const lx=200+r*Math.cos(mid*Math.PI/180), ly=200+r*Math.sin(mid*Math.PI/180);
    h += `<g class="wheel-seg" tabindex="0" role="button" data-season="${k}" aria-label="${esc(seasonLabel(k))}">
      <path d="${arc(200,200,108,192,a0+0.8,a1-0.8)}" fill="${SEASONS[k].color}" opacity="${k===cs?1:.78}"/>
      <text x="${lx}" y="${ly-4}" text-anchor="middle" fill="#fff" font-family="Noto Serif TC,serif" font-weight="900" font-size="22">${SEASONS[k].tao}</text>
      <text x="${lx}" y="${ly+18}" text-anchor="middle" fill="#fff" font-size="13">${esc(lang==="en"?SEASONS[k].en:SEASONS[k].zh)}</text>
    </g>`;
  }
  for (let i=1;i<=12;i++){
    const a=(i-1)*30-90+15, r=82;
    const x=200+r*Math.cos(a*Math.PI/180), y=200+r*Math.sin(a*Math.PI/180);
    h += `<text x="${x}" y="${y+5}" text-anchor="middle" font-size="${i===m?16:13}" font-weight="${i===m?700:400}" fill="${i===m?"var(--red)":"var(--ink-soft)"}">${i}</text>`;
  }
  const am=(m-1)*30-90+15;
  h += `<line x1="200" y1="200" x2="${200+60*Math.cos(am*Math.PI/180)}" y2="${200+60*Math.sin(am*Math.PI/180)}" stroke="var(--soot)" stroke-width="3" stroke-linecap="round"/><circle cx="200" cy="200" r="6" fill="var(--soot)"/>`;
  svg.innerHTML = h;
  svg.querySelectorAll(".wheel-seg").forEach(g=>{
    const go=()=>{F.season=g.dataset.season;renderFilters();renderGrid();document.getElementById("database").scrollIntoView();};
    g.addEventListener("click",go);
    g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
  });
  const s = SEASONS[cs];
  document.getElementById("now").style.setProperty("--season", s.color);
  document.getElementById("nowTitle").textContent = t("nowTitle").replace("{s}", seasonLabel(cs));
  document.getElementById("nowSub").textContent = lang==="en"? s.end : s.zhd;
}

/* ============ 資料庫 ============ */
function renderFilters(){
  const groups = [
    ["fCat","cat",[["all",t("all")],...Object.entries(CATS).map(([k,v])=>[k,pick(v)])]],
    ["fSeason","season",[["all",t("all")],...Object.keys(SEASONS).map(k=>[k,seasonLabel(k)])]],
    ["fRole","role",[["all",t("all")],...Object.entries(ROLES).map(([k,v])=>[k,pick(v)])]],
    ["fSrc","src",[["all",t("all")],["lit",t("lit")],["int",t("int")],["verify",pick(VERIFY)]]]
  ];
  document.getElementById("filters").innerHTML = groups.map(([lab,key,opts])=>
    `<div class="frow"><span class="lab">${t(lab)}</span>${opts.map(([v,txt])=>`<button class="chip" data-k="${key}" data-v="${v}" aria-pressed="${F[key]===v}">${esc(txt)}</button>`).join("")}</div>`).join("");
  document.querySelectorAll("#filters .chip").forEach(b=>b.onclick=()=>{F[b.dataset.k]=b.dataset.v;renderFilters();renderGrid();});
}
function matches(f){
  const q=F.q.trim().toLowerCase();
  if(q && ![f.zh,f.en,f.tao,f.d.zh,f.d.en].join(" ").toLowerCase().includes(q)) return false;
  if(F.cat!=="all" && f.cat!==F.cat) return false;
  if(F.season!=="all" && !f.seasons.includes(F.season)) return false;
  if(F.role!=="all" && f.role!==F.role) return false;
  if(F.src==="verify" && !f.verify) return false;
  if((F.src==="lit"||F.src==="int") && !f.src.includes(F.src)) return false;
  return true;
}
function tagsFor(f){
  return f.src.map(s=>`<span class="tag ${s}">${t(s)}</span>`).join("") +
    (f.verify?`<span class="tag verify">${esc(pick(VERIFY))}</span>`:"") +
    (f.game?`<span class="tag">${t("inGame")}</span>`:"");
}
function renderGrid(){
  const list = FOODS.filter(matches);
  document.getElementById("count").textContent = t("count").replace("{n}", list.length);
  const g = document.getElementById("grid");
  if(!list.length){ g.innerHTML = `<div class="empty">${t("empty")}</div>`; return; }
  g.innerHTML = list.map(f=>{ const ft=foodTitle(f); return `
    <button class="food" data-id="${f.id}" style="--cat:${CATS[f.cat].color}">
      <span class="tao">${esc(ft.main)}</span>
      <span class="sub">${esc(ft.sub)} · ${esc(pick(CATS[f.cat]))}</span>
      <p>${esc(pick(f.d))}</p>
      <span class="tags">${tagsFor(f)}</span>
    </button>`;}).join("");
  g.querySelectorAll(".food").forEach(b=>b.onclick=()=>openFood(b.dataset.id));
}
function openFood(id){
  const f = FOODS.find(x=>x.id===id), ft=foodTitle(f);
  const seas = f.seasons.length? f.seasons.map(seasonLabel).join("、") : pick(VERIFY);
  document.getElementById("dlgBody").innerHTML = `
    <button class="close" id="dlgClose">${t("close")}</button>
    <h3>${esc(ft.main)}</h3><div class="sub">${esc(ft.sub)}</div>
    <div class="tags" style="padding-top:12px">${tagsFor(f)}</div>
    <p>${esc(pick(f.d))}</p>
    <dl>
      <dt>${t("dGet")}</dt><dd>${esc(pick(f.get))}</dd>
      <dt>${t("dEat")}</dt><dd>${esc(pick(f.eat))}</dd>
      <dt>${t("dSeason")}</dt><dd>${esc(seas)}</dd>
      <dt>${t("dTaboo")}</dt><dd>${esc(pick(f.taboo))}</dd>
    </dl>
    <div class="srcs"><b>${t("dSrc")}</b><ul>${f.src.map(s=>`<li>${esc(t(s==="lit"?"litRef":"intRef"))}</li>`).join("")}</ul>${f.game?`<a class="gamelink" href="${GAME}" target="_blank" rel="noopener">${esc(t("meetInGame"))}</a>`:""}</div>`;
  const d=document.getElementById("dlg"); d.showModal();
  document.getElementById("dlgClose").onclick=()=>d.close();
}
document.getElementById("dlg").addEventListener("click",e=>{if(e.target.id==="dlg")e.target.close();});

/* ============ 食譜 ============ */
function renderRecipes(){
  document.getElementById("rlist").innerHTML = RECIPES.map(r=>`<button data-id="${r.id}" aria-current="${r.id===curRecipe}">${esc(lang==="en"?r.en:r.zh)}</button>`).join("");
  document.querySelectorAll("#rlist button").forEach(b=>b.onclick=()=>{curRecipe=b.dataset.id;renderRecipes();});
  const r = RECIPES.find(x=>x.id===curRecipe);
  const s = r.season==="all"? t("allYear") : seasonLabel(r.season);
  document.getElementById("rcard").innerHTML = `
    <h3>${esc(lang==="en"?r.en:r.zh)}</h3>
    <div class="meta">${esc(lang==="tao"?r.tao:(lang==="en"?"Tao name pending":r.tao))} · ${esc(s)} · ${esc(pick(r.who))}</div>
    <span class="tag verify">${esc(pick(VERIFY))}</span>
    <h4>${t("ing")}</h4><ul>${pick(r.ing).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
    <h4>${t("steps")}</h4><ol>${pick(r.steps).map(i=>`<li>${esc(i)}</li>`).join("")}</ol>
    <div class="note">${esc(pick(r.note))}</div>`;
}

/* ============ 其他區塊 ============ */
function renderStatic(){
  document.getElementById("tarosGrid").innerHTML = TAROS.map(p=>`
    <div class="pillar"><div class="L">${p.L}</div><h3>${esc(lang==="en"?p.en:p.zh)}</h3><div class="en">${esc(lang==="en"?"":p.en)}</div><p>${esc(pick(p.d))}</p></div>`).join("");
  document.getElementById("vilGrid").innerHTML = VILLAGES.map(v=>`
    <div class="vil"><div class="tn">${v.tao}</div><div class="zn">${esc(lang==="en"?v.tao:v.zh)}</div>
    <span class="st" style="--st:${SEASONS[curSeason()].color}" title="${esc(t("vilStatusNote"))}">${esc(seasonLabel(curSeason()))}</span>
    <p>${esc(lang==="en"?v.en:v.zhn)}</p></div>`).join("");
  document.getElementById("rules").innerHTML = RULES.map(r=>{const x=pick(r);return `<div class="rule ${r.no?"no":"yes"}"><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`;}).join("");
  document.getElementById("roles").innerHTML = GAME_ROLES.map((r,i)=>`<a class="role" href="${GAME}#play-${GAME_ROLE_IDS[i]}" target="_blank" rel="noopener"><b>${esc(lang==="en"?r.en:r.zh)}</b>${esc(pick(r.d))}<em>${esc(t("playAs"))}</em></a>`).join("");
  document.getElementById("words").innerHTML = `<thead><tr><th>${t("thLang")}</th><th>${t("thTaro")}</th><th>${t("thYam")}</th><th>${t("thFf")}</th></tr></thead><tbody>${
    WORDS.map(w=>`<tr><td>${esc(pick(w.lang))}</td><td class="w">${esc(w.taro)}</td><td class="w">${esc(w.yam)}</td><td class="w">${esc(w.ff)}</td></tr>`).join("")}</tbody>`;
  if(document.getElementById("partners")) document.getElementById("partners").innerHTML = PARTNERS.map(p=>`<div class="partner"><h3>${esc(lang==="en"?p.en:p.zh)}</h3><p>${esc(pick(p.d))}</p></div>`).join("");
  document.getElementById("pplGrid").innerHTML = PEOPLES.map(([z,e],i)=>{const on=i===8;return `<div class="ppl ${on?"on":""}"><b>${esc(lang==="en"?e:z)}</b><span>${esc(lang==="en"?z:e)}</span><em>${on?t("live"):t("soon")}</em></div>`;}).join("");
  document.getElementById("austro").innerHTML = AUSTRO.map(([z,e])=>`<span class="tag">${esc(lang==="en"?e:z)}</span>`).join("");
  document.getElementById("method").innerHTML = METHOD.map(m=>`<div><h3>${esc(pick(m.h))}</h3>${m.d?`<p>${esc(pick(m.d))}</p>`:`<ol class="steps">${pick(m.list).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`}</div>`).join("");
}

function applyLang(){
  document.documentElement.lang = lang==="en"?"en":(lang==="tao"?"tao":"zh-Hant");
  document.querySelectorAll("[data-i]").forEach(el=>{const v=t(el.dataset.i); if(typeof v==="string") el.textContent=v;});
  document.getElementById("q").placeholder = t("search");
  document.getElementById("chatIn").placeholder = t("chatPh");
  document.getElementById("taobar").classList.toggle("show", lang==="tao");
  document.querySelectorAll(".langs button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===lang));
  drawWheel(); renderMap(); renderFilters(); renderGrid(); renderRecipes(); renderStatic(); renderSugs();
}
document.querySelectorAll(".langs button").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;applyLang();});
document.getElementById("q").addEventListener("input",e=>{F.q=e.target.value;renderGrid();});

/* ============ 聊天助理 ============ */
let sample=null, busy=false, ctl=null;
const history=[];
const chat=document.getElementById("chat"), msgs=document.getElementById("msgs");
function addMsg(role,text){const d=document.createElement("div");d.className="m "+(role==="user"?"u":"a");d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d;}
function renderSugs(){
  const box=document.getElementById("sugs");
  box.innerHTML = history.length? "" : t("sugs").map(s=>`<button class="chip">${esc(s)}</button>`).join("");
  box.querySelectorAll("button").forEach(b=>b.onclick=()=>ask(b.textContent));
}
function knowledge(){
  return JSON.stringify({
    note:"Prototype data. Items with verify:true or containing 待確認/待補 are NOT confirmed by the Tao community.",
    seasons:SEASONS, foods:FOODS.map(f=>({zh:f.zh,en:f.en,tao:f.tao,category:CATS[f.cat].en,seasons:f.seasons,gatheredBy:ROLES[f.role].en,get:f.get,whoEats:f.eat,desc:f.d,customs:f.taboo,sources:f.src,needsVerification:f.verify})),
    recipes:RECIPES, villages:VILLAGES, visitorRules:RULES, pacificWords:WORDS, taiwanPeoples:PEOPLES
  });
}
function buildPrompt(){
  const answerLang = lang==="en" ? "English" : "Traditional Chinese (Taiwan)";
  const intro = `You are the food assistant for TAROS, a prototype database on Tao (Yami) food sovereignty in Lanyu (Orchid Island), Taiwan, connected to Pacific Austronesian foodways.
Rules:
- Answer ONLY from the DATABASE below. If it isn't there, say the database doesn't have it yet and suggest asking Tao community members.
- When information is marked needsVerification, 待確認 or 待補, say clearly that it awaits community confirmation.
- Never invent Tao language words, ceremony details or taboos. Community knowledge comes first.
- Do not describe ceremonies in detail; encourage visitors to respect taboos.
- Mention whether an answer comes from literature, interviews, or both when relevant.
- Answer in ${answerLang}, in plain text without markdown, in 2 to 6 short sentences.
DATABASE:
${knowledge()}`;
  const turns = history.slice(-10).map(h=>({role:h.role, content:h.content}));
  turns[0] = {role:"user", content: intro + "\n\nQUESTION: " + turns[0].content};
  if (turns[0].role!=="user") turns.shift();
  return turns;
}
async function ask(q){
  q=q.trim(); if(!q||busy||!sample) return;
  busy=true; addMsg("user",q); history.push({role:"user",content:q}); renderSugs();
  const out=addMsg("assistant",t("thinking"));
  ctl=new AbortController();
  try{
    const {text}=await sample(buildPrompt(),{cache:false,signal:ctl.signal,onText:({text})=>{out.textContent=text;msgs.scrollTop=msgs.scrollHeight;}});
    out.textContent=text; history.push({role:"assistant",content:text});
  }catch(e){
    if(e && e.text){ out.textContent=e.text; history.push({role:"assistant",content:e.text}); }
    else { out.textContent = t("chatErr")[e?.code] || t("chatErr").def; history.pop(); }
    if(e?.code==="not_granted"){ document.getElementById("chatFab").hidden=true; }
  }finally{ busy=false; }
}
document.getElementById("chatForm").onsubmit=e=>{e.preventDefault();const i=document.getElementById("chatIn");ask(i.value);i.value="";};
document.getElementById("chatFab").onclick=()=>{chat.classList.toggle("open"); if(chat.classList.contains("open")){ if(!msgs.children.length) addMsg("assistant",t("chatHi")); document.getElementById("chatIn").focus(); }};
document.getElementById("chatClose").onclick=()=>chat.classList.remove("open");
(async()=>{ try{ if(window.claude){ sample=await claude.use("sample"); if(sample) document.getElementById("chatFab").hidden=false; } }catch(e){} })();

renderStars();
applyLang();
/* 從遊戲連回：#food-<id> 直接打開該食材 */
function openFromHash(){ const m=location.hash.match(/^#food-([a-z]+)$/); if(m && FOODS.some(f=>f.id===m[1])){ document.getElementById("database").scrollIntoView(); openFood(m[1]); } }
window.addEventListener("hashchange", openFromHash);
openFromHash();
