import { Model, Types } from 'mongoose';

export interface IRating {
  _id: string;
  user: Types.ObjectId;
  stars: number;
}

export type RatingModel = Model<IRating>;
