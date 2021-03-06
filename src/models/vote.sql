-- drop table if exist
DROP TABLE IF EXISTS votes CASCADE;

-- create table
CREATE TABLE votes(
	answer_id INTEGER NOT NULL,
  answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  up_votes INTEGER,
  down_votes INTEGER,
  PRIMARY KEY (answer_id, user_id)
);

INSERT INTO votes (answer_id, user_id, up_votes, down_votes) VALUES
	(1, 3, 9, 1),
	(2, 2, 0, 6),
	(3, 1, 20, 1);
