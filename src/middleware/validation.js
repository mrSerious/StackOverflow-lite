
/** Class representing a validation. */
class validation {
/**
 * validates answer fields
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 * @returns {next} next
 */
  static answer(req, res, next) {
    req.checkBody('content', 'Content cannot be empty').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        message: 'Validation failed',
        failures: errors
      });
    }
    return next();
  }

  /**
 * validates question fields
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 * @returns {next} next
 */
  static question(req, res, next) {
    req.checkBody('title', 'Title cannot be empty').notEmpty();
    req.checkBody('questionBody', 'Question body cannot be empty').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        message: 'Validation failed',
        failures: errors
      });
    }
    return next();
  }
}

export default validation;
