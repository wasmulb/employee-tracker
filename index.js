const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const table = require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: "",
        database:'new_db'
    },
    console.log('Connected to new_db')
);

const menuQuestions = [
    {
        type:"list",
        name:"menu",
        message:"What would you like to do?",
        choices: ["View all departments", "View all roles","View all Employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role"]
    },
  ];

  const depQuestion = [
    {
        type:"input",
        name:"depName",
        message:"What is this department's name?",
    },
    {
        type: 'confirm',
        name: 'goToMenu',
        message: 'Press ENTER to return to the selection menu'
    }
  ];

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
      } else if(answers.menu === "Update an employee's role"){
        updateEmployee();
      }
    });
  };

  // Add a department 

  function addDepartment(){
    inquirer.prompt(depQuestion).then((answers) => {
        console.log(answers.depName)
        db.query(`INSERT INTO departments (department) VALUES (?)`, answers.depName)
        if (answers.goToMenu){
            ask();
        }
    })
  };

  // Add a role function 

  function addRole(){
    db.query(`SELECT * FROM departments`, (err, result) => {
        console.log(result)
        if(err) throw err;
        depArray = result.map(item =>{
            return {
                name: item.department,
                value: item.id
            };
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
            },
            {
                type: 'confirm',
                name: 'goToMenu',
                message: 'Press ENTER to return to the selection menu'
            }
          ];
    inquirer.prompt(roleQuestion).then((answers) => {
        console.log(answers)
        db.query(`INSERT INTO roles (department_id, title, salary) VALUES (?, ?, ?)`, [answers.dep, answers.roleName, answers.salary])
        if(answers.goToMenu){
            ask();
        }
    })
    })
  };

// add employee function

function addEmployee(){
    db.query(`SELECT * FROM roles`, (err, result) => {
        console.log(result)
        if(err) throw err;
        roleArray = result.map(item =>{
            return {
                name: item.title,
                value: item.id
            };
          });
    db.query(`SELECT * FROM employees`, (err, result) => {
        console.log(result)
        if(err) throw err;
        employeeArray = result.map(item => {
            return {
                name: item.firstName,
                value: item.id
            }
        })
    
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
                type:"list",
                name:"role",
                message:"What is the the role of this employee?",
                choices: roleArray
            },
            {
                type:"list",
                name:"manager",
                message:"Who is this employee's manager?",
                choices: employeeArray
            },
            {
                type: 'confirm',
                name: 'goToMenu',
                message: 'Press ENTER to return to the selection menu'
            }
          ]
    inquirer.prompt(employeeQuestion).then((answers) => {
        console.log(answers)
        db.query(`INSERT INTO employees (role_id, first_name, last_name, manager_id) VALUES (?, ?, ?, ?)`, [answers.role, answers.firstName, answers.lastName, answers.manager])
        if(answers.goToMenu){
            ask();
        }
    })
    })
    })
  };

  function updateEmployee(){
    db.query(`SELECT * FROM roles`, (err, result) => {
        console.log(result)
        if(err) throw err;
        roleArray = result.map(item =>{
            return {
                name: item.title,
                value: item.id
            };
          });
    db.query(`SELECT * FROM employees`, (err, result) => {
        console.log(result)
        if(err) throw err;
        employeeArray = result.map(item => {
            return {
                name: item.firstName,
                value: item.id
            }
        })
    
          const updateQuestion = [
            {
                type:"list",
                name:"selectedEmployee",
                message:"Which employee would you like to update?",
                choices: employeeArray
            },
            {
                type:"list",
                name:"role",
                message:"Which role should this employee be updated to?",
                choices: roleArray
            },
            {
                type: 'confirm',
                name: 'goToMenu',
                message: 'Press ENTER to return to the selection menu'
            }
          ]
    inquirer.prompt(updateQuestion).then((answers) => {
        console.log(answers)
        db.query(`UPDATE employees SET role_id = ? WHERE id = ?;`, [answers.role, answers.firstName])
        if(answers.goToMenu){
            ask();
        }
    })
    })
    })
  };

  function viewDepartments () {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table("\n", results)
    })
    ask();
  };

  function viewRoles () {
    db.query('SELECT roles.id, roles.title, roles.salary, departments.department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;;', function (err, results) {
        console.table("\n",results)
    })
    ask();
  };

  function viewEmployees () {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id', function (err, results) {
        console.table("\n",results)
    })
    ask();
  }

  ask();