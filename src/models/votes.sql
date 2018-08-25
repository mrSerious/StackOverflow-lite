-- drop table if exist
DROP TABLE IF EXISTS votes CASCADE;
-- create table
CREATE TABLE votes(
	answer_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
  up_vote INTEGER,
  down_vote INTEGER
  PRIMARY KEY (quesion_id, user_id)
);
