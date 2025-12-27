import { Food } from '../food/food.model';
import { IHistory } from './history.interface';
import { History } from './history.model';

// -------------- create history --------------
export const createHistory = async (payload: IHistory): Promise<IHistory> => {
  // check if the food exists
  const existingFood = await Food.exists({ _id: payload.food });
  if (!existingFood) {
    throw new Error('Food does not exist');
  }

  const result = await History.create(payload);
  return result;
};

export const HistoryServices = {
  createHistory,
};
