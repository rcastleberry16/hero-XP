(()=>{'use strict';
const bridge=window.v11bridge;if(!bridge)return;
const extras=bridge.get();extras.v17=extras.v17||{};const collection=extras.v17.treasures||{};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const panel=()=>document.getElementById('v18Panel');
const body=()=>document.getElementById('v18Body');
const trophies=(name)=>Array.isArray(collection[name])?collection[name]:[];
const unique=items=>[...new Set(items)];
window.v18Close=()=>panel().classList.remove('open');
window.v18Open=(requested)=>{
 let names=students.map(s=>s.name);
 let active=requested&&names.includes(requested)?requested:(window._v18Current&&names.includes(window._v18Current)?window._v18Current:names[0]);
 window._v18Current=active;
 const student=students.find(s=>s.name===active);
 if(!student){body().textContent='No students available.';panel().classList.add('open');return}
 const items=trophies(active),different=unique(items);
 const level=typeof L==='function'?L(Number(student.xp)||0).l:'—';
 const owned=items.length;
 const counts=different.map(x=>({name:x,count:items.filter(t=>t===x).length}));
 const total=Object.values(collection).reduce((a,x)=>a+(Array.isArray(x)?x.length:0),0);
 body().innerHTML=`<div class="museum-summary"><b>Olympus Museum</b> • ${total} treasures collected by the class. Treasures are cosmetic; they do not affect XP or Hero Dollars.</div>
 <label for="v18Hero">Choose a hero</label> <select id="v18Hero">${names.map(n=>`<option value="${esc(n)}"${n===active?' selected':''}>${esc(n)}</option>`).join('')}</select>
 <div class="museum-stats"><span><b>${esc(active)}</b></span><span>Level ${level}</span><span>${Number(student.xp||0).toLocaleString()} XP</span><span>$${Number(student.heroDollars||0).toLocaleString()} Hero Dollars</span></div>
 <h3>🏺 Hero Treasure Collection</h3>
 <p>${owned} total treasures • ${different.length} unique artifacts</p>
 <div>${counts.length?counts.map(x=>`<span class="museum-item">${esc(x.name)}${x.count>1?' ×'+x.count:''}</span>`).join(''):'No treasures yet. Complete a Mystery Quest treasure reveal to begin a collection.'}</div>
 <p><button id="v18Spotlight">🌟 Spotlight This Hero</button> <button id="v18Mystery">✨ Open Mystery Quests</button></p>`;
 body().querySelector('#v18Hero').addEventListener('change',e=>v18Open(e.target.value));
 body().querySelector('#v18Spotlight').addEventListener('click',()=>{
   if(typeof celebrate==='function')celebrate(active.toUpperCase(),'🏛️ OLYMPUS MUSEUM',owned+' treasures • '+different.length+' unique artifacts');
 });
 body().querySelector('#v18Mystery').addEventListener('click',()=>{v18Close();if(typeof v17Open==='function')v17Open()});
 panel().classList.add('open');
};
})();