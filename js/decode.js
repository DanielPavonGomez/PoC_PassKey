function decodeBase64urlToBinary(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  let binaryString = atob(base64);
  let len = binaryString.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function generateRandomBytes(len) {
  let randomBuffer = new Uint8Array(len);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer;
}