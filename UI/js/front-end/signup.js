const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/auth/signup';
const form = document.getElementById('signup');

// Registers a new User
const signUp = (event) => {
  event.preventDefault();

  const lastname = document.getElementById('lastname');
  const firstname = document.getElementById('firstname');
  const password = document.getElementById('password');
  const email = document.getElementById('email');
  const username = document.getElementById('username');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new TypeError(response.statusText);
      }
      return response.json();
    })
    .then((newUser) => {
      sessionStorage.setItem('x-access-token', newUser.data.token);
      window.location.replace('login.html');
      console.log(newUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener('submit', signUp, false);
