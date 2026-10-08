(()=>{'use strict';
const bridge=window.v11bridge;
if(!bridge)return;
const extra=bridge.get();
if(!extra.v16||typeof extra.v16!=='object')extra.v16={};
const d=extra.v16;
if(!Array.isArray(d.milestones))d.milestones=[
 {goal:500,reward:'5 minutes of extra recess',done:false},
 {goal:1500,reward:'Class choice brain break',done:false},
 {goal:3000,reward:'Greek mythology game time',done:false},
 {goal:5000,reward:'Teacher-approved class celebration',done:false}
];
if(!Number.isFinite(d.earned))d.earned=0;
if(!Number.isFinite(d.lastTotal))d.lastTotal=students.reduce((a,s)=>a+(Number(s.xp)||0),0);
if(!d.chestDays)d.chestDays={};
if(!Number.isFinite(d.chestChance))d.chestChance=30;
if(typeof d.chestEnabled!=='boolean')d.chestEnabled=true;
const today=()=>new Date().toLocaleDateString('en-CA');
const absent=i=>(extra.v12?.attendance?.[today()]||{})[i]==='absent';
function persist(){bridge.persist()}
function safe(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function sync(){
 const total=students.reduce((a,s)=>a+(Number(s.xp)||0),0);
 const delta=total-d.lastTotal;
 if(delta>0)d.earned+=delta;
 d.lastTotal=total;
 const newly=d.milestones.filter(m=>!m.done&&d.earned>=m.goal);
 newly.forEach(m=>m.done=true);
 persist();draw();
 if(newly.length){playLevelSound();celebrate('CLASS MILESTONE!','🏆 OLYMPUS REWARD UNLOCKED',newly.map(m=>m.reward).join(' • '))}
}
function draw(){
 const next=d.milestones.find(m=>!m.done);
 const title=document.getElementById('v16Title'),label=document.getElementById('v16ProgressLabel'),bar=document.getElementById('v16Progress'),reward=document.getElementById('v16Reward');
 if(!title)return;
 title.textContent='🏆 Class XP Milestones';
 label.textContent=d.earned.toLocaleString()+' earned XP since V16';
 const previous=d.milestones.filter(m=>m.done).reduce((a,m)=>Math.max(a,m.goal),0);
 bar.max=next?Math.max(1,next.goal-previous):1;
 bar.value=next?Math.max(0,Math.min(bar.max,d.earned-previous)):1;
 reward.textContent=next?'Next reward at '+next.goal.toLocaleString()+' XP: '+next.reward:'🏆 All class milestones unlocked!';
}
window.v16Open=function(){
 const rows=d.milestones.map((m,i)=>`<div style="padding:8px;border-bottom:1px solid #c3aa7d">${m.done?'🏆':'🔒'} <b>${m.goal.toLocaleString()} XP</b> — ${safe(m.reward)} <button data-edit="${i}">Edit</button></div>`).join('');
 const body=document.getElementById('v16Body');
 body.innerHTML=`<p>Class-earned XP since V16: <b>${d.earned.toLocaleString()}</b>. Individual XP and Hero Dollars are unchanged by class milestones.</p>${rows}<p><button id="v16Add">+ Add milestone</button> <button id="v16ChestToggle">${d.chestEnabled?'Disable':'Enable'} treasure chests</button></p><p>Random Picker chest chance: <input id="v16Chance" type="number" min="0" max="100" value="${d.chestChance}" style="width:75px"> % <button id="v16ChanceSave">Save</button></p><p><small>Treasure chests give the selected present hero +$2, at most once per student per day. They never charge the student.</small></p>`;
 document.getElementById('v16Panel').classList.add('open');
 body.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{
  const m=d.milestones[Number(b.dataset.edit)];
  const reward=prompt('Milestone reward:',m.reward);if(reward===null)return;
  m.reward=reward.slice(0,120);persist();v16Open();draw();
 });
 document.getElementById('v16Add').onclick=()=>{
  const goal=Number(prompt('Total class XP required for this milestone:'));
  if(!Number.isSafeInteger(goal)||goal<=d.earned||d.milestones.some(m=>m.goal===goal))return toast('Enter a new milestone above current class XP.');
  const reward=prompt('Class reward:');if(!reward)return;
  d.milestones.push({goal,reward:reward.slice(0,120),done:false});
  d.milestones.sort((a,b)=>a.goal-b.goal);persist();v16Open();draw();
 };
 document.getElementById('v16ChestToggle').onclick=()=>{d.chestEnabled=!d.chestEnabled;persist();v16Open()};
 document.getElementById('v16ChanceSave').onclick=()=>{
  const n=Number(document.getElementById('v16Chance').value);
  if(!Number.isFinite(n)||n<0||n>100)return toast('Enter a chance from 0 to 100.');
  d.chestChance=n;persist();v16Open();toast('Treasure chance saved.');
 };
};
window.v16RandomPick=function(){
 const available=students.map((_,i)=>i).filter(i=>!absent(i));
 if(!available.length)return toast('No available heroes today.');
 const i=available[Math.floor(Math.random()*available.length)];
 selected=new Set([i]);render();
 const st=students[i],key=String(st.name);
 if(d.chestEnabled&&!d.chestDays[today()]?.includes(key)&&Math.random()*100<d.chestChance){
   const ok=confirm('🎁 '+st.name+' found a treasure chest! Award +$2 Hero Dollars?');
   if(ok){
     if(!d.chestDays[today()])d.chestDays[today()]=[];
     d.chestDays[today()].push(key);
     snap();st.heroDollars=(Number(st.heroDollars)||0)+2;save();persist();render();playCoinSound();
     celebrate(st.name,'🎁 TREASURE CHEST!','+$2 Hero Dollars');
     return;
   }
 }
 celebrate(st.name,'🎲 THE FATES HAVE CHOSEN!','Ready for the next challenge.');
};
const baseSave=save;
save=function(){baseSave();sync()};
const baseRender=render;
render=function(){baseRender();draw()};
draw();
})();