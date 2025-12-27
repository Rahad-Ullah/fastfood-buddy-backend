import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ISupport } from './support.interface';
import { Support } from './support.model';

// ----------- create support -----------
export const createSupport = async (payload: ISupport): Promise<ISupport> => {
  // check if user already submitted more that 3 requests within 24 hours
  const existingRequestCount = await Support.countDocuments({
    user: payload.user,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  if (existingRequestCount >= 3) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'We are processing a couple of your request. Please try again later.'
    );
  }

  const result = await Support.create(payload);
  return result;
};

export const SupportServices = {
  createSupport,
};
