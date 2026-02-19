const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let isUsernameAvailable = false;

// Check username when user types
usernameInput.addEventListener("input", function () {

    const username = usernameInput.value.trim();

    if (username.length === 0) {
        feedback.textContent = "";
        return;
    }

    feedback.textContent = "Checking...";
    feedback.className = "loading";

    // AJAX using Fetch API
    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            const existingUsers = data.usernames;

            if (existingUsers.includes(username.toLowerCase())) {
                feedback.textContent = "Username already taken";
                feedback.className = "error";
                isUsernameAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.className = "success";
                isUsernameAvailable = true;
            }
        })
        .catch(error => {
            feedback.textContent = "Error checking username";
            feedback.className = "error";
            isUsernameAvailable = false;
        });
});

// Prevent form submission if username is unavailable
form.addEventListener("submit", function (event) {
    if (!isUsernameAvailable) {
        event.preventDefault();
        alert("Please choose a different username.");
    }
});
