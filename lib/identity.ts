
import {
  generateIdentity,
  fingerprint
} from "./crypto";

export async function createUserIdentity() {
  const identity = await generateIdentity();

  const identityFingerprint =
    await fingerprint(identity.publicKey);

  return {
    publicKey: identity.publicKey,
    privateKey: identity.privateKey,
    fingerprint: identityFingerprint
  };
}
