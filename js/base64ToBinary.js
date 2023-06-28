function decodeBase64ToBinary(base64String) {
  let result = Uint8Array.from(atob(base64String), c => c.charCodeAt(0))
  return result;
}

function generateRandomBase64(length) {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  const base64String = btoa(String.fromCharCode.apply(null, bytes));
  return base64String;
}
