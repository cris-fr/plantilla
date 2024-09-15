const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  
  passwordInput.setAttribute('type', type);
  
  this.src = type === 'password' ? 'https://www.svgrepo.com/show/532465/eye-slash.svg' : 'https://www.svgrepo.com/show/532493/eye.svg';
});


const confirmPasswordInput = document.getElementById('confirm');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  
  confirmPasswordInput.setAttribute('type', type);
  
  this.src = type === 'password' ? 'https://www.svgrepo.com/show/532465/eye-slash.svg' : 'https://www.svgrepo.com/show/532493/eye.svg';
});