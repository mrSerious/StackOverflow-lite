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
  static getAllQuestions(request, response) {
    db.query(`
    SELECT q.id, title, users.id as userid, username, q.createdat,
    COALESCE((SELECT COUNT(1) FROM answers WHERE answers.question_id = q.id 
    GROUP BY q.id),0) as answers 
    FROM questions q
    JOIN users ON users.id = q.user_id
    ORDER BY createdat DESC
    `)
      .then(result => response.json({
        status: 'Success',
        message: 'Data retreival successful',
        data: { questions: result.rows }
      }))
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error',
        error
      }));
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return {Object} response - response object
   */
  static getSingleQuestion(request, response) {
    // converts Id to an integer
    const id = parseInt(request.params.questionId, 10);

    db.query(`SELECT questions.id, title, body, user_id, username 
    FROM questions JOIN users 
    ON users.id = questions.user_id WHERE questions.id = ${id}`)
      .then((result) => {
        if (result.rowCount < 1) {
          response.status(404).json({
            status: 'Failure',
            message: 'Question not found'
          });
        } else {
          const [question] = result.rows;
          db.query(`
          SELECT answers.id, answer_body, answers.question_id, 
          isaccepted, answers.createdat, users.id as user_id, username
          FROM answers JOIN users ON answers.user_id = users.id
          WHERE answers.question_id = ${id} ORDER BY answers.id DESC`)
            .then((answersResult) => {
              const answers = answersResult.rows;

              question.answers = answers;

              response.status(200).json({
                status: 'Success',
                message: 'Request was successful',
                data: question
              });
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
  static deleteQuestion(request, response) {
    const id = request.params.questionId * 1;
    const { userId } = request;

    db.query(`
    SELECT * 
    FROM questions 
    WHERE id = $1`, [id])
      .then((selectQueryResult) => {
        if (selectQueryResult.rowCount > 0) {
          if (userId === selectQueryResult.rows[0].user_id) {
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
            return response.status(403).json({
              status: 'Failure',
              message: 'You are not authorized to modify this resource'
            });
          }
        } else {
          return response.status(404).json({
            status: 'Failure',
            message: 'Question not found'
          });
        }
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'Internal server error',
        error
      }));
  }
}

export default Question;
