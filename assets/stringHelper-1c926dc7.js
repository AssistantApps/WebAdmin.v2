const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ",a=e=>e.length==0?e:[e[0].toUpperCase(),...e.slice(1,e.length)].join(""),l=e=>e.length==0?e:[e[0].toLowerCase(),...e.slice(1,e.length)].join(""),c=e=>{if(e.length==0)return e;let t="";for(const n of e)s.includes(n)&&(t+=" "),t+=n;return t};export{c as a,a as c,l};
