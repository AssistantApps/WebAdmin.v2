import{a as S,q as C,c as e,M as w,s as I,v as k,w as K,x as v,d as u,e as h,L as F,T as p,j as L,B as x,I as G,y as m,z as O,D as E,n as s,H as R}from"./index-f0397a61.js";import{N as o,g as H,C as N}from"./assistantAppsApiService-da4a7506.js";import{a as y,b as P,F as z}from"./fetchWrap-4bc1c482.js";import{T as B,A as D}from"./appLogos-20c90977.js";import{s as W,a as $,c as q}from"./commonMapping-0d36313c.js";import{M as U,G as c,c as j}from"./manageResourceBasePage-4d2466e2.js";import{a as A}from"./image-a269e06d.js";import{F as T,a as V}from"./input-71e9efdc.js";import"./manageAppService-46dced24.js";import"./image-ebeb0859.js";import"./popupHelper-a2d54340.js";const X=a=>{const[l,n]=S(o.Loading),[d,t]=S([]);C(()=>{a.translationKeyGuid!=null&&r(a.translationKeyGuid)});const r=async i=>{if(i==null||i.length<5){t([]);return}n(o.Loading);const g=await y().readAll(i);if(g.isSuccess==!1){n(o.Error);return}t(g.value),n(o.Success)},M=i=>async()=>{n(o.Loading),await y().del(i),r(a.translationKeyGuid)},b=async i=>{n(o.Loading);const g=y();for(const f of i??[])await g.add(a.translationKeyGuid,f.contents);r(a.translationKeyGuid)};return e(E,{get opened(){return a.isOpen},size:"xl",get onClose(){return a.onClose},get children(){return[e(w,{}),e(I,{get children(){return[e(k,{}),e(K,{get children(){return a.title}}),e(v,{get children(){return[e(u,{get when(){return l()==o.Loading||l()==o.Pending},get children(){return e(h,{height:"25vh",get children(){return e(F,{})}})}}),e(u,{get when(){return l()==o.Error},get children(){return e(h,{children:"Error"})}}),e(u,{get when(){return l()==o.Success},get children(){return[e(h,{minH:"25vh",gap:"0.5em",get children(){return e(u,{get when(){return d().length>0},get fallback(){return e(p,{children:"No images"})},get children(){return e(L,{get each(){return d()},children:i=>e(x,{position:"relative",maxW:"200px",maxH:"200px",get children(){return[e(G,{borderRadius:"10px",get src(){return`${H().getAATranslationImageUrl()}/${i.imagePath}`}}),e(m,{colorScheme:"danger",class:"top-right-cross",get onClick(){return M(i)},children:"X"})]}})})}})}}),e(A,{id:"image-upload",label:"Add image to translationKey",value:[],placeholder:"Paste image here",onChange:b})]}})]}}),e(O,{get children(){return e(m,{get onClick(){return a.onClose},children:"Close"})}})]}})]}})},_=(a,l)=>{const n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(l)),n.setAttribute("download",a),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)},J=["inputTooShort","inputTooLong","emailNotValid","inputTooLow","inputTooHigh","guideName","guideSubTitle","guideMinutes","guideTags","showCreatedBy","guideSectionHeading","guideSectionsAdd","guideSectionAddText","guideSectionAddLink","guideSectionAddLinkName","guideSectionAddLinkAddress","guideSectionAddImage","guideSectionAddImageCaption","guideSectionAddMarkdown","guideSectionAddMarkdownContent","guideSectionAddMarkdownPreview","guideSectionMoveUp","guideSectionMoveDown","guideSubmissionFailedTitle","guideSubmissionFailedMessage","guideSubmissionSuccessTitle","guideSubmissionSuccessMessage","loginRequiredTitle","loginRequiredMessage"],de=()=>{const[a,l]=S(),n=d=>{let t=`enum LocaleKey {
`;for(const r of d)t+=`	${r.key},
`;t+=`	//
`;for(const r of J)t+=`	${r},
`;return t+="}",t};return e(z,{fetchApps:!0,render:d=>[e(U,{title:"Manage TranslationKeys",itemName:"Translation Key",disableGetByIdOption:!0,get crudService(){return P()},defaultItem:{sortOrder:0,isTranslatable:!1},searchTooltip:"Searches: key & meta & originalText",setSortOrderOnItemLoad:!0,searchFunc:(t,r)=>t.key.includes(r)||t.meta.includes(r)||t.original.includes(r),tableHeadItems:[{title:"Key",width:"15%"},{title:"App Types"},{title:"Meta"},{title:"Original"},{title:"Sort Order",maxWidth:"75px",textAlign:"center"},{title:"Is Translatable",maxWidth:"75px",textAlign:"center"}],tableRowRender:t=>[e(s,{width:"15%",get children(){return e(p,{class:"clamp-to-1-lines",get children(){return t.key}})}}),e(B,{minWidth:"128px",get selectedApps(){return t.appGuids},appsFromApi:d}),e(s,{width:"20%",get children(){return e(p,{class:"clamp-to-2-lines",get children(){return t.meta}})}}),e(s,{width:"40%",get children(){return e(p,{class:"clamp-to-2-lines",get children(){return t.original}})}}),e(s,{maxWidth:"75px",margin:"0 auto",textAlign:"center",get children(){return t.sortOrder}}),e(s,{maxWidth:"75px",margin:"0 auto",textAlign:"center",get children(){return t.isTranslatable?"✔":"❌"}})],actionsPerRow:[{emoji:"🖼️",order:6,label:"Manage images",onClick:t=>{l(t.guid)}}],get propToFormMappings(){return[{component:T,gridItemSize:c.long,property:"key",label:"Key",placeholder:"Key"},{component:D,gridItemSize:c.long,property:"appGuids",label:"App Types",placeholder:"Please select an app",additional:[{prop:"appsFromApi",value:()=>d},{prop:"multiple",value:()=>!0},{prop:"preSelectedApps",value:t=>t.appGuids}]},{component:T,gridItemSize:c.xlong,property:"meta",label:"Meta",placeholder:"Description about the item"},{component:V,gridItemSize:c.medium,property:"original",label:"Original",placeholder:"English translation"},W,$,q,{component:A,gridItemSize:c.xlong,property:"translationKeyImages",label:"Screenshot",placeholder:"Paste image here"}]},renderExportCard:t=>e(N,{class:"section-export",get children(){return[e(R,{mb:"1.5em",children:"Export TranslationKey"}),e(m,{onClick:()=>j(n(t)),children:"Copy .dart export content"}),e(x,{m:"0.5em",display:"inline-block"}),e(m,{onClick:()=>_("locale_key.dart",n(t)),children:"Download .dart export"})]}})}),e(X,{title:"Manage images for translation key",get translationKeyGuid(){return a()??""},get isOpen(){return a()!=null},onClose:()=>l(void 0)})]})};export{de as ManageTranslationKeysPage,de as default};
