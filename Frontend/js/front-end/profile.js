const id = localStorage.getItem('user-id');
const url = `https://stack-overflow-lite-app.herokuapp.com/api/v1/users/${id}`;
const token = localStorage.getItem('token');

fetch(url, {
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
    localStorage.setItem('user-data', JSON.stringify(myJson.data));
    document.getElementById('full_name')
      .innerHTML = `${myJson.data.firstname} ${myJson.data.lastname}`;
    document.getElementById('user_name')
      .innerHTML = myJson.data.username;
    document.getElementById('question_count')
      .innerHTML = `Asked ${myJson.data.questionCount} questions`;
    document.getElementById('answer_count')
      .innerHTML = `Answered ${myJson.data.answerCount} questions`;
    const questions = myJson.data.userQuestions;
    for (let i = 0; i < questions.length; i += 1) {
      const questionList = document.getElementById('question-mini-list');
      const questionSummary = document.createElement('div');
      questionSummary.className = 'question-body';

      const questionBody = document.createElement('div');
      questionBody.className = 'question-summary';

      const question = document.createElement('div');
      question.className = 'user-question';

      const age = document.createElement('p');
      age.innerHTML = 'asked 5 minutes ago';
      question.appendChild(age);
      questionBody.appendChild(question);

      const title = document.createElement('h3');

      const questionLink = document.createElement('a');
      questionLink.className = 'question_link';
      questionLink.href = 'question_details.html';
      question.className = 'question_link';
      questionLink.setAttribute('data-id', questions[i].id);
      questionLink.innerHTML = questions[i].title;
      title.appendChild(questionLink);
      questionBody.appendChild(title);

      const tags = document.createElement('div');
      tags.className = 'tags';
      questionBody.appendChild(tags);

      const clear = document.createElement('div');
      clear.className = 'clear';
      questionSummary.appendChild(questionBody);
      questionList.appendChild(questionSummary);
    }
  })
  .catch((error) => {
    throw error;
  });
