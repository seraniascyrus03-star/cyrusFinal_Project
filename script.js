// 1. Product Data (Technical Constraint: JS Array)
const products = [
    { id: 1, name: "Oversized Hoodie", price: 1200, img: "🧥" },
    { id: 2, name: "Graphic Tee", price: 650, img: "👕" },
    { id: 3, name: "Cargo Pants", price: 1500, img: "👖" },
    { id: 4, name: "Denim Jacket", price: 2200, img: "🧥" },
    { id: 5, name: "Canvas Sneakers", price: 1800, img: "👟" },
    { id: 6, name: "Bucket Hat", price: 450, img: "👒" }
];

let cart = [];

const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalLabel = document.getElementById('cart-total');
const cartCountLabel = document.getElementById('cart-count');
const emptyMsg = document.getElementById('empty-msg');

// 2. Render Products
function displayProducts() {
    productList.innerHTML = products.map(product => {
        const isAlreadyInCart = cart.find(item => item.id === product.id);
        return `
            <div class="product-card">
                <div>${product.img}</div>
                <h3>${product.name}</h3>
                <p>₱${product.price}</p>
                <button 
                    class="btn-add" 
                    onclick="addToCart(${product.id})"
                    ${isAlreadyInCart ? 'disabled' : ''}>
                    ${isAlreadyInCart ? 'Already in Cart' : 'Add to Cart'}
                </button>
            </div>
        `;
    }).join('');
}

// 3. Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
    updateUI();
}

// 4. Update Cart Quantities
function changeQuantity(productId, delta) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            updateUI();
        }
    }
}

// 5. Remove Item
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateUI();
}

// 6. Update UI (Visual Indicators & Totals)
function updateUI() {
    // Show/Hide Empty Message
    emptyMsg.style.display = cart.length === 0 ? 'block' : 'none';

    // Update Cart List
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ₱${item.price} x ${item.quantity} = ₱${item.price * item.quantity}
            </div>
            <div>
                <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)">-</button>
                <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        </div>
    `).join('');

    // Update Totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartTotalLabel.innerText = total.toLocaleString();
    cartCountLabel.innerText = count;

    // Refresh buttons to handle "Already in Cart" state
    displayProducts();
}

// 7. Cart Actions
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateUI();
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length > 0) {
        alert("Checkout Successful! Total: ₱" + cartTotalLabel.innerText);
        cart = [];
        updateUI();
    } else {
        alert("Cart is empty!");
    }
});

// Initial Render
displayProducts();