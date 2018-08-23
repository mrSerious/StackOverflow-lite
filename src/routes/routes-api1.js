/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import question from '../controllers/question';
import answer from '../controllers/answer';

import validate from '../middleware/validation';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'Connected!'
  });
});

/* GET all questions */
router.get('/questions', question.all);

/* GET single question */
router.get('/questions/:questionId', validate.getQuestion, question.single);

/* POST question */
router.post('/questions', validate.postQuestion, question.createQuestion);

/* POST answer */
router.post('/questions/:questionId/answers',
  validate.postAnswer, answer.createAnswer);

/* DELETE question */
router.delete('/questions/:questionId', question.destroy);

export default router;
