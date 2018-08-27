-- drop table if exist
DROP TABLE IF EXISTS users CASCADE;
-- create table
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
  password VARCHAR(100)  NOT NULL,
  image_url VARCHAR(100),
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(firstname, lastname, email, password) VALUES
	('John', 'Doe', 'john.doe@example.com','test1'),
	('Gina', 'Carano', 'gina.carano@example.com','test1'),
	('Jane', 'Doe', 'jane.doe@example.com','test1');
