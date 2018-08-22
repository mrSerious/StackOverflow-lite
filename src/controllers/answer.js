/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import data from '../data.json';

/** Class representing a question. */
class Answer {
  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - go to the next
   * @returns {Object} res - response object
   */
  static createAnswer(req, res, next) {
    const { questions } = data;
    const id = parseInt(req.params.questionId, 10);
    const result = questions.find(question => question.id === id);
    const { answers } = result;

    const nextId = answers.length + 1;
    const { content } = req.body;

    const newAnswer = {
      id: nextId,
      content,
      questionId: id
    };

    answers.push(newAnswer);
    res.status(201).json({
      status: 'Success',
      message: 'Answer created',
      data: result
    });
  }
}

export default Answer;
