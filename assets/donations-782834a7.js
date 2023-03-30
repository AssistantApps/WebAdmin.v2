import{c as a,S,C as f,p as v,n as o,g as A}from"./index-5d8b550a.js";import{B as b}from"./link-49646f96.js";import{g as y}from"./enumHelper-aebeeebb.js";import{c as h,l as M}from"./stringHelper-1c926dc7.js";import{D as C,G as l,M as I}from"./manageResourceBasePage-124a7105.js";import{i as P,c as w}from"./commonMapping-3eba017a.js";import{F as i}from"./input-18ce9725.js";import{B as z,g as F,A as p,a as d}from"./baseCrudService-f58e06f5.js";import"./popupHelper-26579962.js";var u=(e=>(e[e.unknown=0]="unknown",e[e.paypal=1]="paypal",e[e.braveRewards=2]="braveRewards",e[e.buyMeACoffee=3]="buyMeACoffee",e[e.koFi=4]="koFi",e[e.patreon=5]="patreon",e[e.googlePay=6]="googlePay",e[e.applePay=7]="applePay",e[e.openCollective=8]="openCollective",e))(u||{});const _=e=>{const t=r=>{if(!Array.isArray(r))return isNaN(r)?[u[M(r??"")]?.toString?.()??""]:[r?.toString?.()]};return a(C,{title:"Source",get selectedValues(){return t(e.value)},multiple:!1,get placeholder(){return e.placeholder},onSelect:r=>{if(e.onChange==null||Array.isArray(r))return;const n=u[r]?.toString?.()??"",s=h(n);e.onChange(s)},get options(){return y(u).map(r=>({title:h(u[r]),value:r.toString()}))}})};var O=Object.defineProperty,B=Object.getOwnPropertyDescriptor,E=(e,t,c,r)=>{for(var n=r>1?void 0:r?B(t,c):t,s=e.length-1,m;s>=0;s--)(m=e[s])&&(n=(r?m(t,c,n):m(n))||n);return r&&n&&O(t,c,n),n};let g=class extends z{constructor(){const e=F();super(e.getAssistantAppsUrl())}create(e){return this.post(p.donation,e,d)}read(e){throw new Error("ManageDonationService: Method not implemented.")}readAll(e){return this.post(`${p.donation}/Search`,{page:e?.page??1,searchText:e?.searchText??""},d)}update(e){return this.put(p.donation,e,d)}del(e){const t=`${p.donation}/${e.guid}`;return this.delete(t,d)}};g=E([S()],g);const L=()=>f.get(g),V=()=>a(I,{title:"Manage Donations",itemName:"Donation",serverPagination:!0,unknownPagination:!0,disableGetByIdOption:!0,get crudService(){return L()},get defaultItem(){return{date:v(new Date),sortOrder:0,isHidden:!1}},pageSizeOptions:[10],searchTooltip:"Searches: username & email",searchFunc:(e,t)=>e.username.includes(t)||e.email.includes(t),tableHeadItems:[{title:"Username"},{title:"Email"},{title:"Type"},{title:"Amount"},{title:"Currency"},{title:"Actual amount"},{title:"Is Visible"},{title:"Date"}],tableRowRender:e=>[a(o,{get children(){return e.username}}),a(o,{get children(){return a(b,{get href(){return`mailto:${e.email}`},get children(){return e.email}})}}),a(o,{get children(){return e.type}}),a(o,{get children(){return e.amount}}),a(o,{get children(){return e.currency}}),a(o,{get children(){return e.actualAmount}}),a(o,{get children(){return e.isHidden?"❌":"✔"}}),a(o,{get children(){return A(e.date)}})],get propToFormMappings(){return[{component:i,gridItemSize:l.medium,property:"username",label:"Username",placeholder:"John Smith"},{component:i,gridItemSize:l.medium,property:"email",label:"Email",placeholder:"john@smith.com"},{component:_,gridItemSize:l.medium,property:"type",label:"Source",placeholder:"Please select a donation type"},{component:i,gridItemSize:l.medium,property:"amount",label:"Amount",placeholder:"5",additional:[{prop:"inputType",value:e=>"number"}]},{component:i,gridItemSize:l.smol,property:"currency",label:"Currency",placeholder:"USD"},{component:i,gridItemSize:l.medium,property:"actualAmount",label:"Actual Amount",placeholder:"5",additional:[{prop:"inputType",value:e=>"number"}]},P,w,{component:i,gridItemSize:l.medium,property:"date",label:"Date",placeholder:"2023-03-22",additional:[{prop:"inputType",value:e=>"datetime-local"}]}]}});export{V as ManageDonationsPage,V as default};
