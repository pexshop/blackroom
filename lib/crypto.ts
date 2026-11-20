
import sodium from "libsodium-wrappers-sumo";

export async function initializeCrypto() {
  await sodium.ready;
}

export async function generateIdentity() {
  await sodium.ready;

  const keys = sodium.crypto_box_keypair();

  return {
    publicKey: sodium.to_base64(keys.publicKey),
    privateKey: sodium.to_base64(keys.privateKey)
  };
}

export async function createSharedKey(
  myPrivateKey: string,
  theirPublicKey: string
) {
  await sodium.ready;

  const privateKey = sodium.from_base64(myPrivateKey);
  const publicKey = sodium.from_base64(theirPublicKey);

  return sodium.crypto_box_beforenm(
    publicKey,
    privateKey
  );
}

export async function encryptMessage(
  message: string,
  sharedKey: Uint8Array
) {
  await sodium.ready;

  const nonce = sodium.randombytes_buf(
    sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES
  );

  const encrypted =
    sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
      message,
      null,
      null,
      nonce,
      sharedKey
    );

  return {
    ciphertext: sodium.to_base64(encrypted),
    nonce: sodium.to_base64(nonce)
  };
}

export async function decryptMessage(
  ciphertext: string,
  nonce: string,
  sharedKey: Uint8Array
) {
  await sodium.ready;

  const decrypted =
    sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
      null,
      sodium.from_base64(ciphertext),
      null,
      sodium.from_base64(nonce),
      sharedKey
    );

  return sodium.to_string(decrypted);
}

export async function fingerprint(publicKey: string) {
  await sodium.ready;

  const key = sodium.from_base64(publicKey);

  return sodium.to_hex(
    sodium.crypto_generichash(16, key)
  );
}
