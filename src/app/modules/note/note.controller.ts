import { Request, Response, NextFunction } from 'express';
import { NoteServices } from './note.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create/ update note
const createNote = async (req: Request, res: Response) => {
  const result = await NoteServices.createNote({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Note created successfully',
    data: result,
  });
};

export const NoteController = {
  createNote,
};