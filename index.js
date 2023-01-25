const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const table = require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'50ldpssbu50',
        database:'new_db'
    },
    console.log('Connected to new_db')
);

const menuQuestions = [
    {
        type:"list",
        name:"menu",
        message:"What would you like to do?",
        choices: ["View all departments", "View all roles","View all Employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
  ];

  const depQuestion = [
    {
        type:"input",
        name:"depName",
        message:"What is this department's name?",
    },
  ];

//   const roleQuestion = [
//     {
//         type:"input",
//         name:"roleName",
//         message:"What is this role's name?",
//     },
//     {
//         type:"input",
//         name:"salary",
//         message:"What is this role's salary?"
//     },
//     {
//         type:"input",
//         name:"dep",
//         message:"What department does this role belong to?"
//     }
//   ];

  const employeeQuestion = [
    {
        type:"input",
        name:"firstName",
        message:"What is this employee's first name?",
    },
    {
        type:"input",
        name:"lastName",
        message:"What is this employee's last name?"
    },
    {
        type:"input",
        name:"role",
        message:"What is the the role of this employee?"
    },
    {
        type:"input",
        name:"manager",
        message:"Who is this employee's manager?"
    }
  ]
  

  function ask() {
    inquirer.prompt(menuQuestions).then((answers) => {
      if (answers.menu === "View all departments"){
        viewDepartments();
        ask();
      } else if(answers.menu === "View all roles"){
        viewRoles();
      } else if(answers.menu === "View all Employees"){
        viewEmployees();
      } else if(answers.menu === "Add a department"){
        addDepartment();
      } else if(answers.menu === "Add a role"){
        addRole();
      } else if(answers.menu === "Add an employee"){
        addEmployee();
      }
    });
  };

  function addDepartment(){
    inquirer.prompt(depQuestion).then((answers) => {
        console.log(answers.depName)
        db.query(`INSERT INTO departments (department) VALUES (?)`, answers.depName)
    })
  };

  function addRole(){
    db.query(`SELECT * FROM departments`, (err, result) => {
        if(err) throw err;
        depArray = result.map(function (obj) {
            return obj.department;
          });
          const roleQuestion = [
            {
                type:"input",
                name:"roleName",
                message:"What is this role's name?",
            },
            {
                type:"input",
                name:"salary",
                message:"What is this role's salary?"
            },
            {
                type:"list",
                name:"dep",
                message:"What department does this role belong to?",
                choices: depArray
            }
          ];
    inquirer.prompt(roleQuestion).then((answers) => {
        db.query(`INSERT INTO roles (title, salary) VALUES (?, ?)`, answers.roleName, answers.salary)
    })
    })
  };

  function viewDepartments () {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results)
    })
  };

  function viewRoles () {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id;', function (err, results) {
        console.table(results)
    })
  };

  function viewEmployees () {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id', function (err, results) {
        console.table(results)
    })
  }

  ask();