import { Schema, model } from 'mongoose';
import { IHistory, HistoryModel } from './history.interface';

const historySchema = new Schema<IHistory, HistoryModel>(
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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const History = model<IHistory, HistoryModel>('History', historySchema);
