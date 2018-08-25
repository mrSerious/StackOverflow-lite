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
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   * @param {Function} next - call back to be run
   */
  static signUp(req, res, next) {
    const firstname = req.body.firstname.trim();
    const lastname = req.body.lastname.trim();
    const email = req.body.email.trim();
    const paswordHash = bcrypt.hashSync(req.body.password.trim(), 10);

    const text = 'INSERT INTO users(firstname, lastname, '
      + 'email, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [firstname, lastname, email, paswordHash];

    db.query('SELECT * FROM users where email = $1', [email])
      .then((result) => {
        if (result.rowCount !== 0) {
          return res.status(409).send({
            status: 'failure',
            message: 'user already exist',
          });
        }
        return db.query(text, values)
          .then((newUser) => {
            // create a token
            const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(201).send({
              status: 'success',
              message: 'user created',
              token,
              data: {
                id: newUser.rows[0].id,
                firstname: newUser.rows[0].firstname,
                lastname: newUser.rows[0].lastname,
                email: newUser.rows[0].email
              },
            });
          })
          .catch(err => res.status(500).send({
            status: 'error',
            mesage: 'internal server error',
          }));
      })
      .catch(err => res.status(500).send({
        status: 'error',
        mesage: 'internal server error',
      }));
  }
}

export default User;
