let API_ENDPOINT="https://ceramic-api.onrender.com";function createPostCard(t){return`
        <article class="card-item">
            <div class="card-info">
                <img 
                    class="card-img" 
                    src="${new URL(t.image,API_ENDPOINT)}" 
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
    `}async function fetchPosts(){var t=await fetch(API_ENDPOINT+"/api/posts");if(t.ok)return t.json();throw new Error("Fetch failed with status: "+t.status)}async function renderPostsGrid(){var e=document.querySelector(".cards__grid");if(e){e.innerHTML='<div class="loading">Loading...</div>';try{var t=await fetchPosts();e.innerHTML=t.map(createPostCard).join("")}catch(t){console.error(t),e.innerHTML='<div class="error">Failed to load</div>'}}}function productHTML(t){return`
        <article class="catalog-item">
            <img 
                src="${new URL(t.image,API_ENDPOINT)}" 
                alt="${t.title}" 
                loading="lazy"
            >
            <div class="catalog-info">
                <h3>${t.title}</h3>
                <p>${t.price} €</p>
            </div>
        </article>
    `}async function fetchProducts(){var t=await fetch(API_ENDPOINT+"/api/products");if(t.ok)return t.json();throw new Error("Fetch failed with status: "+t.status)}async function renderProducts(e="tea"){var a=document.querySelector(".catalog__grid");if(a){a.innerHTML='<div class="loading">Loading...</div>';try{var r=await fetchProducts();let t=[];"tea"===e?t=r.slice(0,5):"kitchen"===e?t=r.slice(0,3):"plants"===e&&(t=r.slice(0,2)),a.innerHTML=t.map(productHTML).join("")}catch(t){console.error(t),a.innerHTML='<div class="error">Failed to load</div>'}}}function initTabs(){let e=document.querySelectorAll(".catalog__filter");e.length&&e.forEach(t=>{t.addEventListener("click",async()=>{e.forEach(t=>t.classList.remove("active")),t.classList.add("active"),await renderProducts(t.dataset.category)})})}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".catalog__grid")?(initTabs(),renderProducts("tea")):document.querySelector(".cards__grid")&&renderPostsGrid()});