import{F as l,C as s}from"./input-71e9efdc.js";import{G as n}from"./manageResourceBasePage-4d2466e2.js";import{c as a,Z as p,a9 as c,Y as d,t as m}from"./index-f0397a61.js";const g=m("<br>",1),u=e=>{const t=i=>{const o=i.target?.checked;o!=null&&e.onChange(o)};return a(d,{get children(){return[a(p,{get for(){return e.id},get children(){return e.label}}),g.cloneNode(!0),a(c,{get id(){return e.id},mt:"$2",size:"lg",get checked(){return e.value},onChange:t,variant:"outline"})]}})},v={component:l,gridItemSize:n.smol,property:"sortOrder",label:"Sort Order",additional:[{prop:"inputType",value:e=>"number"}]},r=(e,t)=>({component:u,gridItemSize:n.xsmol,property:e,label:t}),C=r("isVisible","Is Visible"),I=r("isTranslatable","Is Translatable"),M={component:s,gridItemSize:n.xsmol,property:"json",label:"View JSON",additional:[{prop:"buttonTitle",value:()=>"< >"},{prop:"title",value:()=>"JSON data"},{prop:"language",value:()=>"language-json"},{prop:"codeContent",value:e=>JSON.stringify(e,null,2)}]};export{u as F,I as a,M as c,C as i,v as s};