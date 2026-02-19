const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let debounceTimer;

// Debounce function
function debounce(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

// Fetch and filter products
function searchProducts(query) {

    resultsDiv.innerHTML = "Loading...";

    fetch("products.json")
        .then(response => response.json())
        .then(data => {

            const products = data.products;

            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            displayResults(filtered);
        })
        .catch(error => {
            resultsDiv.innerHTML =
                "<div class='message' style='color:red;'>Error fetching data</div>";
        });
}

// Display results dynamically
function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {
        resultsDiv.innerHTML =
            "<div class='message'>No results found</div>";
        return;
    }

    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
            <div class="name">${product.name}</div>
            <div class="price">₹${product.price}</div>
            <div class="category">${product.category}</div>
        `;

        resultsDiv.appendChild(div);
    });
}

// Listen for input
searchInput.addEventListener("input", function () {

    const query = searchInput.value.trim();

    debounce(() => {
        if (query.length === 0) {
            resultsDiv.innerHTML = "";
            return;
        }
        searchProducts(query);
    }, 500); // 500ms debounce delay
});
