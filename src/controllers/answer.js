/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import data from '../data.json';

/** Class representing a question. */
class Answers {
  /**
   * @param {request} req
   * @param {response} res
   * @param {next} next
   * @return {response} single question or not found
   */
  static createAnswer(req, res, next) {
    const { questions } = data;
    const id = parseInt(req.params.questionId, 10);
    const result = questions.find(m => m.id === id);
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

export default Answers;
