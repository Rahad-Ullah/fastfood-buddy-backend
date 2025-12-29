import express from 'express';
import { FoodController } from './food.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { FoodValidations } from './food.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

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
  validateRequest(FoodValidations.updateFoodSchema),
  FoodController.updateFood
);

// delete food route
router.delete(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  FoodController.deleteFood
);

// get single food route
router.get('/:id', auth(), FoodController.getSingleFood);

// get all foods route
router.get('/', auth(), FoodController.getAllFoods);

// import foods route
router.post(
  '/import',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  validateRequest(FoodValidations.importFoodsSchema),
  FoodController.importFoods
);

export const foodRoutes = router;