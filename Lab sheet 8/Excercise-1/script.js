let studentName = "Arun";

let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

let totalMarks = mark1 + mark2 + mark3;

const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

let average = calculateAverage(mark1, mark2, mark3);

document.getElementById("name").innerText =
`Student Name: ${studentName}`;

document.getElementById("total").innerText =
`Total Marks: ${totalMarks}`;

document.getElementById("average").innerText =
`Average Marks: ${average.toFixed(2)}`;

console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${average.toFixed(2)}`);