let cart = [];
let total = 0;

function addToCart(product, price) {
    cart.push({ product, price });
    total += price;
    document.getElementById("cart-count").innerText = cart.length;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.product} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById("cart-total").innerText = total.toFixed(2);
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    document.getElementById("cart-count").innerText = cart.length;
    updateCart();
}

function toggleCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some products first!");
    } else {
        document.getElementById("payment-section").style.display = "block";

        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2) // Total amount to pay
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    cart = [];
                    total = 0;
                    document.getElementById("cart-count").innerText = 0;
                    updateCart();
                    document.getElementById("payment-section").style.display = "none";
                });
            },
            onError: function(err) {
                console.error('Error during transaction', err);
            }
        }).render('#paypal-button-container');
    }
}

// Login Functions
function showLoginModal() {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
}

function hideLoginModal() {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Hardcoded credentials (for demo purposes)
    const credentials = {
        user: { username: "user", password: "user123" },
        admin: { username: "admin", password: "admin123" },
        manager: { username: "manager", password: "manager123" }
    };

    if (credentials[role].username === username && credentials[role].password === password) {
        isLoggedIn = true;
        userRole = role;
        alert(`Logged in successfully as ${role}`);
        hideLoginModal();
    } else {
        alert("Invalid credentials!");
    }
}
