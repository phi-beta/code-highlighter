-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Insert data
INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com');

-- Query with joins
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.total DESC;
