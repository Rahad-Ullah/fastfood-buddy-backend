import express from 'express';
import { DisclaimerController } from './disclaimer.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { DisclaimerValidations } from './disclaimer.validation';

const router = express.Router();

// create/update disclaimer
router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(DisclaimerValidations.createDisclaimer),
  DisclaimerController.createUpdateDisclaimer,
);

// get single disclaimer by type
router.get(
  '/:type',
  validateRequest(DisclaimerValidations.getSingleDisclaimerByType),
  DisclaimerController.getSingleDisclaimerByType,
);

export const disclaimerRoutes = router;
