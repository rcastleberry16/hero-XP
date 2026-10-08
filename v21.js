(()=>{
'use strict';
if(typeof render!=='function'||typeof students==='undefined'||typeof L!=='function')return;
const tiers=[
['🏺','Novice of Olympus','#a96f44','#f8e9d5','#d8ad83','#fff','#e7c59d'],
['🌿','Laurel Seeker','#7e8b4b','#f1f3dc','#c9d4a3','#fff','#b8c47a'],
['🛡️','Bronze Guardian','#995b37','#f5dfca','#d7a67e','#fff','#e9ad68'],
['🦉','Athena’s Scholar','#4b6b8c','#e0edf7','#aac8de','#fff','#9dd5fa'],
['⚔️','Arena Champion','#9b493d','#f8ded6','#dca99a','#fff','#ffb59c'],
['🔱','Sea Voyager','#216c8a','#dcf3f8','#8ec8d8','#fff','#91e9f5'],
['🌙','Moon Sentinel','#595a96','#e9e8fa','#bab5e4','#fff','#c9c4ff'],
['☀️','Sun Champion','#a16b12','#fff2c9','#edcf83','#201608','#ffe18a'],
['🔥','Flame Warden','#ad4b20','#ffe2c7','#eeb18a','#fff','#ffba7b'],
['💎','Crystal Defender','#3b7f80','#dff6f3','#a0d9d3','#fff','#a9fff3'],
['🪽','Sky Guardian','#5078a9','#e3f0ff','#b0c8eb','#fff','#b7dfff'],
['🏹','Artemis Ranger','#3c7958','#e2f4e7','#a6d4b4','#fff','#a6f5c3'],
['⚡','Stormcaller','#604aa1','#ebe3ff','#bfb1e6','#fff','#d3c3ff'],
['🏛️','Temple Protector','#897043','#f5ead6','#d8c29d','#fff','#ffdc95'],
['🐉','Mythic Defender','#933f78','#f8e0f1','#d9a6cb','#fff','#f7afe7'],
['👑','Royal Olympian','#7e4a9e','#f0e2fc','#c8a7e4','#fff','#e9bcff'],
['🌌','Celestial Hero','#343b83','#e3e7ff','#9fa9e4','#fff','#b6c5ff'],
['✨','Divine Champion','#8c6b1e','#fff2c7','#ecd38d','#fff','#ffedaa'],
['🌟','Legend of Olympus','#a74b6d','#fbe0e9','#e8a5bc','#fff','#ffd0e2'],
['🏆','Immortal of Olympus','#5c438e','#f6e5ff','#d8b6ec','#fff','#ffdf80']
];
function decorate(){
 const cards=document.querySelectorAll('#grid .card');
 students.forEach((student,i)=>{
  const card=cards[i];if(!card)return;
  const level=Math.max(1,Math.min(100,Number(L(Number(student.xp)||0).l)||1));
  const idx=Math.min(19,Math.floor((level-1)/5));
  const [icon,title,border,light,mid,text,accent]=tiers[idx];
  card.classList.add('v21-tier');
  card.style.setProperty('--tier-border',border);
  card.style.setProperty('--tier-light',light);
  card.style.setProperty('--tier-mid',mid);
  card.style.setProperty('--tier-text',text);
  card.style.setProperty('--tier-accent',accent);
  let banner=card.querySelector('.v21-banner');
  if(!banner){banner=document.createElement('div');banner.className='v21-banner';const anchor=card.querySelector('.camp');if(anchor)anchor.insertAdjacentElement('afterend',banner);else card.prepend(banner)}
  const end=Math.min(100,idx*5+5);
  banner.replaceChildren();
  const left=document.createElement('span');left.textContent=icon+' '+title;
  const right=document.createElement('span');right.textContent='Lv '+(idx*5+1)+'–'+end;
  banner.append(left,right);
  card.dataset.evolution=String(idx+1);
  card.setAttribute('aria-label',student.name+', Level '+level+', '+title+(card.classList.contains('is-absent')?', absent':''));
 });
}
const previousRender=render;
render=function(...args){const result=previousRender.apply(this,args);decorate();return result};
render();
})();