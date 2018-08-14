/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import question from '../controllers/question';

import validate from '../middleware/validation';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

/* GET all questions */
router.get('/questions', question.all);

/* GET single question */
router.get('/questions/:questionId', question.single);

/* POST question */
router.post('/questions', validate.question, question.newQues);

/* POST answer */
router.post('/questions/:questionId/answers', validate.answer, question.newAns);

/* DELETE question */
router.delete('/questions/:questionId', question.destroy);

export default router;
