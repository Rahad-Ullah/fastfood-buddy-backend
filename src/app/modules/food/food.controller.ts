import { Request, Response } from 'express';
import { FoodServices } from './food.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// -------------- create food controller --------------
export const createFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.createFood(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Food created successfully',
    data: result,
  });
});

// -------------- update food --------------
const updateFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.updateFood(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Food updated successfully',
    data: result,
  });
});

export const FoodController = {
  createFood,
  updateFood,
};