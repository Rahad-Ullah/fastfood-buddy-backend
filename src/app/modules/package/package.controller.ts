import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PackageService } from './package.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.createPackageIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Package created successfully',
    data: result,
  });
});

// update package
const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.updatePackageIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Package updated successfully',
    data: result,
  });
});

const getAllPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.getAllPackagesFromDB(
    req.query?.type as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Packages fetched successfully',
    data: result,
  });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.deletePackageFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Package deleted successfully',
    data: result,
  });
});

export const PackageController = {
  createPackage,
  getAllPackages,
  updatePackage,
  deletePackage,
};
