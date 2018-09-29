const searchBox = document.getElementById('search');

searchBox.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    const queryString = window.location.search;
    localStorage.setItem('query-string', queryString);
  }
});
