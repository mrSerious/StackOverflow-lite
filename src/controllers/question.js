/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "error" }] */
import db from '../models/db';

/**
 * @class Question
 *
 * @classdesc class representing Question
 */
class Question {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @return {Object} response - response object
   */
  static getAllQuestions(request, response) {
    const queryString = request.query.q;
    if (!queryString || queryString === '') {
      db.query(`
      SELECT q.id, title, users.id as userid, username, q.createdat,
      COALESCE((SELECT COUNT(1) FROM answers WHERE answers.question_id = q.id 
      GROUP BY q.id),0) as answers FROM questions q
      JOIN users ON users.id = q.user_id ORDER BY createdat DESC
      `)
        .then(result => response.status(200).json({
          status: 'Success',
          message: 'Questions retrieved successfully',
          data: { questions: result.rows }
        }))
        .catch(error => response.status(500).json({
          status: 'Failure',
          message: 'Internal server error'
        }));
    } else {
      db.query(`SELECT q.id, title, users.id as userid, username, q.createdat,
      COALESCE((SELECT COUNT(1) FROM answers WHERE answers.question_id = q.id 
      GROUP BY q.id),0) as answers 
      FROM questions q JOIN users ON users.id = q.user_id 
      WHERE q.title LIKE '%${queryString}%' 
      OR q.title LIKE '%${queryString.toLowerCase()}%'
      ORDER BY createdat DESC 
      `)
        .then((result) => {
          const matches = result.rowCount;
          if (result.rowCount < 1) {
            response.status(200).json({
              status: 'Success',
              message: 'Your search returned no matches',
              data: {
                questions: result.rows,
                matches
              }
            });
          } else {
            response.status(200).json({
              status: 'Success',
              message: 'Your search was successful',
              data: { questions: result.rows }
            });
          }
        })
        .catch(error => response.status(500).json({
          status: 'Failure',
          message: 'Internal server error'
        }));
    }
  }

  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
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
          SELECT answers.id, answer_body, answers.question_id, isaccepted, 
          upvote, answers.createdat, users.id as user_id, username
          FROM answers JOIN users ON answers.user_id = users.id
          WHERE answers.question_id = ${id} ORDER BY answers.id DESC`)
            .then((answersResult) => {
              const answers = answersResult.rows;
              for (let i = 0; i < answers.length; i += 1) {
                db.query(`SELECT comment_body, comments.createdat, username
                FROM comments JOIN users ON comments.user_id = users.id
                WHERE comments.answer_id = ${answers[i].id} 
                ORDER BY comments.id DESC`)
                  .then((commentResult) => {
                    const comments = commentResult.rows;
                    const commentCount = commentResult.rowCount;
                    answers[i].comments = comments;
                    answers[i].commentCount = commentCount;
                    question.answers = answers;
                    if (i === answers.length - 1) {
                      response.status(200).json({
                        status: 'Success',
                        message: 'Request was successful',
                        data: question
                      });
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
   *
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
              .then(() => response.status(200).json({
                status: 'Success',
                message: 'Question deleted successfully'
              }))
              .catch(error => response.status(500).json({
                status: 'Failure',
                message: 'Internal server error'
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
        message: 'Internal server error'
      }));
  }
}

export default Question;
