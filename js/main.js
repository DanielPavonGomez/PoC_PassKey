document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitRegister");
  submitButton.addEventListener("click", registerCredentials);
});

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitLogin");
  submitButton.addEventListener("click", loginCredentials);
});

// Check if browser supports WebAuthn
if (typeof PublicKeyCredential == "undefined") {
  alert("No compatible con este navegador"); 
}
