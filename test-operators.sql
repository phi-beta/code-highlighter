-- Test compound operators
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE age <= 65;
SELECT * FROM users WHERE status != 'inactive';
SELECT * FROM users WHERE status <> 'deleted';
