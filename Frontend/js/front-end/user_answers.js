/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[aA]nswersTab" }] */
const myJson = JSON.parse(localStorage.getItem('user-data'));

const answersTab = () => {
  const answers = myJson.userAnswers;
  for (let i = 0; i < answers.length; i += 1) {
    const answerList = document.getElementById('answer-mini-list');
    const userAnswers = document.createElement('div');
    userAnswers.className = 'user-answers';

    const answerBody = document.createElement('div');
    answerBody.className = 'answer-body';
    const answerAge = document.createElement('div');
    answerAge.className = 'answer-body';
    const age = document.createElement('span');
    age.innerHTML = 'asked 5 minutes ago';
    answerAge.appendChild(age);
    answerBody.appendChild(answerAge);

    const questionTitle = document.createElement('h5');
    const titleText = document.createTextNode('Answer to ');
    questionTitle.appendChild(titleText);
    const questionTitleLink = document.createElement('a');
    questionTitleLink.className = 'question_link';
    questionTitleLink.setAttribute('data-id', answers[i].question_id);
    questionTitleLink.href = 'question_details.html';
    questionTitleLink.innerHTML = answers[i].title;
    questionTitle.appendChild(questionTitleLink);
    answerBody.appendChild(questionTitle);

    const answerMain = document.createElement('div');
    answerMain.className = 'answer';
    const answerParagraph = document.createElement('p');
    answerParagraph.innerHTML = answers[i].answer_body;
    answerMain.appendChild(answerParagraph);
    answerBody.appendChild(answerMain);

    const clear = document.createElement('div');
    clear.className = 'clear';
    answerBody.appendChild(clear);
    userAnswers.appendChild(answerBody);
    answerList.appendChild(userAnswers);
  }
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('question_link')) {
    const questionId = event.target.getAttribute('data-id');
    localStorage.setItem('data-id', questionId);
  }
});
