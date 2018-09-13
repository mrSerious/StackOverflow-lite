const url = `
https://stack-overflow-lite-app.herokuapp.com/api/v1/questions`;
const detailsContainer = document.getElementById('question-details');

const getSingleQuestion = () => {
  const id = parseInt(localStorage.getItem('data-id'), 10);

  fetch(`${url}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new TypeError(response.statusText);
      }
      return response.json();
    })
    .then((myJson) => {
      const question = myJson.data;
      const answerCount = Object.keys(question.answers).length;

      const newcontent = document.createElement('div');
      newcontent.id = 'question-wrapper';
      newcontent.setAttribute('data-id', question.id);
      newcontent.innerHTML = `
      <div class="question-header">
        <h1>${question.title}</h1>
        <div class="meta-section tags">
          <a class="post-tag" href="">WordPress</a>
          <a class="post-tag" href="">Apache</a>
          <a class="post-tag" href="">DigitalOcean</a>
          <a class="post-tag" href="">DNS</a>
          <a class="post-tag" href="">Linux Commands</a>
          <a class="post-tag" href="">System Tools</a>
          <a class="post-tag" href="">Ubuntu</a>
        </div>
        <div class="clear"></div>
        <div class="info-bar">
          <span class="date-info">
            <span class>Posted 2 hours ago</span>
          </span>
          <span class="modified-info">
            <span>Last modified 2 hours ago</span>
          </span>
          <span class="pageviews-info">
            <span>4 views</span>
          </span>
        </div>
        <div class="clear"></div>
      </div>
      <div class="content-body">
        <p>${question.body}</p>
        <div class="clear"></div>
      </div>
      <div class="answers">
        <div class="answers-header">
          <h2>${answerCount} Answers</h2>
        </div>
        <div class="answers-list">`;

      for (let i = 0; i < answerCount; i += 1) {
        newcontent.innerHTML += `
        <div class="answer-body">
          <div class="answer-vote-container">
            <button name="button" type="button" class="upvote-button">
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              <span class="new-upvote-count">1</span>
            </button>
            <button name="button" type="button" class="downvote-button">
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              <span class="new-upvote-count">0</span>
            </button>
          </div>
          <div class="answer-body-container">
            <div class="answer-body-meta">
              <span class="user">
                <a class="username" href="profile.html">${question.answers[i].username}</a>
              </span>
              <span class="answer-label-separator"></span>
              <span class="answer-response-time">about 9 hours ago</span>
            </div>
            <div class="selected-answer-check">
              <p class="no-margin">
                <i class="fa fa-check" aria-hidden="true"></i> <span class="hidden-on-small-screens">accepted answer</span></p>
            </div>
            <div class="clear"></div>
            <p class="body">${question.answers[i].answer_body}</p>
            <a href="">Add Comment</a>
          </div>
        </div>
        <div class="clear"></div>`;
      }

      newcontent.innerHTML += `
        </div>
      </div>`;
      detailsContainer.appendChild(newcontent);
    })
    .catch((error) => {
      throw error;
    });
};

getSingleQuestion();
