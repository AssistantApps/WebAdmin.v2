import{a as i,o as d,c as n,T as c,d as s,L as h}from"./index-52d7a35b.js";import{N as e}from"./assistantAppsApiService-e5e6b9f4.js";import{b as m}from"./fetchWrap-e0829ace.js";const k=t=>{const[u,l]=i(t.keysFromApi??[]),[r,o]=i(t.keysFromApi!=null?e.Success:e.Loading);d(()=>{t.keysFromApi!=null&&t.keysFromApi.length>0||g()});const g=async()=>{const a=await m().readAllCached();a.isSuccess==!1&&o(e.Error),l(a.value),o(e.Success)};return[n(s,{get when(){return r()==e.Error},get children(){return n(c,{children:"Something went wrong"})}}),n(s,{get when(){return r()==e.Loading||r()==e.Pending},get children(){return n(h,{})}}),n(s,{get when(){return r()==e.Success},get children(){return n(c,{get children(){return(u()??[]).find(a=>a.guid==t.transKeyGuid)?.key??"unknown"}})}})]};export{k as T};