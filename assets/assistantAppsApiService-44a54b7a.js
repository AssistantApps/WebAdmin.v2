import{B as p,g as u,A as n,a as h,b as d}from"./baseCrudService-0459d68b.js";import{S as g,C as A,h as l,m as v}from"./index-f510d5fe.js";const y="Token",f="TokenExpiry",S="UserGuid";var _=Object.defineProperty,b=Object.getOwnPropertyDescriptor,m=(s,i,r,a)=>{for(var e=a>1?void 0:a?b(i,r):i,o=s.length-1,t;o>=0;o--)(t=s[o])&&(e=(a?t(i,r,e):t(e))||e);return a&&e&&_(i,r,e),e};let c=class extends p{_state;constructor(){const s=u();super(s.getAssistantAppsUrl()),this._state=l()}getDashboard=()=>this.get(n.dashboard);getDashboardForAdmin=()=>this.get(n.adminDashboard,h);getUserActivity=()=>this.get(n.userActivity,h);async loginWithGoogleAuth(s){return{isSuccess:await this.post(n.authUrl,s,()=>d,r=>{const a=r.headers.get(y),e=r.headers.get(f),o=r.headers.get(S);return this._state.setState(t=>{t.auth.userGuid=o,t.auth.username=s.username,t.auth.profilePic=s.profileUrl,t.auth.token=a,t.auth.tokenExpiry=e,t.auth.tokenExpiryDate=v(new Date,e)}),r.status==200}),errorMessage:""}}};c=m([g()],c);const E=()=>A.get(c);export{E as g};