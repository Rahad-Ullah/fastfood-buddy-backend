import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IBuddyInsight } from './buddyInsight.interface';
import { BuddyInsight } from './buddyInsight.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

// ------------ delete buddy insight ------------
const deleteBuddyInsight = async (id: string): Promise<IBuddyInsight> => {
  const result = await BuddyInsight.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Buddy insight not found');
  }
  return result;
}

// ------------ get all buddy insights ------------
const getAllBuddyInsights = async (query: Record<string, unknown>): Promise<IBuddyInsight[]> => {
  const insightQuery = new QueryBuilder(
    BuddyInsight.find(),
    query
  )
    .search(['message'])
    .filter()
    .sort()
    .fields();

  const data = await insightQuery.modelQuery;
  return data;
};

export const BuddyInsightServices = {
  createBuddyInsight,
  updateBuddyInsight,
  deleteBuddyInsight,
  getAllBuddyInsights,
};
