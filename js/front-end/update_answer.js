const questionId = localStorage.getItem('question-id');
const answerId = localStorage.getItem('answer-id');
const answer = localStorage.getItem('answer');
const form = document.getElementById('edit_answer_form');
const accepted = document.getElementsByName('accept_answer');
const url = `https://stack-overflow-lite-app.herokuapp.com/api/v1/questions/${questionId}/answers/${answerId}`;

document.getElementById('original_answer').innerHTML = answer;

const upDateAnswer = (event) => {
  event.preventDefault();
  const content = document.getElementById('answer_update');
  const token = localStorage.getItem('token');
  let myUpdate;

  if (accepted[0].checked) {
    myUpdate = { isaccepted: true };
    console.log('accepted answer selected');
  } else if (content) {
    myUpdate = { content: content.value };
  }

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(myUpdate),
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
      console.log(myJson);
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', upDateAnswer, false);
