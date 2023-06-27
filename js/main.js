let challenge = "";
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitRegister");
  submitButton.addEventListener("click", registerCredentials);
});

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitLogin");
  submitButton.addEventListener("click", loginCredentials);
});

async function registerCredentials(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("usernameRegister");
  const username = usernameInput.value;

  const options = generateCredentialOptions(username);

  options.user.id = decodeBase64ToBinary(options.user.id);
  options.challenge = decodeBase64ToBinary(options.challenge);

  if (options.excludeCredentials) {
    for (let cred of options.excludeCredentials) {
      cred.id = decodeBase64ToBinary(cred.id);
    }
  }
  options.attestation = "none";
  options.authenticatorSelection = {
    authenticatorAttachment: "platform",
    userVerification: "required",
    requireResidentKey: false,
  };

  const cred = await navigator.credentials.create({
    publicKey: options,
  });
  document.getElementById("register-done").classList.remove("d-none");
  localStorage.setItem("credId", cred.id);
  console.log(cred);
}

async function loginCredentials(event) {
  event.preventDefault();
  let credId = localStorage.getItem("credId");
  credId = decodeBase64ToBinary(credId);
  challenge = generateRandomBase64(32);
  console.debug(challenge);
  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: decodeBase64ToBinary(challenge),
      timeout: 1800000,
      rpId: "localhost",
      userVerification: "required",
      allowCredentials: [
        {
          type: "public-key",
          id: credId,
        },
      ],
      // authenticatorSelection: {
      //   authenticatorAttachment: "platform",
      //   requireResidentKey: true,
      // },
    },
  });
  console.debug(credential);
}
