
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photo-preview');
const editButton = document.querySelector('.edit-button');
const removeButton = document.querySelector('.remove-button');

// Handle photo selection
photoInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    photoPreview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
    editButton.style.display = 'inline-block';
    removeButton.style.display = 'inline-block';
    editButton.textContent = 'Change Photo';
    removeButton.textContent = 'Remove Photo';
    photoInput.labels[0].setAttribute('data-file-name', file.name);
  } else {
    photoPreview.src = 'placeholder.png';
    editButton.style.display = 'none';
    removeButton.style.display = 'none';
    editButton.textContent = 'Edit Photo';
    removeButton.textContent = 'Remove Photo';
    photoInput.labels[0].removeAttribute('data-file-name');
  }
});

// Handle photo editing
editButton.addEventListener('click', function() {
  photoInput.click();
});

// Handle photo removal
removeButton.addEventListener('click', function() {
  photoInput.value = null;
  photoPreview.src = 'placeholder.png';
  editButton.style.display = 'none';
  removeButton.style.display = 'none';
  editButton.textContent = 'Edit Photo';
  removeButton.textContent = 'Remove Photo';
  photoInput.labels[0].removeAttribute('data-file-name');
});
