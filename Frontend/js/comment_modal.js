document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add_comment')) {
    event.preventDefault();
    const modal = document.getElementById('comment_modal');
    const closeModal = document.getElementsByClassName('close_modal')[0];
    const answerId = event.target.getAttribute('answer-id');
    localStorage.setItem('answer-id', answerId);

    modal.style.display = 'block';

    closeModal.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (event1) => {
      if (event1.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
});
