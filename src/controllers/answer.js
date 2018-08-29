/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import db from '../models/db';

/**
 * @class Answer
 * @classdesc class representing Answer
 */
class Answer {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   * @returns {Object} response - response object
   */
  static createAnswer(request, response, next) {
    const id = parseInt(request.params.questionId, 10);
    const userId = parseInt(request.userId, 10);
    const { content } = request.body;

    db.query('INSERT INTO answers(answer_body, question_id, user_id)'
    + ' values($1, $2, $3)', [content, id, userId])
      .then(() => response.status(201).json({
        status: 'Success',
        message: 'Answer created successfully',
      }))
      .catch((error) => {
        response.status(500).send({
          status: 'Failure',
          message: 'Internal server error',
        });
      });
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   * @returns {Object} response - response object
   */
  static updateAnswer(request, response, next) {
    const id = parseInt(request.params.id, 10);

    db.query('SELECT * FROM answers WHERE id = $1', [id])
      .then(result => response.status(201).json({
        status: 'Success',
        message: 'Answer created successfully',
      }))
      .catch((error) => {
        response.status(500).send({
          status: 'Failure',
          message: 'Internal server error',
        });
      });
  }
}

export default Answer;
