function generateCredentialOptions(username) {
  challenge = generateRandomBytes(1); //Este challenge es generado por el servidor

  // Relying Party:
  const rp = {
    name: "localhost",
    id: "localhost",
  };
  const user = {
    id: generateRandomBytes(1),
    name: username,
    displayName: username,
  };

  // This Relying Party will accept either an ES256 or RS256 credential, but
  // prefers an ES256 credential.
  const pubKeyCredParams = [
    { alg: -7, type: "public-key" }, // "ES256" as registered in the IANA COSE Algorithms registry
    { alg: -257, type: "public-key" }, // Value registered by this specification for "RS256"
  ];

  const excludeCredentials = []; // Don’t re-register any authenticator that has one of these credentials
  const authenticatorSelection = {
    authenticatorAttachment: "platform", // "platform" or "cross-platform"
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
