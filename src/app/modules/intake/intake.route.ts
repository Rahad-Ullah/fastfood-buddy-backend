import express from 'express';
import { IntakeController } from './intake.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { IntakeValidations } from './intake.validation';

const router = express.Router();

// create intake
router.post(
  '/create',
  auth(USER_ROLES.USER),
  validateRequest(IntakeValidations.createIntake),
  IntakeController.createIntake,
);

// update intake
router.patch(
  '/:id',
  auth(USER_ROLES.USER),
  validateRequest(IntakeValidations.updateIntake),
  IntakeController.updateIntake,
);

// get all intakes by food id
router.get(
  '/food/:id',
  auth(USER_ROLES.USER),
  validateRequest(IntakeValidations.getIntakesByFoodId),
  IntakeController.getIntakesByFoodId,
);

export const intakeRoutes = router;
