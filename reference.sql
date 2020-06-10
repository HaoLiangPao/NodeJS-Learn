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
-- Between (including the boundaries)
SELECT * FROM users WHERE age BETWEEN 20 AND 25;
-- Like (%: anything)
SELECT * FROM users WHERE dept LIKE 'dev%t';
SELECT * FROM users WHERE dept NOT LIKE 'dev%t';
-- IN (value list)
SELECT * FROM users WHERE dept IN('design', 'sales');

-- -------------------Row Addition-------------------
-- Single Addition 
INSERT INTO users(first_name, last_name, email, password, location, dept, is_admin, register_date)
values('Hao', 'Liang', 'hao@gmail.com','123456','Toronto','development',1,now());
-- Multitle Addition of rows
INSERT INTO users (first_name, last_name, email, password, location, dept,  is_admin, register_date)
 values ('Fred', 'Smith', 'fred@gmail.com', '123456', 'New York', 'design', 0, now()),
 ('Sara', 'Watson', 'sara@gmail.com', '123456', 'New York', 'design', 0, now()),
 ('Will', 'Jackson', 'will@yahoo.com', '123456', 'Rhode Island', 'development', 1, now()),
 ('Paula', 'Johnson', 'paula@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now()),
 ('Tom', 'Spears', 'tom@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now());
 
 INSERT INTO users(id, first_name, last_name, email, password, location, dept, is_admin, register_date)
values(1, 'Hao', 'Liang', 'hao@gmail.com','123456','Toronto','development',1,now());

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

-- 2. -------------------Index-------------------
-- Create index to a column
CREATE INDEX LIndex ON users(location);
-- Drop index
DROP INDEX LIndex ON users;

-- 3. -------------------Relationship-------------------

-- Error Code: 1101. BLOB, TEXT, GEOMETRY or JSON column 'body' can't have a default value	
CREATE TABLE posts(
	id INT AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(100) DEFAULT "New Title",
    body TEXT,
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO posts(user_id, title, body) 
VALUES (1, 'Post One', 'This is post one'),
(3, 'Post Two', 'This is post two'),
(1, 'Post Three', 'This is post three'),
(2, 'Post Four', 'This is post four'),
(5, 'Post Five', 'This is post five'),
(4, 'Post Six', 'This is post six'),
(2, 'Post Seven', 'This is post seven'),
(1, 'Post Eight', 'This is post eight'),
(3, 'Post Nine', 'This is post none'),
(4, 'Post Ten', 'This is post ten');
DROP TABLE posts;
DROP TABLE comments;
-- Inner Join
SELECT
users.first_name,
users.last_name,
posts.title,
posts.publish_date
FROM users
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY posts.title;

CREATE TABLE comments(
	id INT AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    body TEXT,
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO comments(post_id, user_id, body) 
VALUES (1, 3, 'This is comment one'),
(2, 1, 'This is comment two'),
(5, 3, 'This is comment three'),
(2, 4, 'This is comment four'),
(1, 2, 'This is comment five'),
(3, 1, 'This is comment six'),
(3, 2, 'This is comment seven'),
(5, 4, 'This is comment eight'),
(2, 3, 'This is comment nine');

SELECT
comments.body,
posts.title
FROM comments
LEFT JOIN posts ON posts.id = comments.post_id
ORDER BY posts.title;

SELECT
comments.body,
posts.title,
users.first_name,
users.last_name
FROM comments
INNER JOIN posts ON posts.id = comments.post_id
INNER JOIN users ON users.id = comments.user_id
ORDER BY posts.title; 
-- Aggregated query
-- COUNT / MAX-MIN / SUM / UCASE() / LCASE() / GROUP BY
SELECT COUNT(id) FROM posts;
SELECT MIN(age) FROM users;
SELECT MAX(age) FROM users;
SELECT UCASE(first_name), LCASE(last_name) FROM users;
-- GROUP BY
SELECT location, COUNT(location) FROM users GROUP BY location;
SELECT COUNT(location) FROM users;
SELECT COUNT(location) FROM users GROUP BY location;
SELECT location FROM users GROUP BY location;
SELECT SUM(age) FROM users GROUP BY age;
SELECT SUM(DISTINCT age) FROM users GROUP BY age;
SELECT age FROM users;

SELECT location, COUNT(location) FROM users WHERE location='Massachusetts' GROUP BY location;

-- JOIN TESTING
CREATE TABLE students(
	id INT AUTO_INCREMENT,
    name VARCHAR(100),
    age INT(4),
    PRIMARY KEY(id)
);
CREATE TABLE courses(
	id INT AUTO_INCREMENT,
    student_id INT,
    course_name VARCHAR(100),
    PRIMARY KEY(id),
    FOREIGN KEY(student_id) REFERENCES students(id)
);
INSERT INTO students(name, age)
values('Ken Wang', 24), ('Chenhang Wang', 18);
SELECT * FROM students;
INSERT INTO courses(student_id, course_name)
values(1, 'CSCA08'), (1, 'CSCA48'), (1, 'CSCB20'), (2, 'CSCA48');
SELECT * FROM courses;
SELECT * FROM students A JOIN courses B ON A.id = B.student_id; -- inner join
SELECT * FROM students A LEFT JOIN courses B ON A.id = B.student_id; -- left join
SELECT * FROM students A RIGHT JOIN courses B ON A.id = B.student_id; -- right join

