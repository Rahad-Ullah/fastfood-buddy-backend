import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import { IFood } from './food.interface';
import { Food } from '../shared/food.model';
import { Restaurant } from '../../restaurant/restaurant.model';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Intake } from '../../intake/intake.model';
import { Favourite } from '../../favourite/favourite.model';

// -------------- create food --------------
export const createFood = async (payload: IFood): Promise<IFood> => {
  // check if food already exists
  const existingFood = await Food.exists({
    name: payload.name,
    restaurant: payload.restaurant,
  });
  if (existingFood) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Food already exists for this restaurant',
    );
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
    { new: true },
  );
  return result;
};

// get single food by id
export const getSingleFoodById = async (id: string) => {
  const result = await Food.findById(id)
    .populate('restaurant', 'name logo')
    .select('name category restaurant isDeleted');
  return result;
};

// -------------- get all food --------------
export const getAllFoods = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const foodQuery = new QueryBuilder(
    Food.find({ isDeleted: false })
      .select('name category restaurant isDeleted')
      .populate('restaurant', 'name logo'),
    query,
  )
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, pagination] = await Promise.all([
    foodQuery.modelQuery.lean(),
    foodQuery.getPaginationInfo(),
  ]);

  if (data.length > 0) {
    // ---- Attach last intake data of each item ----
    const foodIds = data.map(food => food._id);

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

    // ---- Attach favorite data of each item ----
    const favorites = await Favourite.find({
      user: userId,
      food: { $in: foodIds },
      isFavourite: true,
    }).select('food');

    // Set of food IDs for O(1) lookup
    const favoriteSet = new Set(favorites.map(f => f.food.toString()));

    // Attach both lastIntake and isFavourite to food objects
    data.forEach((food: any) => {
      const foodIdStr = food._id.toString();
      food.lastIntake = intakeMap.get(foodIdStr) || null;
      food.isFavourite = favoriteSet.has(foodIdStr);
    });
  }

  return { data, pagination };
};

// ------------ import food items ------------
const importFoods = async (restaurantId: string, foods: Partial<IFood>[]) => {
  // 1. Check restaurant exists
  const restaurantExists = await Restaurant.exists({ _id: restaurantId });
  if (!restaurantExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found');
  }

  // 2. Normalize names for comparison
  const foodNames = foods.map(f => f.name?.trim()).filter(Boolean) as string[];

  // 3. Find existing foods (single query)
  const existingFoods = await Food.find(
    {
      restaurant: restaurantId,
      name: { $in: foodNames },
    },
    { name: 1 },
  ).lean();

  const existingNameSet = new Set(existingFoods.map(f => f.name.toLowerCase()));

  // 4. Filter new foods only
  const newFoods = foods
    .filter(f => f.name && !existingNameSet.has(f.name.trim().toLowerCase()))
    .map(f => ({
      ...f,
      name: f.name!.trim(),
      restaurant: restaurantId,
    }));

  if (newFoods.length === 0) {
    throw new ApiError(StatusCodes.CONFLICT, 'All food items already exist');
  }

  // 5. Bulk insert (FAST)
  const insertedFoods = await Food.insertMany(newFoods, {
    ordered: false, // continues even if one fails
  });

  return {
    totalCount: foods.length,
    insertedCount: insertedFoods.length,
    skippedCount: foods.length - insertedFoods.length,
  };
};

export const FoodServices = {
  createFood,
  updateFood,
  deleteFood,
  getSingleFoodById,
  getAllFoods,
  importFoods,
};
