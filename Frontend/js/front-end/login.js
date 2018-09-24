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
        throw new TypeError(response.statusText);
      }
      return response.json();
    })
    .then((userLogin) => {
      localStorage.setItem('token', userLogin.data.token);
      localStorage.setItem('current-user', userLogin.data.loggedInUser.id);
      window.location.replace('index.html');
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', logIn, false);
