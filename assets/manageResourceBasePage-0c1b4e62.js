import{ab as i,c as t,W as N,ac as X,t as C,ad as he,ae as me,a as h,q as fe,d as u,Z as we,af as Ce,ag as xe,ah as be,ai as Se,F as ee,j as v,aj as ve,f as $,I as J,ak as Ie,al as $e,am as Ne,an as ye,ao as Pe,ap as Oe,aq as ke,Y as Te,M as Ae,s as Me,v as Ee,w as Be,x as Re,z as Fe,y as T,D as Le,o as _e,P as je,B as w,b as We,e as Q,k as A,ar as R,E as F,a1 as He,as as De,a2 as ze,at as Ve,au as Ue,av as qe,aw as L,ax as _,T as j,ay as Ge,n as Y,L as Je,az as Qe,Q as P,H as Ye}from"./index-73a8a3eb.js";import{N as S,C as Z}from"./assistantAppsApiService-be80e611.js";import{s as Ze,t as pe}from"./popupHelper-40ca08fc.js";const Ke=(e,c=100)=>{try{navigator?.clipboard?.writeText?.(e),i.clear(),i.show({status:"info",title:"Copied!",description:e.slice(0,c)+(e.length>c?"...":"")})}catch{}},Xe=C(`<svg><path fill="currentColor" d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path></svg>`,4,!0),et=e=>t(X,N({viewBox:"0 0 20 20"},e,{get children(){return Xe.cloneNode(!0)}}));let O=function(e){return e[e.xsmol=0]="xsmol",e[e.smol=1]="smol",e[e.medium=2]="medium",e[e.long=3]="long",e[e.xlong=4]="xlong",e}({});const tt=e=>{const c=d=>{if(d==O.xsmol)return 1;if(d==O.smol)return 2;if(d==O.medium)return 4;if(d==O.long)return 6;if(d==O.xlong)return 12};return t(he,{get colSpan(){return c(e.size)},get children(){return e.children}})},nt=e=>t(me,{templateColumns:{"@initial":"repeat(2, 1fr)","@md":"repeat(12, 1fr)"},gap:"$6",get children(){return e.children}});var k=(e=>(e[e.Add=0]="Add",e[e.Edit=1]="Edit",e))(k||{});const E={},rt=e=>{const[c,d]=h(e.selectedValues??[],{equals:!1});fe(()=>{d(e.selectedValues??[])});const f=a=>{d(a),e.onSelect?.(a)},l=a=>e.options.find(s=>s.value==a);return t(Te,{get children(){return[t(u,{get when(){return e.hideTitle!=!0},get children(){return t(we,{get children(){return e.title}})}}),t(Ce,{get multiple(){return e.multiple},get value(){return c()},onChange:f,get children(){return[t(xe,{get children(){return[t(be,{get children(){return e.placeholder}}),t(Se,{children:({selectedOptions:a})=>t(ee,{alignItems:"flex-start",get children(){return t(v,{each:a,children:o=>t(ve,{borderRadius:5,m:"0.125em 0.25em 0.125em 0",get children(){return[t(u,{get when(){return $(()=>l(o.value)!=null)()&&l(o.value).image!=null},get children(){return t(J,{get src(){return l(o.value).image},get alt(){return l(o.value).title},borderRadius:3,height:"1em",width:"1em",mr:"0.5em"})}}),t(Ie,{textAlign:"start",get children(){return o.textValue}})]}})})}})}),t($e,{})]}}),t(Ne,{get children(){return t(ye,{get children(){return t(v,{get each(){return e.options},children:a=>t(Pe,{get value(){return a.value},get children(){return[t(u,{get when(){return a.image!=null},get children(){return t(J,{get src(){return a.image},get alt(){return a.title},borderRadius:5,maxHeight:"2em",maxWidth:"2em",ml:"0.5em"})}}),t(Oe,{get children(){return a.title}}),t(ke,{})]}})})}})}})]}})]}})},at=e=>{const c=e.wrapComp;return t(u,{get when(){return e.condition},get fallback(){return e.children},get children(){return t(c,N(()=>e.wrapProps,{get children(){return e.children}}))}})},lt=e=>t(Le,{get opened(){return e.isOpen},size:"7xl",get onClose(){return e.onClose},get children(){return[t(Ae,{}),t(Me,{get children(){return[t(Ee,{}),t(Be,{get children(){return e.title}}),t(Re,{get children(){return e.children}}),t(Fe,{get children(){return[t(T,{mt:"1em",mr:"0.5em",get onClick(){return e.onSave},children:"Save"}),t(T,{mt:"1em",colorScheme:"danger",get onClick(){return e.onClose},children:"Close"})]}})]}})]}}),p=e=>{const[c,d]=h(e.item),f=(l,a)=>{l==="json"?(console.log(JSON.parse(a)),d(o=>JSON.parse(a)),e.updateObject(JSON.parse(a))):(d(o=>({...o,[l]:a})),e.updateProperty(l,a))};return t(nt,{get children(){return t(v,{get each(){return e.mappings},children:l=>{if((l.hiddenIn??[]).includes(e.mode))return null;const a=l.component,o=s=>{let x=E;for(const m of l.additional??[])x={...x,[m.prop]:m.value(s)};return x};return t(tt,{get size(){return l.gridItemSize},get children(){return t(a,N(()=>o(c()),{get id(){return`${e.mode}-${l.property}`},get label(){return l.label},get value(){return c()[l.property]},get placeholder(){return l.placeholder},onChange:s=>f(l.property,s)}))}})}})}})},it=C('<svg><path stroke="currentColor" stroke-width="3px" d="M20,44c-0.256,0-0.512-0.098-0.707-0.293L4.586,29l14.707-14.707c0.391-0.391,1.023-0.391,1.414,0  s0.391,1.023,0,1.414L7.414,29l13.293,13.293c0.391,0.391,0.391,1.023,0,1.414C20.512,43.902,20.256,44,20,44z"></path></svg>',4,!0),ut=C('<svg><path stroke="currentColor" stroke-width="3px" d="M37,44c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L49.586,29L36.293,15.707  c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L52.414,29L37.707,43.707C37.512,43.902,37.256,44,37,44z"></path></svg>',4,!0),ct=e=>t(X,N({viewBox:"0 0 57 57"},e,{get children(){return[it.cloneNode(!0),ut.cloneNode(!0)]}})),st=C("<span>Rows</span>",2),M=C("<span></span>",2),dt=C("<span>-</span>",2),K=C("<span>of</span>",2),ot=C("<span>&nbsp;</span>",2),W=[10,25,50,100],ft=e=>{const[c,d]=h(S.Loading),[f,l]=h([]),[a,o]=h(""),[s,x]=h(0),[m,te]=h(e.pageSizeOptions?.[0]??W[0]),[ne,H]=h(0),[re,D]=h(0),[B,I]=h(),[ae,z]=h(e.defaultItem??E),[le,ie]=h((e.defaultItem??E).sortOrder),[V,y]=h();_e(()=>{b()});const b=async()=>{const n=await e.crudService.readAll({page:s()+1,searchText:a()});if(n.isSuccess==!1){i.show({status:"danger",title:`Could not fetch all ${e.itemName}s`}),d(S.Error);return}y(void 0),e.serverPagination?(l(n.value),H(n.totalRows),D(n.totalPages),i.clear()):(x(0),l(n.value),H(n.value.length),D(Math.floor(n.value.length/m())),e.setSortOrderOnItemLoad==!0&&ie(n.value.length+1)),d(S.Success)},ue=(n,r)=>{let g=U(n,r);return e.serverPagination?g:g.slice(s()*m(),Math.min((s()+1)*m(),f().length))},U=(n,r)=>{if(e.serverPagination==!0)return n;let g=[];return e.searchFunc==null||r==null||r.length==0?g=n:g=n.filter(ge=>e.searchFunc(ge,r)),g},ce=async()=>{const n=await Ze({title:"Please enter Guid",input:"text",focusOnInput:!0});i.show({status:"info",title:`Fetching info for ${e.itemName}`});const r=await e.crudService.read(n);if(r.isSuccess==!1){i.show({status:"danger",title:`Unable to find ${e.itemName} by Id`});return}I(r.value)},se=async()=>{if(i.show({status:"info",title:`Creating ${e.itemName}`}),(await e.crudService.create(ae())).isSuccess==!1){i.show({status:"danger",title:`Unable to create ${e.itemName}`});return}else i.clear(),i.show({status:"success",title:`Created ${e.itemName} 🎉`});b()},de=async()=>{const n=B();if(n==null){i.show({status:"danger",title:`Could not edit ${e.itemName}`});return}if(y(n.guid),I(void 0),i.show({status:"info",title:`Editing ${e.itemName}`}),await pe(3e3),(await e.crudService.update(n)).isSuccess==!1){i.show({status:"danger",title:`Unable to update ${e.itemName}`}),y(void 0);return}else i.clear(),i.show({status:"success",title:`Edited ${e.itemName} 🎉`});b()},oe=async n=>{if(i.show({status:"info",title:`Deleting ${e.itemName}`}),y(n.guid),(await e.crudService.del(n)).isSuccess==!1){i.show({status:"danger",title:`Could not delete ${e.itemName}`}),y(void 0);return}else i.clear(),i.show({status:"success",title:`Deleted ${e.itemName} 🎉`});b()},q=(n,r)=>(n??[])?.filter(g=>(g.hiddenIn??[]).includes(r)==!1),G={variant:"filled"};return[t(je,{get text(){return e.title}}),t(w,{m:50}),t(u,{get when(){return c()==S.Loading||c()==S.Pending},get children(){return t(We,{})}}),t(u,{get when(){return c()==S.Error},get children(){return t(Q,{children:"Error"})}}),t(u,{get when(){return c()==S.Success},get children(){return[t(Z,{class:"section-read-all",get children(){return[t(u,{get when(){return e.searchFunc!=null},get children(){return t(A,{mb:"1em",get children(){return[t(u,{get when(){return e.disableGetByIdOption!=!0},get children(){return[t(R,{}),t(R,{}),t(F,{label:"Get item by guid",get children(){return t(w,{class:"pointer",backgroundColor:"rgba(255, 255, 255, 0.1)",borderRadius:"10px",p:"5px 1em",display:"inline-block",onClick:ce,get children(){return t(ct,{fontSize:"2em"})}})}})]}}),t(R,{}),t(He,{maxW:"400px",get children(){return[t(at,{get condition(){return e.searchTooltip!=null},wrapComp:F,get wrapProps(){return{label:e.searchTooltip}},get children(){return t(De,N(G,{get children(){return t(et,{})}}))}}),t(ze,N(G,{placeholder:"Search",get value(){return a()},type:"text",get onInput(){return Ve(n=>{o(n.target.value),b()})}}))]}})]}})}}),t(Ue,{get striped(){return e.striped??"odd"},get highlightOnHover(){return e.highlightOnHover??!0},get dense(){return e.dense??!0},get children(){return[t(qe,{get children(){return t(L,{get children(){return[t(v,{get each(){return e.tableHeadItems},children:n=>t(_,{get class(){return n.classNames},get width(){return n.width},get maxWidth(){return n.maxWidth},get textAlign(){return n.textAlign},get children(){return t(j,{class:"clamp-to-2-lines",get children(){return n.title}})}})}),t(_,{textAlign:"center",children:"Actions"})]}})}}),t(Ge,{get children(){return t(v,{get each(){return ue(f(),a())},children:n=>t(L,{get children(){return t(u,{get when(){return V()==null||V()!=n.guid},get fallback(){return t(Y,{get colSpan(){return e.tableHeadItems.length+1},get children(){return t(Q,{get children(){return t(Je,{})}})}})},get children(){return[$(()=>e.tableRowRender(n)),t(Y,{get children(){return t(ee,{justifyContent:"center",get children(){return t(v,{get each(){return[...e.disableCopyGuidAction?[]:[{emoji:"📋",label:"Copy Guid",order:1,onClick:r=>Ke(r.guid)}],...e.disableEditAction?[]:[{emoji:"📝",label:"Edit",order:5,onClick:r=>I(r)}],...e.disableDeleteAction?[]:[{emoji:"🗑️",label:"Delete",order:99,onClick:r=>oe(r)}],...e.actionsPerRow??[]]},children:r=>t(F,{get label(){return r.label},placement:"top",get children(){return t(j,{class:"pointer action-item",size:"xl",get order(){return r.order},onClick:()=>r.onClick(n),get children(){return r.emoji}})}})})}})}})]}})}})})}}),t(u,{get when(){return e.tableFooterItems!=null},get children(){return t(Qe,{get children(){return t(L,{get children(){return t(v,{get each(){return e.tableFooterItems},children:n=>t(_,{get class(){return n.classNames},get children(){return n.title}})})}})}})}})]}}),t(A,{justifyContent:"end",mt:"$3",get children(){return[t(w,{mx:"1em",get children(){return[t(T,{minWidth:"75px",mx:"0.25em",get disabled(){return s()<1},onClick:()=>{x(n=>n-1),e.serverPagination&&(i.show({status:"info",title:"Loading page"}),b())},children:"<"}),t(T,{minWidth:"75px",mx:"0.25em",get disabled(){return $(()=>e.serverPagination!=!1)()&&s()>=Math.floor(f().length/m())||e.serverPagination==!0&&s()>=re()},onClick:()=>{x(n=>n+1),e.serverPagination&&(i.show({status:"info",title:"Loading page"}),b())},children:">"})]}}),t(u,{get when(){return(e.pageSizeOptions??W).length>1},get children(){return t(A,{mx:"1em",get children(){return[t(j,{children:"Page size: "}),t(rt,{title:"Page size",hideTitle:!0,get selectedValues(){return[m().toString()]},onSelect:n=>{Array.isArray(n)||te(parseInt(n))},get options(){return(e.pageSizeOptions??W).map(n=>({title:n.toString(),value:n.toString()}))}})]}})}}),t(w,{mx:"1em",get children(){return[st.cloneNode(!0)," ",(()=>{const n=M.cloneNode(!0);return P(n,()=>s()*m()+1),n})()," ",dt.cloneNode(!0)," ",t(u,{get when(){return e.unknownPagination!=!0},get fallback(){return[(()=>{const n=ot.cloneNode(!0),r=n.firstChild;return P(n,()=>(s()+1)*m(),r),n})(),K.cloneNode(!0)," ",(()=>{const n=M.cloneNode(!0);return P(n,ne),n})()]},get children(){return[(()=>{const n=M.cloneNode(!0);return P(n,()=>Math.min(f().length,(s()+1)*m())),n})()," ",K.cloneNode(!0)," ",(()=>{const n=M.cloneNode(!0);return P(n,()=>U(f(),a()).length),n})()]}})]}})]}})]}}),t(u,{get when(){return e.children!=null},get children(){return[t(w,{m:"2em"}),$(()=>e.children)]}}),t(u,{get when(){return e.renderExportCard!=null},get children(){return[t(w,{m:"2em"}),$(()=>e.renderExportCard(f()))]}}),t(w,{m:"2em"}),t(u,{get when(){return q(e.propToFormMappings,k.Add)?.length>0},get children(){return t(Z,{class:"section-create",get children(){return[t(Ye,{mb:"1.5em",children:"Create new record"}),t(p,{get mode(){return k.Add},get item(){return{...e.defaultItem??E,sortOrder:le()}},get mappings(){return e.propToFormMappings},updateObject:n=>z(r=>n),updateProperty:(n,r)=>{console.log("create",{prop:n,value:r}),z(g=>({...g,[n]:r}))}}),t(A,{justifyContent:"center",mt:"2em",get children(){return t(T,{mb:"1em",onClick:se,get children(){return["Add ",$(()=>e.itemName)]}})}})]}})}}),t(w,{m:"8em"}),t(u,{get when(){return q(e.propToFormMappings,k.Edit)?.length>0},get children(){return t(lt,{get title(){return`Edit - ${e.title}`},get isOpen(){return B()!=null},onSave:de,onClose:()=>I(void 0),get children(){return t(p,{get mode(){return k.Edit},get item(){return B()},get mappings(){return e.propToFormMappings},updateObject:n=>I(r=>n),updateProperty:(n,r)=>{console.log("update",{prop:n,value:r}),I(g=>(console.log({...g}),{...g,[n]:r}))}})}})}})]}})]};export{ct as C,rt as D,O as G,ft as M,et as S,E as a,k as b,Ke as c};
