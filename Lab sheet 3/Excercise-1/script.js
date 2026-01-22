const form = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const role = document.getElementById("role");
const skillsSection = document.getElementById("skillsSection");

function setError(input, message, errorId) {
  input.classList.add("error");
  input.classList.remove("success");
  if (errorId) document.getElementById(errorId).innerText = message;
}

function setSuccess(input, errorId) {
  input.classList.remove("error");
  input.classList.add("success");
  if (errorId) document.getElementById(errorId).innerText = "";
}

/* Email domain validation */
function validateEmail() {
  const allowedDomains = ["gmail.com", "edu.in", "school.edu"];
  const domain = email.value.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    setError(email, "Invalid email domain", "emailError");
    return false;
  }
  setSuccess(email, "emailError");
  return true;
}

/* Password strength based on role */
function validatePassword() {
  const pwd = password.value;
  let regex;

  if (role.value === "admin") {
    regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/;
  } else {
    regex = /^.{6,}$/;
  }

  if (!regex.test(pwd)) {
    setError(password, "Weak password for selected role", "passwordError");
    return false;
  }
  setSuccess(password, "passwordError");
  return true;
}

/* Confirm password */
function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Passwords do not match", "confirmError");
    return false;
  }
  setSuccess(confirmPassword, "confirmError");
  return true;
}

/* Role-based UI changes */
role.addEventListener("change", () => {
  if (role.value === "teacher") {
    skillsSection.classList.remove("hidden");
  } else {
    skillsSection.classList.add("hidden");
  }
  validatePassword();
});

/* Real-time validation */
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

/* Prevent submission */
form.addEventListener("submit", (e) => {
  const valid =
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  if (!valid) {
    e.preventDefault();
  }
});
