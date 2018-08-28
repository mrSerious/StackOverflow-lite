/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import question from '../controllers/question';
import answer from '../controllers/answer';
import user from '../controllers/user';

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
router.delete('/questions/:questionId',
  validate.deleteQuestion, question.destroy);

/* User signup */
router.post('/auth/signup', validate.signUp, user.signUp);

/* User login */
router.post('/auth/login', validate.logIn, user.logIn);

export default router;
