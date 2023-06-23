document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitRegister");
  submitButton.addEventListener("click", registerCredentials);
});

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitLogin");
  submitButton.addEventListener("click", loginCredentials);
});

function generateRandomBase64(length) {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  const base64String = btoa(String.fromCharCode.apply(null, bytes));
  return base64String;
}

function generateCredentialOptions(username) {
 

  const challenge = generateRandomBase64(32); //este challenge es el que se envia al servidor y se compara con el que se genera en el servidor
  const rp = {
    name: "example.com", //nombre de la pagina web que se esta usando para la autenticacion 
  };
  const user = {
    id: generateRandomBase64(32),
    name: username,
    displayName: username
  };
  const pubKeyCredParams = [
    { alg: -7, type: "public-key" },
    // { alg: -257, type: "public-key" }
  ];
  const excludeCredentials = [];
  const authenticatorSelection = {
    authenticatorAttachment: "platform",
    requireResidentKey: true,
  };

  const credentialOptions = {
    challenge,
    rp,
    user,
    pubKeyCredParams,
    excludeCredentials,
    authenticatorSelection,
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

  options.authenticatorSelection = {
    authenticatorAttachment: "platform",
    requireResidentKey: true,
  };

  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  console.debug(cred);
}

async function loginCredentials(event) {
  event.preventDefault();
  const credential = navigator.credentials.get({
    publicKey: {
      challenge: generateRandomBase64(32),
  
      rpId: "example.com",
  
      allowCredentials: [
        {
          type: "public-key",
  
          id: generateRandomBase64(32),
        },
      ],
  
      userVerification: "required",
    },
  });
  console.debug(credential);
}

