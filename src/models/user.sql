-- drop table if exist
DROP TABLE IF EXISTS users CASCADE;
-- create table
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
	firstname VARCHAR(40) NOT NULL,
	lastname VARCHAR(40) NOT NULL,
	email VARCHAR(40) NOT NULL,
  password VARCHAR(40)  NOT NULL,
  password_confirm VARCHAR(40) NOT NULL,
  image_url VARCHAR(100),
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(firstname,lastname,email,password, password_confirm, question_id,answer_id)
VALUES('John', 'Doe', 'john.doe@example.com','test1', 'test1'),
VALUES('Jane', 'Doe', 'jane.doe@example.com','test2', 'test2');
