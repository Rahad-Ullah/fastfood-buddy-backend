import { Schema, model } from 'mongoose';
import { INote, NoteModel } from './note.interface';

const noteSchema = new Schema<INote, NoteModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    observations: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Note = model<INote, NoteModel>('Note', noteSchema);
