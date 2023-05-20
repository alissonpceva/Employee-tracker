const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Bananas123!@#',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);


// Display the main menu options
function displayMainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
          ],
        },
      ])
      .then((answers) => {
        const { action } = answers;
        switch (action) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          default:
            console.log('Invalid option selected.');
            break;
        }
      });
  }
  
  // Implement the required functionality for each option
  function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
      displayMainMenu();
    });
  }
  
  function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
      displayMainMenu();
    });
  }
  
  function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
      displayMainMenu();
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'dept_name',
          message: 'Enter the name of the department:',
        },
      ])
      .then((answers) => {
        const { dept_name } = answers;
        db.query(
          'INSERT INTO department (dept_name) VALUES (?)',
          [dept_name],
          (err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Department added successfully.');
            displayMainMenu();
          }
        );
      });
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID of the role:',
        },
      ])
      .then((answers) => {
        const { title, salary, department_id } = answers;
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [title, salary, department_id],
          (err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Role added successfully.');
            displayMainMenu();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:",
        },
        {
          type: 'input',
          name: 'role_id',
          message: "Enter the employee's role ID:",
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the employee's manager ID:",
        },
      ])
      .then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers;
        db.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [first_name, last_name, role_id, manager_id],
          (err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Employee added successfully.');
            displayMainMenu();
          }
        );
      });
  }
  
  function updateEmployeeRole() {
    // Retrieve employee and role information
    const employees = [];
    const roles = [];
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, employeeResults) => {
      if (err) {
        console.error(err);
        return;
      }
      employees.push(...employeeResults);
  
      db.query('SELECT id, title FROM role', (err, roleResults) => {
        if (err) {
          console.error(err);
          return;
        }
        roles.push(...roleResults);
  
        // Prompt user to select an employee and a new role
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee_id',
              message: 'Select an employee:',
              choices: employees.map((employee) => ({
                name: employee.full_name,
                value: employee.id,
              })),
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Select a new role:',
              choices: roles.map((role) => ({ name: role.title, value: role.id })),
            },
          ])
          .then((answers) => {
            const { employee_id, role_id } = answers;
            db.query(
              'UPDATE employee SET role_id = ? WHERE id = ?',
              [role_id, employee_id],
              (err, results) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Employee role updated successfully.');
                displayMainMenu();
              }
            );
          });
      });
    });
  }

module.exports = db;