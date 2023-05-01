import{S as F,C as b,u as A,c as o,n,g as c,r as m,a5 as u}from"./index-73a8a3eb.js";import{F as f}from"./fetchWrap-0a2f4254.js";import{T as h,A as v}from"./appLogos-22bb2cce.js";import{c as _}from"./commonMapping-2aa65c93.js";import{M as S,G as d}from"./manageResourceBasePage-0c1b4e62.js";import{F as g}from"./input-aad84431.js";import{a as w}from"./assistantAppsApiService-be80e611.js";import"./manageAppService-c20c61cc.js";import"./image-ebeb0859.js";import"./popupHelper-40ca08fc.js";var M=Object.defineProperty,C=Object.getOwnPropertyDescriptor,k=(r,t,e,i)=>{for(var a=i>1?void 0:i?C(t,e):t,p=r.length-1,l;p>=0;p--)(l=r[p])&&(a=(i?l(t,e,a):l(a))||a);return i&&a&&M(t,e,a),a};let s=class{_controller;constructor(){this._controller=()=>w().getAuthedApi().feedbackForm}create(r){return this._controller().create(r)}read(r){throw new Error("ManageFeedbackFormService: Method not implemented.")}readAll(r){return this._controller().readAllForAdmin()}update(r){return this._controller().update(r)}del(r){return this._controller().del(r.guid)}};s=k([F()],s);const x=()=>b.get(s),j=()=>{const r=A();return o(f,{fetchApps:!0,render:t=>o(S,{title:"Manage Feedback Forms",itemName:"Feedback Form",disableGetByIdOption:!0,disableCopyGuidAction:!0,get crudService(){return x()},defaultItem:{sortOrder:0},pageSizeOptions:[100],tableHeadItems:[{title:"App"},{title:"Title"},{title:"Text"},{title:"Date Created"}],tableRowRender:e=>[o(h,{maxWidth:"75px",get selectedApps(){return[e.appGuid]},appsFromApi:t}),o(n,{get children(){return e.title}}),o(n,{get children(){return e.text}}),o(n,{margin:"0 auto",textAlign:"center",get children(){return c(e.dateCreated)}})],actionsPerRow:[{emoji:"❓",label:"Edit questions",order:7,onClick:e=>r(m.feedbackFormQuestions.replace(`:${u}`,`${e.guid}`))},{emoji:"💬",label:"View Answers",order:6,onClick:e=>r(m.feedbackFormAnswers.replace(`:${u}`,`${e.guid}`))}],get propToFormMappings(){return[{component:v,gridItemSize:d.medium,property:"appGuid",label:"App",placeholder:"Select an app",additional:[{prop:"multiple",value:e=>!1},{prop:"appsFromApi",value:e=>t}]},{component:g,gridItemSize:d.long,property:"title",label:"Title",placeholder:`Feedback Form ${c(new Date,"YYYY")}`},{component:g,gridItemSize:d.medium,property:"text",label:"Text",placeholder:"idk"},_]}})})};export{j as ManageFeedbackFormPage,j as default};
