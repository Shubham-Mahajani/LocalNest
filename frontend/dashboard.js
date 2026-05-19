const CATEGORY_IMAGES = {
    "Pickles":     "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80",
    "Sweets":      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    "Snacks":      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    "Handicrafts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    "default":     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
};

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

    function getImage(p) {
        if (p.imageUrl && p.imageUrl.startsWith('http') && !p.imageUrl.includes('placeholder')) return p.imageUrl;
        return CATEGORY_IMAGES[p.category] || CATEGORY_IMAGES.default;
    }

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
                        <div style="text-align:center;">
                            <div style="font-size:1.4rem;font-weight:800;color:${contacts > 0 ? 'var(--secondary)' : 'var(--text-muted)'};">${contacts}</div>
                            <div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;">CONTACTS</div>
                        </div>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
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
