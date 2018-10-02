document.addEventListener('click', (event) => {
  if (event.target.classList.contains('upvote')) {
    const questionId = document.getElementById('question_title')
      .getAttribute('question-id');
    const answerId = event.target.getAttribute('answer-id');
    const upvotes = event.target.getAttribute('upvote-count');
    const token = localStorage.getItem('token');
    let url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/questions/';
    url += `${questionId}/answers/${answerId}/upvote`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        count: upvotes
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then(response => response.json())
      .then((myJson) => {
        window.location.reload();
        console.log(myJson);
      })
      .catch((error) => {
        throw error;
      });
  }
});
