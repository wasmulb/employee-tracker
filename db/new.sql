USE new_db;


SELECT employees.id, employees.first_name, employees.last_name, roles.title,
roles.salary, employees.manager_id 
FROM employees
LEFT JOIN 
