// script.js

// Add to Cart buttons
const cartButtons = document.querySelectorAll('.cart-btn');
const buyButtons = document.querySelectorAll('.buy-btn');

// Function to get existing cart data
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to save cart
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Handle Add to Cart
cartButtons.forEach(button => {
    button.addEventListener('click', e => {
        const card = e.target.closest('div[class^="cart"]');
        const title = card.querySelector('h2').innerText;
        const price = card.querySelector('p:nth-of-type(2)').innerText;
        const imgSrc = card.querySelector('img').src;

        let cart = getCart();

        // Check if item already exists
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, imgSrc, quantity: 1 });
        }

        saveCart(cart);
        alert(`${title} added to cart!`);
    });
});

// Handle Buy Now
buyButtons.forEach(button => {
    button.addEventListener('click', e => {
        const card = e.target.closest('div[class^="cart"]');
        const title = card.querySelector('h2').innerText;
        const price = card.querySelector('p:nth-of-type(2)').innerText;

        // Buyer Details Page ला माहिती पाठवण्यासाठी URL Parameters वापरा
        const url = `/HTML/buy.html?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;

        // Redirect करा Buyer Details Page वर
        window.location.href = url;
    });
});

