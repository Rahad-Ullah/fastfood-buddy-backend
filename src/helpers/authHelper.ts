import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const googleClient = new OAuth2Client(config.google.client_id);

export async function verifyGoogleToken(idToken: string) {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: config.google.client_id,
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid Google token');

  return {
    providerUserId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified,
    name: payload.name,
    image: payload.picture,
  };
}
