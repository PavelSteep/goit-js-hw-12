import{a as f,S as m,i as y,c as h}from"./assets/vendor-BYouOR55.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const g="47502659-8e710eb0ff3e952458316b5b2",b="https://pixabay.com/api/";async function l(e,n=1,s=15){try{return(await f.get(b,{params:{key:g,q:e,page:n,per_page:s,image_type:"photo",orientation:"horizontal"}})).data}catch(o){console.error("Ошибка запроса:",o)}}function u(e){const n=document.querySelector(".gallery"),s=e.map(o=>`
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
      </div>`).join("");n.insertAdjacentHTML("beforeend",s),new m(".gallery a",{captions:!0,captionSelector:"img",captionType:"alt",captionDelay:250,overlay:!0,stopPropagation:!0})}function d(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}function w(){const e=document.querySelector(".load-more");e&&(e.style.display="block")}y.settings({theme:"dark",position:"topRight",transitionIn:"flipInX",transitionOut:"flipOutX"});let a="",i=1;const L=document.querySelector("#search-form"),v=document.querySelector(".load-more"),S=document.querySelector("#some-button"),q=document.querySelector("#tooltip");h(S,q,{placement:"top"});L.addEventListener("submit",M);v.addEventListener("click",p);async function M(e){if(e.preventDefault(),a=e.target.elements.query.value.trim(),!a)return;i=1,d();const n=await l(a,i);u(n.hits),n.hits.length>0&&w()}async function p(){i+=1;const e=await l(a,i);u(e.hits),(e.hits.length===0||i*15>=e.totalHits)&&(d(),alert("We're sorry, but you've reached the end of search results."))}window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-100&&p()});
//# sourceMappingURL=index.js.map
