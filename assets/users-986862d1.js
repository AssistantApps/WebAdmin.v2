import{a as m,q as j,c as e,M as $,s as I,v as q,w as z,x as V,d as h,e as P,L as H,V as W,H as y,F as N,T as D,j as S,B as M,N as G,O as K,z as J,y as Q,D as X,l as k,Q as C,R as Y,U as Z,t as v,S as ee,C as re,n as f,g as te}from"./index-f0397a61.js";import{T as ne}from"./image-a269e06d.js";import{M as se}from"./manageResourceBasePage-4d2466e2.js";import{N as d,C as b,a as ae}from"./assistantAppsApiService-da4a7506.js";import{g as ie}from"./enumHelper-aebeeebb.js";import{g as A}from"./managePermissionService-485da361.js";import"./image-ebeb0859.js";import"./popupHelper-a2d54340.js";const le=v('<span class="perm-emoji"></span>',2),oe=v('<span class="perm-title">&nbsp;</span>',2),ce=v("<span></span>",2),ue=r=>{const[l,t]=m(d.Loading),[u,c]=m([]),[p,g]=m([]),[U,T]=m([]),[_,B]=m([]);j(()=>{r.userGuid!=null&&w(r.userGuid)});const F=n=>{const s=n.map(o=>({title:k.PermissionType[o],value:o}));return s.sort((o,a)=>o.title.replace("View","").replace("Manage","").localeCompare(a.title.replace("View","").replace("Manage",""))),s},w=async n=>{if(n==null||n.length<5){T([]);return}const s=await A().getPermissionsForUserGuid(n);if(s.isSuccess==!1){t(d.Error);return}const o=ie(k.PermissionType).filter(i=>i>0).map(i=>parseInt(i)),a=s.value;T(F(a)),B(F(o.filter(i=>a.includes(i)==!1))),t(d.Success),c(i=>i.slice(1,i.length)),g(i=>i.slice(1,i.length))},E=async n=>{c(s=>[...s,s.length]),await A().delPermissionForUser(r.userGuid,n),w(r.userGuid)},O=async n=>{g(s=>[...s,s.length]),await A().addForUser(r.userGuid,n),w(r.userGuid)},R=n=>s=>{const o=L(s.title);return e(M,{class:"perm-item noselect pointer",onClick:()=>n(s.value),get children(){return e(b,{get children(){return[(()=>{const a=le.cloneNode(!0);return C(a,()=>o[0]),a})(),(()=>{const a=oe.cloneNode(!0),i=a.firstChild;return C(a,()=>o[1],i),a})(),(()=>{const a=ce.cloneNode(!0);return C(a,()=>o[2]),Y(()=>Z(a,`perm-action ${(o[2]??" ").toLowerCase()}`)),a})()]}})}})},L=n=>n.replace("appNotice","📢 |App Notice|").replace("app","📲 |App|").replace("cache","💾 |Cache|").replace("donation","💰 |Donation|").replace("feedbackForm","💬 |Feedback From|").replace("guideSubmission","📑 |Guide Submission|").replace("language","🌐 |Language|").replace("licence","🛂 |Licence|").replace("steamBranch","🌿 |Steam Branch|").replace("teamMember","👪 |Team Member|").replace("translationKey","🌐 |Translation Key|").replace("translationReport","🌐 |Translation Report|").replace("translationSubmission","🌐 |Translation Submission|").replace("translation","🌐 |Translation|").replace("userPermissions","🙎‍♂️ |User Permissions|").replace("users","🙎‍♂️ |Users|").replace("version","📅 |Versions|").split("|");return e(X,{get opened(){return r.isOpen},size:"7xl",get onClose(){return r.onClose},get children(){return[e($,{}),e(I,{get children(){return[e(q,{}),e(z,{get children(){return r.title}}),e(V,{get children(){return[e(h,{get when(){return l()==d.Loading||l()==d.Pending},get children(){return e(P,{height:"25vh",get children(){return e(H,{})}})}}),e(h,{get when(){return l()==d.Error},get children(){return e(P,{children:"Error"})}}),e(h,{get when(){return l()==d.Success},get children(){return e(W,{get children(){return[e(y,{size:"xl",mb:"1em",children:"Current permissions"}),e(N,{gap:"0.5em",flexWrap:"wrap",justifyContent:"center",get children(){return[e(h,{get when(){return U().length>0},get fallback(){return e(D,{children:"No permissions"})},get children(){return e(S,{get each(){return U()},get children(){return R(E)}})}}),e(S,{get each(){return p()},children:n=>e(M,{class:"perm-item",get children(){return e(b,{get children(){return e(P,{get children(){return e(G,{})}})}})}})})]}}),e(K,{mt:"3em"}),e(y,{size:"xl",mt:"2em",mb:"1em",children:"Permissions to Add"}),e(N,{gap:"0.5em",flexWrap:"wrap",justifyContent:"center",get children(){return[e(h,{get when(){return _().length>0},get fallback(){return e(D,{children:"No permissions"})},get children(){return e(S,{get each(){return _()},get children(){return R(O)}})}}),e(S,{get each(){return u()},children:n=>e(M,{class:"perm-item",get children(){return e(b,{get children(){return e(P,{get children(){return e(G,{})}})}})}})})]}})]}})}})]}}),e(J,{get children(){return e(Q,{get onClick(){return r.onClose},children:"Close"})}})]}})]}})};var de=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,me=(r,l,t,u)=>{for(var c=u>1?void 0:u?ge(l,t):l,p=r.length-1,g;p>=0;p--)(g=r[p])&&(c=(u?g(l,t,c):g(c))||c);return u&&c&&de(l,t,c),c};let x=class{_controller;constructor(){this._controller=()=>ae().getAuthedApi().user}create(r){throw new Error("ManageUserService: Method not implemented.")}read(r){throw new Error("ManageUserService: Method not implemented.")}readAll(r){return this._controller().readAllAdmin({page:r?.page??1,searchText:r?.searchText??""})}update(r){throw new Error("ManageUserService: Method not implemented.")}del(r){return this._controller().del(r.guid)}};x=me([ee()],x);const pe=()=>re.get(x),Ae=()=>{const[r,l]=m();return[e(se,{title:"Manage Users",itemName:"user",serverPagination:!0,unknownPagination:!0,disableEditAction:!0,disableGetByIdOption:!0,get crudService(){return pe()},pageSizeOptions:[10],searchTooltip:"Searches: username & email",searchFunc:(t,u)=>t.username.includes(u),tableHeadItems:[{title:"Avatar",maxWidth:"50px",textAlign:"center"},{title:"Username"},{title:"Join Date"},{title:"Is Admin",textAlign:"center"},{title:"Is Donator",textAlign:"center"},{title:"Is Patron",textAlign:"center"}],tableRowRender:t=>[e(ne,{get url(){return t.profileImageUrl},fallbackSrc:"/assets/img/fallbackAvatar.png",borderRadius:"100% !important",maxWidth:"35px",margin:"0 auto"}),e(f,{get children(){return t.username}}),e(f,{get children(){return te(t.joinDate)}}),e(f,{textAlign:"center",get children(){return t.isAdmin?"✔":"❌"}}),e(f,{textAlign:"center",get children(){return t.isDonator?"✔":"❌"}}),e(f,{textAlign:"center",get children(){return t.isPatreon?"✔":"❌"}})],actionsPerRow:[{emoji:"🔐",label:"Permissions",order:6,onClick:t=>l(t.guid)}],propToFormMappings:[]}),e(ue,{title:"Manage permissions for user",get userGuid(){return r()??""},get isOpen(){return r()!=null},onClose:()=>l(void 0)})]};export{Ae as ManageUsersPage,Ae as default};