import{a as p,S as m,i as y}from"./assets/vendor-tnUJPedx.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const h="47502659-8e710eb0ff3e952458316b5b2",g="https://pixabay.com/api/";async function l(e,n=1,i=15){try{return(await p.get(g,{params:{key:h,q:e,page:n,per_page:i,image_type:"photo",orientation:"horizontal"}})).data}catch(o){console.error("Ошибка запроса:",o)}}function d(e){const n=document.querySelector(".gallery"),i=e.map(o=>`
      <div class="photo-card">
        <a href="${o.largeImageURL}" class="gallery-item">
          <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${o.likes}</p>
          <p class="info-item"><b>Views</b> ${o.views}</p>
          <p class="info-item"><b>Comments</b> ${o.comments}</p>
          <p class="info-item"><b>Downloads</b> ${o.downloads}</p>
        </div>
      </div>`).join("");n.insertAdjacentHTML("beforeend",i),new m(".gallery a",{captions:!0,captionSelector:"img",captionType:"alt",captionDelay:250,overlay:!0,stopPropagation:!0})}function u(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}function b(){const e=document.querySelector(".load-more");e&&(e.style.display="block")}y.settings({theme:"dark",position:"topRight",transitionIn:"flipInX",transitionOut:"flipOutX"});let a="",s=1;const w=document.querySelector("#search-form"),L=document.querySelector(".load-more");w.addEventListener("submit",v);L.addEventListener("click",f);async function v(e){if(e.preventDefault(),a=e.target.elements.query.value.trim(),!a)return;s=1,u();const n=await l(a,s);d(n.hits),n.hits.length>0&&b()}async function f(){s+=1;const e=await l(a,s);d(e.hits),(e.hits.length===0||s*15>=e.totalHits)&&(u(),alert("We're sorry, but you've reached the end of search results."))}window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-100&&f()});
//# sourceMappingURL=index.js.map
