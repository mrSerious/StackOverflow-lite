DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
	answer_body VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  isaccepted BOOLEAN DEFAULT false,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO answers(answer_body, user_id, question_id, isaccepted) VALUES
  ('sample answer 1', 1, 1, false),
  ('sample answer 2', 2, 2, false),
  ('sample answer 3', 1, 3, true);
