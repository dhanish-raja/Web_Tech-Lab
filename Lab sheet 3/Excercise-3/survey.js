/* 1. Question Structure */
const questions = [
  {
    id: "q1",
    text: "What is your name?",
    type: "text",
    required: true,
    maxLength: 20
  },
  {
    id: "q2",
    text: "Select your gender",
    type: "radio",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "q3",
    text: "Select your skills",
    type: "checkbox",
    required: true,
    minSelect: 1,
    maxSelect: 2,
    options: ["Java", "Python", "JavaScript"]
  }
];

/* 2. Dynamic Form Generation */
const form = document.getElementById("surveyForm");

function generateSurvey() {
  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";
    div.id = q.id;

    const label = document.createElement("label");
    label.innerText = q.text;
    div.appendChild(label);
    div.appendChild(document.createElement("br"));

    if (q.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = q.maxLength;
      div.appendChild(input);
    }

    if (q.type === "radio") {
      q.options.forEach(opt => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = q.id;
        input.value = opt;
        div.appendChild(input);
        div.appendChild(document.createTextNode(opt));
      });
    }

    if (q.type === "checkbox") {
      q.options.forEach(opt => {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = q.id;
        input.value = opt;
        div.appendChild(input);
        div.appendChild(document.createTextNode(opt));
      });
    }

    const error = document.createElement("div");
    error.className = "error";
    div.appendChild(error);

    form.appendChild(div);
  });
}

/* 3–5. Validation Functions */
function validateQuestion(q) {
  const container = document.getElementById(q.id);
  const errorDiv = container.querySelector(".error");
  errorDiv.innerText = "";

  if (q.type === "text") {
    const input = container.querySelector("input");
    if (q.required && input.value.trim() === "") {
      errorDiv.innerText = "This field is required";
      input.classList.add("invalid");
      return false;
    }
    input.classList.remove("invalid");
  }

  if (q.type === "radio") {
    const checked = container.querySelectorAll("input:checked");
    if (q.required && checked.length === 0) {
      errorDiv.innerText = "Please select an option";
      return false;
    }
  }

  if (q.type === "checkbox") {
    const checked = container.querySelectorAll("input:checked").length;
    if (checked < q.minSelect || checked > q.maxSelect) {
      errorDiv.innerText =
        `Select between ${q.minSelect} and ${q.maxSelect} options`;
      return false;
    }
  }

  return true;
}

/* 6. Submission Control */
function submitSurvey() {
  let valid = true;
  questions.forEach(q => {
    if (!validateQuestion(q)) valid = false;
  });

  if (!valid) return;

  alert("Survey submitted successfully");
}

/* Initialize */
generateSurvey();
