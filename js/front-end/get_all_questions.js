const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/questions';

const getAllQuestions = () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new TypeError(response.statusText);
      }
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson.data.questions);
      // const array = questions.data.recipes;
    })
    .catch((error) => {
      console.log(error);
    });
};

getAllQuestions();
