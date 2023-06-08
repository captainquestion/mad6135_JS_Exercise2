// Implement the Student class
class Student {
    constructor(firstName, lastName, major, gpa) {
        this.sid = Math.floor(Math.random() * 90000000) + 10000000; // Generate a random 8 digit number
        this.firstName = firstName;
        this.lastName = lastName;
        this.major = major;
        this.gpa = gpa;
    }
}

// Create an array of Student instances
let students = [
    new Student("John", "Doe", "T111", 3.5),
    new Student("Alice", "Wind", "T111", 2.3),
    new Student("May", "Fire", "B203", 3.3),
    new Student("Chris", "Lewis", "B203", 2.7),
    new Student("Lucy", "Lu", "T111", 2.9),
    new Student("Edward", "Norton", "T111", 1.8),
];

let index = 0; // Current displayed student index

// Function to display a student's information
function displayStudent(student) {
    let infoDisplay = document.getElementById("info-display");
    infoDisplay.innerHTML = `
        <div class="student-info">SID: ${student.sid}</div>
        <div class="student-info">Name: ${student.firstName} ${student.lastName}</div>
        <div class="student-info">Major: ${student.major}</div>
        <div class="student-info">GPA: ${student.gpa}</div>
    `;
}

// Display the first student's information when the page first loads
displayStudent(students[0]);

// Event listeners for the buttons
document.getElementById("first-button").addEventListener("click", function() {
    index = 0;
    displayStudent(students[index]);
});

document.getElementById("next-button").addEventListener("click", function() {
    index = (index + 1) % students.length;
    displayStudent(students[index]);
});

document.getElementById("previous-button").addEventListener("click", function() {
    index = (index - 1 + students.length) % students.length;
    displayStudent(students[index]);
});

document.getElementById("last-button").addEventListener("click", function() {
    index = students.length - 1;
    displayStudent(students[index]);
});

// Add event listener for the new buttons
document.getElementById("add-button").addEventListener("click", function() {
    // This is a placeholder. You will need to implement your own input method.
    let firstName = prompt("Enter the first name:");
    let lastName = prompt("Enter the last name:");
    let major = prompt("Enter the major:");
    let gpa = parseFloat(prompt("Enter the GPA:"));
    students.push(new Student(firstName, lastName, major, gpa));
    index = students.length - 1;
    displayStudent(students[index]);
});

document.getElementById("delete-button").addEventListener("click", function() {
    students.splice(index, 1);
    index = Math.min(index, students.length - 1);
    displayStudent(students[index]);
});

document.getElementById("edit-button").addEventListener("click", function() {
    // This is a placeholder. You will need to implement your own input method.
    students[index].firstName = prompt("Enter the new first name:", students[index].firstName);
    students[index].lastName = prompt("Enter the new last name:", students[index].lastName);
    students[index].major = prompt("Enter the new major:", students[index].major);
    students[index].gpa = parseFloat(prompt("Enter the new GPA:", students[index].gpa));
    displayStudent(students[index]);
});

document.getElementById("search-button").addEventListener("click", function() {
    // This is a placeholder. You will need to implement your own input method.
    let searchTerm = prompt("Enter the search term:");
    for(let i = 0; i < students.length; i++) {
        if(students[i].lastName.includes(searchTerm) || students[i].major.includes(searchTerm) || students[i].gpa.toString() === searchTerm) {
            index = i;
            break;
        }
    }
    displayStudent(students[index]);
});

document.getElementById("sort-gpa-button").addEventListener("click", function() {
    let order = prompt("Enter 'asc' for ascending order or 'desc' for descending order:");
    if(order === "asc") {
        students.sort((a, b) => a.gpa - b.gpa);
    } else if(order === "desc") {
        students.sort((a, b) => b.gpa - a.gpa);
    }
    index = 0;
    displayStudent(students[index]);
});

document.getElementById("sort-lastname-button").addEventListener("click", function() {
    students.sort((a, b) => a.lastName.localeCompare(b.lastName));
    index = 0;
    displayStudent(students[index]);
});

document.getElementById("sort-major-button").addEventListener("click", function() {
    let order = prompt("Enter 'asc' for ascending order or 'desc' for descending order:");
    let majors = {};
    for(let student of students) {
        if(!(student.major in majors)) {
            majors[student.major] = [];
        }
        majors[student.major].push(student.gpa);
    }
    for(let major in majors) {
        let sum = majors[major].reduce((a, b) => a + b, 0);
        majors[major] = sum / majors[major].length;
    }
    let sortedMajors = Object.entries(majors).sort((a, b) => order === "asc" ? a[1] - b[1] : b[1] - a[1]);
    console.log(sortedMajors);
});