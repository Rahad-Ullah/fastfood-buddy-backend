import { Schema, model } from 'mongoose';
import { IFavourite, FavouriteModel } from './favourite.interface';

const favouriteSchema = new Schema<IFavourite, FavouriteModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
      index: true,
    },
    note: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Favourite = model<IFavourite, FavouriteModel>(
  'Favourite',
  favouriteSchema
);
