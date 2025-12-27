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

// -------------- update food --------------
export const updateFood = async (id: string, payload: Partial<IFood>) => {
  // check if food exists
  const existingFood = await Food.findById(id);
  if (!existingFood) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Food not found');
  }

  // if restaurant is being updated, check if the new restaurant exists
  if (payload.restaurant && payload.restaurant !== existingFood.restaurant) {
    const existingRestaurant = await Restaurant.exists({
      _id: payload.restaurant,
    });
    if (!existingRestaurant) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found');
    }
  }

  const result = await Food.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// -------------- delete food --------------
export const deleteFood = async (id: string) => {
  // check if food exists
  const existingFood = await Food.exists({ _id: id });
  if (!existingFood) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Food not found');
  }
  
  const result = await Food.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

// get single food by id
export const getSingleFoodById = async (id: string) => {
  const result = await Food.findById(id).populate('restaurant', 'name logo');
  return result;
};

export const FoodServices = {
  createFood,
  updateFood,
  deleteFood,
  getSingleFoodById,
};
