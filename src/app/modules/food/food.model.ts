import { Schema, model } from 'mongoose';
import { IFood, FoodModel } from './food.interface';
import { DigestionSpeed, FoodCategory, ImpactSpeed } from './food.constants';

const foodSchema = new Schema<IFood, FoodModel>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(FoodCategory),
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
      index: true,
    },
    impactSpeed: {
      type: String,
      enum: Object.values(ImpactSpeed),
      required: true,
    },
    digestionSpeed: {
      type: String,
      enum: Object.values(DigestionSpeed),
      required: true,
    },
    spike: { type: String, required: true },
    fact: { type: String, required: true },
    reason: { type: String, required: true },
    absorption: { type: String, required: true },
    description: { type: String, required: true },
    typicalServing: {
      carbs: { type: Number, required: true },
      protein: { type: Number, required: true },
      fat: { type: Number, required: true },
      fiber: { type: Number, required: true },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Food = model<IFood, FoodModel>('Food', foodSchema);
