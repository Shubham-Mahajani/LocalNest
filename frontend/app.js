// ─── Category → Unsplash image map ───────────────────────────────────────────
const CATEGORY_IMAGES = {
    "Pickles":     "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=600&auto=format&fit=crop&q=80",
    "Sweets":      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    "Snacks":      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    "Handicrafts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    "default":     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
};

// ─── Product Name Keyword → Specific Image map ────────────────────────────────
// Each entry: [keyword(s)] → image URL. Keywords are matched against product name (case-insensitive).
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
    // 1. Seller provided a valid image URL
    if (p.imageUrl && p.imageUrl.startsWith('http') && !p.imageUrl.includes('placeholder')) {
        return p.imageUrl;
    }
    // 2. Match product name against known keywords
    const nameLower = (p.name || '').toLowerCase();
    for (const entry of PRODUCT_NAME_IMAGES) {
        if (entry.keywords.some(kw => nameLower.includes(kw))) {
            return entry.url;
        }
    }
    // 3. Fall back to category image
    return CATEGORY_IMAGES[p.category] || CATEGORY_IMAGES.default;
}

const DELIVERY_FEE = 30;

// ─── Cart State (localStorage) ────────────────────────────────────────────────
function loadCart()   { try { return JSON.parse(localStorage.getItem('ln_cart') || '[]'); } catch { return []; } }
function saveCart(c)  { localStorage.setItem('ln_cart', JSON.stringify(c)); }
function loadSavedOrders() {
    try { return JSON.parse(localStorage.getItem('ln_orders_local') || '[]'); }
    catch { return []; }
}
function saveSavedOrders(orders) {
    localStorage.setItem('ln_orders_local', JSON.stringify(orders));
}
function saveLocalOrder(order) {
    const orders = loadSavedOrders().filter(o => o.orderId !== order.orderId);
    orders.unshift(order);
    saveSavedOrders(orders.slice(0, 20));
}
function findLocalOrder(orderId) {
    return loadSavedOrders().find(o => o.orderId === orderId);
}

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

function getServiceModeLabel(mode) {
    const normalized = (mode || 'whatsapp').toLowerCase();
    if (normalized === 'pickup') return '📍 Pickup only';
    if (normalized === 'delivery') return '🚚 Delivery available';
    return '💬 WhatsApp order';
}

function canOrderProduct(mode) {
    return (mode || 'whatsapp').toLowerCase() === 'delivery';
}

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

function formatOrderStatus(status) {
    return (status || 'placed').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function getDeliveryStageIndex(status) {
    const normalized = (status || 'placed').toLowerCase();
    if (normalized === 'placed') return 0;
    if (normalized === 'processing') return 1;
    if (normalized === 'dispatched') return 2;
    if (normalized === 'delivered') return 3;
    return -1;
}

function renderTrackedOrder(order) {
    const result = document.getElementById('track-order-result');
    if (!result) return;

    const items = Array.isArray(order.items) ? order.items : [];
    const stageIndex = getDeliveryStageIndex(order.status);
    const stages = [
        { key: 'placed', label: 'Placed' },
        { key: 'processing', label: 'Processing' },
        { key: 'dispatched', label: 'Dispatched' },
        { key: 'delivered', label: 'Delivered' }
    ];
    result.innerHTML = `
        <div class="track-result-card">
            <div class="track-result-top">
                <div>
                    <div class="track-order-id">${order.orderId || 'Unknown Order'}</div>
                    <div class="track-order-sub">Delivery status for ${order.buyerName || 'Buyer'}</div>
                </div>
                <div class="track-status-pill">${formatOrderStatus(order.status)}</div>
            </div>

            <div class="track-status-panel">
                <div class="track-status-panel-head">
                    <div>
                        <span class="track-status-kicker">Current Delivery Status</span>
                        <strong>${formatOrderStatus(order.status)}</strong>
                    </div>
                    <div class="track-status-detail">${formatOrderStatus(order.paymentStatus)} payment</div>
                </div>
                <div class="track-progress" aria-label="Delivery progress">
                    ${stages.map((stage, index) => `
                        <div class="track-progress-step ${index <= stageIndex ? 'active' : ''}">
                            <span class="track-progress-dot">${index + 1}</span>
                            <span class="track-progress-label">${stage.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="track-meta-grid">
                <div class="track-meta">
                    <span>Status</span>
                    <strong>${formatOrderStatus(order.status)}</strong>
                </div>
                <div class="track-meta">
                    <span>Payment</span>
                    <strong>${formatOrderStatus(order.paymentStatus)}</strong>
                </div>
                <div class="track-meta">
                    <span>Method</span>
                    <strong>${(order.paymentMethod || 'upi').toUpperCase()}</strong>
                </div>
                <div class="track-meta">
                    <span>Total</span>
                    <strong>₹${order.grandTotal ?? 0}</strong>
                </div>
            </div>

            <div class="track-items">
                <div class="track-items-title">Items</div>
                ${items.map(item => `
                    <div class="track-item-row">
                        <div>
                            <div class="track-item-name">${item.name}</div>
                            <div class="track-item-seller">${item.sellerName || 'Local seller'}</div>
                        </div>
                        <div class="track-item-qty">x${item.qty}</div>
                    </div>
                `).join('')}
            </div>

            <div class="track-address">
                <div class="track-items-title">Delivery To</div>
                <p>${order.buyerAddress || 'Address not available'} · Pincode ${order.buyerPincode || 'N/A'}</p>
            </div>
        </div>
    `;
}

function renderTrackError(message) {
    const result = document.getElementById('track-order-result');
    if (!result) return;
    result.innerHTML = `
        <div class="track-empty track-error">
            <div class="track-empty-icon">⚠️</div>
            <p>${message}</p>
        </div>
    `;
}

function normalizeTrackedOrder(order) {
    return {
        ...order,
        status: order.status || 'placed',
        paymentStatus: order.paymentStatus || 'pending',
        paymentMethod: order.paymentMethod || 'upi',
        items: Array.isArray(order.items) ? order.items : [],
    };
}

function loadSavedInquiries() {
    try { return JSON.parse(localStorage.getItem('ln_inquiries_local') || '[]'); }
    catch { return []; }
}

function saveSavedInquiries(inquiries) {
    localStorage.setItem('ln_inquiries_local', JSON.stringify(inquiries.slice(0, 50)));
}

function saveLocalInquiry(inquiry) {
    const incomingIds = new Set([inquiry.inquiryId, inquiry.clientInquiryId].filter(Boolean));
    const inquiries = loadSavedInquiries().filter(i => {
        const localIds = [i.inquiryId, i.clientInquiryId].filter(Boolean);
        return !localIds.some(id => incomingIds.has(id));
    });
    inquiries.unshift(inquiry);
    saveSavedInquiries(inquiries);
}

function normalizeTrackedInquiry(inquiry) {
    return {
        ...inquiry,
        inquiryId: inquiry.inquiryId || inquiry.clientInquiryId || 'INQ-UNKNOWN',
        status: inquiry.status || 'new',
        serviceMode: inquiry.serviceMode || 'whatsapp',
        createdAt: inquiry.createdAt || new Date().toISOString(),
    };
}

function formatInquiryStatus(status) {
    return (status || 'new').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function getInquiryStatusClass(status) {
    const normalized = (status || 'new').toLowerCase();
    if (normalized === 'contacted') return 'status-contacted';
    if (normalized === 'closed') return 'status-closed';
    return 'status-new';
}

function formatInquiryTime(createdAt) {
    if (!createdAt) return 'Recently';
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return 'Recently';
    return date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

async function syncInquiryWithServer(inquiry) {
    if (!inquiry?.inquiryId) return normalizeTrackedInquiry(inquiry || {});

    try {
        const res = await fetch(`/api/inquiries/${encodeURIComponent(inquiry.inquiryId)}`);
        if (!res.ok) return normalizeTrackedInquiry(inquiry);
        const data = await res.json().catch(() => null);
        if (!data) return normalizeTrackedInquiry(inquiry);

        const merged = normalizeTrackedInquiry({
            ...inquiry,
            ...data,
            inquiryId: data.inquiryId || inquiry.inquiryId,
            status: data.status || inquiry.status || 'new',
        });
        saveLocalInquiry(merged);
        return merged;
    } catch {
        return normalizeTrackedInquiry(inquiry);
    }
}

function renderInquiryCard(inquiry) {
    const phoneDigits = String(inquiry.sellerPhone || '').replace(/\D/g, '');
    const whatsappLink = phoneDigits ? `https://wa.me/91${phoneDigits}` : '#';
    return `
        <div class="request-card">
            <div class="request-top">
                <div>
                    <div class="request-title">${inquiry.productName || 'Local product'}</div>
                    <div class="request-seller">Seller: ${inquiry.sellerName || 'Local seller'}</div>
                </div>
                <div class="request-status-pill ${getInquiryStatusClass(inquiry.status)}">${formatInquiryStatus(inquiry.status)}</div>
            </div>

            <div class="request-meta-grid">
                <div class="request-meta">
                    <span>Inquiry ID</span>
                    <strong>${inquiry.inquiryId || 'Pending'}</strong>
                </div>
                <div class="request-meta">
                    <span>Service Mode</span>
                    <strong>${getServiceModeLabel(inquiry.serviceMode)}</strong>
                </div>
                <div class="request-meta">
                    <span>Created</span>
                    <strong>${formatInquiryTime(inquiry.createdAt)}</strong>
                </div>
                <div class="request-meta">
                    <span>Status</span>
                    <strong>${formatInquiryStatus(inquiry.status)}</strong>
                </div>
            </div>

            <div class="request-actions">
                <a class="request-chat-btn ${phoneDigits ? '' : 'disabled'}"
                   href="${whatsappLink}"
                   target="_blank"
                   rel="noopener noreferrer"
                   ${phoneDigits ? '' : 'aria-disabled="true" tabindex="-1"'}>Open WhatsApp</a>
                <button class="request-copy-btn" type="button" data-request-id="${inquiry.inquiryId || ''}">Copy ID</button>
            </div>
        </div>
    `;
}

async function renderBuyerRequests() {
    const result = document.getElementById('buyer-requests-result');
    if (!result) return;

    const inquiries = loadSavedInquiries().map(normalizeTrackedInquiry);
    if (!inquiries.length) {
        result.innerHTML = `
            <div class="track-empty">
                <div class="track-empty-icon">💬</div>
                <p>Your recent seller requests will show up here.</p>
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="track-empty requests-loading">
            <div class="track-empty-icon">⏳</div>
            <p>Refreshing your requests...</p>
        </div>
    `;

    const synced = await Promise.all(inquiries.map(syncInquiryWithServer));
    const deduped = Array.from(new Map(
        synced
            .map(item => [item.inquiryId || item.clientInquiryId || `${item.productId || 'product'}-${item.createdAt || Date.now()}`, item])
    ).values()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    saveSavedInquiries(deduped);

    if (!deduped.length) {
        result.innerHTML = `
            <div class="track-empty">
                <div class="track-empty-icon">💬</div>
                <p>Your recent seller requests will show up here.</p>
            </div>
        `;
        return;
    }

    result.innerHTML = deduped.map(renderInquiryCard).join('');
    result.querySelectorAll('.request-copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const inquiryId = btn.dataset.requestId;
            if (!inquiryId) return;
            try {
                await navigator.clipboard.writeText(inquiryId);
                const original = btn.textContent;
                btn.textContent = 'Copied';
                setTimeout(() => { btn.textContent = original; }, 1200);
            } catch {
                alert(`Inquiry ID: ${inquiryId}`);
            }
        });
    });
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
            qty: i.qty, sellerName: i.sellerName, sellerId: i.sellerId || '', image: i.image
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
            saveLocalOrder(normalizeTrackedOrder({
                ...payload,
                orderId,
                paymentStatus: data.paymentStatus || (method === 'cod' ? 'pending' : 'paid'),
                status: 'placed',
                createdAt: new Date().toISOString()
            }));
        }
    } catch (_) { /* use client-generated orderId */ }

    if (!loadSavedOrders().some(o => o.orderId === orderId)) {
        saveLocalOrder(normalizeTrackedOrder({
            ...payload,
            orderId,
            paymentStatus: method === 'cod' ? 'pending' : 'paid',
            status: 'placed',
            createdAt: new Date().toISOString()
        }));
    }

    // Small simulated delay for UX
    await new Promise(r => setTimeout(r, 1200));

    btn.disabled    = false;
    btn.textContent = 'Pay Now 🔒';

    // Show success
    document.getElementById('placed-order-id').textContent = orderId;
    goPayStep(3);

    localStorage.setItem('ln_last_order_id', orderId);
    const trackerInput = document.getElementById('order-track-input');
    if (trackerInput && !trackerInput.value.trim()) {
        trackerInput.value = orderId;
    }

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
    const trackInput    = document.getElementById('order-track-input');
    const trackBtn      = document.getElementById('track-order-btn');
    const savedOrderId  = localStorage.getItem('ln_last_order_id');
    let currentCategory = null;

    // Init
    updateCartBadge(false);
    showSkeletons();
    fetchProducts();

    if (trackInput && savedOrderId && !trackInput.value.trim()) {
        trackInput.value = savedOrderId;
    }

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

    function getImage(p) { return getProductImage(p); }

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
            const orderable = canOrderProduct(p.serviceMode);
            card.innerHTML = `
                <div class="product-img-wrap">
                    <img src="${img}" class="product-img" alt="${p.name}" loading="lazy"
                         onerror="this.src='${CATEGORY_IMAGES.default}'">
                    <span class="product-badge">${p.category}</span>
                    <span class="product-service-badge">${getServiceModeLabel(p.serviceMode)}</span>
                    <button class="product-fav" title="Save">🤍</button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-seller">
                        <span class="seller-dot"></span>
                        ${p.sellerName}
                    </div>
                    <div class="product-service-line">${getServiceModeLabel(p.serviceMode)}</div>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">₹${p.price}</div>
                            <div class="product-location">📍 Pincode ${p.location}</div>
                        </div>
                        <div style="display:flex;gap:0.4rem;align-items:center;">
                            ${orderable ? `
                                <button class="atc-btn" id="atc-${pid}"
                                    onclick="handleAddToCart(this,'${pid}','${p.name}',${p.price},'${img}','${p.sellerName}','${p.sellerId || ''}','${p.serviceMode || 'whatsapp'}')">
                                    🛒 Add
                                </button>
                            ` : ''}
                            <button class="buy-btn"
                                onclick="openContactModal('${p._id}','${p.sellerName}','${p.sellerPhone || '9876543210'}','${p.sellerId || ''}','${p.name}','${p.serviceMode || 'whatsapp'}')">
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
            { _id:"m1", name:"Homemade Mango Pickle",  price:150, category:"Pickles",     location:"400001", sellerName:"Aarti's Kitchen",  sellerPhone:"9876543210", sellerId:"NEST-1111", serviceMode:"pickup" },
            { _id:"m2", name:"Diwali Sweets Combo",    price:450, category:"Sweets",      location:"400001", sellerName:"Mithai House",      sellerPhone:"9123456780", sellerId:"NEST-2222", serviceMode:"delivery" },
            { _id:"m3", name:"Organic Banana Chips",   price:80,  category:"Snacks",      location:"400002", sellerName:"Kerala Bites",      sellerPhone:"9876500001", sellerId:"NEST-3333", serviceMode:"whatsapp" },
            { _id:"m4", name:"Hand-painted Diya Set",  price:200, category:"Handicrafts", location:"400001", sellerName:"Crafts by Neha",    sellerPhone:"9876500002", sellerId:"NEST-4444", serviceMode:"pickup" },
            { _id:"m5", name:"Spicy Murukku",          price:120, category:"Snacks",      location:"400003", sellerName:"South Flavors",     sellerPhone:"9876500003", sellerId:"NEST-5555", serviceMode:"delivery" },
            { _id:"m6", name:"Amla Pickle",            price:130, category:"Pickles",     location:"400002", sellerName:"Village Foods",     sellerPhone:"9876500004", sellerId:"NEST-6666", serviceMode:"whatsapp" }
        ];
        return dummy.filter(p => (pin ? p.location === pin : true) && (cat ? p.category === cat : true));
    }

    async function trackOrder() {
        if (!trackInput) return;
        const orderId = trackInput.value.trim().toUpperCase();
        if (!/^LN-\d{6}$/.test(orderId)) {
            renderTrackError('Please enter a valid order ID in the format LN-123456.');
            return;
        }

        const result = document.getElementById('track-order-result');
        if (result) {
            result.innerHTML = `
                <div class="track-empty">
                    <div class="track-empty-icon">⏳</div>
                    <p>Looking up order details...</p>
                </div>
            `;
        }

        try {
            const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const localOrder = findLocalOrder(orderId);
                if (localOrder) {
                    renderTrackedOrder(normalizeTrackedOrder(localOrder));
                    return;
                }
                renderTrackError(data.message || 'Order not found. Check the order ID and try again.');
                return;
            }
            const order = normalizeTrackedOrder(await res.json());
            saveLocalOrder(order);
            renderTrackedOrder(order);
        } catch (_) {
            const localOrder = findLocalOrder(orderId);
            if (localOrder) {
                renderTrackedOrder(normalizeTrackedOrder(localOrder));
                return;
            }
            renderTrackError('Could not reach the server right now. Please try again in a moment.');
        }
    }

    trackBtn?.addEventListener('click', trackOrder);
    trackInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') trackOrder();
    });

    const refreshRequestsBtn = document.getElementById('refresh-requests-btn');
    refreshRequestsBtn?.addEventListener('click', renderBuyerRequests);
    renderBuyerRequests();

    window.refreshBuyerRequests = renderBuyerRequests;
});

// ─── Add to Cart handler (global, called from inline onclick) ─────────────────
window.handleAddToCart = function(btn, id, name, price, image, sellerName, sellerId, serviceMode) {
    addToCart({ id, name, price, image, sellerName, sellerId, serviceMode });
    btn.classList.add('added');
    btn.textContent = '✓ Added';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '🛒 Add';
    }, 1500);
};
