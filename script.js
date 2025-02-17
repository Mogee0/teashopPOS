// Sample Products from the Image
const products = [
    { item: "Dum Tea", price: 12 },
    { item: "Ginger Tea", price: 15 },
    { item: "Masala Tea", price: 15 },
    { item: "Black Tea", price: 15 }
];

let cart = [];

// Load Products on Page Load
window.onload = function () {
    let productList = document.getElementById("product-list");
    products.forEach(product => {
        let li = document.createElement("li");
        li.textContent = `${product.item} - ₹${product.price}`;
        li.onclick = () => addToCart(product);
        productList.appendChild(li);
    });

    // Request Notification Permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
};

// Add Item to Cart
function addToCart(product) {
    cart.push(product);
    updateCart();
    sendOrderNotification(product);
}

// Update Cart & Total Price
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let total = 0;
    cartList.innerHTML = "";
    cart.forEach(product => {
        total += product.price;
        cartList.innerHTML += `<li>${product.item} - ₹${product.price}</li>`;
    });
    document.getElementById("total").innerText = "Total: ₹" + total;
    document.getElementById("cart").style.display = "block";
}

// Send Notification on Order
function sendOrderNotification(product) {
    if (Notification.permission === "granted") {
        new Notification("New Order Received!", {
            body: `${product.item} - ₹${product.price}`,
            icon: "your-icon.png"
        });
    }
}

// Show Payment Section
function proceedToPayment() {
    document.getElementById("payment-section").style.display = "block";
}

// Generate UPI Payment Link
function payWithUPI() {
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    if (total === 0) {
        alert("Your cart is empty! Please add items before proceeding.");
        return;
    }

    let upiID = "vmtamilnadu1@okicici";  // Replace with your actual UPI ID
    let upiLink = `upi://pay?pa=${upiID}&pn=Juicy%20Land&mc=&tid=&tr=&tn=Chai%20Order%20Payment&am=${total}&cu=INR`;

    window.location.href = upiLink;
}

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Send login email to Google Sheets
    fetch("https://docs.google.com/spreadsheets/d/1Joiu_Wk9g17IpUDb5q9j6Tz-qXaDDLu612Bq5OVnjpg/edit?usp=sharing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    }).then(response => response.text())
    .then(data => {
        alert("Welcome " + email + "! Your login is recorded.");
    }).catch(error => console.error('Error:', error));
}
