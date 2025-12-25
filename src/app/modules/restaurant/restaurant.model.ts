import { Schema, model } from 'mongoose';
import { IRestaurant, RestaurantModel } from './restaurant.interface';

const restaurantSchema = new Schema<IRestaurant, RestaurantModel>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Restaurant = model<IRestaurant, RestaurantModel>(
  'Restaurant',
  restaurantSchema
);
