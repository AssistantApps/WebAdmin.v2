import{S as w,C as f,u as m,a as _,o as b,r as S,c as s,P as y,B as v,b as O,d as u,e as E,H as J,t as C}from"./index-f510d5fe.js";import{g as R,N as i,C as T}from"./baseCrudService-0459d68b.js";import{g as I}from"./assistantAppsApiService-44a54b7a.js";new TextEncoder;const h=new TextDecoder,W=e=>{const t=atob(e),o=new Uint8Array(t.length);for(let n=0;n<t.length;n++)o[n]=t.charCodeAt(n);return o},j=e=>{let t=e;t instanceof Uint8Array&&(t=h.decode(t)),t=t.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return W(t)}catch{throw new TypeError("The input to be decoded is not correctly encoded.")}};class N extends Error{static get code(){return"ERR_JOSE_GENERIC"}constructor(t){var o;super(t),this.code="ERR_JOSE_GENERIC",this.name=this.constructor.name,(o=Error.captureStackTrace)===null||o===void 0||o.call(Error,this,this.constructor)}}class a extends N{constructor(){super(...arguments),this.code="ERR_JWT_INVALID"}static get code(){return"ERR_JWT_INVALID"}}function A(e){return typeof e=="object"&&e!==null}function L(e){if(!A(e)||Object.prototype.toString.call(e)!=="[object Object]")return!1;if(Object.getPrototypeOf(e)===null)return!0;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}const P=j;function x(e){if(typeof e!="string")throw new a("JWTs must use Compact JWS serialization, JWT must be a string");const{1:t,length:o}=e.split(".");if(o===5)throw new a("Only JWTs using Compact JWS serialization can be decoded");if(o!==3)throw new a("Invalid JWT");if(!t)throw new a("JWTs must contain a payload");let n;try{n=P(t)}catch{throw new a("Failed to parse the base64url encoded payload")}let r;try{r=JSON.parse(h.decode(n))}catch{throw new a("Failed to parse the decoded payload as JSON")}if(!L(r))throw new a("Invalid JWT Claims Set");return r}var p=(e=>(e[e.unknown=0]="unknown",e[e.google=1]="google",e))(p||{}),B=Object.defineProperty,D=Object.getOwnPropertyDescriptor,G=(e,t,o,n)=>{for(var r=n>1?void 0:n?D(t,o):t,c=e.length-1,l;c>=0;c--)(l=e[c])&&(r=(n?l(t,o,r):l(r))||r);return n&&r&&B(t,o,r),r};let d=class{_config;_aaService;constructor(){this._config=R(),this._aaService=I()}init=(e,t)=>{window.google.accounts.id.initialize({client_id:this._config.getGoogleClientId(),callback:this.handleResponse(e,t)})};initButton=(e,t,o)=>{this.init(t,o),window.google.accounts.id.renderButton(document.getElementById(e),{theme:"filled_black",size:"large",shape:"pill",text:"continue_with"})};promptUser=()=>{window.google.accounts.id.prompt()};handleResponse=(e,t)=>async o=>{e();const n=x(o.credential),r={accessToken:o.credential,email:n.email,oAuthType:p.google,profileUrl:n.picture,tokenId:o.credential,username:n.name};(await this._aaService.loginWithGoogleAuth(r)).isSuccess&&t()}};d=G([w()],d);const g=()=>f.get(d),k=C('<div id="buttonDiv"></div>',2),V=()=>{const e=m(),[t,o]=_(i.Success);return b(()=>{g().initButton("buttonDiv",()=>{o(i.Loading)},()=>{o(i.Success),e(S.dashboard,{replace:!0})}),setTimeout(()=>{g().promptUser()},1e3)}),[s(y,{text:"Login"}),s(v,{m:50}),s(u,{get when(){return t()==i.Loading},get children(){return s(O,{})}}),s(u,{get when(){return t()==i.Success},get children(){return s(E,{minH:"50vh",get children(){return s(T,{get children(){return[s(J,{mb:"1em",children:"Login using Google"}),k.cloneNode(!0)]}})}})}})]};export{V as LoginPage,V as default};