const url = `
https://stack-overflow-lite-app.herokuapp.com/api/v1/questions`;

const saveIds = (event) => {
  if (event.target.classList.contains('edit_answer')) {
    const questionId = document.getElementById('question_title')
      .getAttribute('question-id');
    localStorage.setItem('question-id', questionId);

    const answerId = event.target.getAttribute('answer-id');
    localStorage.setItem('answer-id', answerId);

    const answer = document.getElementById('answer_body').innerHTML;
    localStorage.setItem('answer', answer);
  }
};

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

      // build out page
      document.getElementById('question_title')
        .setAttribute('question-id', question.id);
      document.getElementById('question_title').innerHTML = question.title;
      const questionBody = document.getElementById('question_body');
      questionBody.innerHTML = question.body;
      questionBody.setAttribute('question-body', question.body);
      document.getElementById('answer_count')
        .innerHTML = `${answerCount} Answers`;

      for (let i = 0; i < answerCount; i += 1) {
        const answerList = document.getElementById('answer_list');
        const answerBody = document.createElement('div');
        answerBody.id = 'answer-body';

        // first div with votes
        const voteContainer = document.createElement('div');
        voteContainer.className = 'answer-vote-container';

        // upvote button
        const upVote = document.createElement('button');
        upVote.name = 'button';
        upVote.type = 'button';
        upVote.className = 'upvote-button';
        const upArrow = document.createElement('i');
        upArrow.className = 'fa fa-arrow-up';
        upVote.appendChild(upArrow);
        const upCount = document.createElement('span');
        upCount.className = 'new-upvote-count';
        upCount.innerHTML = 0;
        upVote.appendChild(upCount);
        voteContainer.appendChild(upVote);

        // upvote button
        const downVote = document.createElement('button');
        downVote.name = 'button';
        downVote.type = 'button';
        downVote.className = 'downvote-button';
        const downArrow = document.createElement('i');
        downArrow.className = 'fa fa-arrow-down';
        downVote.appendChild(downArrow);
        const downCount = document.createElement('span');
        downCount.className = 'new-upvote-count';
        downCount.innerHTML = 0;
        downVote.appendChild(downCount);
        voteContainer.appendChild(downVote);

        // second div with answer body
        const ansBodyContainer = document.createElement('div');
        ansBodyContainer.className = 'answer-body-container';
        const ansBodyMeta = document.createElement('div');
        ansBodyMeta.className = 'answer-body-meta';

        // first span in body meta
        const user = document.createElement('span');
        user.className = 'user';

        const username = document.createElement('a');
        username.className = 'username';
        username.href = 'profile.html';
        username.innerHTML = question.answers[i].username;
        user.appendChild(username);
        ansBodyMeta.appendChild(user);

        // second span in body meta
        const seperator = document.createElement('span');
        seperator.className = 'answer-label-separator';
        ansBodyMeta.appendChild(seperator);

        // third span in body meta
        const time = document.createElement('span');
        time.className = 'answer-response-time';
        time.innerHTML = ' answered 9 hours ago';
        ansBodyMeta.appendChild(time);

        ansBodyContainer.appendChild(ansBodyMeta);

        if (question.answers[i].isaccepted) {
          // div with accepted answer
          const acceptedAns = document.createElement('div');
          acceptedAns.className = 'selected-answer-check';
          const accepted = document.createElement('p');
          accepted.className = 'no-margin';
          // children of p above
          const checkMark = document.createElement('i');
          checkMark.className = 'fa fa-check';
          const acceptedText = document.createElement('span');
          const text = document.createTextNode('accepted answer');
          acceptedText.appendChild(text);
          accepted.appendChild(checkMark);
          accepted.appendChild(acceptedText);
          acceptedAns.appendChild(checkMark);
          acceptedAns.appendChild(acceptedText);
          ansBodyContainer.appendChild(acceptedAns);
        }

        const clear = document.createElement('div');
        clear.className = 'clear';
        ansBodyContainer.appendChild(clear);

        const answer = document.createElement('p');
        answer.className = 'body';
        answer.id = 'answer_body';
        answer.innerHTML = question.answers[i].answer_body;

        ansBodyContainer.appendChild(answer);

        const addComment = document.createElement('a');
        addComment.href = ' ';
        addComment.innerHTML = 'add comment';
        ansBodyContainer.appendChild(addComment);

        const editAns = document.createElement('a');
        editAns.href = 'edit_answer.html';
        editAns.id = 'edit_answer';
        editAns.className = 'edit_answer';
        editAns.innerHTML = 'edit';
        editAns.setAttribute('answer-id', question.answers[i].id);
        ansBodyContainer.appendChild(editAns);
        editAns.onclick = saveIds;

        answerBody.appendChild(voteContainer);
        answerBody.appendChild(ansBodyContainer);
        answerList.appendChild(answerBody);
      }
    })
    .catch((error) => {
      throw error;
    });
};

getSingleQuestion();
