const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  
  passwordInput.setAttribute('type', type);
  
  this.src = type === 'password' ? 'https://www.svgrepo.com/show/532465/eye-slash.svg' : 'https://www.svgrepo.com/show/532493/eye.svg';
});

//////////////////////////////////////////////

const uri = `${location.href}/v1`;

addEventListener("submit", async(e) => {
  e.preventDefault();

  let data = Object.fromEntries(new FormData(e.target));
  let config = {
    method: e.target.method,
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data)
  }
  let peticion = await fetch(uri, config);
  let res = await peticion.json();
  console.log(res)

  if(res.status == 200) location.href = "/product";
})