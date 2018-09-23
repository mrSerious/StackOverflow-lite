const id = localStorage.getItem('user-id');
const url = `https://stack-overflow-lite-app.herokuapp.com/api/v1/users/${id}`;
const token = localStorage.getItem('token');

fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new TypeError(response.statusText);
    }
    return response.json();
  })
  .then((jsonResponse) => {
    console.log(jsonResponse);
  })
  .catch((error) => {
    throw error;
  });
