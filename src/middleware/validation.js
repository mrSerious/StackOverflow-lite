
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
  *
  * @return {undefined}
  */
  static postAnswer(request, response, next) {
    const { content } = request.body;
    if (!content || content.length < 5 || typeof content !== 'string') {
      return response.status(400).json({
        status: 'Failure',
        message: 'Your answer must be a valid string of minimum lenght 5'
      });
    }

    return next();
  }

  /**
   * validates answer fields
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @param {Function} next - next middleware function
  *
  * @return {undefined}
  */
  static updateAnswer(request, response, next) {
    const { content, isaccepted } = request.body;

    if (!content && !isaccepted) {
      return response.status(400).json({
        status: 'Failure',
        message: 'You have sent an empty request',
      });
    }

    if (content) {
      if (content.length < 5 || typeof content !== 'string'
      || !/.*\S.*./.test(content)) {
        return response.status(400).json({
          status: 'Failure',
          message: 'Your answer must be a valid string of minimum lenght 5'
        });
      }
    }

    return next();
  }

  /**
   * validates question fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   *
   * @return {undefined}
   */
  static postQuestion(request, response, next) {
    const { title, body } = request.body;

    if (!title || title.length < 20 || typeof title !== 'string'
      || !/.*\S.*./.test(title) || /\.+/.test(title)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Your question must be a valid string of minimum lenght 20'
      });
    }

    if (!body || body.length < 20 || typeof body !== 'string'
      || !/.*\S.*./.test(body) || /\.+/.test(body)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Your question description must be a '
        + 'valid string of minimum lenght 20'
      });
    }

    return next();
  }

  /**
   * validates Signup
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   *
   * @return {undefined}
   */
  static signUp(request, response, next) {
    const {
      firstname, lastname, username, email, password
    } = request.body;
    const confirmPassword = request.body.confirm_password;

    if (!firstname || firstname.length < 5 || typeof firstname !== 'string'
    || !/.*\S.*./.test(firstname) || /\.+/.test(firstname)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'First Name must be a valid string of minimum lenght 5'
      });
    }

    if (!lastname || lastname.length < 5 || typeof lastname !== 'string'
    || !/.*\S.*./.test(lastname) || /\.+/.test(lastname)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Last Name must be a valid string of minimum lenght 5'
      });
    }

    if (!username || username.length < 5 || typeof username !== 'string'
    || !/.*\S.*./.test(username) || /\.+/.test(username)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Username must be a valid string of minimum lenght 5'
      });
    }

    if (!email || email.length < 5 || typeof email !== 'string'
    || /\.+/.test(confirmPassword)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Email must be a valid string of minimum lenght 5'
      });
    }

    if (!password || password.length < 5 || typeof password !== 'string'
    || !/.*\S.*./.test(password) || /\.+/.test(password)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Password must be a valid string of minimum lenght 5'
      });
    }

    if (!/\d/.test(password)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Password must contain a number'
      });
    }

    if (!confirmPassword || confirmPassword.length < 5
    || typeof confirmPassword !== 'string' || !/.*\S.*./.test(confirmPassword)
    || /\.+/.test(confirmPassword)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Confirm password must be a valid string of minimum lenght 5'
      });
    }

    return next();
  }

  /**
   * validates Login
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   *
   * @return {undefined}
   */
  static logIn(request, response, next) {
    const { email, password } = request.body;

    if (!email || email.length < 5 || typeof email !== 'string') {
      return response.status(400).json({
        status: 'Failure',
        message: 'Email must be a valid string of minimum lenght 5'
      });
    }

    if (!password || password.length < 5 || typeof password !== 'string'
    || !/.*\S.*./.test(password) || /\.+/.test(password)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Password must be a valid string of minimum lenght 5'
      });
    }

    if (!/\d/.test(password)) {
      return response.status(400).json({
        status: 'Failure',
        message: 'Password must contain a number'
      });
    }

    return next();
  }

  /**
   * validates comment fields
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - next middleware function
   *
   * @return {undefined}
   */
  static postComment(request, response, next) {
    const { comment } = request.body;

    if (!comment || comment.lengh < 20 || typeof comment !== 'string') {
      return response.status(400).json({
        status: 'Failure',
        message: 'Your comment must be a valid string of minimum lenght 5'
      });
    }

    return next();
  }
}

export default Validation;
