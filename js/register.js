async function registerCredentials(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("usernameRegister");
  const username = usernameInput.value;

  const options = generateCredentialOptions(username);

  if (options.excludeCredentials) {
    for (let cred of options.excludeCredentials) {
      cred.id = decodeBase64urlToBinary(cred.id);
    }
  }
  options.attestation = "none"; 
  options.authenticatorSelection = {
    authenticatorAttachment: "platform", // "platform" or "cross-platform"
    userVerification: "required", // "required", "preferred" or "discouraged"
  };

  // Register new credentials
  await navigator.credentials
    .create({
      publicKey: options,
    })
    .then(function (newCredentialInfo) {
      // Register user on server
      console.log("NEW CREDENTIAL INFO", newCredentialInfo);
      document.getElementById("register-done").classList.remove("d-none");
      var int8view = new Uint8Array(newCredentialInfo.rawId);
      console.log("Byte", int8view);
    })
    .catch(function (err) {
      console.log("ERROR", err);
    });
}
