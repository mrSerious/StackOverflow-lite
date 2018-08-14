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
    res.status(200).json({ status: 'success', count, data: questions });
  }

  /**
   * @param {request} req
   * @param {response} res
   * @return {response} single question or not found
   */
  static single(req, res) {
    const questionId = req.params.questionId * 1; // converts Id from string into an integer
    const question = data.questions.find(m => m.id === questionId);

    if (!question) {
      res.status(404).json({ status: 'Question not found!' });
    } else {
      res.status(200).json({ status: 'success', data: question });
    }
  }

  /**
   * @param {request} req
   * @param {response} res
   * @param {next} next
   * @return {response} status message with new question
   */
  static newQues(req, res, next) {
    const nextId = data.questions.length + 1;
    const { title } = req.body;
    const { questionBody } = req.body;
    const { questions } = data;

    const newQuestion = {
      id: nextId,
      title,
      questionBody
    };

    questions.push(newQuestion);
    res.status(201).json({ status: 'success', data: newQuestion });
  }

  /**
   * @param {request} req
   * @param {response} res
   * @param {next} next
   * @return {response} single question or not found
   */
  static newAns(req, res, next) {
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
    res.status(201).json({ status: 'success', data: result });
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
      res.status(404).json({ status: 'Question not found!' });
    } else {
      questions.splice(index, 1);
      res.status(200).send({ status: 'success' });
    }
  }
}

export default Questions;
