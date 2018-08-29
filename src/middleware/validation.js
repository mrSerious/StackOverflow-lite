
/**
 * @class Validation
 * @classdesc class representing Validation
 */
class Validation {
  /**
   * validates answer fields
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @param {Function} next - next middleware function
  * @return {undefined}
  */
  static postAnswer(request, response, next) {
    request
      .checkBody('content', 'Content cannot be empty').notEmpty();
    request
      .checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static getQuestion(request, response, next) {
    request
      .checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400)
        .json({
          status: 'Failure',
          message: 'Validation failed',
          data: errors
        });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static postQuestion(request, response, next) {
    request.checkBody('title', 'Title cannot be empty').notEmpty();
    request.checkBody('body', 'Question body cannot be empty').notEmpty();

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static signUp(request, response, next) {
    request.check('firstname')
      .notEmpty().withMessage('First Name is required')
      .isString()
      .withMessage('You have not entered a string');

    request.check('lastname')
      .notEmpty().withMessage('Last Name is required')
      .isString()
      .withMessage('You have not entered a string');

    request.check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('You must provide an email address');

    request.check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('Password must contain a number');

    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static logIn(request, response, next) {
    request.check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('You must provide an email address');

    request.check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('Password must contain a number');

    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates answer fields
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @param {Function} next - next middleware function
  * @return {undefined}
  */
  static deleteQuestion(request, response, next) {
    request
      .checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }
}

export default Validation;
