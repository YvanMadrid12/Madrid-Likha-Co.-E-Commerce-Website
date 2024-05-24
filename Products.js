// Function to format price
function formatPrice(price) {
    return 'PHP ' + price.toFixed(2);
}

// Function to update cart details
function updateCartDetails(cart) {
    var cartDetails = document.getElementById('cart-details');
    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>No items in cart</p>';
    } else {
        var totalQuantity = 0;
        var totalPrice = 0;
        var cartHTML = '<ul>';
        cart.forEach(function(item) {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
            cartHTML += '<li>' + item.name + ' - Quantity: ' + item.quantity + ', Price: ' + formatPrice(item.quantity * item.price) + '</li>';
        });
        cartHTML += '</ul>';
        cartHTML += '<p>Total Price: ' + formatPrice(totalPrice) + '</p>';
        cartDetails.innerHTML = cartHTML;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var cart = [];

    // Add to cart buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var itemName = button.getAttribute('data-name');
            var itemPrice = parseFloat(button.getAttribute('data-price'));
            var existingItem = cart.find(function(item) {
                return item.name === itemName;
            });
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1
                });
            }
            updateCartDetails(cart);
        });
    });

    // Show Summary button
    var showSummaryButton = document.createElement('Summary-Button');
    showSummaryButton.textContent = 'Show Summary';
    showSummaryButton.addEventListener('click', function() {
        var cartDetails = document.getElementById('cart-details');
        if (cartDetails.style.display === 'none') {
            cartDetails.style.display = 'block';
        } else {
            cartDetails.style.display = 'none';
        }
    });
    var orderSummary = document.getElementById('order-summary');
    orderSummary.appendChild(showSummaryButton);

    // Pay Now button
    var payNowButton = document.getElementById('pay-now');
    payNowButton.addEventListener('click', function() {
        var confirmation = confirm('Are you sure you want to proceed with the payment?');
        if (confirmation) {
            alert('Thank you for buying!');
            location.reload(); // Reload the page
        }
    });
});