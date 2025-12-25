import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IRestaurant } from './restaurant.interface';
import { Restaurant } from './restaurant.model';
import unlinkFile from '../../../shared/unlinkFile';

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

// ------------ update restaurant ------------
const updateRestaurant = async (
  id: string,
  payload: Partial<IRestaurant>
): Promise<IRestaurant | null> => {
  // check if restaurant exists
  const existingRestaurant = await Restaurant.findById(id);
  if (!existingRestaurant) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found');
  }

  // check for name conflict
  if (payload.name && payload.name !== existingRestaurant.name) {
    const nameTaken = await Restaurant.findOne({
      name: payload.name,
      _id: { $ne: id },
    });
    if (nameTaken) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'Restaurant name already in use'
      );
    }
  }

  const result = await Restaurant.findByIdAndUpdate(id, payload, { new: true });

  // unlink old image if new image is provided
  if (payload.logo && existingRestaurant.logo && result?.logo) {
    unlinkFile(existingRestaurant.logo);
  }

  return result;
};

// ------------ delete restaurant ------------
const deleteRestaurant = async (id: string): Promise<IRestaurant | null> => {
  // check if restaurant exists
  const existingRestaurant = await Restaurant.exists({ _id: id });
  if (!existingRestaurant) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found');
  }

  const result = await Restaurant.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const RestaurantServices = {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
