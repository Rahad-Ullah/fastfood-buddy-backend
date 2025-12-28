import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Package } from '../package/package.model';
import { SubscriptionStatus } from './subscription.constants';
import { ISubscription } from './subscription.interface';
import { Subscription } from './subscription.model';
import {
  GoogleVerificationResult,
  verifyGooglePurchase,
} from '../../../helpers/paymentVerifyHelper';

async function verifyAppleReceipt(
  transactionReceipt: string,
  productId: string
) {
  // Call Apple App Store Server API here
  // Example: verifyTransaction / getTransactionInfo
  return {
    valid: true,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
    status: SubscriptionStatus.ACTIVE,
    transactionId: '1234567890',
    originalTransactionId: '1234567890',
  };
}

export const createSubscriptionIntoDB = async (
  payload: Partial<ISubscription> & { transactionReceipt?: string }
) => {
  // check if the package is valid
  const pkg = await Package.findById(payload.package);
  if (!pkg) {
    throw new Error('Package does not exist');
  }

  let verificationResult: GoogleVerificationResult;

  if (payload.platform === 'android') {
    if (!payload.purchaseToken) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Purchase token is required for Google Play subscriptions'
      );
    }
    if (!pkg.androidProductId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Google Play product id is required for Google Play subscriptions'
      );
    }
    verificationResult = await verifyGooglePurchase(
      payload.purchaseToken,
      pkg.androidProductId
    );
  } else if (payload.platform === 'ios') {
    if (!payload.transactionReceipt) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Transaction receipt is required for Apple subscriptions'
      );
    }
    if (!pkg.iosProductId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Apple product id is required for Apple subscriptions'
      );
    }
    verificationResult = await verifyAppleReceipt(
      payload.transactionReceipt,
      pkg.iosProductId
    );
  } else {
    throw new Error('Unsupported platform');
  }

  if (!verificationResult.valid) {
    return { success: false, message: 'Subscription verification failed' };
  }

  const subscription = await Subscription.create({
    user: payload.user,
    package: payload.package,
    platform: payload.platform,
    androidProductId: pkg.androidProductId,
    iosProductId: pkg.iosProductId,
    purchaseToken: payload.purchaseToken,
    googleSubscriptionId: verificationResult.googleSubscriptionId,
    transactionId: verificationResult.transactionId,
    originalTransactionId: verificationResult.originalTransactionId,
    status: verificationResult.status,
    startedAt: verificationResult.startedAt,
    expiresAt: verificationResult.expiresAt,
  });

  return subscription;
};

export const SubscriptionServices = {
  createSubscriptionIntoDB,
};
