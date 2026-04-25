import { Request, Response } from 'express';
import { IntakeServices } from './intake.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create intake
const createIntake = catchAsync(async (req: Request, res: Response) => {
  const result = await IntakeServices.createIntake({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Intake created successfully',
    data: result,
  });
});

// update intake
const updateIntake = catchAsync(async (req: Request, res: Response) => {
  const result = await IntakeServices.updateIntake(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Intake updated successfully',
    data: result,
  });
});

// get all intakes by food id
const getIntakesByFoodId = catchAsync(async (req: Request, res: Response) => {
  const result = await IntakeServices.getIntakesByFoodId(req.params.id, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Intakes fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

export const IntakeController = {
  createIntake,
  updateIntake,
  getIntakesByFoodId,
};
