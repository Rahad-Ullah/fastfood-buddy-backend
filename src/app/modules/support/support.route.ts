import express from 'express';
import { SupportController } from './support.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { SupportValidations } from './support.validation';

const router = express.Router();

// create support
router.post(
  '/create',
  auth(USER_ROLES.USER),
  validateRequest(SupportValidations.createSupportSchema),
  SupportController.createSupport
);

export const supportRoutes = router;