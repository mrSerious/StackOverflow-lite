/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Dotenv from 'dotenv';
import db from '../models/db';

Dotenv.config();

/**
 * @class User
 *
 * @classdesc class representing User
 */
class User {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - call back to be run
   *
   * @return {Object} response - response object
   */
  static signUp(request, response, next) {
    const firstname = request.body.firstname.trim();
    const lastname = request.body.lastname.trim();
    const email = request.body.email.trim();
    const username = request.body.username.trim();
    const password = request.body.password.trim();
    const confirmPassword = request.body.confirm_password.trim();

    if (password === confirmPassword) {
      const paswordHash = bcrypt.hashSync(password, 10);
      const text = `INSERT INTO users(firstname, lastname, username, 
        email, password) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const values = [firstname, lastname, username, email, paswordHash];

      db.query('SELECT * FROM users where email = $1', [email])
        .then((result) => {
          if (result.rowCount !== 0) {
            return response.status(409).json({
              status: 'Failure',
              message: 'user already exist',
            });
          }
          return db.query(text, values)
            .then((newUser) => {
            // create a token
              const token = jwt.sign(
                {
                  id: newUser.rows[0].id,
                  firstname: newUser.rows[0].firstname,
                  email: newUser.rows[0].email
                },
                process.env.SECRET_KEY, {
                  expiresIn: 86400 // expires in 24 hours
                }
              );
              response.status(201).json({
                status: 'Success',
                message: 'user created',
                data: {
                  id: newUser.rows[0].id,
                  firstname: newUser.rows[0].firstname,
                  lastname: newUser.rows[0].lastname,
                  username: newUser.rows[0].username,
                  email: newUser.rows[0].email,
                  token
                },
              });
            })
            .catch(error => response.status(500).json({
              status: 'error',
              message: 'internal server error'
            }));
        })
        .catch(error => response.status(500).json({
          status: 'error',
          message: 'internal server error'
        }));
    } else {
      return response.status(400).json({
        status: 'Failure',
        message: 'Passwords do not match'
      });
    }
  }

  /**
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @param {Function} next - call back to be run
 *
 * @return {Object} response - response object
 */
  static logIn(request, response, next) {
    const email = request.body.email.trim();
    const { password } = request.body;

    db.query('SELECT * FROM users where email = $1', [email])
      .then((user) => {
        if (user.rowCount < 1) {
          return response.status(404).json({
            status: 'Failure',
            message: 'user not found.',
          });
        }
        const passwordIsValid = bcrypt
          .compareSync(password, user.rows[0].password);
        if (!passwordIsValid) {
          return response.status(401).json({
            status: 'Failure',
            message: 'Sign in failed'
          });
        }
        const token = jwt.sign(
          {
            id: user.rows[0].id,
            firstname: user.rows[0].firstname,
            email: user.rows[0].email
          }, process.env.SECRET_KEY, {
            expiresIn: 86400 // expires in 24 hours
          }
        );
        const loggedInUser = {
          id: user.rows[0].id,
          firstname: user.rows[0].firstname,
          lastname: user.rows[0].lastname,
          email: user.rows[0].email,
          image_url: user.rows[0].image_url,
          createdat: user.rows[0].createdat
        };
        return response.status(200).json({
          status: 'Success',
          message: 'login sucessful',
          data: {
            loggedInUser,
            auth: true,
            token
          }
        });
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'internal server error'
      }));
  }

  /**
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @param {Function} next - call back to be run
 *
 * @return {Object} response - response object
 */
  static getProfile(request, response, next) {
    const userId = parseInt(request.params.userId, 10);

    db.query(`SELECT users.id, firstname, lastname, email, 
    username, image_url, createdat 
    FROM users where id = $1`, [userId])
      .then((result) => {
        if (result.rowCount < 1) {
          return response.status(404).json({
            status: 'Failure',
            message: 'User not found'
          });
        }
        const [user] = result.rows;
        db.query(`
        SELECT questions.id, title, body, createdat 
        FROM questions
        WHERE questions.user_id = ${userId}`)
          .then((result2) => {
            const questionCount = result2.rowCount;
            user.questionCount = questionCount;
            let userQuestions = [];
            userQuestions = result2.rows;
            user.userQuestions = userQuestions;

            db.query(`
            SELECT answers.id, answer_body, answers.createdat, title, 
            question_id FROM answers JOIN questions ON 
            answers.question_id = questions.id WHERE 
            answers.user_id = ${userId} ORDER BY createdat DESC`)
              .then((result3) => {
                const answerCount = result3.rowCount;
                user.answerCount = answerCount;
                let userAnswers = [];
                userAnswers = result3.rows;
                user.userAnswers = userAnswers;

                return response.status(200).json({
                  status: 'Success',
                  message: 'User retrieved successfully',
                  data: user
                });
              })
              .catch(error => response.status(500).json({
                status: 'Failure',
                message: 'internal server error'
              }));
          })
          .catch(error => response.status(500).json({
            status: 'Failure',
            message: 'internal server error'
          }));
      })
      .catch(error => response.status(500).json({
        status: 'Failure',
        message: 'internal server error'
      }));
  }
}

export default User;
