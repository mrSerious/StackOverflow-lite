/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import { Router } from 'express';
import question from '../controllers/question';
import answer from '../controllers/answer';
import user from '../controllers/user';
import comment from '../controllers/comment';

import validate from '../middleware/validation';
import authorization from '../middleware/verifyToken';

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
router.post('/questions', [authorization.check, validate.postQuestion],
  question.createQuestion);

/* POST answer */
router.post('/questions/:questionId([0-9]+)/answers',
  [authorization.check, validate.postAnswer], answer.createAnswer);

/* DELETE question */
router.delete('/questions/:questionId([0-9]+)',
  authorization.check, question.deleteQuestion);

/* SIGNUP User */
router.post('/auth/signup', validate.signUp, user.signUp);

/* LOGIN User */
router.post('/auth/login', validate.logIn, user.logIn);

// GET user
router.get('/users/:userId([0-9]+)', authorization.check, user.getProfile);

// PUT answer
router.put('/questions/:questionId([0-9]+)/answers/:answerId([0-9]+)',
  [authorization.check, validate.updateAnswer], answer.updateAnswer);

// POST comment
router.post('/questions/:questionId([0-9]+)/answers/:answerId([0-9]+)/comments',
  authorization.check, validate.postComment, comment.createComment);

// POST comment upvote
router.post('/questions/:questionId([0-9]+)/answers/:answerId([0-9]+)/upvote',
  answer.upvoteComment);

export default router;
