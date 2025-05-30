import{a as S,S as q,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const E="https://pixabay.com/api/",P="50387932-ebc79aa2032fd85e73f5be643";async function m(r,e=1,o=15){try{return(await S.get(E,{params:{key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:o}})).data}catch(i){throw i}}const g=document.querySelector(".gallery"),h=document.querySelector(".loader"),R=new q(".gallery a",{});function p(r){const e=r.map(o=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o.largeImageURL}">
            <img
              class="gallery-image"
              src="${o.webformatURL}"
              alt="${o.tags}"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${o.likes}</p>
            <p class="info-item"><b>Views:</b> ${o.views}</p>
            <p class="info-item"><b>Comments:</b> ${o.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </li>
      `).join("");g.insertAdjacentHTML("beforeend",e),R.refresh()}function $(){g.innerHTML=""}function y(){h.classList.add("visible")}function b(){h.classList.remove("visible")}const L=document.querySelector(".form"),B=L.elements["search-text"],H=document.querySelector(".gallery");document.querySelector(".loader");const c=document.querySelector(".btn-load-more");let l="",d=1,f=0,a=0;L.addEventListener("submit",async r=>{if(r.preventDefault(),l=B.value.trim(),!l){n.warning({message:"Please enter a search term.",position:"topRight"});return}d=1,a=0,$(),y();try{const e=await m(l,d);f=e.totalHits,a=e.hits.length,p(e.hits),v(),w(),e.hits.length===0&&n.info({message:"Sorry, there are no images matching your search query.",position:"topRight"})}catch(e){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",e)}finally{b()}});c.addEventListener("click",async()=>{d+=1,y();try{const r=await m(l,d);a+=r.hits.length,p(r.hits),v(),w(),a>=f&&(c.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(r){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",r)}finally{b()}});function w(){const r=H.querySelector(".gallery-item");if(!r)return;const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}function v(){a<f?c.classList.remove("hidden"):c.classList.add("hidden")}
//# sourceMappingURL=index.js.map
