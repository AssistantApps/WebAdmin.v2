import{c as g,B as c,S as h,C as u,h as _,l as A}from"./index-ee2098d3.js";const P=s=>g(c,{get class(){return s.class},border:"1px solid $neutral5",p:"$4",borderTopRadius:"$lg",borderBottomRadius:"$lg",overflowY:"auto",get children(){return s.children}});var d=(s=>(s[s.Pending=0]="Pending",s[s.Loading=1]="Loading",s[s.Success=2]="Success",s[s.Error=3]="Error",s))(d||{}),E=Object.defineProperty,v=Object.getOwnPropertyDescriptor,I=(s,i,r,t)=>{for(var e=t>1?void 0:t?v(i,r):i,a=s.length-1,n;a>=0;a--)(n=s[a])&&(e=(t?n(i,r,e):n(e))||e);return t&&e&&E(i,r,e),e};let o=class{getAssistantAppsUrl=()=>this.get("VITE_AA_API_URL");getAATranslationImageUrl=()=>this.get("VITE_AA_TRANSLATION_IMAGE_BASE_URL");getGoogleClientId=()=>this.get("VITE_GOOGLE_CLIENT_ID");get(s){return{VITE_AA_API_URL:"https://api.assistantapps.com",VITE_AA_TRANSLATION_IMAGE_BASE_URL:"https://cdn-usr.assistantapps.com/translation",VITE_GOOGLE_CLIENT_ID:"559605319918-8dp6336ptrp3l0erra4hs0p2qj5it5mb.apps.googleusercontent.com",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1,PACKAGE_VERSION:"0.0.9"}[s]??""}isProd=()=>this.get("NODE_ENV")==="production";buildVersion=()=>this.get("BUILD_VERSION")};o=I([h()],o);const l=()=>u.get(o);var O=Object.defineProperty,f=Object.getOwnPropertyDescriptor,b=(s,i,r,t)=>{for(var e=t>1?void 0:t?f(i,r):i,a=s.length-1,n;a>=0;a--)(n=s[a])&&(e=(t?n(i,r,e):n(e))||e);return t&&e&&O(i,r,e),e};let p=class{_state;_api;constructor(){this._state=_(),this._api=new A.AssistantAppsApiService({url:l().getAssistantAppsUrl(),authToken:_().getState().auth.token})}getDashboard=()=>this._api.dashboard.dashboard();getDashboardForAdmin=()=>this._api.dashboard.adminDashboard();getUserActivity=()=>this._api.userActivity.readAll();getAuthedApi=()=>this._api;async loginWithGoogleAuth(s){return{isSuccess:await this._api.account.loginWithGoogleAuth(s,r=>{this._state.setState(t=>{t.auth.userGuid=r.userGuid,t.auth.username=s.username,t.auth.profilePic=s.profileUrl,t.auth.token=r.token,t.auth.tokenExpiry=r.tokenExpiry,t.auth.tokenExpiryDate=r.tokenExpiryDate}),this._api=new A.AssistantAppsApiService({url:l().getAssistantAppsUrl(),authToken:r.token})}),errorMessage:""}}};p=b([h()],p);const S=()=>u.get(p);export{P as C,d as N,S as a,l as g};
