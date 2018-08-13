/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';

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
  res.status(200).json({ status: 'success', count, data: questions });
});

/* GET single question */
router.get('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId * 1; // converts Id from string into an integer
  const question = data.questions.find(m => m.id === questionId);

  if (!question) {
    res.status(404).json({ status: 'Question not found!' });
  } else {
    res.status(200).json({ status: 'success', data: question });
  }
});

/* POST question */
router.post('/questions', validateQuestions, (req, res, next) => {
  // const errors = validationResult(req);

  const nextId = data.questions.length + 1;
  const { title } = req.body;
  const { questionBody } = req.body;

  const { questions } = data;

  const newQuestion = {
    id: nextId,
    title,
    questionBody
  };

  questions.push(newQuestion);
  res.status(201).json({ status: 'success', data: newQuestion });
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

  answers.push(newAnswer);
  res.status(201).json({ status: 'success', data: question });
});

/* DELETE answer */
router.delete('/questions/:questionId', (req, res) => {
  const id = req.params.questionId * 1;

  const { questions } = data;
  const question = questions.find(q => q.id === id);
  const index = questions.indexOf(question);

  if (!question) {
    res.status(404).json({ status: 'Question not found!' });
  } else {
    if (index !== -1) {
      questions.splice(index, 1);
    }
    res.status(200).send({ status: 'success' });
  }
});
export default router;
