(()=>{'use strict';
const bridge=window.v11bridge;if(!bridge)return;
const extras=bridge.get();extras.v17=extras.v17||{};extras.v17.treasures=extras.v17.treasures||{};
extras.v20=extras.v20||{};const state=extras.v20;if(!state.heroes||typeof state.heroes!=='object')state.heroes={};
const slots={weapon:['⚔️ Blade of Olympus','🔱 Poseidon’s Trident'],shield:['🛡️ Bronze Shield'],charm:['🔮 Oracle’s Charm','🏺 Legendary Vessel','🦉 Owl of Athena','⭐ Star of Olympus','🌿 Laurel Wreath','🏺 Ancient Amphora']};
const styles={bronze:'Bronze Adventurer',silver:'Silver Guardian',gold:'Golden Champion',royal:'Royal Olympian'};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names=()=>students.map(s=>s.name);
const bag=n=>Array.isArray(extras.v17.treasures[n])?extras.v17.treasures[n]:[];
const profile=n=>state.heroes[n]||(state.heroes[n]={weapon:'',shield:'',charm:'',style:'bronze',title:''});
const persist=()=>bridge.persist();
const panel=()=>document.getElementById('v20Panel');
const body=()=>document.getElementById('v20Body');
let current='';
function allowed(n,slot,item){return !item||(slots[slot].includes(item)&&bag(n).includes(item))}
function sanitize(n){const pr=profile(n);for(const slot of Object.keys(slots)){if(!allowed(n,slot,pr[slot]))pr[slot]=''}if(!styles[pr.style])pr.style='bronze'}
function decorate(){
 const cards=document.querySelectorAll('#grid .card');
 students.forEach((st,i)=>{
  const card=cards[i];if(!card)return;
  sanitize(st.name);const pr=profile(st.name);
  card.classList.remove('v20-style-gold','v20-style-silver','v20-style-royal');
  if(pr.style!=='bronze')card.classList.add('v20-style-'+pr.style);
  let line=card.querySelector('.v20-equipment');if(!line){line=document.createElement('div');line.className='v20-equipment';card.appendChild(line)}
  const items=[pr.weapon,pr.shield,pr.charm].filter(Boolean);
  line.textContent=(pr.title?pr.title+' • ':'')+(items.length?items.join('  '):'🏺 Adventurer');
 });
}
window.v20Close=()=>panel().classList.remove('open');
window.v20Open=(requested)=>{
 const roster=names();if(!roster.length){body().textContent='No students available.';panel().classList.add('open');return}
 const name=roster.includes(requested)?requested:(roster.includes(current)?current:roster[0]);current=name;sanitize(name);
 const pr=profile(name),st=students.find(x=>x.name===name),owned=bag(name);
 const options=roster.map(n=>`<option value="${esc(n)}"${n===name?' selected':''}>${esc(n)}</option>`).join('');
 const rows=Object.keys(slots).map(slot=>{
  const choices=['',...slots[slot].filter(item=>owned.includes(item))];
  return `<div class="equip-row"><label><b>${slot[0].toUpperCase()+slot.slice(1)} slot</b><select data-slot="${slot}">${choices.map(x=>`<option value="${esc(x)}"${x===pr[slot]?' selected':''}>${esc(x||'None equipped')}</option>`).join('')}</select></label></div>`;
 }).join('');
 body().innerHTML=`<p>Equip artifacts already earned through the Olympus Museum. Equipment is cosmetic and never changes XP, Hero Dollars, or academic rewards.</p><label>Hero <select id="v20Hero">${options}</select></label>
 <div class="equip-preview"><div class="glyph">${esc(pr.weapon||'🏛️')} ${esc(pr.shield||'')} ${esc(pr.charm||'')}</div><h3>${esc(name)} — Level ${L(st.xp).l}</h3><p>${esc(pr.title||styles[pr.style])}</p><p>${Number(st.xp).toLocaleString()} XP • $${Number(st.heroDollars||0).toLocaleString()} Hero Dollars</p></div>
 ${rows}<div class="equip-row"><label><b>Card frame</b><select id="v20Style">${Object.entries(styles).map(([key,label])=>`<option value="${key}"${key===pr.style?' selected':''}>${label}</option>`).join('')}</select></label></div>
 <div class="equip-row"><label><b>Hero title</b><input id="v20Title" maxlength="45" value="${esc(pr.title)}" placeholder="e.g. Guardian of Olympus"></label></div>
 <p><button id="v20Save">Save Equipment & Style</button><button id="v20Spotlight">🌟 Hero Spotlight</button><button id="v20Museum">🏛️ Open Museum</button></p>`;
 body().querySelector('#v20Hero').onchange=e=>v20Open(e.target.value);
 body().querySelector('#v20Save').onclick=()=>{
  const updates={};
  for(const slot of Object.keys(slots)){
   const item=body().querySelector('[data-slot="'+slot+'"]').value;
   if(!allowed(name,slot,item))return toast('That artifact is not in this hero’s collection.');
   updates[slot]=item;
  }
  updates.style=body().querySelector('#v20Style').value;
  updates.title=body().querySelector('#v20Title').value.trim().slice(0,45);
  Object.assign(pr,updates);persist();render();v20Open(name);toast('Hero equipment saved.');
 };
 body().querySelector('#v20Spotlight').onclick=()=>celebrate(name.toUpperCase(),'🛡️ HERO OF OLYMPUS',[pr.weapon,pr.shield,pr.charm].filter(Boolean).join(' • ')||'A new adventure awaits');
 body().querySelector('#v20Museum').onclick=()=>{v20Close();if(typeof v18Open==='function')v18Open(name)};
 panel().classList.add('open');
};
const previousRender=render;
render=function(){previousRender();decorate()};
const previousV19=window.v19Open;
if(previousV19)window.v19Open=function(...args){const result=previousV19(...args);decorate();return result};
render();
})();