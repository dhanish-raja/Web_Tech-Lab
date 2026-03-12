const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

document.getElementById("output1").textContent =
    id + " " + name + " " + department + " " + marks;

let grade;
if (marks >= 90) grade = "A";
else if (marks >= 75) grade = "B";
else if (marks >= 60) grade = "C";
else grade = "D";

const updatedStudent = {
    ...student,
    grade: grade
};

document.getElementById("output2").textContent =
`{ id: ${updatedStudent.id}, name: '${updatedStudent.name}', department: '${updatedStudent.department}', marks: ${updatedStudent.marks}, grade: '${updatedStudent.grade}' }`;