let currentStage = 1;

/* 6. Temporary Storage */
const formData = {
  name: "",
  email: "",
  password: ""
};

/* Stage Control */
function showStage(stage) {
  document.querySelectorAll(".stage").forEach(s => s.classList.remove("active"));
  document.getElementById(`stage${stage}`).classList.add("active");
  updateProgress(stage);
}

function nextStage() {
  if (!validateStage(currentStage)) return;
  currentStage++;
  showStage(currentStage);
}

function prevStage() {
  currentStage--;
  showStage(currentStage);
}

/* 3. Progress Bar */
function updateProgress(stage) {
  const progress = (stage - 1) * 33.33;
  document.getElementById("progressBar").style.width = progress + "%";
}

/* 1 & 2. Validation Rules Per Stage */
function validateStage(stage) {
  let valid = true;

  if (stage === 1) {
    const name = document.getElementById("name").value.trim();
    if (name === "") {
      document.getElementById("nameError").innerText = "Name required";
      valid = false;
    } else {
      document.getElementById("nameError").innerText = "";
      formData.name = name;
    }
  }

  if (stage === 2) {
    const email = document.getElementById("email").value.trim();
    if (!email.includes("@")) {
      document.getElementById("emailError").innerText = "Invalid email";
      valid = false;
    } else {
      document.getElementById("emailError").innerText = "";
      formData.email = email;
    }
  }

  if (stage === 3) {
    const password = document.getElementById("password").value;
    if (password.length < 6) {
      document.getElementById("passwordError").innerText =
        "Password must be at least 6 characters";
      valid = false;
    } else {
      document.getElementById("passwordError").innerText = "";
      formData.password = password;
    }
  }

  return valid;
}

/* 5. Prevent Submission */
document.getElementById("multiForm").addEventListener("submit", (e) => {
  if (!validateStage(3)) {
    e.preventDefault();
  } else {
    alert("Form submitted successfully");
  }
});
