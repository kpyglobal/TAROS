/* Pacific voyaging map + starfield decoration */
let curIsle="lanyu";
const px=lon=>(lon-110)/150*1000, py=lat=>(32-lat)/76*540;
function renderMap(){
  const svg=document.getElementById("vmap"); if(!svg) return;
  const by=id=>ISLANDS.find(i=>i.id===id);
  const home=by("lanyu"), hx=px(home.lon), hy=py(home.lat);
  const TW=[[121.5,25.3],[122.0,25.0],[121.85,24.5],[121.6,23.8],[121.4,23.1],[121.0,22.6],[120.85,21.9],[120.7,22.3],[120.3,22.6],[120.1,23.0],[120.15,23.6],[120.4,24.2],[120.7,24.6],[121.0,25.05]];
  const label=i=>esc(lang==="en"?i.en:i.zh);
  let h="";
  for(let lat=30;lat>=-40;lat-=10){ const y=py(lat); h+=`<line x1="0" x2="1000" y1="${y}" y2="${y}" stroke="#8FE3DC" stroke-opacity="${lat===0?.35:.08}" ${lat===0?'stroke-dasharray="2 6"':''}/>`; }
  for(let lon=120;lon<=250;lon+=20){ const x=px(lon); h+=`<line y1="0" y2="540" x1="${x}" x2="${x}" stroke="#8FE3DC" stroke-opacity=".06"/>`; }
  h+=`<text x="990" y="${py(0)-6}" text-anchor="end" fill="#8FE3DC" fill-opacity=".6" font-size="13">${esc(t("equator"))}</text>`;
  const tri=["hawaii","aotearoa","rapanui"].map(by).map(i=>`${px(i.lon)},${py(i.lat)}`).join(" ");
  h+=`<polygon points="${tri}" fill="#8FE3DC" fill-opacity=".05" stroke="#8FE3DC" stroke-opacity=".35" stroke-dasharray="6 6"/>`;
  h+=`<text x="${px(222)}" y="${py(-2)}" text-anchor="middle" fill="#8FE3DC" fill-opacity=".7" font-size="14" font-family="Noto Serif TC,serif">${esc(t("polyTri"))}</text>`;
  [["Micronesia","密克羅尼西亞",150,18],["Melanesia","美拉尼西亞",160,-8]].forEach(([e,z,lo,la])=>h+=`<text x="${px(lo)}" y="${py(la)}" fill="#8FE3DC" fill-opacity=".55" font-size="14" font-family="Noto Serif TC,serif">${esc(lang==="en"?e:z)}</text>`);
  h+=`<text x="10" y="${py(10)}" fill="#8FE3DC" fill-opacity=".55" font-size="13">${esc(t("toMadagascar"))}</text>`;
  /* routes from Lanyu */
  ISLANDS.filter(i=>!i.inset).forEach(i=>{ const x=px(i.lon), y=py(i.lat), mx=(hx+x)/2, my=Math.min(hy,y)-60-Math.abs(x-hx)*.12;
    h+=`<path d="M${hx},${hy} Q${mx},${my} ${x},${y}" fill="none" stroke="${i.id===curIsle?"#F4B860":"#8FE3DC"}" stroke-opacity="${i.id===curIsle?.9:.28}" stroke-width="${i.id===curIsle?2:1.2}" stroke-dasharray="3 6"/>`; });
  /* Taiwan on main map (small) */
  h+=`<polygon points="${TW.map(([lo,la])=>`${px(lo)},${py(la)}`).join(" ")}" fill="#F2F7F6" fill-opacity=".9"/>`;
  h+=`<circle cx="${hx}" cy="${hy}" r="3" fill="#F4B860"/><circle cx="${px(121.97)}" cy="${py(20.45)}" r="2.5" fill="#F2F7F6"/>`;
  h+=`<text x="${px(118.6)}" y="${py(26.4)}" fill="#F2F7F6" font-size="15" font-weight="700" font-family="Noto Serif TC,serif">${esc(lang==="en"?"Taiwan":"台灣")}</text>`;
  /* inset */
  const IX=24, IY=286, IW=210, IH=246, k=40, L0=119.3, LA0=26.35;
  const ix=lon=>IX+(lon-L0)*k, iy=lat=>IY+(LA0-lat)*k;
  h+=`<path d="M${px(121)},${py(21.5)} L${IX+IW/2},${IY}" stroke="#8FE3DC" stroke-opacity=".45" stroke-dasharray="2 4"/>`;
  h+=`<rect x="${IX}" y="${IY}" width="${IW}" height="${IH}" fill="#0E4554" stroke="#8FE3DC" stroke-opacity=".5" rx="2"/>`;
  h+=`<text x="${IX+10}" y="${IY+22}" fill="#F4B860" font-size="14" font-weight="700" font-family="Noto Serif TC,serif">${esc(t("insetTitle"))}</text>`;
  h+=`<path d="M${ix(122.4)},${iy(20.1)} C${ix(122.9)},${iy(22)} ${ix(122.3)},${iy(23.6)} ${ix(122.9)},${iy(25.4)}" fill="none" stroke="#5CC6C0" stroke-width="7" stroke-opacity=".35" stroke-linecap="round"/>`;
  h+=`<path d="M${ix(122.75)},${iy(25.2)} l-4,10 l9,-3z" fill="#5CC6C0" fill-opacity=".7"/>`;
  h+=`<text x="${ix(123.05)}" y="${iy(23.0)}" fill="#8FE3DC" font-size="12" writing-mode="${lang==="en"?"horizontal-tb":"vertical-rl"}" ${lang==="en"?`transform="rotate(-80 ${ix(123.05)} ${iy(23.0)})"`:""}>${esc(t("kuroshio"))}</text>`;
  const tw=by("taiwan");
  h+=`<g class="isle ${curIsle==="taiwan"?"on":""}" data-id="taiwan" tabindex="0" role="button" aria-label="${label(tw)}">
      <polygon points="${TW.map(([lo,la])=>`${ix(lo)},${iy(la)}`).join(" ")}" fill="${curIsle==="taiwan"?"#F4B860":"#F2F7F6"}" stroke="#0A2E3D" stroke-width="1.5"/>
      <text x="${ix(119.45)}" y="${iy(23.4)}" font-size="15">${label(tw)}</text></g>`;
  [["lanyu",122.0,22.05,"start"],["batanes",121.55,20.45,"end"]].forEach(([id,tx,ty,anc])=>{ const i=by(id), x=ix(i.lon), y=iy(i.lat);
    h+=`<g class="isle ${i.id===curIsle?"on":""}" data-id="${i.id}" tabindex="0" role="button" aria-label="${label(i)}">
      <circle class="halo" cx="${x}" cy="${y}" r="12"/><circle class="dot" cx="${x}" cy="${y}" r="${i.home?7:5}"/>
      <text x="${anc==="start"?x+12:x-12}" y="${y+5}" text-anchor="${anc}" font-size="14">${label(i)}</text></g>`; });
  /* other islands */
  ISLANDS.filter(i=>!i.inset).forEach(i=>{ const x=px(i.lon), y=py(i.lat); const left=i.id==="rapanui";
    h+=`<g class="isle ${i.id===curIsle?"on":""}" data-id="${i.id}" tabindex="0" role="button" aria-label="${label(i)}">
      <circle class="halo" cx="${x}" cy="${y}" r="14"/><circle class="dot" cx="${x}" cy="${y}" r="6"/>
      <text x="${left?x-14:x+14}" y="${y+5}" text-anchor="${left?"end":"start"}">${label(i)}</text></g>`; });
  svg.innerHTML=h;
  svg.querySelectorAll(".isle").forEach(g=>{ const go=()=>{curIsle=g.dataset.id;renderMap();};
    g.addEventListener("click",go); g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}}); });
  const i=by(curIsle);
  document.getElementById("vpanel").innerHTML=`<h3>${label(i)}</h3><div class="who">${esc(pick(i.who))}</div>
    <div class="foods">${pick(i.foods).map(f=>`<span>${esc(f)}</span>`).join("")}</div><p>${esc(pick(i.d))}</p>
    <small>${esc(i.home?t("startHere"):(i.id==="taiwan"?t("homeland"):t("partnerNote")))}</small>`;
}
function renderStars(){
  const svg=document.getElementById("stars"); let h=""; let seed=7;
  const r=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
  for(let k=0;k<70;k++){ h+=`<circle cx="${r()*1000}" cy="${r()*420}" r="${r()*1.4+.4}" fill="#fff" opacity="${r()*.6+.2}"/>`; }
  svg.innerHTML=h;
}
