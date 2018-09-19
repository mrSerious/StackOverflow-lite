import { verify } from 'jsonwebtoken';
import DotEnv from 'dotenv';

DotEnv.config();

const secret = process.env.SECRET_KEY;

/**
 * @class VerifyToken
 * @classdesc class representing VerifyToken
 */
class VerifyToken {
  /**
   * validates answer fields
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @param {Function} next - next middleware function
  *
  * @return {undefined}
  */
  static check(request, response, next) {
    const token = request.headers['x-access-token'] || request.body.token
      || request.headers.token || request.query.token
      || request.headers.authorization;

    if (!token) {
      return response.status(401)
        .json({
          status: 'Failure',
          message: 'You need to login to perform this operation'
        });
    }

    verify(token, secret, (error, decoded) => {
      if (error) {
        return response.status(403)
          .json({
            status: 'Failure',
            message: 'You are not allowed to perform the requested operation'
          });
      }

      request.userId = decoded.id;
      request.email = decoded.email;
      request.firstname = decoded.firstname;

      next();
    });
  }
}

export default VerifyToken;
