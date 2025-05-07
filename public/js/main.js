let deleteUrl = null;

document.addEventListener('DOMContentLoaded', () => {
  const popupBox = document.getElementById('popupBox');
  const popupYes = document.getElementById('popupYes');
  const popupNo = document.getElementById('popupNo');

  // Listen for all delete links
  document.querySelectorAll('.delete-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      deleteUrl = this.getAttribute('href');
      popupBox.classList.remove('hidden'); // show popup
    });
  });

  // If the user confirms
  popupYes.addEventListener('click', () => {
    if (deleteUrl) {
      window.location.href = deleteUrl;
    }
  });

  // If the user regrets
  popupNo.addEventListener('click', () => {
    popupBox.classList.add('hidden'); // hide popup
    deleteUrl = null;
  });
});

