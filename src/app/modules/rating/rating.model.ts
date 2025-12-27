import { Schema, model } from 'mongoose';
import { IRating, RatingModel } from './rating.interface';

const ratingSchema = new Schema<IRating, RatingModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    stars: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Rating = model<IRating, RatingModel>('Rating', ratingSchema);
