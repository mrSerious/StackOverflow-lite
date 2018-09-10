/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Dotenv from 'dotenv';
import db from '../models/db';

Dotenv.config();

/**
 * @class User
 * @classdesc class representing User
 */
class User {
  /**
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return {Object} response - response object
   * @param {Function} next - call back to be run
   */
  static signUp(request, response, next) {
    const firstname = request.body.firstname.trim();
    const lastname = request.body.lastname.trim();
    const email = request.body.email.trim();
    const password = request.body.password.trim();
    const confirmPassword = request.body.confirm_password.trim();
    const paswordHash = bcrypt.hashSync(request.body.password.trim(), 10);

    if (password === confirmPassword) {
      const text = 'INSERT INTO users(firstname, lastname, '
      + 'email, password) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [firstname, lastname, email, paswordHash];

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
                  email: newUser.rows[0].email,
                  token
                },
              });
            })
            .catch(error => response.status(500).json({
              status: 'error',
              message: 'internal server error',
            }));
        })
        .catch(error => response.status(500).json({
          status: 'error',
          message: 'internal server error',
        }));
    } else {
      return response.status(400).json({
        status: 'Failure',
        message: 'Passwords do not match'
      });
    }
  }

  // login route
  /**
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @return {Object} response - response object
 * @param {Function} next - call back to be run
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
        return response.status(200).json({
          status: 'Success',
          message: 'login sucessful',
          data: {
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
}

export default User;
