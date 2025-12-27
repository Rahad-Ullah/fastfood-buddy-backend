import { Model, Types } from 'mongoose';

export interface INote {
  _id: string;
  user: Types.ObjectId;
  observations: string[];
}

export type NoteModel = Model<INote>;
