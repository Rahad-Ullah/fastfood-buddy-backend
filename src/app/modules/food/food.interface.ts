import { Model, Types } from 'mongoose';
import { FoodCategory } from './food.constants';

export interface ITypicalServing {
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
}

export interface IFood {
  _id: string;
  name: string;
  category: FoodCategory;
  restaurant: Types.ObjectId;
  fact: string;
  reason: string;
  absorption: string;
  description: string;
  typicalServing: ITypicalServing;
  isDeleted: boolean;
}

export type FoodModel = Model<IFood>;
