/* eslint-disable max-len */
const form = document.getElementById('new_answer');

const newAnswer = (event) => {
  event.preventDefault();
  const answerContent = document.getElementById('answer_content');
  const questionId = document
    .getElementById('question_title').getAttribute('question-id');
  const token = localStorage.getItem('token');
  const answerURL = `https://stack-overflow-lite-app.herokuapp.com/api/v1/questions/${questionId}/answers`;
  fetch(answerURL, {
    method: 'POST',
    body: JSON.stringify({
      content: answerContent.value
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new TypeError(response.statusText);
      }
      return response.json();
    })
    .then((myJson) => {
      const message = myJson.status;
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', newAnswer, false);
