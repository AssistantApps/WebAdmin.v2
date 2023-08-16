import{S as v,C as A,a6 as S,a7 as y,a as h,o as M,c as i,b as P,d,e as O}from"./index-ae4d2d82.js";import{a as w,N as o}from"./assistantAppsApiService-cf1f901d.js";import{g as T}from"./manageAppService-27809395.js";var D=Object.defineProperty,b=Object.getOwnPropertyDescriptor,j=(e,r,s,a)=>{for(var t=a>1?void 0:a?b(r,s):r,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(a?c(r,s,t):c(t))||t);return a&&t&&D(r,s,t),t};let f=class{_getLanguagesCache;_controller;constructor(){this._controller=()=>w().getAuthedApi().language}create(e){return this._controller().create(e)}read(e){throw new Error("ManageLanguageService: Method not implemented.")}async readAll(e){const r=await this._controller().readAll();return r.isSuccess&&(this._getLanguagesCache={expiredAfter:S(new Date,1e3),value:r.value}),r}async readAllCached(e){return this._getLanguagesCache!=null&&y(new Date,this._getLanguagesCache.expiredAfter)?{isSuccess:!0,value:this._getLanguagesCache.value,errorMessage:""}:await this.readAll(e)}update(e){return this._controller().update(e)}del(e){return this._controller().del(e.guid)}};f=j([v()],f);const E=()=>A.get(f);var R=Object.defineProperty,I=Object.getOwnPropertyDescriptor,$=(e,r,s,a)=>{for(var t=a>1?void 0:a?I(r,s):r,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(a?c(r,s,t):c(t))||t);return a&&t&&R(r,s,t),t};let p=class{_controller;constructor(){this._controller=()=>w().getAuthedApi().translationImage}add(e,r,s){return this._controller().add(e,r,s)}readAll(e){return this._controller().readAll(e)}del(e){return this._controller().del(e.guid)}};p=$([v()],p);const x=()=>A.get(p);var N=Object.defineProperty,F=Object.getOwnPropertyDescriptor,B=(e,r,s,a)=>{for(var t=a>1?void 0:a?F(r,s):r,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(a?c(r,s,t):c(t))||t);return a&&t&&N(r,s,t),t};let _=class{_getTransKeysCache;_controller;constructor(){this._controller=()=>w().getAuthedApi().translationKey}async create(e){const{translationKeyImages:r,...s}=e,a=await this._controller().create(s);if(a.isSuccess==!1)return a;const t=x();for(const n of r??[])await t.add(a.value,n.contents);return a}read(e){throw new Error("ManageTranslationKeysService: Method not implemented.")}async readAll(e){const r=await this._controller().readAll();return r.isSuccess&&(this._getTransKeysCache={expiredAfter:S(new Date,1e3),value:r.value}),r}async readAllCached(e){return this._getTransKeysCache!=null&&y(new Date,this._getTransKeysCache.expiredAfter)?{isSuccess:!0,value:this._getTransKeysCache.value,errorMessage:""}:await this.readAll(e)}update(e){return this._controller().update(e)}del(e){return this._controller().del(e.guid)}};_=B([v()],_);const q=()=>A.get(_),J=e=>{const[r,s]=h([]),[a,t]=h([]),[n,c]=h([]),[u,g]=h(o.Loading);M(()=>{C()});const C=async()=>{const l=[];e.fetchApps&&l.push(m()),e.fetchLanguages&&l.push(K()),e.fetchTranslationKeys&&l.push(L()),await Promise.all(l),g(o.Success)},m=async()=>{const l=await T().readAllCached();l.isSuccess==!1&&g(o.Error),s(l.value)},K=async()=>{const l=await E().readAllCached();l.isSuccess==!1&&g(o.Error),t(l.value)},L=async()=>{const l=await q().readAllCached();l.isSuccess==!1&&g(o.Error),c(l.value)};return[i(d,{get when(){return u()==o.Loading||u()==o.Pending},get children(){return i(P,{})}}),i(d,{get when(){return u()==o.Error},get children(){return i(O,{children:"Error"})}}),i(d,{get when(){return u()==o.Success},get children(){return e.render(r(),a(),n())}})]};export{J as F,x as a,q as b,E as g};
