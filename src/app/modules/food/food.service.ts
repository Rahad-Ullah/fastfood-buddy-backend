import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IFood } from './food.interface';
import { Food } from './food.model';
import { Restaurant } from '../restaurant/restaurant.model';

// -------------- create food --------------
export const createFood = async (payload: IFood): Promise<IFood> => {
  // check if food already exists
  const existingFood = await Food.exists({ name: payload.name });
  if (existingFood) {
    throw new ApiError(StatusCodes.CONFLICT, 'Food already exists');
  }
  // check if restaurant exists
  const existingRestaurant = await Restaurant.exists({
    _id: payload.restaurant,
  });
  if (!existingRestaurant) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found');
  }

  const result = await Food.create(payload);
  return result;
};

export const FoodServices = {
  createFood,
};
