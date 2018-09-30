/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^error" }] */
import db from '../models/db';

/**
 * @class Answer
 *
 * @classdesc class representing Answer
 */
class Answer {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   *
   * @returns {Object} response - response object
   */
  static createAnswer(request, response, next) {
    const id = parseInt(request.params.questionId, 10);
    const userId = parseInt(request.userId, 10);
    const { content } = request.body;

    db.query(`INSERT INTO answers(answer_body, question_id, user_id) 
    values($1, $2, $3)`, [content, id, userId])
      .then(() => response.status(201).json({
        status: 'Success',
        message: 'Answer created successfully',
      }))
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error'
      }));
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   *
   * @returns {Object} response - response object
   */
  static updateAnswer(request, response, next) {
    const answerId = parseInt(request.params.answerId, 10);
    const questionId = parseInt(request.params.questionId, 10);
    const userId = parseInt(request.userId, 10);
    const { content, isaccepted } = request.body;

    db.query('SELECT * FROM answers WHERE id = $1', [answerId])
      .then((answerToUpdate) => {
        if (answerToUpdate.rowCount < 1) {
          return response.status(404).json({
            status: 'Failure',
            message: 'Cannot find that answer'
          });
        }

        db.query('SELECT * from questions where id = $1', [questionId])
          .then((question) => {
            if (question.rowCount < 1) {
              return response.status(404).json({
                status: 'Failure',
                message: 'Cannot find that question'
              });
            }

            if (content) {
              if (answerToUpdate.rows[0].user_id === userId) {
                db.query(`UPDATE answers SET answer_body = ($1)
                WHERE id = ($2) AND question_id = ($3)`,
                [content, answerId, questionId])
                  .then(() => response.status(200).json({
                    status: 'Success',
                    message: 'Answer successfully updated'
                  }))
                  .catch(error => response.status(500).json({
                    status: 'Failure',
                    message: 'Internal server error'
                  }));
              } else {
                response.status(403).json({
                  status: 'Failure',
                  message: 'You are not allowed to '
                    + 'perform the requested operation'
                });
              }
            }

            if (isaccepted) {
              if (question.rows[0].user_id === userId) {
                db.query(`
                  SELECT * FROM answers WHERE isaccepted = true 
                  AND question_id = $1`, [questionId])
                  .then((isAcceptedExists) => {
                    if (isAcceptedExists.rowCount > 0) {
                      for (let i = 0; i < isAcceptedExists.rowCount; i += 1) {
                        db.query(`
                        UPDATE answers SET isaccepted = false 
                        WHERE id = $1`, [isAcceptedExists.rows[i].id])
                          .catch(error => response.status(500).json({
                            status: 'Failure',
                            message: 'Internal server error'
                          }));
                      }
                    }
                    db.query(`
                      UPDATE answers SET isaccepted = ($1) WHERE id = ($2) 
                      AND question_id = ($3) AND user_id = ($4)`,
                    [isaccepted, answerId, questionId, userId])
                      .then(() => response.status(200).json({
                        status: 'Success',
                        message: 'Answer successfully updated'
                      }))
                      .catch(error => response.status(500).json({
                        status: 'Failure',
                        message: 'Internal server error'
                      }));
                  })
                  .catch(error => response.status(500).json({
                    status: 'Failure',
                    message: 'Internal server error'
                  }));
              } else {
                return response.status(403).json({
                  status: 'Failure',
                  message: 'You are not allowed to perform the '
                    + 'requested operation'
                });
              }
            }
          })
          .catch(error => response.status(500).json({
            status: 'Failure',
            message: 'Internal server error'
          }));
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error'
      }));
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   *
   * @returns {Object} response - response object
   */
  static upvoteComment(request, response, next) {
    const { answerId } = request.params;
    const { questionId } = request.params;
    const upvoteCount = request.body.count;

    db.query(`SELECT * FROM questions where id = ${questionId}`)
      .then((result) => {
        if (result.rows < 1) {
          response.status(404).json({
            status: 'Failure',
            message: 'Cannot find that question'
          });
        } else {
          db.query(`SELECT * FROM answers where id = ${answerId}`)
            .then((result1) => {
              if (result1.rows < 1) {
                response.status(404).json({
                  status: 'Failure',
                  message: 'Cannot find that answer'
                });
              } else {
                db.query(`UPDATE answers SET upvote = ${upvoteCount + 1} 
                WHERE id = ${answerId}`)
                  .then(() => response.status(200).json({
                    status: 'Success',
                    message: 'Upvote was successful'
                  }))
                  .catch(error => response.status(500).json({
                    status: 'Failure',
                    message: 'Internal server error'
                  }));
              }
            })
            .catch(error => response.status(500).json({
              status: 'Failure',
              message: 'Internal server error'
            }));
        }
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error'
      }));
  }
}

export default Answer;
