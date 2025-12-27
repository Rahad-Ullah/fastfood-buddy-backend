import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Food } from '../food/food.model';
import { IFavourite } from './favourite.interface';
import { Favourite } from './favourite.model';

// -------------- create favourite --------------
const createFavourite = async (payload: IFavourite) => {
  // check food exists
  const existingFood = await Food.exists({ _id: payload.food });
  if (!existingFood) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Food does not exist');
  }

  const result = await Favourite.findOneAndUpdate(
    { user: payload.user, food: payload.food },
    {
      $set: { ...payload, isFavourite: true },
    },
    { new: true, upsert: true }
  ).populate('food', 'name');

  return result;
};

export const FavouriteServices = {
  createFavourite,
};
