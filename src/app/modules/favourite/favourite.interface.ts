import { Model, Types } from 'mongoose';

export interface IFavourite {
  _id: string;
  user: Types.ObjectId;
  food: Types.ObjectId;
  note: string;
  isDeleted: boolean;
}

export type FavouriteModel = Model<IFavourite>;
