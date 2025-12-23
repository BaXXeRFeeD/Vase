const API_ENDPOINT = 'https://ceramic-api.onrender.com';

function createPostCard(product) {
    return `
        <article class="card-item">
            <div class="card-info">
                <img 
                    class="card-img" 
                    src="${new URL(product.image, API_ENDPOINT)}" 
                    alt="${product.title}" 
                    loading="lazy"
                >
                <div class="card-title-btn">
                    <h3 class="card-title">${product.title}</h3>
                    <button class="btn-read card-btn">Read</button>
                </div>
            </div>
            <p class="card-p">${product.excerpt}</p>
        </article>
    `;
}

async function fetchPosts() {
    const response = await fetch(`${API_ENDPOINT}/api/posts`);

    if (!response.ok) throw new Error(`Fetch failed with status: ${response.status}`);

    return await response.json();
}

async function renderPostsGrid() {
    const grid = document.querySelector('.cards__grid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const data = await fetchPosts();
        grid.innerHTML = data.map(createPostCard).join('');
    } catch (error) {
        console.error(error);
        grid.innerHTML = '<div class="error">Failed to load</div>';
    }
}

function productHTML(product) {
    return `
        <article class="catalog-item">
            <img 
                src="${new URL(product.image, API_ENDPOINT)}" 
                alt="${product.title}" 
                loading="lazy"
            >
            <div class="catalog-info">
                <h3>${product.title}</h3>
                <p>${product.price} €</p>
            </div>
        </article>
    `;
}

async function fetchProducts() {
    const response = await fetch(`${API_ENDPOINT}/api/products`);

    if (!response.ok) throw new Error(`Fetch failed with status: ${response.status}`);

    return await response.json();
}

async function renderProducts(category = 'tea') {
    const grid = document.querySelector('.catalog__grid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const data = await fetchProducts();

        let items = [];

        if (category === 'tea') items = data.slice(0, 5);
        else if (category === 'kitchen') items = data.slice(0, 3);
        else if (category === 'plants') items = data.slice(0, 2);

        grid.innerHTML = items.map(productHTML).join('');
    } catch (error) {
        console.error(error);
        grid.innerHTML = '<div class="error">Failed to load</div>';
    }
}

function initTabs() {
    const tabs = document.querySelectorAll('.catalog__filter');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            tabs.forEach(t => t.classList.remove('active'));

            tab.classList.add('active');

            const cat = tab.dataset.category;
            await renderProducts(cat);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.catalog__grid')) {
        initTabs();
        renderProducts('tea');
    } else if (document.querySelector('.cards__grid')) {
        renderPostsGrid();
    }
});