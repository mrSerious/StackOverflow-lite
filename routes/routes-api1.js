/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import { validationResult } from '../node_modules/express-validator/check';

import data from './data.json';
import validateQuestions from '../middleware/validation/questionValidations';
import validateAnswer from '../middleware/validation/answerValidations';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

/* GET all questions */
router.get('/questions', (req, res) => {
  const { questions } = data;
  const count = questions.length;
  res.status(200).json({ count, questions });
});

/* GET single question */
router.get('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId * 1; // converts Id from string into an integer
  const question = data.questions.find(m => m.id === questionId);

  if (!question) {
    res.status(404).json({ Message: 'Item not found!' });
  } else {
    res.status(200).json({ question });
  }
});

/* POST question */
router.post('/questions', validateQuestions, (req, res, next) => {
  const errors = validationResult(req);

  const nextId = data.questions.length + 1;
  const { title } = req.body;
  const { questionBody } = req.body;
  const { answers } = req.body;
  const { questions } = data;

  const newQuestion = {
    id: nextId,
    title,
    questionBody,
    answers
  };

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    questions.push(newQuestion);
    res.status(200).send(newQuestion);
  }
});

/* POST answer */
router.post('/questions/:questionId/answers', validateAnswer, (req, res, next) => {
  const { questions } = data;
  const id = parseInt(req.params.questionId, 10);
  const question = questions.find(m => m.id === id);
  const { answers } = question;

  const nextId = answers.length + 1;
  const { content } = req.body;

  const newAnswer = {
    id: nextId,
    content,
    questionId: id
  };

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    answers.push(newAnswer);
    res.status(200).send(question);
  }
});

/* DELETE answer */
router.delete('/questions/:questionId', (req, res) => {
  const id = req.params.questionId * 1;

  const { questions } = data;
  const question = questions.find(q => q.id === id);
  const index = questions.indexOf(question);

  if (!question) {
    res.status(404).json({ Message: 'Item not found!' });
  } else {
    if (index !== -1) {
      questions.splice(index, 1);
    }
    res.status(200).send(questions);
  }
});
export default router;
