import { Router } from 'express';

import data from './data.json';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Connected!'
  });
});

/* GET all questions */
router.get('/questions', (req, res) => {
  const { questions } = data;

  res.status(200).json({ questions });
});

/* GET single question */
router.get('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId * 1; // converts Id from string into an integer
  const question = data.questions.find(m => m.id === questionId);

  res.status(200).json({ question });
});

export default router;
