-- SQL sample demonstrating various SQL features

-- Database creation and usage
CREATE DATABASE company_db;
USE company_db;

-- Table creation with constraints
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT,
    budget DECIMAL(15,2)
);

-- Insert statements
INSERT INTO departments (id, name, budget) VALUES 
(1, 'Engineering', 500000.00),
(2, 'Marketing', 250000.00),
(3, 'Sales', 300000.00);

INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id) 
VALUES ('John', 'Doe', 'john.doe@company.com', '2023-01-15', 75000.00, 1);

-- Basic SELECT queries
SELECT * FROM employees;

SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 50000;

-- Joins and aggregation
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name,
    e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = TRUE
ORDER BY e.salary DESC;

-- Aggregate functions
SELECT 
    d.name AS department,
    COUNT(*) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MAX(e.salary) AS max_salary,
    MIN(e.salary) AS min_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;

-- Subqueries
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);

-- Window functions (advanced SQL)
SELECT 
    first_name,
    last_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS salary_rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;

-- Common Table Expressions (CTE)
WITH top_earners AS (
    SELECT first_name, last_name, salary, department_id
    FROM employees
    WHERE salary > 70000
)
SELECT te.first_name, te.last_name, d.name as department
FROM top_earners te
JOIN departments d ON te.department_id = d.id;

-- Update statements
UPDATE employees 
SET salary = salary * 1.05 
WHERE department_id = 1;

UPDATE employees 
SET is_active = FALSE 
WHERE hire_date < '2020-01-01';

-- Delete statements
DELETE FROM employees 
WHERE is_active = FALSE;

-- Alter table statements
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees MODIFY COLUMN email VARCHAR(320);

-- Index creation
CREATE INDEX idx_employee_email ON employees(email);
CREATE INDEX idx_employee_dept ON employees(department_id);

-- View creation
CREATE VIEW active_employees AS
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    d.name AS department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = TRUE;

-- Complex query with multiple features
SELECT 
    e.first_name + ' ' + e.last_name AS full_name,
    e.salary,
    d.name AS department,
    CASE 
        WHEN e.salary > 80000 THEN 'Senior'
        WHEN e.salary > 60000 THEN 'Mid-level'
        ELSE 'Junior'
    END AS level,
    (e.salary / d.budget * 100) AS budget_percentage
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE e.hire_date >= '2023-01-01'
    AND e.is_active = TRUE
    AND e.salary BETWEEN 50000 AND 100000
ORDER BY e.salary DESC, e.last_name ASC
LIMIT 10;

-- Show and describe statements
SHOW TABLES;
SHOW DATABASES;
DESCRIBE employees;
DESC departments;

-- Drop statements
DROP VIEW IF EXISTS active_employees;
DROP INDEX idx_employee_email;
DROP TABLE employees;
DROP DATABASE company_db;
