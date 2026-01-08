const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearAllBtn = document.getElementById('clearAll');

// Load users on page startup
document.addEventListener('DOMContentLoaded', displayUsers);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    // 1. Validations
    if (mobile.length !== 10) return alert("Mobile number must be exactly 10 digits.");
    if (password.length < 6) return alert("Password must be at least 6 characters.");

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Check for duplicate email
    if (users.some(user => user.email === email)) {
        return alert("This email is already registered!");
    }

    // 3. Create User Object and Save
    const newUser = { name, email, mobile, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

// 4. Function to display users in table
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = "";

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
            </tr>
        `;
        userList.innerHTML += row;
    });
}

// 5. Delete specific user
window.deleteUser = (index) => {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
};

// 6. Clear All
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
});