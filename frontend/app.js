// Category → Unsplash image map (beautiful real photos)
const CATEGORY_IMAGES = {
    "Pickles":     "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80",
    "Sweets":      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    "Snacks":      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    "Handicrafts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    "default":     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
};

document.addEventListener('DOMContentLoaded', () => {
    const productGrid  = document.getElementById('product-grid');
    const searchBtn    = document.getElementById('search-btn');
    const pincodeInput = document.getElementById('pincode-input');
    const categoryCards = document.querySelectorAll('.category-card');
    let currentCategory = null;

    // Skeleton loader while fetching
    function showSkeletons(count = 6) {
        productGrid.innerHTML = Array(count).fill(`
            <div class="skeleton-card">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton skeleton-text tall"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>`).join('');
    }

    showSkeletons();
    fetchProducts();

    async function fetchProducts(pincode = '', category = '') {
        showSkeletons();
        let url = '/api/products';
        const params = new URLSearchParams();
        if (pincode)  params.append('location', pincode);
        if (category) params.append('category', category);
        if (params.toString()) url += `?${params.toString()}`;

        let products = [];
        try {
            const res = await fetch(url);
            if (res.ok) {
                products = await res.json();
            } else throw new Error();
        } catch {
            products = getMockProducts(pincode, category);
        }

        // slight delay for smooth feel
        setTimeout(() => renderProducts(products), 300);
    }

    function getImage(p) {
        if (p.imageUrl && p.imageUrl.startsWith('http') && !p.imageUrl.includes('placeholder')) {
            return p.imageUrl;
        }
        return CATEGORY_IMAGES[p.category] || CATEGORY_IMAGES.default;
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        if (!products.length) {
            productGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No products found nearby</h3>
                    <p>Try a different pincode or remove filters to browse all local products.</p>
                </div>`;
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const img = getImage(p);
            card.innerHTML = `
                <div class="product-img-wrap">
                    <img src="${img}" class="product-img" alt="${p.name}" loading="lazy"
                         onerror="this.src='${CATEGORY_IMAGES.default}'">
                    <span class="product-badge">${p.category}</span>
                    <button class="product-fav" title="Save">🤍</button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-seller">
                        <span class="seller-dot"></span>
                        ${p.sellerName}
                    </div>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">₹${p.price}</div>
                            <div class="product-location">📍 Pincode ${p.location}</div>
                        </div>
                        <button class="buy-btn" onclick="openContactModal('${p._id}', '${p.sellerName}', '${p.sellerPhone || '9876543210'}')">
                            Contact
                        </button>
                    </div>
                </div>`;

            // fav toggle
            card.querySelector('.product-fav').addEventListener('click', e => {
                e.stopPropagation();
                const btn = e.currentTarget;
                btn.textContent = btn.textContent === '🤍' ? '❤️' : '🤍';
            });

            productGrid.appendChild(card);
        });
    }

    // Search
    searchBtn.addEventListener('click', () => fetchProducts(pincodeInput.value.trim(), currentCategory));
    pincodeInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') fetchProducts(pincodeInput.value.trim(), currentCategory);
    });

    // Categories
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const isActive = card.classList.contains('active-category');
            categoryCards.forEach(c => c.classList.remove('active-category'));
            if (!isActive) {
                card.classList.add('active-category');
                currentCategory = card.dataset.category;
            } else {
                currentCategory = null;
            }
            fetchProducts(pincodeInput.value.trim(), currentCategory);
        });
    });

    // Mock fallback
    function getMockProducts(pin, cat) {
        const dummy = [
            { name: "Homemade Mango Pickle",  price: 150, category: "Pickles",     location: "400001", sellerName: "Aarti's Kitchen", sellerPhone: "9876543210" },
            { name: "Diwali Sweets Combo",    price: 450, category: "Sweets",      location: "400001", sellerName: "Mithai House",    sellerPhone: "9123456780" },
            { name: "Organic Banana Chips",   price: 80,  category: "Snacks",      location: "400002", sellerName: "Kerala Bites",    sellerPhone: "9876500001" },
            { name: "Hand-painted Diya Set",  price: 200, category: "Handicrafts", location: "400001", sellerName: "Crafts by Neha",  sellerPhone: "9876500002" },
            { name: "Spicy Murukku",          price: 120, category: "Snacks",      location: "400003", sellerName: "South Flavors",   sellerPhone: "9876500003" },
            { name: "Amla Pickle",            price: 130, category: "Pickles",     location: "400002", sellerName: "Village Foods",   sellerPhone: "9876500004" }
        ];
        return dummy.filter(p => {
            return (pin ? p.location === pin : true) && (cat ? p.category === cat : true);
        });
    }
});
