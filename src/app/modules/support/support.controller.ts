import { Request, Response, NextFunction } from 'express';
import { SupportServices } from './support.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create support
const createSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await SupportServices.createSupport({
    ...req.body,
    user: req.user?.id,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Support created successfully',
    data: result,
  });
});

export const SupportController = {
  createSupport,
};