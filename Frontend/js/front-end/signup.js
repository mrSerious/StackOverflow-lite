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
  const errorParagraph = document.getElementById('error_paragraph');
  const alert = document.getElementById('error-alert');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then((newUser) => {
      if (newUser.status === 'Failure') {
        errorParagraph.innerHTML = newUser.message;
        alert.style.display = 'block';
      }
      localStorage.setItem('token', newUser.data.token);
      localStorage.setItem('current-user', newUser.id);
      window.location.replace('login.html');
    })
    .catch((error) => {
      throw error;
    });
};

form.addEventListener('submit', signUp, false);
