import express from 'express';
import { RestaurantController } from './restaurant.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RestaurantValidations } from './restaurant.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// Create restaurant route
router.post(
  '/create',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  validateRequest(RestaurantValidations.createRestaurantSchema),
  RestaurantController.createRestaurant
);

// Update restaurant route
router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  validateRequest(RestaurantValidations.updateRestaurantSchema),
  RestaurantController.updateRestaurant
);

// Delete restaurant route
router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  RestaurantController.deleteRestaurant
);

// Get all restaurants route
router.get(
  '/',
  auth(),
  RestaurantController.getAllRestaurants
);

export const restaurantRoutes = router;