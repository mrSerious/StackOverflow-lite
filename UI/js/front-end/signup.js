const url = 'https://stack-overflow-lite-app.herokuapp.com/api/v1/auth/signup';
const form = document.getElementById('signup');

// Registers a new User
const signUp = (event) => {
  event.preventDefault();

  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm_password');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
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
      localStorage.setItem('token', newUser.data.token);
      window.location.replace('login.html');
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', signUp, false);
