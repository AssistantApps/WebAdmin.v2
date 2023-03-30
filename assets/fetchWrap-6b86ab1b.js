import{S,C as y,m as C,a7 as K,a as p,o as P,c as u,b as O,d as f,e as D}from"./index-5d8b550a.js";import{B as _,g as m,A as o,a as l,f as b,N as g}from"./baseCrudService-f58e06f5.js";import{g as x}from"./manageAppService-9abaca36.js";var E=Object.defineProperty,I=Object.getOwnPropertyDescriptor,j=(e,a,r,s)=>{for(var t=s>1?void 0:s?I(a,r):a,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(s?c(a,r,t):c(t))||t);return s&&t&&E(a,r,t),t};let v=class extends _{_getLanguagesCache;constructor(){const e=m();super(e.getAssistantAppsUrl())}create(e){return this.post(o.language,e,l)}read(e){throw new Error("ManageLanguageService: Method not implemented.")}async readAll(e){const a=await this.get(o.language,l);return a.isSuccess&&(this._getLanguagesCache={expiredAfter:C(new Date,1e3),value:a.value}),a}async readAllCached(e){return this._getLanguagesCache!=null&&K(new Date,this._getLanguagesCache.expiredAfter)?{isSuccess:!0,value:this._getLanguagesCache.value,errorMessage:""}:await this.readAll(e)}update(e){return this.put(o.language,e,l)}del(e){const a=`${o.language}/${e.guid}`;return this.delete(a,l)}};v=j([S()],v);const R=()=>y.get(v);var B=Object.defineProperty,N=Object.getOwnPropertyDescriptor,U=(e,a,r,s)=>{for(var t=s>1?void 0:s?N(a,r):a,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(s?c(a,r,t):c(t))||t);return s&&t&&B(a,r,t),t};let A=class extends _{constructor(){const e=m();super(e.getAssistantAppsUrl())}add(e,a){return this.post(`${o.translationImage}/${e}`,a,b)}readAll(e){return this.get(`${o.translationImage}/${e}`,l)}del(e){const a=`${o.translationImage}/${e.guid}`;return this.delete(a,l)}};A=U([S()],A);const F=()=>y.get(A);var H=Object.defineProperty,W=Object.getOwnPropertyDescriptor,q=(e,a,r,s)=>{for(var t=s>1?void 0:s?W(a,r):a,n=e.length-1,c;n>=0;n--)(c=e[n])&&(t=(s?c(a,r,t):c(t))||t);return s&&t&&H(a,r,t),t};let w=class extends _{_getTransKeysCache;constructor(){const e=m();super(e.getAssistantAppsUrl())}async create(e){const{translationKeyImages:a,...r}=e,s=await this.post(o.translationKey,r,l);if(s.isSuccess==!1)return s;const t=F();for(const n of a??[])await t.add(s.value,n);return s}read(e){throw new Error("ManageTranslationKeysService: Method not implemented.")}async readAll(e){const a=await this.get(`${o.translationKey}/Admin`,l);return a.isSuccess&&(this._getTransKeysCache={expiredAfter:C(new Date,1e3),value:a.value}),a}async readAllCached(e){return this._getTransKeysCache!=null&&K(new Date,this._getTransKeysCache.expiredAfter)?{isSuccess:!0,value:this._getTransKeysCache.value,errorMessage:""}:await this.readAll(e)}update(e){return this.put(o.translationKey,e,l)}del(e){const a=`${o.translationKey}/${e.guid}`;return this.delete(a,l)}};w=q([S()],w);const z=()=>y.get(w),V=e=>{const[a,r]=p([]),[s,t]=p([]),[n,c]=p([]),[h,d]=p(g.Loading);P(()=>{$()});const $=async()=>{const i=[];e.fetchApps&&i.push(T()),e.fetchLanguages&&i.push(L()),e.fetchTranslationKeys&&i.push(M()),await Promise.all(i),d(g.Success)},T=async()=>{const i=await x().readAllCached();i.isSuccess==!1&&d(g.Error),r(i.value)},L=async()=>{const i=await R().readAllCached();i.isSuccess==!1&&d(g.Error),t(i.value)},M=async()=>{const i=await z().readAllCached();i.isSuccess==!1&&d(g.Error),c(i.value)};return[u(f,{get when(){return h()==g.Loading||h()==g.Pending},get children(){return u(O,{})}}),u(f,{get when(){return h()==g.Error},get children(){return u(D,{children:"Error"})}}),u(f,{get when(){return h()==g.Success},get children(){return e.render(a(),s(),n())}})]};export{V as F,F as a,z as b,R as g};