document.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.id === 'add_comment') {
    const modal = document.getElementById('comment_modal');
    const closeModal = document.getElementsByClassName('close_modal')[0];

    modal.style.display = 'block';

    closeModal.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }
});
