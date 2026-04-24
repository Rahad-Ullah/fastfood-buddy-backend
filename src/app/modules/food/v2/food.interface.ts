import { Model, Types } from 'mongoose';
import { FoodCategory } from '../shared/food.constants';

export interface IFood {
  _id: string;
  name: string;
  category: FoodCategory;
  restaurant: Types.ObjectId;
  isDeleted: boolean;
}

export type FoodModel = Model<IFood>;
