
/** Class representing a validation. */
class validation {
  /**
   * validates answer fields
  * @param {Object} req - request object
  * @param {Object} res - response object
  * @param {Function} next - next middleware function
  * @return {undefined}
  */
  static postAnswer(req, res, next) {
    req.checkBody('content', 'Content cannot be empty').notEmpty();
    req.checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static getQuestion(req, res, next) {
    req.checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = req.validationErrors();

    if (errors) {
      return res
        .status(400)
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
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static postQuestion(req, res, next) {
    req.checkBody('title', 'Title cannot be empty').notEmpty();
    req.checkBody('body', 'Question body cannot be empty').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static signUp(req, res, next) {
    req.check('firstname')
      .notEmpty().withMessage('First Name is required')
      .isString()
      .withMessage('You have not entered a string');

    req.check('lastname')
      .notEmpty().withMessage('Last Name is required')
      .isString()
      .withMessage('You have not entered a string');

    req.check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('You must provide an email address');

    req.check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('Password must contain a number');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates question fields
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next middleware function
   * @return {undefined}
   */
  static logIn(req, res, next) {
    req.check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('You must provide an email address');

    req.check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('Password must contain a number');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }

  /**
   * validates answer fields
  * @param {Object} req - request object
  * @param {Object} res - response object
  * @param {Function} next - next middleware function
  * @return {undefined}
  */
  static deleteQuestion(req, res, next) {
    req.checkParams('questionId', 'Invalid url parameter').notEmpty().isInt();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Validation failed',
        data: errors
      });
    }
    return next();
  }
}

export default validation;
