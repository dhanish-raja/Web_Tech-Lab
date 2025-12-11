// Select the form element
const form = document.getElementById('regForm');
// Select a UI element to show status (adds "good" UX on top of console logs)
const uiMessage = document.getElementById('uiMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        // Prevent the page from refreshing immediately
        e.preventDefault();
        
        // Clear previous UI messages
        uiMessage.textContent = "";
        uiMessage.style.color = "black";

        // Get values from inputs
        const name = document.getElementById('fullName').value.trim();
        const regNo = document.getElementById('regNo').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobile').value.trim();

        // 1. Check for Empty Fields
        if (!name) {
            console.log("Error: Name field is empty");
            showError("Name is required");
            return;
        }
        if (!regNo) {
            console.log("Error: Registration No field is empty");
            showError("Registration No is required");
            return;
        }
        if (!email) {
            console.log("Error: Email field is empty");
            showError("Email is required");
            return;
        }
        if (!mobile) {
            console.log("Error: Mobile No field is empty");
            showError("Mobile No is required");
            return;
        }

        // 2. Validate Name (No numbers allowed)
        // Regex: ^[a-zA-Z\s]+$ means only letters and spaces from start to end
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            console.log("Error: Name contains numbers or special characters");
            showError("Name cannot contain numbers");
            return;
        }

        // 3. Validate Registration No (9 or 10 alphanumeric characters)
        // Regex: ^[a-zA-Z0-9]{9,10}$ 
        const regNoRegex = /^[a-zA-Z0-9]{9,10}$/;
        if (!regNoRegex.test(regNo)) {
            console.log("Error: Registration No must be 9 or 10 alphanumeric characters");
            showError("Invalid Registration Number format");
            return;
        }

        // 4. Validate Email (Basic format check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Error: Invalid Email format");
            showError("Invalid Email Address");
            return;
        }

        // 5. Validate Mobile No (Exactly 10 digits)
        // Regex: ^\d{10}$ means exactly 10 digits
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            console.log("Error: Mobile No must be exactly 10 digits");
            showError("Mobile Number must be 10 digits");
            return;
        }

        // If code reaches here, all validations passed
        console.log("Submitted");
        
        // Visual Success Feedback
        uiMessage.style.color = "green";
        uiMessage.textContent = "Registration Successful!";
        
        // Optional: Reset form
        // form.reset();
    });
}

// Helper function to show errors on screen too (User Experience improvement)
function showError(msg) {
    uiMessage.style.color = "red";
    uiMessage.textContent = msg;
}