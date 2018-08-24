-- drop table if exist
DROP TABLE IF EXISTS tags CASCADE;
-- create table
CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
	tag_name VARCHAR(40) NOT NULL,
	question_id INTEGER,
	description VARCHAR(40) NOT NULL
);

INSERT INTO tags(tag_name, description, question_id)
	('sql', 'sql related questions', 1),
	('html', 'html related questions', 2),
	('css', 'css related questions', 2),
	('nodejs', 'nodejs related questions', 1);
