const saveIds = (event) => {
  if (event.target.classList.contains('edit_answer')) {
    const questionId = document.getElementById('question_title')
      .getAttribute('question-id');
    localStorage.setItem('question-id', questionId);

    const answerId = event.target.getAttribute('answer-id');
    localStorage.setItem('answer-id', answerId);

    const answer = document.getElementById('answer_body').innerHTML;
    localStorage.setItem('answer', answer);

    const questionOwner = document.getElementById('question_title')
      .getAttribute('question-owner');
    localStorage.setItem('question-owner', questionOwner);

    const answerOwer = document.getElementById('username')
      .getAttribute('answer-owner');
    localStorage.setItem('answer-owner', answerOwer);
  }
};

const getSingleQuestion = () => {
  const id = parseInt(localStorage.getItem('data-id'), 10);
  const url = `
  https://stack-overflow-lite-app.herokuapp.com/api/v1/questions/${id}`;
  fetch(url)
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
      const questionTitle = document.getElementById('question_title');
      questionTitle.setAttribute('question-id', question.id);
      questionTitle.setAttribute('question-owner', question.user_id);
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
        const upVote = document.createElement('div');
        upVote.className = 'upvote-button';
        const upVoteLink = document.createElement('a');
        upVoteLink.className = 'upvote_link';
        upVoteLink.href = '#';
        const upArrow = document.createElement('i');
        upArrow.className = 'fa fa-chevron-up';
        upArrow.classList.add('upvote');
        upArrow.setAttribute('answer-id', question.answers[i].id);
        upArrow.setAttribute('upvote-count', question.answers[i].upvote);
        upVoteLink.appendChild(upArrow);
        upVote.appendChild(upVoteLink);
        const upCount = document.createElement('span');
        upCount.className = 'new-upvote-count';
        upCount.innerHTML = question.answers[i].upvote;
        upVote.appendChild(upCount);
        voteContainer.appendChild(upVote);

        // upvote button
        const downVote = document.createElement('div');
        downVote.className = 'downvote-button';
        const downVoteLink = document.createElement('a');
        downVoteLink.className = 'downvote-link';
        downVoteLink.href = '#';
        const downArrow = document.createElement('i');
        downArrow.className = 'fa fa-chevron-down';
        downVoteLink.appendChild(downArrow);
        downVote.appendChild(downVoteLink);
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
        username.id = 'username';
        username.href = 'profile.html';
        username.innerHTML = question.answers[i].username;
        username.setAttribute('answer-owner', question.answers[i].user_id);
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
          accepted.appendChild(checkMark);
          acceptedAns.appendChild(checkMark);
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

        const editAns = document.createElement('a');
        editAns.href = 'edit_answer.html';
        editAns.id = 'edit_answer';
        editAns.className = 'edit_answer';
        editAns.innerHTML = 'edit';
        editAns.setAttribute('answer-id', question.answers[i].id);
        ansBodyContainer.appendChild(editAns);
        editAns.onclick = saveIds;

        const commentsContainer = document.createElement('div');
        commentsContainer.className = 'comments_container';

        const userComments = question.answers[i].comments;
        const count = question.answers[i].commentCount;
        for (let idx = 0; idx < count; idx += 1) {
          const commentBody = document.createElement('div');
          commentBody.className = 'comment_body';
          const commentMeta = document.createElement('div');
          commentMeta.className = 'comment_meta';
          const commentTime = document.createElement('span');
          commentTime.innerHTML = ' on Sept 28 2018';
          const commentOwner = document.createElement('span');
          commentOwner.innerHTML = userComments[idx].username;
          commentMeta.appendChild(commentOwner);
          commentMeta.appendChild(commentTime);
          commentBody.appendChild(commentMeta);
          const commentParagraph = document.createElement('p');
          commentParagraph.className = 'no-margin';
          commentParagraph.innerHTML = userComments[idx].comment_body;
          commentBody.appendChild(commentParagraph);
          commentsContainer.appendChild(commentBody);
        }

        ansBodyContainer.appendChild(commentsContainer);

        const addComment = document.createElement('a');
        addComment.href = ' ';
        addComment.setAttribute('answer-id', question.answers[i].id);
        addComment.id = 'add_comment';
        addComment.className = 'add_comment';
        addComment.innerHTML = 'add comment';
        ansBodyContainer.appendChild(addComment);

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
