(()=>{'use strict';
const bridge=window.v11bridge;
const today=()=>new Date().toLocaleDateString('en-CA');
function isAbsent(i){const a=bridge?.get()?.v12?.attendance?.[today()]||{};return a[i]==='absent'}
window.v22Fine=function(reason,amount){
 if(!bridge)return toast('Reward history is unavailable; fine not applied.');
 if(![['Talking',2],['Work Not Complete',3],['Disrespect',5]].some(([r,n])=>r===reason&&n===amount))return;
 const picked=[...selected].filter(i=>Number.isInteger(i)&&students[i]);
 if(!picked.length)return toast('Select one or more students first.');
 const eligible=picked.filter(i=>!isAbsent(i));
 const absent=picked.filter(i=>isAbsent(i));
 if(!eligible.length)return toast('Selected students are absent; no fines applied.');
 const details=eligible.map(i=>{const s=students[i];const balance=Math.max(0,Number(s.heroDollars)||0);return {i,name:s.name,balance,deduct:Math.min(amount,balance)}});
 const total=details.reduce((a,x)=>a+x.deduct,0);
 const lines=details.map(x=>x.name+': $'+x.balance+' → $'+(x.balance-x.deduct)+(x.deduct<amount?' (limited by balance)':'')).join('\n');
 const message='Apply '+reason+' fine (up to $'+amount+') to '+details.length+' student(s)?\n\n'+lines+(absent.length?'\n\n'+absent.length+' absent student(s) excluded.':'')+'\n\nTotal deduction: $'+total+'\nXP will not change.';
 if(!confirm(message))return;
 if(total===0)return toast('No Hero Dollars available to deduct.');
 snap();
 for(const x of details)students[x.i].heroDollars=x.balance-x.deduct;
 const extra=bridge.get();if(!Array.isArray(extra.history))extra.history=[];
 const stamp=new Date().toISOString();
 for(const x of details){if(x.deduct>0)extra.history.unshift({date:stamp,type:'Fine: '+reason,students:[x.name],xp:0,hd:-x.deduct,note:'Hero Dollars only; original balance $'+x.balance});}
 extra.history=extra.history.slice(0,1000);
 save();bridge.persist();selected.clear();render();
 if(typeof playCoinSound==='function')playCoinSound();
 toast('⚖️ '+reason+': $'+total+' deducted from '+details.filter(x=>x.deduct>0).length+' hero(es).');
};
})();