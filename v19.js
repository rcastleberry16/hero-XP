(()=>{'use strict';
const bridge=window.v11bridge;if(!bridge)return;
const extras=bridge.get();extras.v17=extras.v17||{};
extras.v17.treasures=extras.v17.treasures||{};
const treasures=extras.v17.treasures;
extras.v19=extras.v19||{};
const state=extras.v19;
if(!Array.isArray(state.history))state.history=[];
const recipes=[
{name:'⚔️ Blade of Olympus',needs:['🛡️ Bronze Shield','🌿 Laurel Wreath']},
{name:'🔮 Oracle’s Charm',needs:['🦉 Owl of Athena','⭐ Star of Olympus']},
{name:'🏺 Legendary Vessel',needs:['🏺 Ancient Amphora','🔱 Poseidon’s Trident']}
];
const today=()=>new Date().toLocaleDateString('en-CA');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const names=()=>students.map(s=>s.name);
const absent=n=>{const i=students.findIndex(s=>s.name===n);return i<0||(extras.v12?.attendance?.[today()]||{})[i]==='absent'};
const items=n=>Array.isArray(treasures[n])?treasures[n]:[];
const saveAll=()=>bridge.persist();
const panel=()=>document.getElementById('v19Panel');
let current=null;
const count=(arr,x)=>arr.filter(v=>v===x).length;
function record(type,detail){state.history.unshift({type,detail,at:new Date().toISOString()});state.history=state.history.slice(0,150)}
window.v19Close=()=>panel().classList.remove('open');
window.v19Open=(requested)=>{
 const roster=names();if(!roster.length){document.getElementById('v19Body').textContent='No heroes available.';panel().classList.add('open');return}
 const selectedName=roster.includes(requested)?requested:roster.includes(current)?current:roster[0];current=selectedName;
 const inventory=items(current);
 const opts=roster.map(n=>`<option value="${esc(n)}"${n===current?' selected':''}>${esc(n)}</option>`).join('');
 const targetOpts=roster.filter(n=>n!==current).map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('');
 const available=[...new Set(inventory)];
 const inventoryOpts=available.map(x=>`<option value="${esc(x)}">${esc(x)} (${count(inventory,x)})</option>`).join('');
 const recipeRows=recipes.map((r,i)=>`<div class="forge-row"><b>${esc(r.name)}</b><p>Requires: ${r.needs.map(esc).join(' + ')}</p><button data-craft="${i}" ${absent(current)||!r.needs.every(x=>count(inventory,x)>=count(r.needs,x))?'disabled':''}>Craft</button></div>`).join('');
 document.getElementById('v19Body').innerHTML=`
 <p class="forge-note">Teacher-controlled cosmetic rewards only. Trading and crafting do not spend XP or Hero Dollars. Absent heroes cannot trade or craft.</p>
 <label>Hero <select id="v19Hero">${opts}</select></label>
 <h3>🎒 Artifact Inventory</h3><div class="forge-items">${available.length?available.map(x=>`<span>${esc(x)} ×${count(inventory,x)}</span>`).join(''):'No artifacts collected yet'}</div>
 <h3>⚒️ Craft Legendary Equipment</h3>${recipeRows}
 <h3>🤝 Trade One Artifact</h3><div class="forge-row">
 <label>Artifact <select id="v19Item">${inventoryOpts}</select></label>
 <label>Recipient <select id="v19Recipient">${targetOpts}</select></label>
 <button id="v19Trade" ${!available.length||!targetOpts||absent(current)?'disabled':''}>Confirm Trade</button>
 </div><h3>📜 Recent Forge Activity</h3><div>${state.history.slice(0,12).map(h=>`<p>${esc(h.type)} — ${esc(h.detail)}</p>`).join('')||'No trades or crafting yet.'}</div>`;
 const body=document.getElementById('v19Body');
 body.querySelector('#v19Hero').onchange=e=>v19Open(e.target.value);
 body.querySelectorAll('[data-craft]').forEach(btn=>btn.onclick=()=>{
  const recipe=recipes[Number(btn.dataset.craft)];
  if(absent(current))return toast('Absent heroes cannot craft.');
  const bag=items(current).slice();
  if(!recipe.needs.every(x=>count(bag,x)>=count(recipe.needs,x)))return toast('Missing required artifacts.');
  if(!confirm('Craft '+recipe.name+' for '+current+'? Required artifacts will be consumed.'))return;
  for(const item of recipe.needs){bag.splice(bag.indexOf(item),1)}
  bag.push(recipe.name);treasures[current]=bag;record('Craft',current+' created '+recipe.name);saveAll();
  playCoinSound();celebrate(current,'⚒️ LEGENDARY EQUIPMENT! ',recipe.name);v19Open(current);
 });
 body.querySelector('#v19Trade').onclick=()=>{
  const item=body.querySelector('#v19Item').value,recipient=body.querySelector('#v19Recipient').value;
  if(!item||!recipient||current===recipient)return toast('Choose an artifact and another hero.');
  if(absent(current)||absent(recipient))return toast('Absent heroes cannot trade.');
  const from=items(current).slice(),at=from.indexOf(item);
  if(at<0)return toast('Artifact is no longer available.');
  if(!confirm('Transfer '+item+' from '+current+' to '+recipient+'?'))return;
  from.splice(at,1);treasures[current]=from;treasures[recipient]=items(recipient).concat([item]);
  record('Trade',current+' gave '+item+' to '+recipient);saveAll();playCoinSound();
  toast('Artifact transferred.');v19Open(current);
 };
 panel().classList.add('open');
};
})();