// Definir productos con su cantidad disponible
const products = [
    { name: 'Chocolate Amargo', price: 50, stock: 5, image: 'https://i0.wp.com/blogedenred.com.uy/wp-content/uploads/2021/07/chocolate-amargo.jpg?fit=1000%2C560&ssl=1' },
    { name: 'Chocolate con Leche', price: 40, stock: 3, image: 'https://chocolatestorras.com/wp-content/uploads/2021/04/Hacer-tableta-de-chocolate-con-leche-en-casa.jpg' },
    { name: 'Chocolate Blanco', price: 45, stock: 4, image: 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/PRNBVO2NF5NTZPSQTK6HMDLVRQ.jpg' },
    { name: 'Chocolate con Café', price: 60, stock: 2, image: 'https://www.purochocolate.life/wp-content/uploads/2022/04/Chocolate-con-cafe-scaled.jpg' }
];

let cart = [];
let purchaseHistory = []; // Para almacenar el historial de compras
let total = 0;

// Función para agregar productos al carrito
function addToCart(index) {
    if (products[index].stock > 0) {
        cart.push({
            product: products[index].name,
            price: products[index].price
        });
        total += products[index].price;
        products[index].stock--;  // Reducir stock

        displayCart();
        updateProductButtons(); // Actualizar botones si el stock llega a 0
    } else {
        alert('Este producto ya no está disponible.');
    }
}

// Función para mostrar el carrito
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const purchaseButton = document.getElementById('purchase-button');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
        purchaseButton.style.display = 'none'; // Ocultar botón si el carrito está vacío
    } else {
        cartItemsDiv.innerHTML = '';
        cart.forEach((item) => {
            cartItemsDiv.innerHTML += `<p>${item.product} - $${item.price}</p>`;
        });
        purchaseButton.style.display = 'block'; // Mostrar botón si hay productos en el carrito
    }

    cartTotalSpan.innerText = total;
}

// Función para actualizar botones de producto si el stock es 0
function updateProductButtons() {
    products.forEach((product, index) => {
        const button = document.getElementById(`add-to-cart-${index}`);
        if (product.stock <= 0) {
            button.disabled = true;
            button.innerText = 'Agotado';
            button.style.backgroundColor = 'grey';
        }
    });
}

// Función para mostrar los productos en la página
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    products.forEach((product, index) => {
        productContainer.innerHTML += `
            <div class="image-item">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name} - $${product.price}</p>
                <p>Stock disponible: <span id="stock-${index}">${product.stock}</span></p>
                <button id="add-to-cart-${index}" onclick="addToCart(${index})">Agregar al Carrito</button>
            </div>
        `;
    });

    updateProductButtons();
}

// Función para mostrar el carrito
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'none' || cartDropdown.style.display === '' ? 'block' : 'none';
}

// Función para mostrar el historial
function toggleHistory() {
    const historyDropdown = document.getElementById('history-dropdown');
    historyDropdown.style.display = historyDropdown.style.display === 'none' || historyDropdown.style.display === '' ? 'block' : 'none';
}

// Función para mostrar el historial de compras
function displayPurchaseHistory() {
    const historyDiv = document.getElementById('purchase-history');
    if (purchaseHistory.length === 0) {
        historyDiv.innerHTML = '<p>No hay historial de compras.</p>';
    } else {
        historyDiv.innerHTML = '';
        purchaseHistory.forEach((item) => {
            historyDiv.innerHTML += `<p>${item.product} - $${item.price}</p>`;
        });
    }
}

// Función para completar la compra
function completePurchase() {
    if (cart.length === 0) {
        alert('No hay productos en el carrito para comprar.');
        return;
    }

    // Agregar al historial de compras
    purchaseHistory = [...cart]; // Guardar el contenido del carrito en el historial

    // Mensaje de confirmación de compra
    alert(`Compra realizada con éxito. Total: $${total}`);

    // Reiniciar carrito
    cart = [];
    total = 0;
    displayCart();
    displayPurchaseHistory(); // Actualizar historial de compras
}

// Inicializar la página
window.onload = function() {
    displayProducts();
    displayCart();
    displayPurchaseHistory();
};
