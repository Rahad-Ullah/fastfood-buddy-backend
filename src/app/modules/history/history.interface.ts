import { Model, Types } from 'mongoose';

export interface IHistory {
  _id: string;
  user: Types.ObjectId;
  food: Types.ObjectId;
  isDeleted: boolean;
}

export type HistoryModel = Model<IHistory>;
