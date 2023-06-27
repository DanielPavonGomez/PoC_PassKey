function generateCredentialOptions(username) {
  challenge = generateRandomBase64(32); //este challenge es el que se envia al servidor y se compara con el que se genera en el servidor
  const rp = {
    name: "localhost",
    id: "localhost", //nombre de la pagina web que se esta usando para la autenticacion
  };
  const user = {
    id: generateRandomBase64(32),
    name: username,
    displayName: username,
  };
  const pubKeyCredParams = [
    { alg: -7, type: "public-key" },
    { alg: -257, type: "public-key" },
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
