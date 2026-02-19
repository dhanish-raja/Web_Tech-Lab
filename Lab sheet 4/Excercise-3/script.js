const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");

let students = [];

// Load students (READ)
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw { status: response.status };
            }
            return response.json();
        })
        .then(data => {
            students = data.students;
            renderTable();
            showMessage("Students loaded successfully (200)", "success");
        })
        .catch(error => {
            handleError(error.status || 500);
        });
}

// Render table dynamically
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
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

// CREATE & UPDATE
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    const existing = students.find(s => s.id === id);

    if (existing) {
        existing.name = name;
        existing.department = dept;
        existing.marks = marks;
        showMessage("Student updated successfully (200)", "success");
    } else {
        students.push({ id, name, department: dept, marks });
        showMessage("Student added successfully (200)", "success");
    }

    renderTable();
    form.reset();
});

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        handleError(404);
        return;
    }

    students.splice(index, 1);
    renderTable();
    showMessage("Student deleted successfully (200)", "success");
}

// EDIT
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        handleError(404);
        return;
    }

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;
}

// Error handling
function handleError(status) {
    if (status === 404) {
        showMessage("Student not found (404)", "error");
    } else {
        showMessage("Server error (500)", "error");
    }
}

// Show messages
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Initial load
loadStudents();
