class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        const text = `Course: ${this.courseName}, Instructor: ${this.instructor}`;
        document.getElementById("course").textContent = text;
    }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

let enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true;

    if (seatsAvailable)
        resolve("Enrollment Successful");
    else
        reject("Course Full");
});

enrollCourse
.then(msg => {
    document.getElementById("result").textContent = msg;
})
.catch(err => {
    document.getElementById("result").textContent = err;
});