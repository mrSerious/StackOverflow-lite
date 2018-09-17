const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/questions';
const form = document.getElementById('new_question');

const postNewQuestion = (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: document.getElementById('title').value,
      body: document.getElementById('body').value,
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
    .then(() => {
      window.location.replace('index.html');
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', postNewQuestion, false);
