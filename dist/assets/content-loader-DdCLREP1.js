const r="https://ceramic-api.onrender.com";function n(t){return`
        <article class="card-item">
            <div class="card-info">
                <img 
                    class="card-img" 
                    src="${new URL(t.image,r)}" 
                    alt="${t.title}" 
                    loading="lazy"
                >
                <div class="card-title-btn">
                    <h3 class="card-title">${t.title}</h3>
                    <button class="btn-read card-btn">Read</button>
                </div>
            </div>
            <p class="card-p">${t.excerpt}</p>
        </article>
    `}async function s(){const t=await fetch(`${r}/api/posts`);if(!t.ok)throw new Error(`Fetch failed with status: ${t.status}`);return await t.json()}async function o(){const t=document.querySelector(".cards__grid");if(t){t.innerHTML='<div class="loading">Loading...</div>';try{const e=await s();t.innerHTML=e.map(n).join("")}catch(e){console.error(e),t.innerHTML='<div class="error">Failed to load</div>'}}}function l(t){return`
        <article class="catalog-item">
            <img 
                src="${new URL(t.image,r)}" 
                alt="${t.title}" 
                loading="lazy"
            >
            <div class="catalog-info">
                <h3>${t.title}</h3>
                <p>${t.price} €</p>
            </div>
        </article>
    `}async function d(){const t=await fetch(`${r}/api/products`);if(!t.ok)throw new Error(`Fetch failed with status: ${t.status}`);return await t.json()}async function c(t="tea"){const e=document.querySelector(".catalog__grid");if(e){e.innerHTML='<div class="loading">Loading...</div>';try{const a=await d();let i=[];t==="tea"?i=a.slice(0,5):t==="kitchen"?i=a.slice(0,3):t==="plants"&&(i=a.slice(0,2)),e.innerHTML=i.map(l).join("")}catch(a){console.error(a),e.innerHTML='<div class="error">Failed to load</div>'}}}function u(){const t=document.querySelectorAll(".catalog__filter");t.length&&t.forEach(e=>{e.addEventListener("click",async()=>{t.forEach(i=>i.classList.remove("active")),e.classList.add("active");const a=e.dataset.category;await c(a)})})}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".catalog__grid")?(u(),c("tea")):document.querySelector(".cards__grid")&&o()});
