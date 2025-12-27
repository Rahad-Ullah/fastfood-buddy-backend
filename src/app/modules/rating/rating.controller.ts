import { Request, Response, NextFunction } from 'express';
import { RatingServices } from './rating.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create rating
const createRating = catchAsync(async (req: Request, res: Response) => {
  const result = await RatingServices.createRating({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rating created successfully',
    data: result,
  });
});

export const RatingController = {
  createRating,
};