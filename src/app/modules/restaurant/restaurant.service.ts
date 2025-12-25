import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IRestaurant } from './restaurant.interface';
import { Restaurant } from './restaurant.model';

// ------------ create restaurant ------------
export const createRestaurant = async (
  payload: IRestaurant
): Promise<IRestaurant> => {
  // check if restaurant already exists
  const existingRestaurant = await Restaurant.findOne({ name: payload.name });
  if (existingRestaurant) {
    throw new ApiError(StatusCodes.CONFLICT, 'Restaurant already exists');
  }

  // create new restaurant
  const result = await Restaurant.create(payload);
  return result;
};

export const RestaurantServices = {
  createRestaurant,
};
