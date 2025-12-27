import { Request, Response } from 'express';
import { FavouriteServices } from './favourite.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// -------------- create favourite controller --------------
const createFavourite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavouriteServices.createFavourite({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Favourite created successfully',
    data: result,
  });
});

export const FavouriteController = {
  createFavourite,
};
