/**
 * validates answer fields
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 * @returns {next} next
 */
const answerChecks = (req, res, next) => {
  req.checkBody('content', 'Content cannot be empty').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      message: 'Validation failed',
      failures: errors
    });
  }
  return next();
};

export default answerChecks;
