import db from '../models/db';

/**
 * @class Comment
 *
 * @classdesc class representing Comment
 */
class Comment {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - go to the next
   *
   * @returns {Object} response - response object
   */
  static createComment(request, response, next) {
    const questionId = parseInt(request.params.questionId, 10);
    const answerId = parseInt(request.params.answerId, 10);
    const userId = parseInt(request.userId, 10);
    const { comment } = request.body;

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
                db.query(`
                INSERT INTO comments(comment_body, user_id, answer_id) 
                  values($1, $2, $3)`, [comment, userId, answerId])
                  .then(() => response.status(200).json({
                    status: 'Success',
                    message: 'Comment added sucessfully'
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

export default Comment;
