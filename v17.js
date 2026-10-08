(()=>{'use strict';
const b=window.v11bridge;if(!b)return;
const extras=b.get();extras.v17=extras.v17||{};
const v=extras.v17;
if(!Array.isArray(v.quests))v.quests=[
{id:'q1',name:'Oracle of Kindness',description:'Show an act of kindness or encouragement.',xp:5,dollars:0},
{id:'q2',name:'Athena’s Scholar Challenge',description:'Explain a solution using evidence.',xp:10,dollars:0},
{id:'q3',name:'Hermes’ Helping Hand',description:'Help a classmate responsibly.',xp:5,dollars:2},
{id:'q4',name:'Perseverance in the Labyrinth',description:'Keep trying and revise difficult work.',xp:10,dollars:0}
];
if(!v.claims||typeof v.claims!=='object')v.claims={};
if(!v.treasures||typeof v.treasures!=='object')v.treasures={};
if(!Number.isInteger(v.rotation))v.rotation=0;
const prizes=['🏺 Ancient Amphora','🛡️ Bronze Shield','🦉 Owl of Athena','🌿 Laurel Wreath','🔱 Poseidon’s Trident','⭐ Star of Olympus'];
const day=()=>new Date().toLocaleDateString('en-CA');
const escapeHtml=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const absent=i=>(extras.v12?.attendance?.[day()]||{})[i]==='absent';
const eligible=()=>[...selected].filter(i=>students[i]&&!absent(i));
function persist(){b.persist()}
function burst(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=document.createElement('div');el.id='v17Confetti';document.body.append(el);for(let i=0;i<28;i++){let piece=document.createElement('i');piece.textContent=['✨','⭐','🏛️','🌟'][i%4];piece.style.left=(i*37%100)+'%';piece.style.animationDelay=(i%7*.12)+'s';el.append(piece)}setTimeout(()=>el.remove(),3700)}
function panel(){return document.getElementById('v17Panel')}
window.v17Close=()=>panel().classList.remove('open');
window.v17Open=()=>{
const quest=v.quests[v.rotation%v.quests.length],body=document.getElementById('v17Body');
let collection=Object.entries(v.treasures).map(([name,items])=>`<div class="v17row"><b>${escapeHtml(name)}</b>: ${(Array.isArray(items)?items:[]).map(x=>`<span class="v17treasure">${escapeHtml(x)}</span>`).join(' ')||'No treasures yet'}</div>`).join('');
body.innerHTML=`<p>Teacher-controlled rewards. Absent students are excluded. Quests can be claimed once per hero per day.</p>
<div class="v17row"><h3>📜 Mystery Quest</h3><b>${escapeHtml(quest.name)}</b><p>${escapeHtml(quest.description)}</p><p>Reward: +${quest.xp} XP and +$${quest.dollars} Hero Dollars per eligible hero</p>
<button id="v17Claim">Complete for selected heroes</button><button id="v17Reroll">Reveal another quest</button></div>
<div class="v17row"><h3>🎁 Collectible Treasure</h3><p>Cosmetic collectibles only; no XP or dollars awarded. One treasure per selected hero per day.</p><button id="v17Collect">Reveal treasure for selected heroes</button></div>
<div class="v17row"><h3>🎉 Celebration</h3><button id="v17Celebrate">Launch class celebration</button></div>
<h3>🏺 Trophy Collection</h3>${collection}`;
body.querySelector('#v17Reroll').onclick=()=>{v.rotation++;persist();v17Open()};
body.querySelector('#v17Claim').onclick=()=>{
 const ids=eligible().filter(i=>!v.claims[day()+'|'+students[i].name+'|'+quest.id]);
 if(!ids.length)return toast('No eligible unclaimed heroes selected.');
 if(!confirm(`Complete ${quest.name} for ${ids.length} heroes?`))return;
 snap();let levelers=[];
 ids.forEach(i=>{const st=students[i],prior=L(st.xp).l;st.xp+=quest.xp;st.heroDollars=(st.heroDollars||0)+quest.dollars;v.claims[day()+'|'+st.name+'|'+quest.id]=true;if(L(st.xp).l>prior)levelers.push(st.name)});
 save();persist();render();playXPSound();if(quest.dollars)playCoinSound();if(levelers.length)playLevelSound();
 celebrate('QUEST COMPLETE!','📜 '+quest.name,ids.length+' heroes rewarded'+(levelers.length?' • Level up: '+levelers.join(', '):''));burst();v17Open();
};
body.querySelector('#v17Collect').onclick=()=>{
 const ids=eligible().filter(i=>!v.claims[day()+'|'+students[i].name+'|treasure']);
 if(!ids.length)return toast('No eligible heroes available for a treasure today.');
 if(!confirm('Reveal one collectible for each of '+ids.length+' heroes?'))return;
 ids.forEach(i=>{const name=students[i].name;v.treasures[name]=v.treasures[name]||[];v.treasures[name].push(prizes[Math.floor(Math.random()*prizes.length)]);v.claims[day()+'|'+name+'|treasure']=true});
 persist();playCoinSound();celebrate('TREASURE FOUND!','🎁 OLYMPUS COLLECTION',ids.length+' heroes earned a collectible');burst();v17Open();
};
body.querySelector('#v17Celebrate').onclick=()=>{playLevelSound();celebrate('OLYMPUS CELEBRATES!','🏆 GO THE DISTANCE!','Every hero contributes to our class adventure.');burst()};
panel().classList.add('open');
};
})();