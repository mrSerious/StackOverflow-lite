/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import data from '../data.json';

/**
 * @class Question
 * @classdesc class representing Question
 */
class Question {
  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static all(req, res) {
    const { questions } = data;
    const count = questions.length;
    res.status(200).json({
      status: 'Success',
      message: 'Returning list of questions',
      data: { count, questions }
    });
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static single(req, res) {
    // converts Id to an integer
    const questionId = parseInt(req.params.questionId, 10);
    const result = data.questions.find(question => question.id === questionId);

    if (!result) {
      res.status(404).json({
        status: 'Failure',
        message: 'Question not found'
      });
    } else {
      res.status(200).json({
        status: 'Success',
        message: 'Returning question',
        data: result
      });
    }
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - call back to be run
   * @return {Object} res - response object
   */
  static createQuestion(req, res, next) {
    const nextId = data.questions.length + 1;
    const { title } = req.body;
    const { questionBody } = req.body;
    const { questions } = data;

    const newQuestion = {
      id: nextId,
      title,
      questionBody,
      answers: []
    };

    questions.push(newQuestion);
    res.status(201).json({
      status: 'Success',
      message: 'Question created',
      data: newQuestion
    });
  }

  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} res - response object
   */
  static destroy(req, res) {
    const id = req.params.questionId * 1;

    const { questions } = data;
    const result = questions.find(q => q.id === id);
    const index = questions.indexOf(result);

    if (!result) {
      res.status(404).json({
        status: 'Failure',
        message: 'Question not found'
      });
    } else {
      questions.splice(index, 1);
      res.status(200).send({
        status: 'Success',
        message: 'Question deleted'
      });
    }
  }
}

export default Question;
