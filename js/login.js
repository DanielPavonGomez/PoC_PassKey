async function loginCredentials(event) {
  event.preventDefault();
  // credId is generated by the authenticator
  let credId = localStorage.getItem("credId"); // Get credId from localStorage
  credId = decodeBase64urlToBinary(credId); // Decode credId from base64url to binary
  challenge = generateRandomBytes(1); // This challenge is generated by the server

  await navigator.credentials
    .get({
      publicKey: {
        challenge: challenge,
        timeout: 120000, // Timeout set to 2 minutes
        rpId: "localhost",
        userVerification: "required",
        allowCredentials: [
          {
            type: "public-key",
            id: credId, 
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: true,
        },
      },
    })
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