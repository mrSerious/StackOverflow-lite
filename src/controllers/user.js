import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dbConnect from '../models/db';

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
    const query = {
      text: 'INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [req.body.firstname.trim(), req.body.lastname.trim(), req.body.email.trim(), bcrypt.hashSync(req.body.password.trim(), 10)],
    };

    const results = [];
    dbConnect.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Select Data
      const queryResult = client.query(query);
      // Stream results back one row at a time
      queryResult.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      queryResult.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }
}

export default User;
