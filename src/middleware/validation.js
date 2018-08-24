
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
    req.checkParams('questionId', 'Must be valid').notEmpty().isInt();

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
    req.checkParams('questionId', 'Must be valid').isInt();

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

    req.checkBody('questionBody', 'Question body cannot be empty').notEmpty();

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
      .notEmpty().withMessage('Last Name is required')
      .isEmail()
      .withMessage('Last Name is required');

    req.check('password')
      .notEmpty().withMessage('Last Name is required')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number');

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
}

export default validation;
