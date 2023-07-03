async function loginCredentials(event) {
  event.preventDefault();
  // credId is generated by the authenticator
  let credId = localStorage.getItem("credId"); // Get credId from localStorage
  if (credId !== null) {
    // Decode credId from base64url to binary
    credId = decodeBase64urlToBinary(credId);
  }
  challenge = generateRandomBytes(1); // This challenge is generated by the server

  let options = {
    publicKey: {
      challenge: challenge,
      timeout: 120000, // Timeout set to 2 minutes
      rpId: "localhost",
      userVerification: "required",
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: true,
      },
    },
  };

  if (credId == null) {
    options.publicKey.allowCredentials = [];
  } else {
    options.publicKey.allowCredentials = [
      {
        id: credId,
        type: "public-key",
        transports: ["internal"],
      },
    ];
  }
  // Get assertion from authenticator
  await navigator.credentials
    .get(options)
    .then(function (assertion) {
      // Send assertion to server for verification
      console.log("ASSERTION", assertion);
      document.getElementById("login-done").classList.remove("d-none");
    })
    .catch(function (err) {
      // No acceptable authenticator or user refused consent. Handle appropriately.
      console.log("ERROR", err);
    });
}
