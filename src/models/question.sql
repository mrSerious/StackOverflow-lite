-- drop table if exist
DROP TABLE IF EXISTS questions CASCADE;

-- create table
CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	body VARCHAR NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO questions(title, body, user_id) VALUES
	('sample title 1', 'sample body 1', 1),
	('sample title 2', 'sample body 2', 2),
	('sample title 3', 'sample body 3', 3);
