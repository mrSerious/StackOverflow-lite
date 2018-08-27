-- drop table if exist
DROP TABLE IF EXISTS tags CASCADE;
-- create table
CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
	tag_name VARCHAR(40) NOT NULL,
	description VARCHAR(40) NOT NULL,
	question_id INTEGER REFERENCES questions
);

INSERT INTO tags(tag_name, description, question_id) VALUES
	('sql', 'sql related questions', 1),
	('html', 'html related questions', 2),
	('css', 'css related questions', 2),
	('nodejs', 'nodejs related questions', 1);
