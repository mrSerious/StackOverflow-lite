import { check } from 'express-validator/check';

const inputChecks = [check('title').isLength({
  min: 1
}).withMessage('Title is a required field.'),
check('questionBody').isLength({
  min: 1
}).withMessage('Question body is a required field.')
];

export default inputChecks;
