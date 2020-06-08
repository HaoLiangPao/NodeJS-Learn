-- 1. -------------------Table Operation-------------------

-- -------------------Row Selection-------------------
-- Select all users from the tabel 
SELECT * FROM users;
-- Descending order
SELECT * FROM users ORDER BY is_admin, age DESC, id DESC;
-- Concat
SELECT CONCAT(first_name, ' ', last_name) AS 'Name', dept FROM users;
-- Distinct (combination of all variables if exist)
SELECT DISTINCT location, age FROM users;
-- Double conditions (AND / OR)
SELECT * FROM users WHERE location='Massachusetts' AND dept='sales';
-- Conditions with operators
SELECT * FROM users WHERE is_admin > 0;
-- 

-- -------------------Row Addition-------------------
-- Single Addition 
INSERT INTO users(first_name, last_name, email, password, location, dept, is_admin, register_date)
values('Hao', 'Liang', 'hao@gmail.com','123456','Toronto','development',1,now());
-- Multitle Addition of rows
INSERT INTO users (first_name, last_name, email, password, location, dept,  is_admin, register_date) values ('Fred', 'Smith', 'fred@gmail.com', '123456', 'New York', 'design', 0, now()), ('Sara', 'Watson', 'sara@gmail.com', '123456', 'New York', 'design', 0, now()),('Will', 'Jackson', 'will@yahoo.com', '123456', 'Rhode Island', 'development', 1, now()),('Paula', 'Johnson', 'paula@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now()),('Tom', 'Spears', 'tom@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now());

-- -------------------Column Addition-------------------
-- Add a column
ALTER TABLE users ADD age TINYINT(3);
-- Change column type
ALTER TABLE users MODIFY COLUMN age INT(3);

-- -------------------Deletion-------------------
-- Delete with condition
DELETE FROM users WHERE id = 1;

-- -------------------Update-------------------
UPDATE users SET email = 'liang@gmai.com' WHERE id = 2;

-- 2. ------------------- -------------------

