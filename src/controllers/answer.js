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

    db.query('INSERT INTO answers(answer_body, question_id, user_id) values($1, $2, $3)', [content, id, userId])
      .then(() => response.status(201).json({
        status: 'Success',
        message: 'Answer created successfully',
      }))
      .catch((error) => {
        response.status(500).send({
          status: 'Failure',
          message: 'Internal server error',
          error
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
    const answerId = parseInt(request.params.answerId, 10);
    const questionId = parseInt(request.params.questionId, 10);
    const userId = parseInt(request.userId, 10);
    const { content } = request.body;
    
    db.query('SELECT * FROM answers WHERE id = $1', [answerId])
      .then((existQuery) => {
        if (existQuery.rowCount < 1) {
          return response.status(404).json({
            status: 'Failure',
            message: 'Cannot find that answer'
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          status: 'Failure',
          message: 'Internal server error',
          error
        });
      });

    db.query('SELECT * FROM questions WHERE id = $1', [questionId])
      .then((questionWithAnswer) => {
        console.log(questionWithAnswer.rows[0].user_id, userId);
        if (questionWithAnswer.rows[0].user_id === userId) {
          db.query('UPDATE TABLE answers SET answer_body = $1 WHERE id = $2 AND question_id = $3', [content, answerId, questionId])
            .then(() => response.status(200).json({
              status: 'Success',
              message: 'Answer successffuly set as selected'
            }))
            .catch(error => response.status(500).send({
              status: 'Failure',
              message: 'Internal server error',
            }));
        }
      })
      .catch(error => response.status(500).send({
        status: 'Failure',
        message: 'Internal server error',
      }));

    db.query('SELECT * FROM answers WHERE id = $1', [answerId])
      .then((answerToUpdate) => {
        if (answerToUpdate.rows[0].user_id === userId) {
          db.query('SELECT * FROM answers WHERE isSelected = true')
            .then((isSelectedExists) => {
              db.query('UPDATE TABLE answers SET isSelected = false WHERE id = $1', [isSelectedExists.rows[0].id])
                .catch(error => response.status(500).send({
                  status: 'Failure',
                  message: 'Internal server error',
                }));
            })
            .catch(error => response.status(500).send({
              status: 'Failure',
              message: 'Internal server error',
            }));

          db.query('SELECT * FROM answers WHERE isSelected = true')
            .then(() => {
              db.query('UPDATE TABLE answers SET isSelected = true WHERE id = $1', [answerId])
                .catch(error => response.status(500).send({
                  status: 'Failure',
                  message: 'Internal server error',
                }));
            })
            .catch(error => response.status(500).send({
              status: 'Failure',
              message: 'Internal server error',
            }));
        }
      })
      .catch(error => response.status(500).send({
        status: 'Failure',
        message: 'Internal server error',
      }));

    return response.status(403).json({
      status: 'Failure',
      message: 'You are unauthorized'
    });
  }
}

export default Answer;
