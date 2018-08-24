-- drop table if exist
DROP TABLE IF EXISTS answers CASCADE;
-- create table
CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
	title VARCHAR(40) NOT NULL,
	body VARCHAR(40) NOT NULL,
  question_id INTEGER,
  user_id INTEGER,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO answers(title, body, question_id, user_id) VALUES
  ('sample title 1', 'sample body 1', 1, 1),
  ('sample title 2', 'sample body 2', 1, 2);
  ('sample title 3', 'sample body 2', 1, 2);
