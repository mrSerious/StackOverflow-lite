const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/auth/login';
const form = document.getElementById('login');

// Login a registered user
const logIn = (event) => {
  event.preventDefault();

  const password = document.getElementById('password');
  const email = document.getElementById('email');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
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
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem('x-access-token', data.data.token);
      window.location.replace('index.html');
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener('submit', logIn, false);
