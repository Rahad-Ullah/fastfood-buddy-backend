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
    },
    digestionSpeed: {
      type: String,
      enum: Object.values(DigestionSpeed),
    },
    spike: { type: String },
    fact: { type: String },
    reason: { type: String },
    absorption: { type: String },
    description: { type: String },
    typicalServing: {
      carbs: { type: Number },
      protein: { type: Number },
      fat: { type: Number },
      fiber: { type: Number },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Food = model<IFood, FoodModel>('Food', foodSchema);
