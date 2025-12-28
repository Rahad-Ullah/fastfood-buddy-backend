import express from 'express';
import { PackageController } from './package.controller';
import auth from '../../middlewares/auth';
import { PackageValidation } from './package.validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

// create package
router.post(
  '/create',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(PackageValidation.createPackageSchema),
  PackageController.createPackage
);

// update package
router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(PackageValidation.updatePackageSchema),
  PackageController.updatePackage
);

// delete package
router.delete(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  PackageController.deletePackage
);

export const PackageRoutes = router;
