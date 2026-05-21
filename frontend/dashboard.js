const CATEGORY_IMAGES = {
    "Pickles":     "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80",
    "Sweets":      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    "Snacks":      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    "Handicrafts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    "default":     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
};

// ─── Product Name Keyword → Specific Image map ────────────────────────────────
const PRODUCT_NAME_IMAGES = [
    // Sweets
    { keywords: ["gulab jamun", "gulabjamun"],          url: "https://images.unsplash.com/photo-1666606374792-89997e9b9b27?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["ladoo", "ladu", "laddu"],             url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["barfi", "barfee", "burfi"],           url: "https://images.unsplash.com/photo-1601303516534-bf4d3b97a5e5?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["halwa", "halva"],                     url: "https://images.unsplash.com/photo-1631452180775-5e2bceb36a8e?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["jalebi"],                             url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["kheer"],                              url: "https://images.unsplash.com/photo-1666606374792-89997e9b9b27?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["rasgulla", "rasogolla"],              url: "https://images.unsplash.com/photo-1666606374792-89997e9b9b27?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["peda"],                               url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["mithai", "sweets combo", "sweet box"],url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["chocolate"],                         url: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80" },
    // Pickles
    { keywords: ["mango pickle", "aam achar", "aam ka achar"], url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["amla pickle", "amla achar"],          url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["lemon pickle", "nimbu achar"],        url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["chilli pickle", "mirchi achar"],      url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["mixed pickle"],                       url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["achar", "pickle"],                   url: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80" },
    // Snacks
    { keywords: ["murukku", "chakli"],                  url: "https://images.unsplash.com/photo-1606312619070-d48b8b55f3ba?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["banana chips", "banana chip"],        url: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["chivda", "chuda", "poha mix"],        url: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["mathri", "namkeen"],                  url: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["samosa"],                             url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["pakora", "bhajiya"],                  url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["chips"],                              url: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&auto=format&fit=crop&q=80" },
    // Handicrafts
    { keywords: ["diya", "diyas", "dia"],               url: "https://images.unsplash.com/photo-1604823779688-e9bac5e7f49c?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["candle", "scented candle"],           url: "https://images.unsplash.com/photo-1608181831718-c9bf0c4b3a35?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["pottery", "pot", "clay"],             url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["jewellery", "jewelry", "necklace", "bangle", "bracelet"], url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["painting", "wall art"],               url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["basket", "bamboo"],                   url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80" },
    { keywords: ["embroidery", "crochet", "knitting"],  url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80" },
];

/**
 * Returns the best image URL for a product.
 * Priority: seller-provided URL → product name keyword match → category fallback.
 */
function getProductImage(p) {
    if (p.imageUrl && p.imageUrl.startsWith('http') && !p.imageUrl.includes('placeholder')) {
        return p.imageUrl;
    }
    const nameLower = (p.name || '').toLowerCase();
    for (const entry of PRODUCT_NAME_IMAGES) {
        if (entry.keywords.some(kw => nameLower.includes(kw))) {
            return entry.url;
        }
    }
    return CATEGORY_IMAGES[p.category] || CATEGORY_IMAGES.default;
}

document.addEventListener('DOMContentLoaded', () => {
    const sellerId    = localStorage.getItem('sellerId');
    const sellerName  = localStorage.getItem('sellerName');
    const sellerPhone = localStorage.getItem('sellerPhone');

    if (!sellerId) { window.location.href = 'seller-auth.html'; return; }

    // Populate UI
    document.getElementById('welcome-text').innerText   = `👋 ${sellerName}`;
    document.getElementById('dash-shop-name').innerText  = sellerName;
    document.getElementById('dash-seller-id').innerText  = `Seller ID: ${sellerId}  ·  📞 ${sellerPhone || 'N/A'}`;

    const pins = JSON.parse(localStorage.getItem('servicePincodes') || '[]');
    document.getElementById('stat-pincodes').innerText = pins.length || '—';

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });

    const addForm = document.getElementById('add-product-form');
    const postBtn = document.getElementById('post-btn');
    const grid    = document.getElementById('seller-product-grid');

    fetchMyProducts();

    async function fetchMyProducts() {
        grid.innerHTML = `<div class="empty-dash" style="grid-column:1/-1"><div class="e-icon">⏳</div><p>Loading your products...</p></div>`;
        try {
            const res = await fetch(`/api/products?sellerId=${encodeURIComponent(sellerId)}`);
            if (!res.ok) throw new Error('API error');
            const products = await res.json();
            renderProducts(products);

            // Update stats
            document.getElementById('stat-products').innerText = products.length;
            const totalInquiries = products.reduce((sum, p) => sum + (p.contactCount || 0), 0);
            document.getElementById('stat-inquiries').innerText = totalInquiries;
        } catch (err) {
            console.error(err);
            grid.innerHTML = `<div class="empty-dash" style="grid-column:1/-1"><div class="e-icon">⚠️</div><p>Could not load products. Is the server running?</p></div>`;
        }
    }

    function getImage(p) { return getProductImage(p); }

    function renderProducts(products) {
        grid.innerHTML = '';
        if (!products.length) {
            grid.innerHTML = `<div class="empty-dash" style="grid-column:1/-1">
                <div class="e-icon">📦</div>
                <h3>No products yet</h3>
                <p>Use the form on the left to add your first product!</p>
            </div>`;
            return;
        }

        products.forEach(p => {
            const contacts = p.contactCount || 0;
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-wrap">
                    <img src="${getImage(p)}" class="product-img" alt="${p.name}" loading="lazy"
                         onerror="this.src='${CATEGORY_IMAGES.default}'">
                    <span class="product-badge">${p.category}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-seller"><span class="seller-dot"></span>Your listing</div>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">₹${p.price}</div>
                            <div class="product-location">📍 Pincode ${p.location}</div>
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:center;gap:0.4rem;">
                            <div style="text-align:center;">
                                <div style="font-size:1.4rem;font-weight:800;color:${contacts > 0 ? 'var(--secondary)' : 'var(--text-muted)'}">${contacts}</div>
                                <div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;">CONTACTS</div>
                            </div>
                            <button class="delete-product-btn" data-id="${p._id}" title="Remove listing"
                                style="background:#ff4d4d;color:#fff;border:none;border-radius:8px;padding:0.3rem 0.7rem;font-size:0.78rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:0.3rem;transition:background 0.2s;">
                                🗑️ Remove
                            </button>
                        </div>
                    </div>
                </div>`;

            card.querySelector('.delete-product-btn').addEventListener('click', () => deleteProduct(p._id, p.name));
            grid.appendChild(card);
        });
    }

    // Delete a product
    async function deleteProduct(id, name) {
        if (!confirm(`Remove "${name}" from your listings? This cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchMyProducts();
            } else {
                const data = await res.json();
                alert('❌ Could not remove: ' + (data.message || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Is the backend server running?');
        }
    }

    // Add product
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputPin  = document.getElementById('p-pincode').value.trim();
        const savedPins = JSON.parse(localStorage.getItem('servicePincodes') || '[]');
        if (savedPins.length > 0 && !savedPins.includes(inputPin)) {
            alert(`⚠️ You can only list products in your registered pincodes:\n${savedPins.join(', ')}`);
            return;
        }

        postBtn.textContent = '⏳ Posting...';
        postBtn.disabled    = true;

        const payload = {
            name:        document.getElementById('p-name').value.trim(),
            price:       Number(document.getElementById('p-price').value),
            category:    document.getElementById('p-category').value,
            imageUrl:    document.getElementById('p-image').value.trim(),
            location:    inputPin,
            sellerName:  sellerName,
            sellerPhone: sellerPhone || '',
            sellerId:    sellerId,
            description: ''
        };

        try {
            const res = await fetch('/api/products', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                addForm.reset();
                await fetchMyProducts();
            } else {
                alert('❌ Error: ' + (data.message || 'Failed to add product'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Is the backend server running?');
        } finally {
            postBtn.textContent = '✅ Post Product';
            postBtn.disabled    = false;
            setTimeout(() => { postBtn.textContent = 'Post Product'; }, 2000);
        }
    });
});
