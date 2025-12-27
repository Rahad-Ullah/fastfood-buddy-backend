import { Request, Response, NextFunction } from 'express';
import { HistoryServices } from './history.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create history
const createHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await HistoryServices.createHistory({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'History created successfully',
    data: result,
  });
});

// delete history
const deleteHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await HistoryServices.deleteHistory(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'History deleted successfully',
    data: result,
  });
});

export const HistoryController = {
  createHistory,
  deleteHistory,
};