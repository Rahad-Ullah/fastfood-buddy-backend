import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Food } from '../food/shared/food.model';
import { IFavourite } from './favourite.interface';
import { Favourite } from './favourite.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Intake } from '../intake/intake.model';

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

// -------------- delete favourite --------------
const deleteFavourite = async (id: string) => {
  // check favourite exists
  const existingFavourite = await Favourite.exists({ _id: id });
  if (!existingFavourite) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Favourite does not exist');
  }

  const result = await Favourite.findByIdAndUpdate(
    id,
    { isFavourite: false },
    { new: true }
  ).populate('food', 'name');
  return result;
};

// get all favourites by user id
const getAllFavouritesByUserId = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const favouriteQuery = new QueryBuilder(
    Favourite.find({ user: id, isFavourite: true })
      .sort({ updatedAt: -1 })
      .populate('food', 'name category'),
    query,
  )
    .paginate()
    .fields();

  const [data, pagination] = await Promise.all([
    favouriteQuery.modelQuery.lean(),
    favouriteQuery.getPaginationInfo(),
  ]);

  // ---- Attach last intake data of each item ----
  if (data.length > 0) {
    const foodIds = data.map((item: any) => item.food._id);

    const lastIntakes = await Intake.aggregate([
      {
        $match: {
          food: { $in: foodIds },
          isDeleted: false,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$food',
          lastIntake: { $first: '$$ROOT' },
        },
      },
    ]);

    // Map for quick O(1) lookup
    const intakeMap = new Map(
      lastIntakes.map(item => [item._id.toString(), item.lastIntake]),
    );

    // Attach food objects
    data.forEach((item: any) => {
      const foodIdStr = item.food._id.toString();
      item.lastIntake = intakeMap.get(foodIdStr) || null;
    });
  }

  return { data, pagination };
};

export const FavouriteServices = {
  createFavourite,
  deleteFavourite,
  getAllFavouritesByUserId,
};
