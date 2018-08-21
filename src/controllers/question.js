/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import data from '../data.json';

/** Class representing a question. */
class Questions {
  /**
   * @param {request} req
   * @param {response} res
   * @return {response} array of questions
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
   * @param {request} req
   * @param {response} res
   * @return {response} single question or not found
   */
  static single(req, res) {
    // converts Id to an integer
    const questionId = parseInt(req.params.questionId, 10);
    const question = data.questions.find(m => m.id === questionId);

    if (!question) {
      res.status(404).json({
        status: 'Failure',
        message: 'Question not found'
      });
    } else {
      res.status(200).json({
        status: 'Success',
        message: 'Returning question',
        data: question
      });
    }
  }

  /**
   * @param {request} req
   * @param {response} res
   * @param {next} next
   * @return {response} status message with new question
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
   * @param {request} req
   * @param {response} res
   * @return {response} operation status message or not found
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

export default Questions;
