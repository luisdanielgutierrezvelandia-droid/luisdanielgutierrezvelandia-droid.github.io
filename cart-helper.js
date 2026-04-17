// NEXCORE Cart Helper — incluir en cada página de productos
const CART_KEY = 'nexcore_cart';

function ncGetCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}

function ncSaveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function ncAddToCart(item) {
    // item = { name, category, price (número), img }
    const cart = ncGetCart();
    // Evitar duplicados exactos por nombre
    const exists = cart.find(c => c.name === item.name);
    if (exists) {
        showToast('Ya está en el carrito: ' + item.name, 'warn');
        return;
    }
    cart.push(item);
    ncSaveCart(cart);
    showToast('✓ Agregado: ' + item.name);
}

function showToast(msg, type) {
    let toast = document.getElementById('nx-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'nx-toast';
        toast.style.cssText = `
            position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
            background:#0c1120; border:1px solid #00e5ff; color:#e8edf5;
            font-family:'DM Sans',sans-serif; font-size:0.85rem;
            padding:0.8rem 1.4rem; border-radius:4px;
            box-shadow: 0 0 20px rgba(0,229,255,0.3);
            transition: opacity 0.4s, transform 0.4s;
            opacity:0; transform:translateY(10px);
        `;
        document.body.appendChild(toast);
    }
    if (type === 'warn') {
        toast.style.borderColor = '#ff4d6d';
        toast.style.boxShadow = '0 0 20px rgba(255,77,109,0.3)';
    } else {
        toast.style.borderColor = '#00e5ff';
        toast.style.boxShadow = '0 0 20px rgba(0,229,255,0.3)';
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 2500);
}
