/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[sS]ign" }] */

const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/auth/signup';
const form = document.getElementById('signup');

// Registers a new User
const signUp = (event) => {
  event.preventDefault();

  const lastname = document.getElementById('lastname');
  const firstname = document.getElementById('firstname');
  const password = document.getElementById('password');
  const email = document.getElementById('email');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json(); // we only get here if there is no error
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener('submit', signUp, false);
