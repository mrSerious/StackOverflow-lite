DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
	answer_body VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions,
  user_id INTEGER REFERENCES users,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO answers(answer_body, question_id, user_id) VALUES
  ('sample body 1', 1, 1),
  ('sample body 2', 1, 2),
  ('sample body 2', 1, 2);
