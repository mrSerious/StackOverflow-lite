import { check } from 'express-validator/check';

const quesionChecks = [
  check('title').isLength({ min: 1 }).withMessage('Title is a required field.'),
  check('questionBody').isLength({ min: 1 }).withMessage('Question body is a required field.'),
  check('content').isLength({ min: 1 }).withMessage('Content is a required field.'),
];

export default quesionChecks;
