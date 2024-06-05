#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    Name;
    StudID;
    TuitionFee;
    EnrollCourse;
    constructor(Name, StudID, TuitionFee, EnrollCourse) {
        this.Name = Name;
        this.StudID = StudID;
        this.TuitionFee = TuitionFee;
        this.EnrollCourse = EnrollCourse;
    }
}
let baseID = 12345;
let studentID = "";
let enrollment = true;
let students = [];
do {
    let answer = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Select an option\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (answer.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name:"
        });
        let trimStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.Name);
        if (studentNameCheck.includes(trimStudentName) === false) {
            if (trimStudentName !== "") {
                baseID++;
                studentID = "STUD" + baseID;
                console.log(chalk.yellow(`Welcome, ${trimStudentName}!`));
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Select a Course",
                    choices: ['JavaScript', 'Python', 'Data Science', 'Machine Learning']
                });
                let courseFee = 0;
                switch (course.ans) {
                    case "JavaScript":
                        courseFee = 5000;
                        break;
                    case "Python":
                        courseFee = 4000;
                        break;
                    case "Data Science":
                        courseFee = 3000;
                        break;
                    case "Machine Learning":
                        courseFee = 2000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course"
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(trimStudentName, studentID, courseFee, [course.ans]);
                    students.push(Student);
                    console.log(chalk.yellow("You have enrolled in this course"));
                }
            }
            else {
                console.log(chalk.red("invalid Name"));
            }
        }
        else {
            console.log(chalk.red("this name is already exist"));
        }
    }
    else if (answer.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.Name);
            let selecStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Select name",
                choices: studentNamesCheck
            });
            let foundStudent = students.find(Student => Student.Name === selecStudent.ans);
            console.log(chalk.yellow("\nStudent Information"));
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log(chalk.red("Record is empty"));
        }
        let userConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do you want to continue?"
        });
        if (userConfirm.ans === false) {
            enrollment = false;
        }
    }
} while (enrollment);
console.log(chalk.yellow("\n\tExit Student Management System"));
