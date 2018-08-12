import { Router } from 'express';
import { validationResult } from '../node_modules/express-validator/check';

import data from './data.json';
import inputValidation from '../middleware/validations';

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
  const count = questions.length;
  res.status(200).json({ count, questions });
});

/* GET single question */
router.get('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId * 1; // converts Id from string into an integer
  const question = data.questions.find(m => m.id === questionId);

  res.status(200).json({ question });
});

/* POST question */
router.post('/questions', inputValidation, (req, res) => {
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

  questions.push(newQuestion);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    res.status(200).send(newQuestion);
  }
});

export default router;
