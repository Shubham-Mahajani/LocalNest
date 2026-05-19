// ─── Category → Unsplash image map ───────────────────────────────────────────
const CATEGORY_IMAGES = {
    "Pickles":     "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80",
    "Sweets":      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    "Snacks":      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    "Handicrafts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    "default":     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
};

const DELIVERY_FEE = 30;

// ─── Cart State (localStorage) ────────────────────────────────────────────────
function loadCart()   { try { return JSON.parse(localStorage.getItem('ln_cart') || '[]'); } catch { return []; } }
function saveCart(c)  { localStorage.setItem('ln_cart', JSON.stringify(c)); }

let cart = loadCart();

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    updateCartBadge(true);
    renderCartDrawer();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    updateCartBadge(false);
    renderCartDrawer();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return removeFromCart(id);
    saveCart(cart);
    renderCartDrawer();
}

function getSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getTotalItems() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartBadge(bump = false) {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.textContent = getTotalItems();
    if (bump) {
        badge.classList.remove('bump');
        void badge.offsetWidth; // reflow
        badge.classList.add('bump');
    }
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function toggleCart() {
    const drawer  = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const isOpen  = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
    if (!isOpen) renderCartDrawer();
}

function renderCartDrawer() {
    const container = document.getElementById('cart-items');
    const footer    = document.getElementById('cart-footer');
    if (!container) return;

    if (!cart.length) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="ce-icon">🛒</div>
                <p>Your cart is empty.<br>Add some delicious local products!</p>
            </div>`;
        if (footer) footer.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img class="ci-img" src="${item.image}" alt="${item.name}"
                 onerror="this.src='${CATEGORY_IMAGES.default}'">
            <div class="ci-info">
                <div class="ci-name">${item.name}</div>
                <div class="ci-seller">${item.sellerName}</div>
                <div class="ci-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
            </div>
            <div class="ci-controls">
                <button class="ci-qty-btn" onclick="updateQty('${item.id}',-1)">−</button>
                <span class="ci-qty">${item.qty}</span>
                <button class="ci-qty-btn" onclick="updateQty('${item.id}',1)">+</button>
                <button class="ci-remove" title="Remove" onclick="removeFromCart('${item.id}')">🗑️</button>
            </div>
        </div>`).join('');

    const sub = getSubtotal();
    document.getElementById('cart-subtotal').textContent = `₹${sub}`;
    document.getElementById('cart-total').textContent    = `₹${sub + DELIVERY_FEE}`;
    if (footer) footer.style.display = 'block';
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
window.openPaymentModal = function() {
    if (!cart.length) return;
    // Close cart drawer first
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');

    document.getElementById('payment-modal').classList.add('show');
    goPayStep(1);
    updatePayAmountDisplay();
    initPayMethodSwitching();
};

window.closePaymentModal = function() {
    document.getElementById('payment-modal').classList.remove('show');
    document.body.style.overflow = '';
};

window.goPayStep = function(step) {
    [1,2,3].forEach(n => {
        document.getElementById(`pay-step-${n}`)?.classList.toggle('active', n === step);
        const dot = document.getElementById(`pstep-${n}`);
        if (dot) {
            dot.classList.toggle('active', n === step);
            dot.classList.toggle('done',   n < step);
        }
    });

    if (step === 1) {
        // validate nothing yet
    } else if (step === 2) {
        if (!validateDelivery()) return;
    }
};

function validateDelivery() {
    const name    = document.getElementById('buyer-name')?.value.trim();
    const phone   = document.getElementById('buyer-phone')?.value.trim();
    const address = document.getElementById('buyer-address')?.value.trim();
    const pincode = document.getElementById('buyer-pincode')?.value.trim();

    if (!name)           { alert('Please enter your full name.'); return false; }
    if (!/^\d{10}$/.test(phone)) { alert('Please enter a valid 10-digit mobile number.'); return false; }
    if (!address)        { alert('Please enter your delivery address.'); return false; }
    if (!/^\d{6}$/.test(pincode)) { alert('Please enter a valid 6-digit pincode.'); return false; }
    return true;
}

function updatePayAmountDisplay() {
    const sub = getSubtotal();
    const el  = document.getElementById('pay-amount-display');
    if (el) el.textContent = `Subtotal ₹${sub} + Delivery ₹${DELIVERY_FEE} = Total ₹${sub + DELIVERY_FEE}`;
}

function initPayMethodSwitching() {
    const radios = document.querySelectorAll('input[name="pay-method"]');
    const panels = { upi: 'sub-upi', card: 'sub-card', netbanking: 'sub-netbanking', cod: 'sub-cod' };

    function switchPanel(val) {
        Object.entries(panels).forEach(([k, id]) => {
            const el = document.getElementById(id);
            if (el) el.style.display = k === val ? 'block' : 'none';
        });
    }

    radios.forEach(r => r.addEventListener('change', () => switchPanel(r.value)));
    switchPanel('upi'); // default
}

window.processPayment = async function() {
    const method = document.querySelector('input[name="pay-method"]:checked')?.value || 'upi';
    const btn    = document.getElementById('pay-now-btn');

    // Simulate processing
    btn.disabled    = true;
    btn.textContent = '⏳ Processing…';

    const sub   = getSubtotal();
    const total = sub + DELIVERY_FEE;

    const payload = {
        buyerName:    document.getElementById('buyer-name')?.value.trim(),
        buyerPhone:   document.getElementById('buyer-phone')?.value.trim(),
        buyerAddress: document.getElementById('buyer-address')?.value.trim(),
        buyerPincode: document.getElementById('buyer-pincode')?.value.trim(),
        items: cart.map(i => ({
            productId: i.id, name: i.name, price: i.price,
            qty: i.qty, sellerName: i.sellerName, image: i.image
        })),
        subtotal:      sub,
        deliveryFee:   DELIVERY_FEE,
        grandTotal:    total,
        paymentMethod: method
    };

    let orderId = 'LN-' + Math.floor(100000 + Math.random() * 900000); // client fallback

    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            orderId = data.orderId || orderId;
        }
    } catch (_) { /* use client-generated orderId */ }

    // Small simulated delay for UX
    await new Promise(r => setTimeout(r, 1200));

    btn.disabled    = false;
    btn.textContent = 'Pay Now 🔒';

    // Show success
    document.getElementById('placed-order-id').textContent = orderId;
    goPayStep(3);

    // Clear cart after success
    cart = [];
    saveCart(cart);
    updateCartBadge(false);
    renderCartDrawer();
};

window.finishOrder = function() {
    closePaymentModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ─── Product Grid ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const productGrid   = document.getElementById('product-grid');
    const searchBtn     = document.getElementById('search-btn');
    const pincodeInput  = document.getElementById('pincode-input');
    const categoryCards = document.querySelectorAll('.category-card');
    let currentCategory = null;

    // Init
    updateCartBadge(false);
    showSkeletons();
    fetchProducts();

    function showSkeletons(count = 6) {
        productGrid.innerHTML = Array(count).fill(`
            <div class="skeleton-card">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton skeleton-text tall"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>`).join('');
    }

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
            if (res.ok) products = await res.json();
            else throw new Error();
        } catch { products = getMockProducts(pincode, category); }

        setTimeout(() => renderProducts(products), 300);
    }

    function getImage(p) {
        if (p.imageUrl && p.imageUrl.startsWith('http') && !p.imageUrl.includes('placeholder')) return p.imageUrl;
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
            const pid = p._id || ('mock-' + Math.random().toString(36).slice(2));
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
                        <div style="display:flex;gap:0.4rem;align-items:center;">
                            <button class="atc-btn" id="atc-${pid}"
                                onclick="handleAddToCart(this,'${pid}','${p.name}',${p.price},'${img}','${p.sellerName}')">
                                🛒 Add
                            </button>
                            <button class="buy-btn"
                                onclick="openContactModal('${p._id}','${p.sellerName}','${p.sellerPhone || '9876543210'}')">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>`;

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
            if (!isActive) { card.classList.add('active-category'); currentCategory = card.dataset.category; }
            else { currentCategory = null; }
            fetchProducts(pincodeInput.value.trim(), currentCategory);
        });
    });

    function getMockProducts(pin, cat) {
        const dummy = [
            { _id:"m1", name:"Homemade Mango Pickle",  price:150, category:"Pickles",     location:"400001", sellerName:"Aarti's Kitchen",  sellerPhone:"9876543210" },
            { _id:"m2", name:"Diwali Sweets Combo",    price:450, category:"Sweets",      location:"400001", sellerName:"Mithai House",      sellerPhone:"9123456780" },
            { _id:"m3", name:"Organic Banana Chips",   price:80,  category:"Snacks",      location:"400002", sellerName:"Kerala Bites",      sellerPhone:"9876500001" },
            { _id:"m4", name:"Hand-painted Diya Set",  price:200, category:"Handicrafts", location:"400001", sellerName:"Crafts by Neha",    sellerPhone:"9876500002" },
            { _id:"m5", name:"Spicy Murukku",          price:120, category:"Snacks",      location:"400003", sellerName:"South Flavors",     sellerPhone:"9876500003" },
            { _id:"m6", name:"Amla Pickle",            price:130, category:"Pickles",     location:"400002", sellerName:"Village Foods",     sellerPhone:"9876500004" }
        ];
        return dummy.filter(p => (pin ? p.location === pin : true) && (cat ? p.category === cat : true));
    }
});

// ─── Add to Cart handler (global, called from inline onclick) ─────────────────
window.handleAddToCart = function(btn, id, name, price, image, sellerName) {
    addToCart({ id, name, price, image, sellerName });
    btn.classList.add('added');
    btn.textContent = '✓ Added';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '🛒 Add';
    }, 1500);
};
