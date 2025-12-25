import { Request, Response } from 'express';
import { RestaurantServices } from './restaurant.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';

// create restaurant controller
const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  const logo = getSingleFilePath(req.files, 'image');
  const payload = { ...req.body, logo };
  const result = await RestaurantServices.createRestaurant(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Restaurant created successfully',
    data: result,
  });
});

export const RestaurantController = {
  createRestaurant,
};
