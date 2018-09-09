/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import db from '../models/db';

/**
 * @class Question
 * @classdesc class representing Question
 */
class Question {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return {Object} response - response object
   */
  static all(request, response) {
    db.query('SELECT * FROM questions ORDER BY id ASC;')
      .then(result => response.json({
        status: 'Success',
        message: 'Data retreival successful',
        data: { questions: result.rows }
      }))
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error',
      }));
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return {Object} response - response object
   */
  static single(request, response) {
    // converts Id to an integer
    const id = parseInt(request.params.questionId, 10);

    db.query(`SELECT * FROM questions FULL JOIN answers ON questions.id 
    = answers.question_id WHERE questions.id = ${[id]} ORDER BY questions.id`)
      .then((result) => {
        if (result.rowCount < 1) {
          return response.status(404).json({
            status: 'Failure',
            message: 'Question not found'
          });
        }
        const answers = [];
        for (let i = 0; i < result.rows.length; i += 1) {
          answers.push(result.rows[i]);
        }
        return response.status(200).json({
          status: 'Success',
          message: 'Request was successful',
          data: result.rows
        });
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error'
      }));
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - call back to be run
   *
   * @return {Object} response - response object
   */
  static createQuestion(request, response, next) {
    const { body, title } = request.body;
    const { userId } = request;

    db.query(`INSERT INTO questions(title, body, user_id) 
    values($1, $2, $3) RETURNING *`, [title, body, userId])
      .then(newQuestion => response.status(201).json({
        status: 'Success',
        message: 'Question created successfully',
        data: newQuestion.rows
      }))
      .catch((error) => {
        response.status(500).json({
          status: 'Failure',
          message: 'Internal server error'
        });
      });
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return {Object} response - response object
   */
  static destroy(request, response) {
    const id = request.params.questionId * 1;
    db.query(`
    SELECT * 
    FROM questions 
    WHERE id = $1`, [id])
      .then((selectQueryResult) => {
        if (selectQueryResult.rowCount !== 0) {
          db.query('DELETE FROM questions where id = $1', [id])
            .then((deleteQueryResult) => {
              if (deleteQueryResult.rowCount === 1) {
                return response.status(200).json({
                  status: 'Success',
                  message: 'Question deleted successfully'
                });
              }
              return response.status(500).json({
                status: 'Failure',
                message: 'Something went wrong. Contact your administrator'
              });
            })
            .catch(error => response.status(500).json({
              status: 'Failure',
              message: 'Internal server error',
            }));
        } else {
          return response.status(404).json({
            status: 'Failure',
            message: 'Question not found'
          });
        }
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error'
      }));
  }
}

export default Question;
