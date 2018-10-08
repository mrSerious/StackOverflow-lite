const emptySearchMsg = document.getElementById('no_matches');
let queryString;
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('q');
if (myParam !== null) {
  if (myParam.length !== 0) {
    queryString = window.location.search;
  }
}
if (localStorage.getItem('query-string')) {
  queryString = localStorage.getItem('query-string');
  window.localStorage.removeItem('query-string');
}

let url;
if (queryString) {
  url = `
  https://stack-overflow-lite-app.herokuapp.com/api/v1/questions${queryString}`;
  document.getElementById('headline').innerHTML = 'Search Results';
} else {
  url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/questions';
}

const questionList = document.getElementById('question-mini-list');

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new TypeError(response.statusText);
    }
    return response.json();
  })
  .then((myJson) => {
    const array = myJson.data.questions;
    if (myJson.data.matches === 0) {
      emptySearchMsg.innerHTML = myJson.message;
      emptySearchMsg.style.display = 'block';
    }

    for (let i = 0; i < array.length; i += 1) {
      const newcontent = document.createElement('div');
      newcontent.className = 'question-summary';
      newcontent.innerHTML = `
        <div class="row">
          <div class="one-fourth column">
            <div class="question-meta">
              <div class="votes">
                <div class="mini-counts">
                  <span>0</span>
                </div>
                <div><i class="fa fa-heart-o" aria-hidden="true"></i></div>
              </div>
              <div class="status">
                <div class="mini-counts">
                  <span>${array[i].answers}</span>
                </div>
                <div><i class="fa fa-pencil" aria-hidden="true"></i></div>
              </div>
              <div class="views">
                <div class="mini-counts">
                  <span>17</span>
                </div>
                <div><i class="fa fa-eye" aria-hidden="true"></i></div>
              </div>
            </div>
          </div>
          <div class="three-fourths column">
            <div class="user-question">
              <span>asked by
                <a class="user_link" 
                user-id="${array[i].userid}" 
                href="profile.html">${array[i].username}</a>
                1 year ago
              </span>
            </div>
            <h2 class="question-title">
              <a href="question_details.html" 
              class="question_link" data-id="${array[i].id}">
                ${array[i].title}
              </a>
            </h2>
            <div class="tags">
              <a href="" class="post-tag" title="" rel="tag">java</a>
              <a href="" class="post-tag" title="" rel="tag">maven</a>
            </div>
          </div>
        </div>`;
      questionList.appendChild(newcontent);
    }
  })
  .catch((error) => {
    throw error;
  });

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('question_link')) {
    const questionId = event.target.getAttribute('data-id');
    localStorage.setItem('data-id', questionId);
  }

  if (event.target.classList.contains('user_link')) {
    const questionId = event.target.getAttribute('user-id');
    localStorage.setItem('user-id', questionId);
  }
});
