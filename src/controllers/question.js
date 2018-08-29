/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import data from '../data.json';
import db from '../models/db';

/**
 * @class Question
 * @classdesc class representing Question
 */
class Question {
  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static all(req, res) {
    db.query('SELECT * FROM questions ORDER BY id ASC;')
      .then(result => res.json({
        status: 'Success',
        message: 'Data retreival successful',
        data: { questions: result.rows }
      }))
      .catch(err => res.status(500).send({
        status: 'Failure',
        mesage: 'Internal server error',
      }));
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static single(req, res) {
    // converts Id to an integer
    const id = parseInt(req.params.questionId, 10);

    db.query(`
    SELECT *
    FROM questions
    FULL JOIN answers
    ON questions.id = answers.question_id
    WHERE questions.id = ${[id]} ORDER BY questions.id`)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 'Failure',
            message: 'Question not found',
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Request was successful',
          data: result.rows
        });
      })
      .catch(err => res.status(500).send({
        status: 'Failure',
        mesage: 'Internal server error',
      }));
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - call back to be run
   * @return {Object} res - response object
   */
  static createQuestion(req, res, next) {
    const { body, title } = req.body;
    db.query('INSERT INTO questions(title, body)'
      + ' values($1, $2) RETURNING *', [title, body])
      .then(newQuestion => res.status(201).json({
        status: 'Success',
        message: 'Question created successfully',
        data: newQuestion.rows
      }))
      .catch((err) => {
        res.status(500).send({
          status: 'Failure',
          message: 'Internal server error',
        });
      });
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static destroy(req, res) {
    const id = req.params.questionId * 1;

    const { questions } = data;
    const result = questions.find(q => q.id === id);
    const index = questions.indexOf(result);

    if (!result) {
      res.status(404).json({
        status: 'Failure',
        message: 'Question not found'
      });
    } else {
      questions.splice(index, 1);
      res.status(200).send({
        status: 'Success',
        message: 'Question deleted'
      });
    }
  }
}

export default Question;
