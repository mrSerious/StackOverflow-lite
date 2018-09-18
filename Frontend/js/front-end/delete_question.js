const deleteURL = `
https://stack-overflow-lite-app.herokuapp.com/api/v1/questions`;

const deleteButton = document.getElementById('delete-question');

deleteButton.addEventListener('click', () => {
  const questionId = document
    .getElementById('question_title').getAttribute('data-id');

  const token = localStorage.getItem('token');

  fetch(`${deleteURL}/${questionId}`, {
    method: 'DELETE',
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
      // console.log(myJson.status);
      window.location.replace('index.html');
    })
    .catch((error) => {
      throw error;
    });
});
