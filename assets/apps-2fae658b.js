import{c as e,n as t,d as l}from"./index-6872b4a1.js";import{s as p,i as s,c as m}from"./commonMapping-fac65af4.js";import{G as a,M as d}from"./manageResourceBasePage-17b47d36.js";import{T as i,F as n}from"./image-f8a9b4e8.js";import{F as o}from"./input-53cdf861.js";import{g}from"./manageAppService-80a8cbb2.js";import{B as c}from"./link-01384462.js";import"./assistantAppsApiService-0db6cc5b.js";import"./popupHelper-52c515eb.js";import"./image-ebeb0859.js";const k=()=>e(d,{title:"Manage Apps",itemName:"App",disableGetByIdOption:!0,get crudService(){return g()},defaultItem:{sortOrder:0,isVisible:!1},setSortOrderOnItemLoad:!0,tableHeadItems:[{title:"Icon Url",maxWidth:"75px",textAlign:"center"},{title:"Logo Url",maxWidth:"75px",textAlign:"center"},{title:"Name"},{title:"Game Name"},{title:"Link Url",maxWidth:"75px",textAlign:"center"},{title:"Sort Order"},{title:"Is Visible"}],tableRowRender:r=>[e(i,{get url(){return r.iconUrl},showTooltip:!0,maxWidth:"75px",margin:"0 auto"}),e(i,{get url(){return r.logoUrl},showTooltip:!0,maxWidth:"75px",margin:"0 auto"}),e(t,{get children(){return r.name}}),e(t,{get children(){return r.gameName}}),e(t,{textAlign:"center",get children(){return e(l,{get when(){return r.linkUrl!=null&&r.linkUrl.length>0},get children(){return e(c,{get href(){return r.linkUrl},children:"🔗"})}})}}),e(t,{get children(){return r.sortOrder}}),e(t,{get children(){return r.isVisible?"✔":"❌"}})],get propToFormMappings(){return[{component:n,gridItemSize:a.medium,property:"iconUrl",label:"Icon Url",placeholder:"https://cdn.assistantapps..."},{component:n,gridItemSize:a.medium,property:"logoUrl",label:"Logo Url",placeholder:"https://cdn.assistantapps..."},{component:o,gridItemSize:a.medium,property:"linkUrl",label:"Link Url",placeholder:"https://assistantapps.com/nms"},{component:o,gridItemSize:a.medium,property:"name",label:"Name",placeholder:"Assistant for ..."},{component:o,gridItemSize:a.medium,property:"gameName",label:"Game Name",placeholder:"Assistant for No Man's Sky"},p,s,m]}});export{k as ManageAppsPage,k as default};
