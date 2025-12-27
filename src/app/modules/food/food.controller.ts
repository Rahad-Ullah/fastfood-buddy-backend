import { Request, Response } from 'express';
import { FoodServices } from './food.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

// -------------- create food controller --------------
export const createFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.createFood(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Food created successfully',
    data: result,
  });
});

export const FoodController = {
  createFood,
};