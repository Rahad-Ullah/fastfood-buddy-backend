import { INote } from './note.interface';
import { Note } from './note.model';

// ------------- create/ update note -------------
export const createNote = async (payload: INote): Promise<INote> => {
  const result = await Note.findOneAndUpdate({ user: payload.user }, payload, {
    new: true,
    upsert: true,
  });

  return result;
};

export const NoteServices = {
  createNote,
};