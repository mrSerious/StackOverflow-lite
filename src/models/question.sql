-- drop table if exist
DROP TABLE IF EXISTS questions CASCADE;
-- create table
CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
	title VARCHAR(40) NOT NULL,
	body VARCHAR(40) NOT NULL,
	user_id INTEGER REFERENCES users ON DELETE CASCADE,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO questions(title, body, user_id) VALUES
	('sample title 1', 'sample body 1', 1),
	('sample title 2', 'sample body 2', 2),
	('sample title 3', 'sample body 3', 3);


