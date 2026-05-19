// Called from product card onclick — increments contact count then shows modal
window.openContactModal = function(id, sellerName, sellerPhone) {
    document.getElementById('modal-seller-name').innerText  = sellerName;
    document.getElementById('modal-seller-phone').innerText = '+91 ' + sellerPhone;
    document.getElementById('modal-whatsapp').href =
        'https://wa.me/91' + sellerPhone +
        '?text=' + encodeURIComponent('Hi! I saw your product on LocalNest and I am interested. 🙏');

    // Increment contact count silently in background
    if (id && !id.startsWith('undefined')) {
        fetch(`/api/products/${id}/contact`, { method: 'PATCH' }).catch(() => {});
    }

    document.getElementById('contact-modal').classList.add('show');
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contact-modal');
    document.getElementById('modal-close')?.addEventListener('click', () => modal.classList.remove('show'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
});
