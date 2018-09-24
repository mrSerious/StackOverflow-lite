/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import question from '../controllers/question';
import answer from '../controllers/answer';
import user from '../controllers/user';
import comment from '../controllers/comment';

import validate from '../middleware/validation';
import verify from '../middleware/verifyToken';

const router = Router();

/* GET home page. */
router.get('/', (request, response) => {
  response.status(200).json({
    status: 'Success',
    message: 'Connected!'
  });
});

/* GET all questions */
router.get('/questions', question.getAllQuestions);

/* GET single question */
router.get('/questions/:questionId([0-9]+)', question.getSingleQuestion);

/* POST question */
router.post('/questions', [verify.check, validate.postQuestion],
  question.createQuestion);

/* POST answer */
router.post('/questions/:questionId([0-9]+)/answers',
  [verify.check, validate.postAnswer], answer.createAnswer);

/* DELETE question */
router.delete('/questions/:questionId([0-9]+)',
  verify.check, question.deleteQuestion);

/* SIGNUP User */
router.post('/auth/signup', validate.signUp, user.signUp);

/* LOGIN User */
router.post('/auth/login', validate.logIn, user.logIn);

// PUT answer
router.put('/questions/:questionId([0-9]+)/answers/:answerId([0-9]+)',
  [verify.check, validate.updateAnswer], answer.updateAnswer);

// GET user
router.get('/users/:userId([0-9]+)', verify.check, user.getProfile);

// POST comment
router.post('/questions/:questionId([0-9]+)/answers/:answerId([0-9]+)/comments',
  verify.check, validate.postComment, comment.createComment);

export default router;
