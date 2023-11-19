let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');
let openCart = document.querySelector('#open-cart');
let cartItems = document.querySelector('.cart-content');

// Open cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Function to handle cart functionality
function ready() {
    // Remove Items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCartButtons = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    // Update the total when the page loads
    updateTotal();
}

// Function to clear the cart
function clearCart() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    while (cartBoxes[0]) {
        cartBoxes[0].parentNode.removeChild(cartBoxes[0]);
    }
    updateTotal();
}

// Function to remove a cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal(); // Update the total after removing an item
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Function to add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement; 
    var title = shopProduct.querySelector('.product-title').innerText;
    var price = shopProduct.querySelector('.price').innerText;
    var productImg = shopProduct.querySelector('img').src;
    
    // Prompt for size
    var sizeInput = prompt("Enter the size between 4 and 12:");
    if (sizeInput >= 4 && sizeInput <= 12) {
        addProductToCart(title, price, productImg, sizeInput);
    } else {
        alert("Please enter a size between 4 and 12.");
    }
    
    updateTotal();
}

function addProductToCart(title, price, productImg, size) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    
    // Checking for duplicate items
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
    <img src="${productImg}" alt="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <label for="quantity">Quantity:</label>
        <input type="number" value="1" class="cart-quantity" id="quantity">
        <br>
        <label for="size">Size:</label>
        <input type="number" class="cart-size" id="size" placeholder="Enter size" min="4" max="12" value="${size}">
    </div>
    <!--remove cart-->
    <i class='ri-delete-bin-6-line cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    // Event listeners for the new elements
    cartShopBox.querySelector('.cart-remove').addEventListener("click", removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener("change", quantityChanged);
}

function updateTotal() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');

        if (priceElement && quantityElement) {
            var priceText = priceElement.innerText.replace("KSH. ", "");
            var price = parseFloat(priceText);
            var quantity = parseFloat(quantityElement.value);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    }

    var totalElement = document.querySelector('.total-price');
    if (totalElement) {
        totalElement.innerText = 'KSH. ' + total;
    }
}

// Buy button event listener
var buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', function () {
    alert('Thanks! Your order has been received.');
    clearCart();
});