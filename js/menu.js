function mostrarRegistro() {
  var registro = document.querySelector('.register');
  var login = document.querySelector('.login');
  
  registro.style.display = 'block';
  login.style.display = 'none';
}

function mostrarLogin() {
  var registro = document.querySelector('.register');
  var login = document.querySelector('.login');
  document.getElementById("register-done").classList.add("d-none");
  
  registro.style.display = 'none';
  login.style.display = 'block';
}