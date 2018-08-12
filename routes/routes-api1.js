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

export default router;
