DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
	answer_body VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions ON DELETE CASCADE,
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  isAccepted BOOLEAN DEFAULT false,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO answers(answer_body, user_id, question_id) VALUES
  ('sample body 1', 1, 1),
  ('sample body 2', 2, 2),
  ('sample body 2', 3, 3);
