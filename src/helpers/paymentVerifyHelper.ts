import axios from 'axios';
import { google } from 'googleapis';
import { SubscriptionStatus } from '../app/modules/subscription/subscription.constants';
import config from '../config';

export interface GoogleVerificationResult {
  valid: boolean;
  googleSubscriptionId?: string;
  linkedPurchaseToken?: string;
  startedAt?: Date;
  expiresAt?: Date;
  status: SubscriptionStatus;
}

export async function verifyGooglePurchase(
  subscriptionId: string,
  purchaseToken: string
): Promise<GoogleVerificationResult> {
  const packageName = config.google.package_name; // static
  const accessToken = await getGoogleAccessToken();

  try {
    const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${subscriptionId}/tokens/${purchaseToken}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;

    const startTimeMillis = parseInt(data.startTimeMillis, 10);
    const expiryTimeMillis = parseInt(data.expiryTimeMillis, 10);
    const startedAt = new Date(startTimeMillis) || new Date();
    const expiresAt = new Date(expiryTimeMillis);

    let status: SubscriptionStatus = SubscriptionStatus.PENDING;
    if (data.paymentState === 1) {
      status = SubscriptionStatus.ACTIVE;
    } else if (data.cancelReason !== undefined) {
      status = SubscriptionStatus.CANCELED;
    } else if (Date.now() > expiryTimeMillis) {
      status = SubscriptionStatus.EXPIRED;
    }

    return {
      valid: true,
      startedAt,
      expiresAt,
      status,
      googleSubscriptionId: data.orderId, // unique subscription ID across renewals
      linkedPurchaseToken: data.linkedPurchaseToken, // optional, useful for upgrades/downgrades
    };
  } catch (error: any) {
    console.error(
      'Google verification failed:',
      error.response?.data || error.message
    );
    return {
      valid: false,
      status: SubscriptionStatus.PENDING,
    };
  }
}

export async function getGoogleAccessToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account.json', // path to your JSON key
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token || '';
}
