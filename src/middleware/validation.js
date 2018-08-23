
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
}

export default validation;
