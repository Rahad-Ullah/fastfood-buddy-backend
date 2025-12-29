import { Request, Response } from 'express';
import { FoodServices } from './food.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import fs from 'fs';
import { getSingleFilePath } from '../../../shared/getFilePath';
import unlinkFile from '../../../shared/unlinkFile';
import { FoodValidations } from './food.validation';

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

// -------------- delete food --------------
const deleteFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.deleteFood(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Food deleted successfully',
    data: result,
  });
});

// -------------- get single food --------------
const getSingleFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.getSingleFoodById(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Food fetched successfully',
    data: result,
  });
});

// -------------- get all foods --------------
const getAllFoods = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.getAllFoods(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Foods fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

// ------------- import foods ---------------
const importFoods = catchAsync(async (req: Request, res: Response) => {
  const file = (req.files as any)?.data?.[0];
  const filePath = getSingleFilePath(req.files, 'data');

  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'JSON file is required');
  }

  if (file.mimetype !== 'application/json') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Only JSON files are allowed');
  }

  const rawData = fs.readFileSync(file.path, 'utf-8');
  const foods = JSON.parse(rawData);
  // unlink file
  if (filePath) unlinkFile(filePath);

  if (!Array.isArray(foods)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid JSON format');
  }

  if (foods.length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'JSON file is empty');
  }
  if (foods.length > 1000) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'JSON file is too large. Max 1000 items allowed'
    );
  }
  // zod validations
  if (FoodValidations.bulkFoodSchema.safeParse(foods).success === false) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Invalid JSON file format, please check your JSON file'
    );
  }

  const result = await FoodServices.importFoods(req.body.restaurant, foods);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Foods imported successfully',
    data: result,
  });
});

export const FoodController = {
  createFood,
  updateFood,
  deleteFood,
  getSingleFood,
  getAllFoods,
  importFoods,
};