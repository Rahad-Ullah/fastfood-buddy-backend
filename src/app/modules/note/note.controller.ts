import { Request, Response, NextFunction } from 'express';
import { NoteServices } from './note.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';

// create/ update note
const createNote = catchAsync(async (req: Request, res: Response) => {
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
});

// get note by user id
const getMyNote = catchAsync(async (req: Request, res: Response) => {
  const result = await NoteServices.getNoteByUserId(req.user?.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Note retrieved successfully',
    data: result,
  });
});

export const NoteController = {
  createNote,
  getMyNote,
};
