const modal = document.getElementById('comment_modal');
const callModal = document.getElementById('add_comment');
const closeModal = document.getElementsByClassName('close_modal')[0];

callModal.onclick = (event) => {
  event.preventDefault();
  modal.style.display = 'block';
};

closeModal.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
