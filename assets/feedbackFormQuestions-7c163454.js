import{c as t,l as a,a8 as m,a5 as p,n as i,T as g,F as h,A as F,G as f,B as b,J as y,K as A}from"./index-73a8a3eb.js";import{g as S}from"./enumHelper-aebeeebb.js";import{c as l,a as c,l as k}from"./stringHelper-1c926dc7.js";import{D as x,G as s,M as T}from"./manageResourceBasePage-0c1b4e62.js";import{s as Q,F as w,c as G}from"./commonMapping-2aa65c93.js";import{F as I}from"./input-aad84431.js";import{a as M}from"./assistantAppsApiService-be80e611.js";import"./popupHelper-40ca08fc.js";const _=n=>{const e=r=>{if(!Array.isArray(r))return isNaN(r)?[a.FeedbackQuestionType[k(r??"")]?.toString?.()??""]:[r?.toString?.()]};return t(x,{title:"Question Type",get selectedValues(){return e(n.value)},multiple:!1,get placeholder(){return n.placeholder},onSelect:r=>{if(n.onChange==null||Array.isArray(r))return;const d=a.FeedbackQuestionType[r]?.toString?.()??"",u=l(d);n.onChange(u)},get options(){return S(a.FeedbackQuestionType).map(r=>({title:l(c(a.FeedbackQuestionType[r])),value:r.toString()}))}})};class v{_feedbackFormGuid;_controller;constructor(e){this._feedbackFormGuid=e,this._controller=()=>M().getAuthedApi().feedbackFormQuestion}create(e){return this._controller().create({...e,feedbackFormGuid:this._feedbackFormGuid})}read(e){throw new Error("ManageFeedbackFormQuestionService: Method not implemented.")}readAll(e){return this._controller().readForFeedback(this._feedbackFormGuid)}update(e){return this._controller().update({...e,feedbackFormGuid:this._feedbackFormGuid})}del(e){return this._controller().del(e.guid)}}const B=()=>{const n=m(),e=new v(n[p]);return t(T,{title:"Manage Feedback Form Questions",itemName:"Feedback Form Question",disableGetByIdOption:!0,disableCopyGuidAction:!0,crudService:e,defaultItem:{sortOrder:0},pageSizeOptions:[100],tableHeadItems:[{title:"Question"},{title:"Type"},{title:"Sort Order",maxWidth:"75px",textAlign:"center"},{title:"Answer can contain sensitive info",maxWidth:"75px",textAlign:"center"}],tableRowRender:o=>[t(i,{get children(){return t(g,{class:"clamp-to-2-lines",get children(){return o.questionText}})}}),t(i,{get children(){return l(c(a.FeedbackQuestionType[o.questionType]))}}),t(i,{maxWidth:"75px",margin:"0 auto",textAlign:"center",get children(){return o.sortOrder}}),t(i,{maxWidth:"75px",margin:"0 auto",textAlign:"center",get children(){return o.answerCanContainSensitiveInfo?"🔒":""}})],get propToFormMappings(){return[{component:I,gridItemSize:s.xlong,property:"questionText",label:"Question",placeholder:"What feature would you..."},{component:_,gridItemSize:s.medium,property:"questionType",label:"Question Type",placeholder:"Please select a type"},Q,{component:w,gridItemSize:s.smol,property:"answerCanContainSensitiveInfo",label:"Answer can contain sensitive info"},G]},get children(){return t(h,{justifyContent:"center",get children(){return t(F,{status:"warning",get children(){return[t(f,{mr:"1em"}),t(b,{flex:"1",get children(){return[t(y,{children:"Chance of deleting answers!"}),t(A,{display:"block",children:"Deleting a question also deletes the answers"})]}})]}})}})}})};export{B as ManageFeedbackFormQuestionsPage,B as default};
