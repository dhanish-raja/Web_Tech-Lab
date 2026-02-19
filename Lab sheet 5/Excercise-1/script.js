const form = document.getElementById("employeeForm");
const tableBody = document.getElementById("empTable");
const messageDiv = document.getElementById("message");

let xmlDoc; // Store parsed XML in memory

// READ
function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {

            if (!xhr.responseXML) {
                showMessage("Malformed XML file", "error");
                return;
            }

            xmlDoc = xhr.responseXML;
            renderTable();
            showMessage("Employees loaded successfully", "success");

        } else {
            showMessage("Error loading XML file", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network error", "error");
    };

    xhr.send();
}

// Render XML data to table
function renderTable() {

    tableBody.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employees found (Empty XML)", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {

        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td>
                    <button onclick="editEmployee('${id}')">Edit</button>
                    <button onclick="deleteEmployee('${id}')">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    }
}

// CREATE / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    const employees = xmlDoc.getElementsByTagName("employee");

    let existing = null;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            existing = employees[i];
            break;
        }
    }

    if (existing) {
        existing.getElementsByTagName("department")[0].textContent = dept;
        existing.getElementsByTagName("salary")[0].textContent = salary;
        showMessage("Employee updated successfully", "success");
    } else {
        const newEmp = xmlDoc.createElement("employee");

        newEmp.innerHTML = `
            <id>${id}</id>
            <name>${name}</name>
            <department>${dept}</department>
            <salary>${salary}</salary>
        `;

        xmlDoc.getElementsByTagName("employees")[0].appendChild(newEmp);
        showMessage("Employee added successfully", "success");
    }

    renderTable();
    form.reset();
});

// DELETE
function deleteEmployee(id) {

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            employees[i].parentNode.removeChild(employees[i]);
            showMessage("Employee deleted successfully", "success");
            renderTable();
            return;
        }
    }

    showMessage("Employee not found", "error");
}

// EDIT
function editEmployee(id) {

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {

            document.getElementById("empId").value = id;
            document.getElementById("empName").value =
                employees[i].getElementsByTagName("name")[0].textContent;
            document.getElementById("empDept").value =
                employees[i].getElementsByTagName("department")[0].textContent;
            document.getElementById("empSalary").value =
                employees[i].getElementsByTagName("salary")[0].textContent;
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

// Initial load
loadEmployees();
