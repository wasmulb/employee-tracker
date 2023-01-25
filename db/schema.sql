DROP DATABASE IF EXISTS new_db;
CREATE DATABASE new_db;

USE new_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  department VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  department_id INT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  role_id INT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id) ON DELETE SET NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE
)