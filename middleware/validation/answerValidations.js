import { check } from 'express-validator/check';

const answerChecks = [
  check('content').isLength({ min: 1 }).withMessage('Content is a required field.'),
];

export default answerChecks;
