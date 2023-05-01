import{S as u,C as h,l as i,c as r,n as p,y as d,F as g,A as m,G as S,B as f,J as B,K as A,t as b}from"./index-73a8a3eb.js";import{C as v,a as y}from"./input-aad84431.js";import{C as M,G as C,b as T,M as _}from"./manageResourceBasePage-0c1b4e62.js";import{a as w}from"./assistantAppsApiService-be80e611.js";import"./popupHelper-40ca08fc.js";var I=Object.defineProperty,O=Object.getOwnPropertyDescriptor,D=(e,t,s,a)=>{for(var n=a>1?void 0:a?O(t,s):t,o=e.length-1,c;o>=0;o--)(c=e[o])&&(n=(a?c(t,s,n):c(n))||n);return a&&n&&I(t,s,n),n};let l=class{_appTypes=[i.AppType.nms,i.AppType.sms];_controller;constructor(){this._controller=()=>w().getAuthedApi().steam}create(e){throw new Error("ManageSteamBranchService: Method not implemented.")}read(e){return this._controller().readBranch(e)}async readAll(e){const t=[];for(const s of this._appTypes){const a=await this.read(s.toString());a.isSuccess&&t.push(a.value)}return{isSuccess:!0,value:t,errorMessage:""}}update(e){const t=JSON.parse(e.branchesSTRING);return this._controller().updateBranch(e.appType.toString(),t)}del(e){throw new Error("ManageSteamBranchService: Method not implemented.")}};l=D([u()],l);const x=()=>h.get(l),N=b("<b>Steam Branches</b>",2),z=()=>r(_,{title:"Manage Steam Branches",itemName:"Steam Branches",disableDeleteAction:!0,disableGetByIdOption:!0,get crudService(){return x()},pageSizeOptions:[10],tableHeadItems:[{title:"App"},{title:"Branches"}],tableRowRender:e=>[r(p,{get children(){return e.appType??"unknown"}}),r(p,{get children(){return r(v,{title:"Steam Branches",label:"unused",trigger:t=>r(d,{onClick:t,get children(){return[r(M,{fontSize:"1.5em"})," View Json"]}}),disableInput:!0,get codeContent(){return JSON.stringify(e.branches,null,2)},language:"language-json",onChange:()=>{}})}})],get propToFormMappings(){return[{component:y,gridItemSize:C.xlong,property:"branchesSTRING",label:"Branches",placeholder:"[]",hiddenIn:[T.Add],additional:[{prop:"value",value:e=>JSON.stringify(e.branches,null,2)},{prop:"minH",value:()=>"50vh"}]}]},get children(){return r(g,{justifyContent:"center",get children(){return r(m,{status:"warning",get children(){return[r(S,{mr:"1em"}),r(f,{flex:"1",get children(){return[r(B,{children:"Clear the cache!"}),r(A,{display:"block",get children(){return["Don't forget to clear the ",N.cloneNode(!0)," cache after editing 😋"]}})]}})]}})}})}});export{z as ManageSteamBranchesPage,z as default};
