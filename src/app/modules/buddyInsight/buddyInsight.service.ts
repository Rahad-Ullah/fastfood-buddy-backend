import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IBuddyInsight } from './buddyInsight.interface';
import { BuddyInsight } from './buddyInsight.model';

// ------------ create buddy insight ------------
const createBuddyInsight = async (
  payload: Partial<IBuddyInsight>,
): Promise<IBuddyInsight> => {
  const result = await BuddyInsight.create(payload);
  return result;
};

// ------------ update buddy insight ------------
const updateBuddyInsight = async (
  id: string,
  payload: Partial<IBuddyInsight>,
): Promise<IBuddyInsight> => {
  const result = await BuddyInsight.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Buddy insight not found');
  }
  return result;
};

export const BuddyInsightServices = {
  createBuddyInsight,
  updateBuddyInsight,
};
