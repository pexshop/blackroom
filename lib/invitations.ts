
import { randomBytes, createHash } from "crypto";

export function generateInvitationToken() {
  return randomBytes(32).toString("base64url");
}

export function hashInvitationToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export function createInvitationUrl(
  roomId: string,
  token: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!baseUrl) {
    throw new Error("Application URL is not configured");
  }

  return `${baseUrl}/invite/${roomId}?token=${encodeURIComponent(token)}`;
}
