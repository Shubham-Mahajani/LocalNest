// Called from product card onclick — increments contact count then shows modal
window.openContactModal = function(id, sellerName, sellerPhone, sellerId, productName, serviceMode) {
    document.getElementById('modal-seller-name').innerText  = sellerName;
    document.getElementById('modal-seller-phone').innerText = '+91 ' + sellerPhone;
    document.getElementById('modal-whatsapp').href =
        'https://wa.me/91' + sellerPhone +
        '?text=' + encodeURIComponent('Hi! I saw your product on LocalNest and I am interested. 🙏');

    // Increment contact count silently in background
    if (id && !id.startsWith('undefined')) {
        fetch(`/api/products/${id}/contact`, { method: 'PATCH' }).catch(() => {});
    }

    if (sellerId && productName) {
        const localInquiryId = 'INQ-' + Date.now();
        const inquiry = {
            inquiryId: localInquiryId,
            clientInquiryId: localInquiryId,
            productId: id,
            productName,
            sellerId,
            sellerName,
            sellerPhone,
            serviceMode: serviceMode || 'whatsapp',
            status: 'new',
            createdAt: new Date().toISOString()
        };
        try {
            const local = JSON.parse(localStorage.getItem('ln_inquiries_local') || '[]');
            local.unshift(inquiry);
            localStorage.setItem('ln_inquiries_local', JSON.stringify(local.slice(0, 50)));
        } catch (_) { /* local fallback only */ }

        fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: id,
                productName,
                sellerId,
                sellerName,
                sellerPhone,
                serviceMode: serviceMode || 'whatsapp'
            })
        }).then(async (res) => {
            if (!res.ok) return;
            const data = await res.json().catch(() => ({}));
            if (!data.inquiryId || data.inquiryId === localInquiryId) return;

            try {
                const local = JSON.parse(localStorage.getItem('ln_inquiries_local') || '[]');
                const idx = local.findIndex(item => item.inquiryId === localInquiryId);
                if (idx !== -1) {
                    local[idx] = {
                        ...local[idx],
                        inquiryId: data.inquiryId,
                        status: data.status || local[idx].status || 'new'
                    };
                    localStorage.setItem('ln_inquiries_local', JSON.stringify(local.slice(0, 50)));
                }
            } catch (_) { /* best effort sync */ }
        }).catch(() => {}).finally(() => {
            window.refreshBuyerRequests?.();
        });

        window.refreshBuyerRequests?.();
    }

    document.getElementById('contact-modal').classList.add('show');
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contact-modal');
    document.getElementById('modal-close')?.addEventListener('click', () => modal.classList.remove('show'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
});
