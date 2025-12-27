import { IRating } from './rating.interface';
import { Rating } from './rating.model';

// ------------- create rating -------------
export const createRating = async (payload: IRating): Promise<IRating> => {
  // update rating if rated in 24 hours, else create new
  const result = await Rating.findOneAndUpdate(
    {
      user: payload.user,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
    { stars: payload.stars },
    { new: true, upsert: true }
  );

  return result;
};

export const RatingServices = {
  createRating,
};
