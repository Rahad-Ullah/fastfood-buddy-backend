import { Request, Response, NextFunction } from 'express';
import { BuddyInsightServices } from './buddyInsight.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create buddy insight
const createBuddyInsight = catchAsync(async (req: Request, res: Response) => {
  const result = await BuddyInsightServices.createBuddyInsight(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Buddy insight created successfully',
    data: result,
  });
});

// update buddy insight
const updateBuddyInsight = catchAsync(async (req: Request, res: Response) => {
  const result = await BuddyInsightServices.updateBuddyInsight(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Buddy insight updated successfully',
    data: result,
  });
});

// delete buddy insight
const deleteBuddyInsight = catchAsync(async (req: Request, res: Response) => {
  const result = await BuddyInsightServices.deleteBuddyInsight(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Buddy insight deleted successfully',
    data: result,
  });
});

export const BuddyInsightController = {
  createBuddyInsight,
  updateBuddyInsight,
  deleteBuddyInsight,
};