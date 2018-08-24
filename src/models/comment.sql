-- drop table if exist
DROP TABLE IF EXISTS comments CASCADE;
-- create table
CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
	comment VARCHAR(255) NOT NULL,
  user_id INTEGER,
  answer_id INTEGER,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- insert sample data
INSERT INTO comments(title, comment, user_id, answer_id) VALUES
  ('test comment1', 2, 1),
  ('test comment2', 1, 2);

