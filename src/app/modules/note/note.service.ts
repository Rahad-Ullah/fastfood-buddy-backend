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

// ------------- get note by user id -------------
export const getNoteByUserId = async (id: string) => {
  const result = await Note.findOne({ user: id });
  return result;
}

export const NoteServices = {
  createNote,
  getNoteByUserId,
};