import { Request, Response, NextFunction } from 'express';
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

export const IntakeController = {
  createIntake,
};