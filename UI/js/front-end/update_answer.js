const questionId = localStorage.getItem('question-id');
const answerId = localStorage.getItem('answer-id');
const URL = `https://stack-overflow-lite-app.herokuapp.com/api/v1/questions/${questionId}/answers/${answerId}`;

console.log(questionId, answerId, URL);
