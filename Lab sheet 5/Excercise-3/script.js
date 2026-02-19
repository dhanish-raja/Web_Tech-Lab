const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");

let students = [];

// READ (Fetch JSON)
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON");
            }
            return response.json();
        })
        .then(data => {
            students = data.students || [];
            renderTable();
            showMessage("Students loaded successfully", "success");
        })
        .catch(error => {
            showMessage("JSON parsing/loading error", "error");
        });
}

// Render Table
function renderTable() {
    tableBody.innerHTML = "";

    if (students.length === 0) {
        showMessage("No students found", "error");
        return;
    }

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Edit</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// CREATE / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (!id || !name || !course || !marks) {
        showMessage("All fields are required", "error");
        return;
    }

    const existing = students.find(s => s.id === id);

    if (existing) {
        existing.course = course;
        existing.marks = marks;
        existing.name = name;
        showMessage("Student updated successfully", "success");
    } else {
        students.push({ id, name, course, marks });
        showMessage("Student added successfully", "success");
    }

    renderTable();
    form.reset();
});

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student not found", "error");
        return;
    }

    students.splice(index, 1);
    renderTable();
    showMessage("Student deleted successfully", "success");
}

// EDIT
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student not found", "error");
        return;
    }

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;
}

// Message display
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Initial Load
loadStudents();
