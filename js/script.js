document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", registerCredentials);
});

function generateCredentialOptions(username) {
  function generateRandomBase64(length) {
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    const base64String = btoa(String.fromCharCode.apply(null, bytes));
    return base64String;
  }

  const challenge = generateRandomBase64(32);
  const rp = {
    id: "example.com"
  };
  const user = {
    id: generateRandomBase64(32),
    name: username,
    displayName: username
  };
  const pubKeyCredParams = [
    { alg: -7, type: "public-key" },
    { alg: -257, type: "public-key" }
  ];
  const excludeCredentials = [];
  const authenticatorSelection = {
    authenticatorAttachment: "platform",
    requireResidentKey: true
  };

  const credentialOptions = {
    challenge,
    rp,
    user,
    pubKeyCredParams,
    excludeCredentials,
    authenticatorSelection
  };

  return credentialOptions;
}

function decodeBase64ToBinary(base64String) {
  const binaryString = atob(base64String);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

async function registerCredentials(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const username = usernameInput.value;

  const options = generateCredentialOptions(username);

  options.user.id = decodeBase64ToBinary(options.user.id);
  options.challenge = decodeBase64ToBinary(options.challenge);

  if (options.excludeCredentials) {
    for (let cred of options.excludeCredentials) {
      cred.id = decodeBase64ToBinary(cred.id);
    }
  }

  options.authenticatorSelection = {
    authenticatorAttachment: 'platform',
    requireResidentKey: true
  }

  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  // Aquí puedes utilizar las opciones generadas para realizar la solicitud a la API de WebAuthn
  // Por ejemplo, puedes llamar a la función navigator.credentials.create(options) para crear una nueva credencial

  console.log(options);
}

