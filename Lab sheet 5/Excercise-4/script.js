const form = document.getElementById("productForm");
const tableBody = document.getElementById("inventoryTable");
const messageDiv = document.getElementById("message");
const searchInput = document.getElementById("searchCategory");
const totalValueSpan = document.getElementById("totalValue");

let products = [];

// LOAD JSON
function loadInventory() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON");
            return response.json();
        })
        .then(data => {
            products = data.products || [];
            renderTable(products);
            calculateTotal();
        })
        .catch(() => {
            showMessage("JSON loading/parsing error", "error");
        });
}

// RENDER TABLE
function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(product => {
        const lowStockClass = product.stock < 10 ? "low-stock" : "";

        const row = `
            <tr class="${lowStockClass}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="editProduct('${product.id}')">Edit</button>
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    calculateTotal();
}

// CALCULATE TOTAL INVENTORY VALUE
function calculateTotal() {
    const total = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    totalValueSpan.textContent = total;
}

// ADD / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("productId").value.trim();
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!id || !name || !category || isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
        showMessage("Invalid input data", "error");
        return;
    }

    const existing = products.find(p => p.id === id);

    if (existing) {
        existing.price = price;
        existing.stock = stock;
        existing.name = name;
        existing.category = category;
        showMessage("Product updated successfully", "success");
    } else {
        products.push({ id, name, category, price, stock });
        showMessage("Product added successfully", "success");
    }

    renderTable(products);
    form.reset();
});

// DELETE
function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        showMessage("Product not found", "error");
        return;
    }

    products.splice(index, 1);
    renderTable(products);
    showMessage("Product deleted successfully", "success");
}

// EDIT
function editProduct(id) {
    const product = products.find(p => p.id === id);

    if (!product) {
        showMessage("Product not found", "error");
        return;
    }

    document.getElementById("productId").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
}

// SEARCH BY CATEGORY
searchInput.addEventListener("input", function () {
    const category = searchInput.value.trim().toLowerCase();

    const filtered = products.filter(p =>
        p.category.toLowerCase().includes(category)
    );

    renderTable(filtered);
});

// MESSAGE
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// INITIAL LOAD
loadInventory();
