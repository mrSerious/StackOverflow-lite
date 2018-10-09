document.addEventListener('click', (event) => {
  if (event.target.classList.contains('downvote')) {
    const questionId = document.getElementById('question_title')
      .getAttribute('question-id');
    const answerId = event.target.getAttribute('answer-id');
    const downvotes = event.target.getAttribute('downvote-count');
    const token = localStorage.getItem('token');

    const url = `http://localhost:3000/api/v1/questions/${questionId}`
    + `/answers/${answerId}/downvote`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        count: downvotes
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then(response => response.json())
      .then((myJson) => {
        window.location.reload();
        console.log(myJson)
      })
      .catch((error) => {
        throw error;
      });
  }
});
