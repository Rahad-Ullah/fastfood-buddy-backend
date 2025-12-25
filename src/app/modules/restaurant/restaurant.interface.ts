import { Model } from 'mongoose';

export interface IRestaurant {
  _id: string;
  name: string;
  logo: string;
  isDeleted: boolean;
}

export type RestaurantModel = Model<IRestaurant>;
