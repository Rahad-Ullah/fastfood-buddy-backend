import express from 'express';
import { FoodController } from './food.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { FoodValidations } from './food.validation';

const router = express.Router();

// create food route
router.post(
  '/create',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(FoodValidations.createFoodSchema),
  FoodController.createFood
);

// update food route
router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(FoodValidations.createFoodSchema),
  FoodController.updateFood
);

export const foodRoutes = router;