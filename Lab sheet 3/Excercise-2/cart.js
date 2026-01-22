/* Product Array */
let cart = [
  { name: "Laptop", category: "electronics", price: 60000, quantity: 1 },
  { name: "Headphones", category: "electronics", price: 2000, quantity: 2 },
  { name: "Notebook", category: "stationery", price: 100, quantity: 5 }
];

let couponDiscount = 0;

/* Render Cart */
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <div class="cart-item">
        ${item.name} (₹${item.price}) × 
        <input type="number" min="1" value="${item.quantity}"
          onchange="updateQuantity(${index}, this.value)">
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  calculateTotal();
}

/* Update Quantity */
function updateQuantity(index, qty) {
  cart[index].quantity = parseInt(qty);
  renderCart();
}

/* Remove Item */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* Discount Rules */
function calculateDiscount(subtotal) {
  let discount = 0;

  // Bulk discount
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems >= 5) discount += subtotal * 0.10;

  // Category-based discount
  cart.forEach(item => {
    if (item.category === "electronics" && item.quantity >= 2) {
      discount += item.price * item.quantity * 0.05;
    }
  });

  // Time-based discount (6 PM – 9 PM)
  const hour = new Date().getHours();
  if (hour >= 18 && hour <= 21) discount += subtotal * 0.05;

  return discount;
}

/* Coupon Validation */
function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();

  if (code.startsWith("SAVE") && code.length === 6) {
    couponDiscount = 100;
  } else if (code === "FLAT50") {
    couponDiscount = 50;
  } else {
    couponDiscount = 0;
  }

  calculateTotal();
}

/* Total Calculation */
function calculateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const discount = calculateDiscount(subtotal);
  const finalTotal = subtotal - discount - couponDiscount;

  document.getElementById("total").innerText =
    `Subtotal: ₹${subtotal}
Discount: ₹${discount + couponDiscount}
Final Total: ₹${finalTotal}`;
}

/* Initial Load */
renderCart();
