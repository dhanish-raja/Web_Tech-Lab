const form = document.getElementById("bookForm");
const tableBody = document.getElementById("bookTable");
const messageDiv = document.getElementById("message");

let xmlDoc;

// LOAD XML (AJAX GET)
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            if (!xhr.responseXML) {
                showMessage("Malformed XML file", "error");
                return;
            }
            xmlDoc = xhr.responseXML;
            renderTable();
            showMessage("Books loaded successfully", "success");
        } else {
            showMessage("Error loading XML file", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network error", "error");
    };

    xhr.send();
}

// RENDER TABLE
function renderTable() {
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No books found", "error");
        return;
    }

    for (let i = 0; i < books.length; i++) {

        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td>
                    <button onclick="editBook('${id}')">Edit</button>
                    <button onclick="deleteBook('${id}')">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    }
}

// ADD / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("bookId").value.trim();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const status = document.getElementById("status").value;

    if (!id || !title || !author) {
        showMessage("All fields are required", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");
    let existing = null;

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            existing = books[i];
            break;
        }
    }

    if (existing) {
        existing.getElementsByTagName("status")[0].textContent = status;
        existing.getElementsByTagName("title")[0].textContent = title;
        existing.getElementsByTagName("author")[0].textContent = author;
        showMessage("Book updated successfully", "success");
    } else {
        const newBook = xmlDoc.createElement("book");

        const idNode = xmlDoc.createElement("id");
        idNode.textContent = id;

        const titleNode = xmlDoc.createElement("title");
        titleNode.textContent = title;

        const authorNode = xmlDoc.createElement("author");
        authorNode.textContent = author;

        const statusNode = xmlDoc.createElement("status");
        statusNode.textContent = status;

        newBook.appendChild(idNode);
        newBook.appendChild(titleNode);
        newBook.appendChild(authorNode);
        newBook.appendChild(statusNode);

        xmlDoc.getElementsByTagName("books")[0].appendChild(newBook);
        showMessage("Book added successfully", "success");
    }

    renderTable();
    form.reset();
});

// DELETE
function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].parentNode.removeChild(books[i]);
            showMessage("Book deleted successfully", "success");
            renderTable();
            return;
        }
    }

    showMessage("Book not found", "error");
}

// EDIT
function editBook(id) {
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {

            document.getElementById("bookId").value = id;
            document.getElementById("title").value =
                books[i].getElementsByTagName("title")[0].textContent;
            document.getElementById("author").value =
                books[i].getElementsByTagName("author")[0].textContent;
            document.getElementById("status").value =
                books[i].getElementsByTagName("status")[0].textContent;
        }
    }
}

function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// INITIAL LOAD
loadBooks();
