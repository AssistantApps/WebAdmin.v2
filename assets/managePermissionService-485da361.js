import{a}from"./assistantAppsApiService-da4a7506.js";import{S as c,C as m}from"./index-f0397a61.js";var p=Object.defineProperty,u=Object.getOwnPropertyDescriptor,P=(r,e,t,o)=>{for(var s=o>1?void 0:o?u(e,t):e,i=r.length-1,n;i>=0;i--)(n=r[i])&&(s=(o?n(e,t,s):n(s))||s);return o&&s&&p(e,t,s),s};let l=class{_controller;constructor(){this._controller=()=>a().getAuthedApi().permission}getCurrentUsersPermissions(){return this._controller().readCurrentUsersPermissions()}getPermissionsForUserGuid(r){return this._controller().readPermissionsForUserGuid(r)}addForUser(r,e){return this._controller().addForUser(r,e)}delPermissionForUser(r,e){return this._controller().delPermissionForUser(r,e)}};l=P([c()],l);const g=()=>m.get(l);export{g};