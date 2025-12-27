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

// -------------- delete favourite --------------
const deleteFavourite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavouriteServices.deleteFavourite(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Favourite deleted successfully',
    data: result,
  });
});

// -------------- get my favourites --------------
const getMyFavourites = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FavouriteServices.getAllFavouritesByUserId(
      req.user?.id as string,
      req.query
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Favourites retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    });
  }
);

export const FavouriteController = {
  createFavourite,
  deleteFavourite,
  getMyFavourites,
};
