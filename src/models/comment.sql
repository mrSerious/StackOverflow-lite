-- drop table if exist
DROP TABLE IF EXISTS comments CASCADE;
-- create table
CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
	comment_body VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users,
  answer_id INTEGER REFERENCES answers,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--insert sample data
INSERT INTO comments(comment_body, user_id, answer_id) VALUES
  ('test comment1', 2, 1),
  ('test comment2', 1, 2);