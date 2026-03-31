const products = [
  { id: 1, name: "Face Cream", category: "skincare", price: 499 },
  { id: 2, name: "Lipstick", category: "makeup", price: 299 },
  { id: 3, name: "Shampoo", category: "haircare", price: 399 },
  { id: 4, name: "Foundation", category: "makeup", price: 799 },
  { id: 5, name: "Serum", category: "skincare", price: 999 }
];

let cart = [];
let currentProducts = [...products];

/* DISPLAY PRODUCTS */
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class="empty">No products found 😢</p>`;
    return;
  }

  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts(currentProducts);

/* FILTER */
document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const value = e.target.value;

  currentProducts = value === "all"
    ? [...products]
    : products.filter(p => p.category === value);

  displayProducts(currentProducts);
});

/* SORT */
document.getElementById("sortPrice").addEventListener("change", (e) => {
  const value = e.target.value;

  let sorted = [...currentProducts];

  if (value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
});

/* ADD TO CART */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

/* UPDATE CART */
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  const count = document.getElementById("cartCount");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">Cart is empty 🛒</p>`;
  }

  let sum = 0;

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <li>
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
    sum += item.price;
  });

  total.innerText = sum;
  count.innerText = cart.length;
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

/* TOGGLE CART */
function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

/* CHECKOUT */
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("🎉 Order placed successfully!");
  cart = [];
  updateCart();
}